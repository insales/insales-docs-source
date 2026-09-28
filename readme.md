# Документации по InSales, liquid, common.js и прочим темным вещам

Каталог docs содержит исходники документации./

## Добавление, проверка результатов

Установка

```
pip install --no-cache-dir -r requirements.txt
```

Запуск локального сервера

`mkdocs serve`

## Docker

Используем Docker для запуска локального сервера

```
docker-compose build docs
docker-compose up
```

или

```
docker-compose up --build
```

После запуска сервер будет доступен по адресу http://localhost:8000

## Сборка документации

Сборка документации делается с помощью GitHub CI при каждом коммите в мастер.

## SEO страниц

Общие настройки находятся в `mkdocs.yml`: `site_url` задаёт основной адрес
и включает canonical/sitemap, `site_description` — резервное описание,
`theme.language` — язык, `theme.logo` и `theme.favicon` — фирменную иконку.
Логотип сохранён локально из apple-touch-icon сайта [liquidhub.ru](https://liquidhub.ru/).
Для вкладок подключён оригинальный `favicon-32x32.png`.
Версия 180 × 180 подключена как крупная иконка
и apple-touch-icon. Все изображения взяты с основного сайта без изменений.

В начале каждой индексируемой Markdown-страницы задавайте метаданные:

```yaml
---
seo_title: "settings.json — поля настроек шаблона InSales"
description: "Как описать поля редактора шаблона InSales в config/settings.json: группы, типы настроек и связь со значениями settings_data.json."
---
```

`seo_title` используется в HTML-заголовке и метаданных социальных сетей.
Суффикс ` - LiquidHub` добавляется автоматически. `title` по-прежнему задаёт
подпись в навигации, а `# Заголовок` — видимый заголовок статьи.
Заголовок и описание должны соответствовать содержимому и отличать страницу
от соседних разделов. Если `seo_title` не указан, используется `title` или H1;
для описания резервным значением служит `site_description` в `mkdocs.yml`.

Для служебных страниц можно указать `noindex: true`: они получают метатег
`noindex, follow` и исключаются из sitemap. Запрещать обход такой HTML-страницы
в `robots.txt` не нужно: поисковый робот должен увидеть `noindex`.

Проверка перед публикацией (Python 3.9+):

```sh
mkdocs build --strict
python tools/check_seo.py site
```

