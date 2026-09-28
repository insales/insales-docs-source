---
seo_title: "settings.json — поля настроек шаблона InSales"
description: "Как описать поля редактора шаблона InSales в config/settings.json: группы, типы настроек и связь со значениями settings_data.json."
---

# settings.json

Файл `config/settings.json` задаёт поля настроек шаблона в редакторе. Выбранные значения хранятся в <a href="/4%20поколение/Шаблон/settings_data.json/">settings_data.json</a> и читаются в Liquid как `{{ settings.имя }}`.

Общие параметры полей совпадают с <a href="/4%20поколение/Виджеты/settings_form/">формой настроек виджета</a>. Ниже — то, что относится к шаблону, с верными значениями `type`.

#### Группы настроек

Настройки группируются. Группа отображается в редакторе подменю с заголовком. Если группа одна, заголовок скрыт и список всегда раскрыт.

Поле с `"general": true` показывается в основных настройках редактора. Остальные видны в расширенном режиме.

```json
{
  "Группа 1": [],
  "Группа 2": [],
  "Группа 3": []
}
```

#### Подгруппы настроек

Группу можно разделить на подгруппы. Подгруппа визуально отделяет поля друг от друга.

```json
{
  "Группа 1": [
    {
      "group_name": "Подгруппа 1",
      "items": []
    },
    {
      "group_name": "Подгруппа 2",
      "items": []
    }
  ]
}
```

Если подзаголовок не нужен, `group_name` можно не указывать. В `items` сразу лежат поля.

```json
{
  "Группа 1": [
    {
      "items": []
    }
  ]
}
```

#### Общие параметры поля

* `name` — идентификатор. Он уникален и совпадает с ключом в <a href="/4%20поколение/Шаблон/settings_data.json/">settings_data.json</a>.
* `label` — подпись в редакторе. Можно передать перевод: `"{{ messages.title }}"`.
* `value` — значение по умолчанию.
* `help` — подсказка рядом с полем.
* `type` — тип поля.
* `general` — `true` или `false`. Вывод в основные настройки редактора.
* `general_position` — число, порядок в основных настройках.
* `general_label` — заголовок блока в основных настройках, например `"{{ messages.title }}"`.
* `enable_server_reload` — `true` или `false`. При изменении шаблон перезагружается.
* `hide_mobile` — `true` или `false`. Скрыть поле в мобильной версии редактора.

#### Текст (`text`)

Однострочный текст. Подробный пример поля — в <a href="/4%20поколение/Виджеты/settings_form/#setting_form_text">форме виджета</a>.

```json
{
  "name": "main_text",
  "label": "Текст",
  "type": "text"
}
```

#### Основной текст (`rich-text`)

Текст с разметкой. Тип поля — `rich-text`.

```json
{
  "name": "about",
  "label": "О магазине",
  "type": "rich-text"
}
```

#### Число (`number`)

Целое или дробное число. Дополнительно: `min`, `max`, `step`. `with_btns: true` показывает кнопки «+» и «−».

```json
{
  "name": "collection_count",
  "label": "Товаров в категории",
  "type": "number",
  "min": 1,
  "max": 48,
  "step": 1
}
```

#### Чекбокс (`checkbox`)

```json
{
  "name": "favorite_enabled",
  "label": "Включить избранное",
  "type": "checkbox",
  "value": true
}
```

#### Селект (`select`)

Варианты — массив пар `[подпись, значение]`.

```json
{
  "name": "product_not_available",
  "label": "Если нулевой остаток",
  "type": "select",
  "options": [
    ["Показывать", "shown"],
    ["Скрывать", "hidden"]
  ],
  "value": "shown"
}
```

#### Ползунок (`range`)

Дополнительно: `min`, `max`, `step`, `unit` (например `"px"` или `"vw"`), `with_btns`.

```json
{
  "name": "layout-content-max-width",
  "label": "Максимальная ширина сайта",
  "type": "range",
  "min": 960,
  "max": 1600,
  "step": 10,
  "unit": "px"
}
```

#### Кнопки (`button-switch`, `button-list`)

Один выбранный вариант из `options`. У варианта есть `value` и `title`, у кнопки с иконкой — ещё `icon`. Тип `button-list` показывает те же варианты списком. Группа иконок задаётся типом `icon-group`.

```json
{
  "name": "sidebar_index_position",
  "label": "Позиция сайдбара",
  "type": "button-switch",
  "options": [
    { "value": "left", "title": "Слева" },
    { "value": "right", "title": "Справа" }
  ],
  "value": "left"
}
```

#### Файл (`file`)

Загрузка файла темы. `name` — имя файла, например `logotype.png`.

```json
{
  "name": "logotype.png",
  "label": "Логотип",
  "type": "file"
}
```

#### Цвет (`color`)

`clearable: true` позволяет очистить цвет. `fallback` — имя другой цветовой настройки, например `color-btn-bg`: этот цвет используется, если значение не задано.

```json
{
  "name": "color-btn-bg",
  "label": "Цвет кнопок",
  "type": "color",
  "value": "#76BC21"
}
```

#### Шрифт (`fonts_select`)

Выбор шрифта. Тип поля — `fonts_select`.

```json
{
  "name": "font-family",
  "label": "{{ messages.font_main_text }}",
  "type": "fonts_select",
  "general": true
}
```

#### Использование настроек

Значение из активного пресета:

```liquid
Шрифт: {{ settings.font-family }}
Цвет текста: {{ settings.color-text-dark }}
```

Как значения попадают в CSS, описано в <a href="/4%20поколение/Шаблон/settings_data.json/">settings_data.json</a>.
