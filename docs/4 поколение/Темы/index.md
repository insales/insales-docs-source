# Вводная

!!! info

    С помощью json файлов мы можем прописывать блоки виджетов, настройки виджетов и настройки шаблона или темы.


#### Структура шаблона

- <a href="/Generation%204/Темы/Структура/setup.json/">Setup</a>  `setup.json`
- <a href="/Generation%204/Темы/Структура/settings.json/">Settings</a>  `settings.json`


#### Создание

Создать шаблон можно 2 способами:

1. Использовать имеющиеся шаблоны 4 поколения через панель администратора, в разделе «Дизайн»
2. Изменить имеющиеся шаблоны 4 поколения через панель администратора, в разделе `«Дизайн» -> Действия -> Редактировать код -> Настрйоки шаблона`


#### setup.json

Фрагмент в котором мы добавили виджет с пермалинком `system_widget_v4_promo_slider_4` к виджет-листу `index-list`.

```json
"theme_widgets":{
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

!!! info

    Виджет-листы требуются для разделения списков на области и страницы.

    Так как список виджетов главной страницы будет отличаться от списка виджетов каталога. И для виджеты основного контента необходимо отделить от виджетов подвала/сайдбара/хедера.
Виджет-листы    
![](/img/info2.svg)



#### settings.json

Настройки шаблона где мы прописали:

- шрифт шаблона `"font-family": "PT Root UI"`
- общий фон шаблона `"bg": "#FFFFFF"`
- цвет кнопок шаблона `"color-btn-bg": "#76BC21"`
- скругление углов шаблона `"controls-btn-border-radius": "0px"`

```json
{
  "current": "custom",
  "generation": 4,
  "not_need_shop_bundle": true,
  "presets": {
    "custom": {
      "bg": "#FFFFFF",
      "color-btn-bg": "#76BC21",
      "color-accent-text": "#76BC21",
      "color-text-dark": "#333333",
      "color-text-light": "#ffffff",
      "icons_pack": "insales-default",
      "controls-btn-border-radius": "0px",
      "color-notice-warning": "#fff3cd",
      "color-notice-success": "#d4edda",
      "color-notice-error": "#f8d7da",
      "color-notice-info": "#cce5ff",
      "font-family": "PT Root UI",
      "font-size": "16px",
      "font-family-heading": "PT Root UI",
      "collection_count": 12,
      "search_count": 12,
      "blog_size": "8",
      "product_not_available": "shown",
      "layout-content-max-width": "1240",
      "delta_sidebar": "1",
      "type_sidebar": "sticky",
      "sidebar_index_position": "left",
      "sidebar_collection_position": "left",
      "sidebar_collection_show": true,
      "sidebar_cart_position": "left",
      "sidebar_product_position": "left",
      "sidebar_blog_position": "left",
      "sidebar_article_position": "left",
      "sidebar_page_position": "left",
      "sidebar_compare_position": "left",
      "sidebar_search_position": "left",
      "feedback_captcha_enabled": "1",
      "favorite_enabled": "1",
      "heading-ratio": 1.5,
      "heading-weight": 600,
      "color-preset": "custom"
    }
  },
  "remote_theme_id": 653,
  "source_account_id": null,
  "system_widgets": true,
  "theme_title": "Base"
}
```
