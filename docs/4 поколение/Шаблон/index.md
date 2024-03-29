# Вводная

!!! info
    Шаблон - редактируемый набор виджетов со своими настройками. 
    С помощью json файлов мы можем прописывать блоки виджетов, настройки виджетов и настройки шаблонов.


#### Структура шаблона

- <a href="/4%20поколение/Шаблон/setup.json/">Setup</a>  `setup.json`. В сетапе прописываются виджет-листы с перечеслением виджетов их настроек и <a href="/4%20поколение/Виджеты/info/#SimpleWidgetType">блоков</a>.
- <a href="/4%20поколение/Шаблон/settings.json/">Settings</a>  `settings.json`. В данном файле прописываются настройки шаблона.


#### Создание

Создать шаблон можно 2 способами:

1. Использовать имеющиеся шаблоны 4 поколения через панель администратора, в разделе «Дизайн»
2. Изменить имеющиеся шаблоны 4 поколения через панель администратора, в разделе `«Дизайн» -> Действия -> Редактировать код -> Настройки шаблона`


#### setup.json

Фрагмент, в котором мы добавили виджет с пермалинком `system_widget_v4_promo_slider_4` к <a href="/4%20поколение/Виджеты/#ListWidgetInfo">виджет-листу</a> `index-list`.

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




#### settings.json

Настройки шаблона, где мы прописали:

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
