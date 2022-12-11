# setup.json

Этот файл отвечает за установку темы. В нем можно указать с какими виджет листами, виджетами и настройками виджетов, блоками и блок листами будет установлена тема.

## Добавление виджет листов

В этом файле можно указать какие виджет листы будут установлены вместе с темой.

#### Параметры:
- handle - уникальное название виджет-листа
- kind - расположение на странице `"content", "before_content", "after_content", "footer", "header", "sidebar", "outside", "bottom_panel", "top_panel"`
- name - переводы с названием виджета листа (название отображается при редактировании и настроек виджетов)
- widgets - массив виджетов которые нужно установить вместе с этим виджет листом.

#### Пример

````
{
  "handle":"blog-section_top-list",
  "kind":"content",
  "name":{
    "ru":"Верхняя секция блога",
    "en":"Top section of the blog",
    "ua":"Верхня секція блогу",
    "es":"Sección superior del blog"
  },
  "widgets":[]
}
````


## Добавление виджета

#### Параметры
- settings_data - настройки с которыми необходимо установить виджет (если не указывать то виджет установится с дефолтными настройками которые указаны в файле `settings_data.json` виджета)
- widget_type - идентификатор виджета
- data_handle - идентификатор блок-листа с контентом для этого виджета (нужен только для виджетов с блоками)

````
{
  "handle":"blog-section_top-list",
  "kind":"content",
  "name":{
    "ru":"Верхняя секция блога",
    "en":"Top section of the blog",
    "ua":"Верхня секція блогу",
    "es":"Sección superior del blog"
  },
  "widgets":[
    {
      "settings_data":{
        "layout-wide-bg":false,
        "layout-wide-content":false,
        "layout-pt":3,
        "layout-pb":3,
        "hide-mobile":false,
        "hide-desktop":false,
        "count_special_products":8
      },
      "widget_type":"system_widget_v4_special_products_6",
      "data_handle":"block-list-72f6141fd42cd0a900"
    }
  ]
}
````


## Пример файла setup.json

````
{
  "block_lists":{
    "block-list-b3f05b90285e742d00-3":{
      "block_template":"system-text-hex-2",
      "title":"Цвет  стикеров 1",
      "blocks":[
        "tsvet-stikerov-1-3",
        "tsvet-stikerov-2-3"
      ]
    },
    "block-list-social45680201":{
      "block_template":"system-banner-7",
      "title":"Шапка сайта 10",
      "blocks":[
        "social-icon-1-1-075d01201",
        "social-icon-1-4-075d01201",
        "social-icon-1-6-075d01201",
        "social-icon-1-7-075d01201"
      ]
    },
    "block-list-72f6141fd42cd0a900":{
      "block_template":"system-collection",
      "title":"Товары из определенной категории",
      "blocks":[
        "tovary-iz-opredelennoy-kategorii-2-300"
      ]
    },
    "block-list-f063d003ca22b5a7":{
      "block_template":"system-collection-2",
      "title":"Товары из определенной категории с табами",
      "blocks":[
        "tovary-iz-opredelennoy-kategorii-s-tabami-2"
      ]
    }
  },
  "blocks":{
    "social-icon-1-1-075d01201":{
      "block_template":"system-banner-7",
      "title":"Шапка сайта",
      "link":"#",
      "image":"14381710"
    },
    "social-icon-1-4-075d01201":{
      "block_template":"system-banner-7",
      "title":"Шапка сайта",
      "link":"#",
      "image":"14381732"
    },
    "social-icon-1-6-075d01201":{
      "block_template":"system-banner-7",
      "title":"Шапка сайта",
      "link":"#",
      "image":"14381718"
    },
    "social-icon-1-7-075d01201":{
      "block_template":"system-banner-7",
      "title":"Шапка сайта",
      "link":"#",
      "image":"14381722"
    },
    "tsvet-stikerov-1-3":{
      "block_template":"system-text-hex-2",
      "title":"Новинка",
      "name":"Новинка",
      "hex":"#76BC21"
    },
    "tsvet-stikerov-2-3":{
      "block_template":"system-text-hex-2",
      "title":"Распродажа",
      "name":"Распродажа",
      "hex":"#FE7200"
    },
    "tovary-iz-opredelennoy-kategorii-2-300":{
      "block_template":"system-collection",
      "title":"Категория",
      "collection":"all"
    },
    "tovary-iz-opredelennoy-kategorii-s-tabami-2":{
      "block_template":"system-collection-2",
      "title":"Категория",
      "collection":"all",
      "name":"Каталог"
    }
  },
  "theme_widgets":{
    "widget_lists":[
      {
        "handle":"article-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция статьи",
          "en":"Bottom section of the article",
          "ua":"Нижня секція статті",
          "es":"Sección inferior del artículo"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"cart-list",
        "kind":"content",
        "name":{
          "ru":"Корзина",
          "en":"Cart",
          "ua":"Кошик",
          "es":"Carro"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":1,
              "layout-pb":1,
              "hide-mobile":false,
              "hide-desktop":false,
              "button_text":{
                "ru":"Вернуться к покупкам",
                "en":"Back to shopping",
                "ua":"Повернутися до покупок",
                "es":"Volver a las compras"
              }
            },
            "widget_type":"system_widget_v4_back_to_catalog"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":1,
              "layout-pb":1,
              "hide-mobile":false,
              "hide-desktop":false,
              "page_header":{
                "ru":"Корзина",
                "en":"Cart",
                "ua":"Кошик",
                "es":"Cesta"
              },
              "img-ratio":1,
              "img-fit":"contain"
            },
            "widget_type":"system_widget_v4_cart_2"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "count_special_products":8,
              "img-ratio":1,
              "slide-width":"200",
              "slide-width-mobile":120,
              "slide-gap":20,
              "hide-description":true,
              "hide-compare":false,
              "product-desc-limit":10,
              "switch-img-on-hover":false,
              "product-info-accent":"price",
              "img-fit":"contain",
              "sticker-font-size":0.7,
              "product-info-align":"left"
            },
            "widget_type":"system_widget_v4_special_products_6",
            "data_handle":"block-list-72f6141fd42cd0a900"
          }
        ]
      },
      {
        "handle":"page-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция страницы",
          "en":"Top section of the page",
          "ua":"Верхня секція сторінки",
          "es":"Sección superior de la página"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"bottom-panel-list",
        "kind":"bottom_panel",
        "name":{
          "ru":"Нижняя панель",
          "en":"Bottom panel",
          "ua":"Нижня панель",
          "es":"El panel inferior"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-pt":0.5,
              "layout-pb":0.5,
              "hide-mobile":false,
              "hide-desktop":true,
              "bage-bg":"#76BC21",
              "hide-favorites":false,
              "show-catalog-instead-home":false
            },
            "widget_type":"system_widget_v4_bottom_navigation_bar_1"
          }
        ]
      },
      {
        "handle":"index-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция страницы",
          "en":"Top section of the page",
          "ua":"Верхня секція сторінки",
          "es":"Sección superior de la página"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"article-list",
        "kind":"content",
        "name":{
          "ru":"Статья",
          "en":"Article",
          "ua":"Стаття",
          "es":"Artículo"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "article-hide-photo":false,
              "img-border-radius":6,
              "img-ratio":2,
              "article-max-width":850
            },
            "widget_type":"system_widget_v4_article_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "count-special-products":8,
              "img-ratio":1,
              "slide-width":160,
              "slide-width-mobile":130,
              "slide-gap":30,
              "slide-gap-mobile":15,
              "hide-description":true,
              "hide-compare":false,
              "product-desc-limit":10,
              "switch-img-on-hover":false,
              "product-info-accent":"price",
              "img-fit":"contain",
              "sticker-font-size":0.7,
              "product-info-align":"left",
              "title":{
                "ru":"Товары, упомянутые в статье",
                "en":"Products mentioned in the article",
                "ua":"Товари, згадані в статті",
                "es":"Productos mencionados en el artículo"
              },
              "hide-mobile-modal-variants":false
            },
            "widget_type":"system_widget_v4_article_products_5"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "grid-list-min-width":450,
              "grid-list-row-gap":0,
              "grid-list-column-gap":2,
              "title":{
                "ru":"Комментарии",
                "en":"Comments",
                "ua":"Відгуки",
                "es":"Opiniones"
              }
            },
            "widget_type":"system_widget_v4_article_comments_1"
          }
        ]
      },
      {
        "handle":"product-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция страницы товара",
          "en":"Bottom section of the product page",
          "ua":"Нижня секція сторінки товару",
          "es":"Sección inferior de la página del producto"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"collection-list",
        "kind":"content",
        "name":{
          "ru":"Категория",
          "en":"Category",
          "ua":"Категорія",
          "es":"Categoría"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":1.5,
              "layout-pb":0.5,
              "hide-mobile":true,
              "hide-desktop":false
            },
            "widget_type":"system_widget_v4_page_title_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":0,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false,
              "img-ratio":1,
              "catalog-grid-list-min-width":200,
              "catalog-grid-list-min-width-mobile":150,
              "catalog-grid-list-row-gap":2,
              "catalog-grid-list-row-gap-mobile":2,
              "catalog-grid-list-column-gap":2,
              "catalog-grid-list-column-gap-mobile":1,
              "hide-description":true,
              "product-desc-limit":10,
              "switch-img-on-hover":false,
              "product-info-accent":"price",
              "img-fit":"contain",
              "sticker-font-size":0.7,
              "product-info-align":"left"
            },
            "widget_type":"system_widget_v4_catalog_4"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "align":"center"
            },
            "widget_type":"system_widget_v4_pagination_3"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":2,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false
            },
            "widget_type":"system_widget_v4_collection_description_1"
          }
        ]
      },
      {
        "handle":"top-panel-list",
        "kind":"top_panel",
        "name":{
          "ru":"Верхняя панель",
          "en":"Top panel",
          "ua":"Верхня панель",
          "es":"Panel superior"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"cart-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция страницы корзина",
          "en":"Bottom section of the cart page",
          "ua":"Нижня секція сторінки кошик",
          "es":"Sección inferior de la página del carrito"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"compare-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция сравнения",
          "en":"Top section of the comparison page",
          "ua":"Верхня секція порівняння",
          "es":"Sección superior de la página de comparación"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"search-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция поиска",
          "en":"Upper search section",
          "ua":"Верхня секція пошуку",
          "es":"Sección de búsqueda superior"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"compare-list",
        "kind":"content",
        "name":{
          "ru":"Сравнение",
          "en":"Comparison",
          "ua":"Порівняння",
          "es":"Comparación"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":1,
              "layout-pb":1,
              "hide-mobile":false,
              "hide-desktop":false,
              "button_text":{
                "ru":"Вернуться к покупкам",
                "en":"Back to shopping",
                "ua":"Повернутися до покупок",
                "es":"Volver a las compras"
              }
            },
            "widget_type":"system_widget_v4_back_to_catalog"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":1,
              "layout-pb":0,
              "hide-mobile":false,
              "hide-desktop":false,
              "page_heading":{
                "ru":"Сравнение",
                "en":"Compare",
                "ua":"Порівняння",
                "es":"Comparación"
              },
              "img-ratio":1.2,
              "img-fit":"contain",
              "rating-color":"#1B2738"
            },
            "widget_type":"system_widget_v4_compare_2"
          }
        ]
      },
      {
        "handle":"search-list",
        "kind":"content",
        "name":{
          "ru":"Поиск",
          "en":"Search",
          "ua":"Пошук",
          "es":"Búsqueda"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":"1",
              "layout-pb":"1",
              "hide-mobile":false,
              "hide-desktop":false,
              "align":"start",
              "delemeter":"2",
              "bg":"",
              "layout-ege":false,
              "breadcrumb-color":"#333333"
            },
            "widget_type":"system_widget_v4_breadcrumbs_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":1.5,
              "layout-pb":0.5,
              "hide-mobile":false,
              "hide-desktop":false
            },
            "widget_type":"system_widget_v4_page_title_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":2,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false
            },
            "widget_type":"system_widget_v4_search_form_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "img-ratio":1,
              "catalog-grid-list-min-width":200,
              "catalog-grid-list-min-width-mobile":150,
              "catalog-grid-list-row-gap":1,
              "catalog-grid-list-row-gap-mobile":2,
              "catalog-grid-list-column-gap":2,
              "catalog-grid-list-column-gap-mobile":1,
              "hide-description":true,
              "product-desc-limit":10,
              "switch-img-on-hover":false,
              "product-info-accent":"price",
              "img-fit":"contain",
              "sticker-font-size":0.7,
              "product-info-align":"left"
            },
            "widget_type":"system_widget_v4_catalog_4"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "align":"center"
            },
            "widget_type":"system_widget_v4_pagination_3"
          }
        ]
      },
      {
        "handle":"product-list",
        "kind":"content",
        "name":{
          "ru":"Страница товара",
          "en":"Product page",
          "ua":"Сторінка товару",
          "es":"Página del producto"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":0.5,
              "layout-pb":0.5,
              "hide-mobile":false,
              "hide-desktop":false,
              "align":"start",
              "delemeter":"1",
              "bg":"",
              "layout-ege":false,
              "breadcrumb-color":"#333333"
            },
            "widget_type":"system_widget_v4_breadcrumbs_1"
          },
          {
            "settings_data":{
              "layout-pt":1,
              "layout-pb":3,
              "rating-color":"#76BC21",
              "product-hide-compare":true,
              "sale-bg":"#76BC21"
            },
            "widget_type":"system_widget_v4_product_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":2,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false,
              "reviews-min-width":450,
              "reviews-row-gap":0.5,
              "reviews-column-gap":2,
              "img-border-radius":6,
              "rating-color":"#1b2738"
            },
            "widget_type":"system_widget_v4_product_info_2"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "count-special-products":10,
              "img-ratio":1,
              "slide-width":200,
              "slide-width-mobile":130,
              "slide-gap":30,
              "slide-gap-mobile":15,
              "hide-description":true,
              "hide-compare":false,
              "product-desc-limit":10,
              "switch-img-on-hover":false,
              "product-info-accent":"price",
              "img-fit":"contain",
              "sticker-font-size":0.7,
              "product-info-align":"left",
              "title":{
                "ru":"Сопутствующие товары",
                "en":"Related products",
                "ua":"Супутні товари",
                "es":"Productos relacionados"
              },
              "hide-mobile-modal-variants":false
            },
            "widget_type":"system_widget_v4_products_related_5"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "count-special-products":10,
              "img-ratio":1,
              "slide-width":200,
              "slide-width-mobile":130,
              "slide-gap":30,
              "slide-gap-mobile":15,
              "hide-description":true,
              "hide-compare":false,
              "product-desc-limit":10,
              "switch-img-on-hover":false,
              "product-info-accent":"price",
              "img-fit":"contain",
              "sticker-font-size":0.7,
              "product-info-align":"left",
              "title":{
                "ru":"Аналогичные товары",
                "en":"Similar products",
                "ua":"Аналогічні товари",
                "es":"Productos similares"
              },
              "hide-mobile-modal-variants":false
            },
            "widget_type":"system_widget_v4_products_similar_5"
          }
        ]
      },
      {
        "handle":"compare-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция страницы сравнения",
          "en":"Bottom section of the comparison page",
          "ua":"Нижня секція сторінки порівняння",
          "es":"Sección inferior de la página de comparación"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"search-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция страницы поиска",
          "en":"Bottom section of the search page",
          "ua":"Нижня секція сторінки пошуку",
          "es":"Sección inferior de la página de búsqueda"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"index-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция страницы",
          "en":"Bottom section of the page",
          "ua":"Нижня секція сторінки",
          "es":"Sección inferior de la página"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"page-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция страницы",
          "en":"Bottom section of the page",
          "ua":"Нижня секція сторінки",
          "es":"Sección inferior de la página"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"blog-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция страницы блога",
          "en":"Bottom section of the blog page",
          "ua":"Нижня секція сторінки блогу",
          "es":"Sección inferior de la página del blog"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"collection-section_bottom-list",
        "kind":"after_content",
        "name":{
          "ru":"Нижняя секция категории",
          "en":"Bottom section of the category",
          "ua":"Нижня секція категорії",
          "es":"Sección inferior de la categoría"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"cart-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция корзины",
          "en":"Top section of the cart page",
          "ua":"Верхняя секция корзины",
          "es":"Sección superior de la página del carrito"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"article-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция статьи",
          "en":"Top section of the article",
          "ua":"Верхня секція статті",
          "es":"Sección superior del artículo"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"blog-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция блога",
          "en":"Top section of the blog",
          "ua":"Верхня секція блогу",
          "es":"Sección superior del blog"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"page-list",
        "kind":"content",
        "name":{
          "ru":"Страница",
          "en":"Page",
          "ua":"Сторінка",
          "es":"Página"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":"1",
              "layout-pb":"1",
              "hide-mobile":false,
              "hide-desktop":false,
              "align":"start",
              "delemeter":"2",
              "bg":"",
              "layout-ege":false,
              "breadcrumb-color":"#333333"
            },
            "widget_type":"system_widget_v4_breadcrumbs_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":1.5,
              "layout-pb":0.5,
              "hide-mobile":false,
              "hide-desktop":false
            },
            "widget_type":"system_widget_v4_page_title_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":0,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false
            },
            "widget_type":"system_widget_v4_page_content_1"
          }
        ]
      },
      {
        "handle":"blog-list",
        "kind":"content",
        "name":{
          "ru":"Блог",
          "en":"Blog",
          "ua":"Блог",
          "es":"Blog"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":2,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false,
              "tags-background-color":"#fafafa",
              "item-background-color":"",
              "grid-list-row-gap":2,
              "hide-date":false,
              "blog_desc_limit":100,
              "hide-tags":true,
              "hide-description":false,
              "hide-article-tags":true,
              "img-border-radius":6,
              "img-ratio":1.5,
              "widget-heading-ratio":1.5,
              "widget-heading-weight":500
            },
            "widget_type":"system_widget_v4_blog_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "align":"center"
            },
            "widget_type":"system_widget_v4_pagination_3"
          }
        ]
      },
      {
        "handle":"sidebar_collection-list",
        "kind":"sidebar",
        "name":{
          "ru":"Сайдбар",
          "en":"Sidebar",
          "ua":"Сайдбар",
          "es":"Barra lateral"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-pt":0.5,
              "layout-pb":1,
              "hide-mobile":false,
              "hide-desktop":false,
              "hide-sorting-on-desktop":false,
              "hide-sorting-on-mobile":false,
              "hide-heading":true,
              "filter-onchange-submit":true,
              "title":{
                "ru":"Фильтры",
                "en":"Filters",
                "ua":"Фільтри",
                "es":"Filtros"
              }
            },
            "widget_type":"system_widget_v4_sidebar_filter_2"
          }
        ]
      },
      {
        "handle":"favorite-list",
        "kind":"content",
        "name":{
          "ru":"Избранное",
          "en":"Favorites",
          "ua":"Вибране",
          "es":"Favoritos"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":1.5,
              "layout-pb":0.5,
              "hide-mobile":false,
              "hide-desktop":false
            },
            "widget_type":"system_widget_v4_page_title_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":3,
              "hide-mobile":false,
              "hide-desktop":false,
              "img-ratio":1,
              "catalog-grid-list-min-width":200,
              "catalog-grid-list-min-width-mobile":150,
              "catalog-grid-list-row-gap":1,
              "catalog-grid-list-row-gap-mobile":2,
              "catalog-grid-list-column-gap":2,
              "catalog-grid-list-column-gap-mobile":1,
              "hide-description":true,
              "product-desc-limit":10,
              "switch-img-on-hover":false,
              "product-info-accent":"price",
              "img-fit":"contain",
              "sticker-font-size":0.7,
              "product-info-align":"left"
            },
            "widget_type":"system_widget_v4_catalog_4"
          }
        ]
      },
      {
        "handle":"product-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция страницы товара",
          "en":"Top section of product page",
          "ua":"Верхня секція сторінки товару",
          "es":"Sección superior de la página del producto"
        },
        "widgets":[
          
        ]
      },
      {
        "handle":"collection-section_top-list",
        "kind":"before_content",
        "name":{
          "ru":"Верхняя секция категории",
          "en":"Top section of the category",
          "ua":"Верхня секція категорії",
          "es":"Sección superior de la categoría"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":"1",
              "layout-pb":"1",
              "hide-mobile":false,
              "hide-desktop":false,
              "align":"start",
              "delemeter":"1",
              "bg":"",
              "layout-ege":false,
              "breadcrumb-color":"#333333"
            },
            "widget_type":"system_widget_v4_breadcrumbs_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":1.5,
              "layout-pb":0.5,
              "hide-mobile":false,
              "hide-desktop":true
            },
            "widget_type":"system_widget_v4_page_title_1"
          }
        ]
      },
      {
        "handle":"outside-list",
        "kind":"outside",
        "name":{
          "ru":"Вне контента",
          "en":"Outside content",
          "ua":"Поза контенту",
          "es":"Contenido externo"
        },
        "widgets":[
          {
            "widget_type":"system_widget_v4_callback_modal_1"
          },
          {
            "widget_type":"system_widget_v4_preorder_1"
          },
          {
            "widget_type":"system_widget_v4_alerts"
          },
          {
            "settings_data":{
              "layout-pt":3,
              "layout-pb":3,
              "layout-content-max-width":750
            },
            "widget_type":"system_widget_v4_notification_add_to_cart_1"
          },
          {
            "settings_data":{
              "hide-desktop":true,
              "hide-mobile":true,
              "align":"right",
              "size":1.5,
              "margin-top":1,
              "margin-side":1,
              "button-view":"border",
              "button-show":"onscroll",
              "use_widget_border_radius":false,
              "button-border-radius":10
            },
            "widget_type":"system_widget_v4_cart_fixed_button_1"
          },
          {
            "settings_data":{
              "hide-desktop":false,
              "hide-mobile":true,
              "align":"right",
              "size":1.5,
              "icon-view":"icon-arrow-up",
              "margin-bottom":4.5,
              "margin-side":1,
              "button-view":"bg"
            },
            "widget_type":"system_widget_v4_button_on_top_1"
          },
          {
            "settings_data":{
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "layout-pt":3,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false,
              "cookie_show":false,
              "cookie_button_text":{
                "ru":"Понятно",
                "en":"Understand",
                "ua":"Зрозуміло",
                "es":"Entendido"
              }
            },
            "widget_type":"system_widget_v4_modal_cookie_1"
          },
          {
            "settings_data":{
              "sticker-sale":"#e44542",
              "sticker-preorder":"#e44542",
              "sticker-bg-default":"#1b2738"
            },
            "widget_type":"system_widget_v4_stiker_hex_color_2",
            "data_handle":"block-list-b3f05b90285e742d00-3"
          }
        ]
      },
      {
        "handle":"sidebar_blog-list",
        "kind":"sidebar",
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "widgets":[
          
        ]
      },
      {
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "handle":"sidebar_index-list",
        "kind":"sidebar",
        "widgets":[
          
        ]
      },
      {
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "handle":"sidebar_article-list",
        "kind":"sidebar",
        "widgets":[
          
        ]
      },
      {
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "handle":"sidebar_compare-list",
        "kind":"sidebar",
        "widgets":[
          
        ]
      },
      {
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "handle":"sidebar_product-list",
        "kind":"sidebar",
        "widgets":[
          
        ]
      },
      {
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "handle":"sidebar_favorite-list",
        "kind":"sidebar",
        "widgets":[
          
        ]
      },
      {
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "handle":"sidebar_search-list",
        "kind":"sidebar",
        "widgets":[
          
        ]
      },
      {
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "handle":"sidebar_page-list",
        "kind":"sidebar",
        "widgets":[
          
        ]
      },
      {
        "name":{
          "ru":"Сайдбар",
          "ua":"Сайдбар",
          "en":"Sidebar",
          "es":"Barra lateral"
        },
        "handle":"sidebar_cart-list",
        "kind":"sidebar",
        "widgets":[
          
        ]
      },
      {
        "handle":"footer-list",
        "kind":"footer",
        "name":{
          "ru":"Подвал",
          "en":"Footer",
          "ua":"Підвал",
          "es":"Pie de página"
        },
        "widgets":[
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":2,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false,
              "menu_handle":"main-menu"
            },
            "widget_type":"system_widget_v4_footer_2"
          }
        ]
      },
      {
        "handle":"header-list",
        "kind":"header",
        "name":{
          "ru":"Шапка",
          "en":"Header",
          "ua":"Шапка",
          "es":"Encabezamiento"
        },
        "widgets":[
          {
            "settings_data":{
              "logo-max-width":160,
              "layout-pt":1,
              "layout-pb":1,
              "hide-mobile":false,
              "hide-desktop":false,
              "layout-wide-bg":true,
              "layout-wide-content":false,
              "hide-language":false,
              "hide-compare":true,
              "hide-personal":false,
              "menu-1":"main-menu",
              "bage-bg":"#EE632C",
              "catalog-location":"show-immediately",
              "mobile-panel-right-btn":"cart"
            },
            "widget_type":"system_widget_v4_header_11",
            "data_handle":"block-list-social45680201"
          }
        ]
      },
      {
        "handle":"index-list",
        "kind":"content",
        "name":{
          "ru":"Контент",
          "en":"Content",
          "ua":"Контент",
          "es":"Contenido"
        },
        "widgets":[
          {
            "widget_type":"system_widget_v4_special_products_tabs_9",
            "data_handle":"block-list-f063d003ca22b5a7"
          },
          {
            "settings_data":{
              "layout-wide-bg":false,
              "layout-wide-content":false,
              "layout-pt":2,
              "layout-pb":2,
              "hide-mobile":false,
              "hide-desktop":false,
              "hide-title":false,
              "grid-list-min-width":220,
              "grid-list-row-gap":2,
              "grid-list-column-gap":2,
              "subcollection-border-radius":0,
              "text-align":"left",
              "img-ratio":1,
              "img-fit":"cover",
              "card-font-size":20,
              "coll_limit":50
            },
            "widget_type":"system_widget_v4_collections_on_index_1"
          }
        ]
      }
    ],
    "widget_types":[]
  }
}
````