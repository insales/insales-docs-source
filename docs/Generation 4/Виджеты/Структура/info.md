# info.json

Метаданные виджета

## generation

Поколение шаблона.

```json
"generation": 4
```

## type

Типы виджетов:
- Без привязки блоков
- С блоками

Значения:

- SimpleWidgetType (виджет без блоков)
- block_list_widget_type (виджет с блоками)

## handle

путь к репе

Значения:

- system_widget_v4_alerts

## sku

Уникальный id

Значения:

- NN1

## page_kinds

Привязка к liquid шаблонам.
```
"page_kinds":["product,collection"]
```
Если указать например "collection" то виджет будет доступен только в шаблоне категории.

Может содержать элементы из следующего списка:

- all - все страницы
- index - главная страница
- collection - страница коллекций 
- product - страница продукта
- cart - страницы корзины
- page
- search  - страницы поиска
- blog - страницы блога
- compare - страница сравнения
- article - страница статьи
- favorite - страница избранного

## widget_list_kinds

Привязка к типу виджетлиста.

Нужен чтобы например в виджетлисте сайдбара не было виджетов шапки/футера.

```
widget_list_kinds":["content", "sidebar"],
```
Может содержать элементы из следующего списка:

- content
- header
- footer
- sidebar
- outside

## widget_category_handle

Категории виджетов, нужна для сортировки виджетов по вкладкам.

- Аналогичные товары | product-similar
- Баннеры	| banner
- Блог	| blog
- Всплывающие окна	| modals
- Другие	| drugie
- Заголовки страниц	| page-title
- Информация о товаре	| product-info
- Карточки товара	| products-cards
- Комментарии	| comments
- Корзина	| cart
- Навигация	| navigation
- Описание категории	| collection-description
- Отзывы	| reviews
- Подвалы	| footers
- Подкатегории	| collection-subcollections
- Преимущества	| benefits
- Разделители	| delimeters
- Результаты поиска	| search-results
- Слайдеры	| sliders
- Сопутствующие товары	| product-related
- Сравнение	| compare
- Тексты и картинки	| text
- Товары в категории	| collection-products
- Товары в сайдбаре	| product-sidebar
- Товары на главной	| product-homepage
- Уведомления	| notices
- Фильтры	| filters
- Формы	| forms
- Шапки	| headers
- Ранее просмотренные товары | recently-viewed
- Избранное | favorites
- Статьи | articles


## block_template_handle

Шаблон привязанных блоков

Пример:
```
{
  "type":"block_list_widget_type",
  "name":"Преимущества - 1",
  "handle":"benefits_1",
  "description":"Преимущества",
  "page_kinds":["all"],
  "widget_list_kinds":["content"],
  "generation":4,
  "block_template_handle": "system-benefit-2",
  "widget_category_handle":"benefits"
}
```

## libraries

Библиотеки виджета

```json
"libraries": [
  "commonjs_v2",
  "jquery",
  "my-layout",
  "swiper"
]
```
