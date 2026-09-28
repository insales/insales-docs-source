---
title: Вводная
seo_title: "Шаблоны InSales 4 поколения: структура и настройка"
description: "Как устроен шаблон InSales 4 поколения: структура архива, layout страниц, виджеты и файлы настроек settings.json, settings_data.json и setup.json."
---

# Шаблоны InSales 4 поколения {#_1}

!!! info
    Шаблон — редактируемый набор виджетов со своими настройками.
    В json-файлах задают виджет-листы, виджеты, их блоки и настройки шаблона.


#### Структура архива

- `templates/` — liquid-файлы страниц. Общая оболочка и шаблоны страниц описаны в <a href="/4%20поколение/Шаблон/layout.liquid/">layout</a>.
- `snippets/` — общие фрагменты Liquid. Из шаблона их подключают тегом `{% include 'имя' %}`: файл `snippets/имя.liquid`.
- `media/` — файлы темы: изображения, стили, скрипты. В старых архивах эта папка называется `assets/`. При загрузке архива нужна одна из них.
- `config/settings.json` — <a href="/4%20поколение/Шаблон/settings.json/">форма настроек</a> шаблона в редакторе.
- `config/settings_data.json` — <a href="/4%20поколение/Шаблон/settings_data.json/">значения настроек</a>.
- `config/messages.json` — <a href="/4%20поколение/Шаблон/messages.json/">переводы</a> шаблона.
- `config/setup.json` — <a href="/4%20поколение/Шаблон/setup.json/">состав шаблона</a> при установке: виджет-листы, виджеты, блоки, страницы, меню и другие сущности магазина.
- `widget_types/` — свои виджеты шаблона. Состав папки виджета описан в разделе <a href="/4%20поколение/Виджеты/">виджеты</a>.

При загрузке архива обязательны шаблоны общей оболочки, главной, категории, товара, корзины и страницы: `layout.liquid`, `index.liquid`, `collection.liquid`, `product.liquid`, `cart.liquid`, `page.liquid`.


#### Создание

Поставить магазин на шаблон 4 поколения можно двумя способами:

1. Установить готовый шаблон в панели администратора, раздел «Дизайн».
2. Изменить файлы уже установленного шаблона: «Дизайн» → Действия → Редактировать код.


#### setup.json

Фрагмент, в котором виджет с пермалинком `system_widget_v4_promo_slider_4` добавлен в <a href="/4%20поколение/Виджеты/#ListWidgetInfo">виджет-лист</a> `index-list`.

```json
"theme_widgets":{
  "widget_types":[],
  "widget_lists":[
    {
      "name":"index",
      "handle":"index-list",
      "kind":"content",
      "widgets": [
        {
          "settings_data":{
            "hide-mobile":false,
            "hide-desktop":false,
            "img-ratio":"3",
            "autoplay":false,
            "autoplay-delay":"5"
          },
          "widget_type":"system_widget_v4_promo_slider_4",
          "data_handle":"block-list-slider"
        }
      ]
    }
  ]
}
```

Полное описание файла — на странице <a href="/4%20поколение/Шаблон/setup.json/">setup.json</a>.


#### settings.json и settings_data.json

`settings.json` описывает поля в редакторе: группы, подписи и типы. `settings_data.json` хранит выбранные значения.

Фрагмент значений: шрифт, фон, цвет кнопок и скругление.

```json
{
  "current": "custom",
  "generation": 4,
  "presets": {
    "custom": {
      "bg": "#FFFFFF",
      "color-btn-bg": "#76BC21",
      "controls-btn-border-radius": "0px",
      "font-family": "PT Root UI"
    }
  }
}
```

Форма — на странице <a href="/4%20поколение/Шаблон/settings.json/">settings.json</a>, значения — на странице <a href="/4%20поколение/Шаблон/settings_data.json/">settings_data.json</a>.
