---
seo_title: "setup.json — установка шаблона InSales"
description: "Состав шаблона InSales при установке в config/setup.json: виджет-листы, виджеты, блоки, категории, страницы, меню и свойства магазина."
---

# setup.json

Файл `config/setup.json` задаёт, с чем устанавливается шаблон: виджет-листы, виджеты, блоки, а также категории, страницы, меню, блоги и свойства магазина.

## Виджет-листы

#### Параметры

- `handle` — уникальное имя виджет-листа. По нему список вызывают в Liquid: `widget_lists.<handle>`.
- `kind` — зона в редакторе: `content`, `before_content`, `after_content`, `sidebar`, `header`, `footer`, `outside`, `top_panel`, `bottom_panel`. Какой список попадёт на страницу, решает <a href="/4%20поколение/Шаблон/layout.liquid/">шаблон страницы</a>.
- `name` — название в редакторе. Строка или переводы `ru`, `en`, `ua`, `es`.
- `widgets` — виджеты этого списка.
- `custom_template` — свой шаблон страницы, например `collection.sale` для файла `collection.sale.liquid`.

```json
{
  "handle": "blog-section-top-list",
  "kind": "content",
  "name": {
    "ru": "Верхняя секция блога",
    "en": "Top section of the blog",
    "ua": "Верхня секція блогу",
    "es": "Sección superior del blog"
  },
  "widgets": []
}
```

## Виджеты

#### Параметры

- `widget_type` — пермалинк виджета.
- `settings_data` — настройки при установке. Если не указать, подставятся значения из `settings_data.json` виджета.
- `data_handle` — пермалинк панели блоков. Обязателен для виджета с блоками. Одну панель указывают только у одного виджета.

Объект `theme_widgets` содержит `widget_lists` и `widget_types`. Свои виджеты лежат в папке `widget_types/` архива, поэтому в setup массив `widget_types` обычно пустой.

```json
{
  "handle": "index-list",
  "kind": "content",
  "name": "Главная",
  "widgets": [
    {
      "settings_data": {
        "layout-wide-bg": false,
        "layout-pt": 3,
        "layout-pb": 3,
        "hide-mobile": false,
        "hide-desktop": false
      },
      "widget_type": "system_widget_v4_special_products_6",
      "data_handle": "block-list-special"
    }
  ]
}
```

## Блоки и панели

`blocks` — блоки. `block_lists` — панели, на которые ссылается `data_handle`.

У панели и у каждого её блока один и тот же `block_template`. Готовые шаблоны блоков перечислены в разделе <a href="/4%20поколение/Шаблоны%20блоков/">шаблоны блоков</a>.

Пермалинк панели состоит из строчных латинских букв, цифр, точки и дефиса. Например, `block-list-special`.

```json
{
  "blocks": {
    "special-products": {
      "block_template": "system-collection",
      "title": "Категория",
      "collection": "all"
    }
  },
  "block_lists": {
    "block-list-special": {
      "block_template": "system-collection",
      "title": "Товары из категории",
      "blocks": ["special-products"]
    }
  }
}
```

Поле блока с изображением может ссылаться на файл из `media/`, например `"image": "slide.jpg"`.

## Сущности магазина

Эти разделы создают данные магазина при установке шаблона. Если сущность с таким пермалинком уже есть, повторно она не создаётся.

#### Категории

Ключ — пермалинк, значение — название.

```json
{
  "collections": {
    "sale": "Распродажа"
  }
}
```

#### Страницы

Значение может быть строкой-названием или объектом с `title` и `content`.

```json
{
  "pages": {
    "about": {
      "title": "О магазине",
      "content": "<p>Текст страницы</p>"
    }
  }
}
```

#### Меню и пункты

`menus`: ключ — пермалинк меню, значение — название.

`menu_items`: ключ — пермалинк меню, внутри пары «название пункта» и адрес. Адрес `/collection/all` ведёт на этот URL. Значения `cart` и `account` ставят пункт на корзину и личный кабинет.

```json
{
  "menus": {
    "main-menu": "Главное меню"
  },
  "menu_items": {
    "main-menu": {
      "Каталог": "/collection/all",
      "Корзина": "cart"
    }
  }
}
```

#### Блоги

Ключ — пермалинк блога. В `articles` ключ — пермалинк статьи. У статьи есть `title`, `content`, `preview` и `author`.

```json
{
  "blogs": {
    "news": {
      "title": "Новости",
      "articles": {
        "hello": {
          "title": "Первая новость",
          "content": "<p>Текст</p>",
          "preview": "Анонс"
        }
      }
    }
  }
}
```

#### Параметры

Ключ — пермалинк параметра. Обязательны `title` и `characteristics`: пермалинк значения и его название.

```json
{
  "properties": {
    "color": {
      "title": "Цвет",
      "characteristics": {
        "red": "Красный",
        "blue": "Синий"
      }
    }
  }
}
```

## Пример файла

```json
{
  "collections": {
    "sale": "Распродажа"
  },
  "pages": {
    "about": {
      "title": "О магазине",
      "content": "<p>Текст страницы</p>"
    }
  },
  "menus": {
    "main-menu": "Главное меню"
  },
  "menu_items": {
    "main-menu": {
      "Каталог": "/collection/all",
      "Корзина": "cart"
    }
  },
  "blocks": {
    "special-products": {
      "block_template": "system-collection",
      "title": "Категория",
      "collection": "all"
    }
  },
  "block_lists": {
    "block-list-special": {
      "block_template": "system-collection",
      "title": "Товары из категории",
      "blocks": ["special-products"]
    }
  },
  "theme_widgets": {
    "widget_types": [],
    "widget_lists": [
      {
        "handle": "index-list",
        "kind": "content",
        "name": {
          "ru": "Главная",
          "en": "Home"
        },
        "widgets": [
          {
            "widget_type": "system_widget_v4_special_products_6",
            "data_handle": "block-list-special",
            "settings_data": {
              "hide-mobile": false,
              "hide-desktop": false
            }
          }
        ]
      }
    ]
  }
}
```
