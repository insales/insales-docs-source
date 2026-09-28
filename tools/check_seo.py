"""Check SEO metadata in the built site using only the Python standard library."""

import argparse
from collections import Counter
import gzip
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import quote
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.lang = None
        self.titles = []
        self.meta = {}
        self.canonicals = []
        self.h1_count = 0
        self.json_ld = []
        self.capture = None
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang")
        elif tag == "title":
            self.titles.append("")
            self.capture = self.titles
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "meta":
            key = attrs.get("name", attrs.get("property"))
            self.meta.setdefault(key, []).append(attrs.get("content", ""))
        elif tag == "link" and "canonical" in attrs.get("rel", "").split():
            self.canonicals.append(attrs.get("href", ""))
        elif tag == "script" and attrs.get("type") == "application/ld+json":
            self.json_ld.append("")
            self.capture = self.json_ld

    def handle_endtag(self, tag):
        if tag in ("title", "script"):
            self.capture = None

    def handle_data(self, data):
        if self.capture is not None:
            self.capture[-1] += data

    @property
    def noindex(self):
        return "noindex" in ",".join(self.meta.get("robots", [])).lower()


def check_site(root, site_url):
    errors = []
    titles, descriptions, canonicals = [], [], []
    pages = sorted(root.rglob("*.html"))

    def check(condition, message):
        if not condition:
            errors.append(message)

    check(bool(pages), "No HTML pages found; run mkdocs build first")
    for path in pages:
        relative = path.relative_to(root).as_posix()
        page = Page(path.read_text(encoding="utf-8"))
        check(page.lang == "ru", f"{relative}: expected lang=ru")
        check(len(page.titles) == 1 and bool(page.titles[0].strip()),
              f"{relative}: expected one nonempty title")
        check(page.h1_count == 1, f"{relative}: expected one H1")
        if relative == "404.html":
            check(page.noindex, "404.html must be noindex")
        if relative == "index.html":
            check(not page.noindex, "Homepage must be indexable")
        if page.noindex:
            continue

        title = page.titles[0].strip() if page.titles else ""
        titles.append(title)
        check(title.endswith(" - LiquidHub"), f"{relative}: missing title branding")
        description = page.meta.get("description", [])
        check(len(description) == 1 and bool(description[0].strip()),
              f"{relative}: expected one nonempty description")
        descriptions.extend(description)
        url_path = relative.removesuffix("index.html") if relative.endswith("index.html") else relative
        expected_url = site_url + quote(url_path)
        check(page.canonicals == [expected_url], f"{relative}: incorrect canonical")
        canonicals.extend(page.canonicals)
        for key, expected in {
            "og:title": [title], "og:description": description,
            "og:url": [expected_url], "og:site_name": ["LiquidHub"],
            "og:type": ["website"], "og:locale": ["ru_RU"],
            "twitter:card": ["summary"], "twitter:title": [title],
            "twitter:description": description,
        }.items():
            check(page.meta.get(key) == expected, f"{relative}: incorrect {key}")
        if relative == "index.html":
            check(len(page.json_ld) == 1, "Homepage must have WebSite JSON-LD")
            for raw in page.json_ld:
                try:
                    data = json.loads(raw)
                    check(data.get("@type") == "WebSite" and data.get("name") == "LiquidHub"
                          and data.get("url") == site_url and data.get("inLanguage") == "ru",
                          "Incorrect homepage WebSite JSON-LD")
                except (ValueError, AttributeError):
                    errors.append("Invalid homepage JSON-LD")

    check(bool(canonicals), "Site must contain indexable pages")
    for label, values in [("title", titles), ("description", descriptions), ("canonical", canonicals)]:
        for value, count in Counter(values).items():
            check(count == 1, f"Duplicate {label}: {value}")

    sitemap = (root / "sitemap.xml").read_bytes()
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locations = [node.text for node in ET.fromstring(sitemap).findall("s:url/s:loc", namespace)]
    check(Counter(locations) == Counter(canonicals),
          "Sitemap must contain every indexable canonical exactly once, and no noindex pages")
    check(gzip.decompress((root / "sitemap.xml.gz").read_bytes()) == sitemap,
          "Compressed sitemap differs from sitemap.xml")
    check(f"Sitemap: {site_url}sitemap.xml" in (root / "robots.txt").read_text(),
          "Missing sitemap reference in robots.txt")
    search = json.loads((root / "search/search_index.json").read_text())
    check(set(search["config"]["lang"]) == {"ru", "en"}, "Expected Russian and English search")
    if errors:
        raise SystemExit("SEO checks failed:\n" + "\n".join(errors))
    print(f"SEO checks passed: {len(pages)} HTML pages, {len(canonicals)} indexable pages, "
          "unique titles/descriptions, canonical URLs, social metadata, JSON-LD and sitemap.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("site_dir", type=Path)
    parser.add_argument("--site-url", default="https://docs.liquidhub.ru/")
    args = parser.parse_args()
    check_site(args.site_dir, args.site_url.rstrip("/") + "/")
