---
seo_title: "settings_data.json — значения настроек шаблона InSales"
description: "Файл config/settings_data.json в шаблоне InSales: значения настроек, пресеты, выбор текущего пресета и связь с полями settings.json."
---

# settings_data.json

Файл `config/settings_data.json` хранит значения настроек шаблона. Поля редактора задаются в <a href="/4%20поколение/Шаблон/settings.json/">settings.json</a>: ключ в пресете совпадает с `name` поля.

```json
{
  "current": "custom",
  "generation": 4,
  "presets": {
    "custom": {
      "bg": "#FFFFFF",
      "color-btn-bg": "#76BC21",
      "font-family": "PT Root UI",
      "font-size": "16px",
      "favorite_enabled": "1"
    }
  }
}
```

- `generation` для шаблона 4 поколения равен `4`.
- `current` — активный пресет. Обычно это `custom`.
- `presets` — наборы значений. На витрине и в редакторе используются значения пресета из `current`.

В скачанном файле рядом с этими ключами бывают служебные поля темы, например `theme_title`. Свои значения записывайте в `presets`.

#### Liquid и CSS

В Liquid значение читается как `{{ settings.имя }}`.

```liquid
Шрифт: {{ settings.font-family }}
Цвет кнопок: {{ settings.color-btn-bg }}
```

Чекбокс, число, цвет, шрифт (`fonts_select`), селект, ползунок, файл и группы кнопок (`button-switch`, `button-list`, `icon-group`) дополнительно попадают в CSS-переменные на корне страницы: `--имя`. К значению ползунка дописывается `unit` из формы, если он задан.

Текст и rich-text остаются в Liquid и в CSS-переменные не выводятся.

Для цвета рядом с основным значением появляются признак светлого или тёмного цвета и три оттенка:

- `--bg` — сам цвет
- `--bg-is-light: true` или `--bg-is-dark: true`
- `--bg-minor-shade`, `--bg-major-shade`, `--bg-half-shade`
- у каждого оттенка свой признак: `--bg-minor-shade-is-light` или `--bg-minor-shade-is-dark`
