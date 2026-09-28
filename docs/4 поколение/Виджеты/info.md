---
seo_title: "info.json — метаданные виджета InSales"
description: "Параметры info.json виджета InSales: поколение, тип, артикул, доступность на страницах, категории, шаблоны блоков и зависимости."
---

# info.json  

Метаданные виджета, в которых прописывается: поколение виджета, тип виджета, уникальный артикул, доступность в шаблонах страницы магазина, виджет-лист (раздел виджетов), категории виджетов, используемый шаблон блоков, доступные зависимости (плагины).

#### Поколение виджета

На данный момент используется только виджеты 4 поколения, пример:

```json
"generation": 4
```

#### Типы виджетов: <a name="BlockListWidgetType"></a><a name="SimpleWidgetType"></a>

Без привязки блоков
```json
"type": "SimpleWidgetType"
```
С блоками (необходимо добавить файл <a href="/4%20поколение/Виджеты/setup/">setup.json</a> с указанием параметров блоков). Виджет с блоками позволяет пользователю добавлять блоки и менять их местами через редактор:
```json
"type": "BlockListWidgetType"
```
Шаблон блока — это набор полей с разными типами настроек. Как выбрать или создать шаблон, описано <a href="/4%20поколение/Виджеты/info/#block_templates">ниже</a>.

#### Типы виджетов, примеры:

=== "SimpleWidgetType (виджет без блоков)"

    ![](/img/widget-w-blocks.jpg)

=== "BlockListWidgetType (виджет с блоками)"

    ![](/img/widget-v-blocks.jpg)

#### handle виджета
Виджет лежит в определенной директории. handle виджета должен совпадать с названием папки в которой лежат все файлы виджета. Главное - чтобы имя папки было уникальным, при этом наименование может быть любым.
```json
"handle":"v4_article_products_beauty_article_1"
```

#### Уникальный артикул виджета

У системного виджета (`handle` начинается с `system_`) поле `sku` обязательно. Артикул состоит из заглавных латинских букв и цифр, например `FM1`.

У своего виджета `sku` в `info.json` не указывают. Платформа сама выдаёт артикул в виде `БУКВЫ.число`, например `FM1.1`.

Артикул виден в редакторе шаблона при добавлении виджета.

```json
"sku": "FM1"
```

#### Привязка к типу страницы <a name="page_kinds"></a>

```json
"page_kinds": ["product", "collection"]
```
Если указать, например, `"collection"`, то виджет будет доступен только на странице каталога. Как они выглядят, можно увидеть посередине верхней панели. Там расположен выпадающий список со всеми страницами шаблона. <br>
Доступный список страниц (так мы прописываем `page_kinds` в файле info.json):

- all - все страницы
- index - главная страница
- collection - каталог
- product - карточка товара
- cart - страницы корзины
- page - текстовая страница
- search - страницы поиска
- blog - страницы блога
- compare - страница сравнения
- article - страница статьи
- favorite - страница избранного
- shared_cart - страница общей корзины

#### Области страницы

Привязка к типу <a href="/4%20поколение/Виджеты/#ListWidgetInfo">виджет-листа</a>. Доступные области страницы:

- Верхняя панель - top_panel
- Шапка - header
- Перед контентом - before_content
- Контент - content
- После контента - after_content
- Подвал - footer
- Нижняя панель - bottom_panel
- Вне контента - outside
- Сайдбар - sidebar

Нужен, чтобы виджет выводился в <a href="/4%20поколение/Виджеты/#ListWidgetInfo">виджет-листах</a> "Контент" и "Подвал".

```json
"widget_list_kinds": ["content", "footer"]
```


#### Категории виджетов <a name="widget_category_handle"></a>

Категории виджетов нужны для сортировки виджетов по категориям при добавлении нового виджета. <br>
Например, категория баннеры:

```json
"widget_category_handle":"banner"
```

- Аналогичные товары | product-similar
- Баннеры	| banner
- Блог | blog
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
- Видео | video
- Истории | stories


#### Шаблон привязанных блоков <a name="block_templates"></a>



Внутри блока есть поля настройки, которые можно поменять в редакторе. 
Для каждого набора полей есть свой уникальный шаблон. Можно выбрать существующий, а можно создать свой в панели администратора. 

Нужно перейти в `Настройки -> Настройки сайта -> Шаблоны блоков`. Url - `Имя_вашего_магазина/admin2/block_templates`.
В столбце поля перечислены типы используемых полей. Слева указан идентификатор, который прописывается в значении параметра `block_template_handle`.

```json
"block_template_handle": "system-banner-2"
```
Чтобы создать свой шаблон блока, нужно нажать `добавить`, указать название и идентификатор. Затем нажать на иконку карандаша, чтобы добавить нужные поля. Далее нужно нажать `добавить` под заголовком поля. 
Название на русском, идентификатор латинскими буквами. 
В качестве примера можно создать шаблон блока для изображения со ссылкой. 
Название - баннер. Идентификатор - `banner-image-link`.

|Название|Идентификатор|Тип|
|-|-|-|
|Ссылка|link|Текст|
|Изображение|image|Файл|

Чтобы использовать созданный шаблон блока необходимо указать идентификатор:
```json
"block_template_handle": "banner-image-link"
```

Пример:
```json
{
  "type": "BlockListWidgetType",
  "handle": "system_widget_v4_stories_3",
  "sku": "ES2",
  "page_kinds": [
    "all"
  ],
  "widget_list_kinds": [
    "before_content",
    "content",
    "after_content",
    "footer"
  ],
  "generation": 4,
  "name": {
    "ru": "Истории",
    "en": "Stories",
    "es": "Cuentos"
  },
  "description": {
    "ru": "Истории в виде изображений",
    "en": "Stories as images",
    "es": "Historias como imágenes"
  },
  "widget_category_handle": "stories",
  "libraries": [
    "fslightbox",
    "jquery",
    "splide3",
    "my-layout",
    "vanilla-lazyload"
  ],
  "block_template_handle": "system-image-link-text"
}

```

### Зависимости <a name="libraries"></a>

Библиотеки виджета

```json
"libraries": [
  "commonjs_v2",
  "jquery",
  "my-layout",
  "swiper"
]
```
Доступные зависимости (плагины). Зависимости используются только те, которые установлены на стороне платформы:

- commonjs_v2 - Фреймворк InSales | <a href="https://liquidhub.ru/collection/start" target="_blank">Документация</a> 
- jquery | <a href="https://jquery.com/" target="_blank">Документация</a> 
- microalert	|<a href="https://github.com/VladimirIvanin/microAlert" target="_blank"> Github</a> 
- my-layout	| <a href="https://github.com/insales/my-layout" target="_blank">Github </a> 
- vanilla-lazyload | <a href="https://github.com/verlok/vanilla-lazyload" target="_blank">Github </a>
- splide | <a href="https://splidejs.com/" target="_blank">Документация </a>
- splide3 | <a href="https://splidejs.com/" target="_blank">Документация </a> 
- fslightbox | <a href="https://fslightbox.com/" target="_blank">Документация</a> 
- micromodal | <a href="https://micromodal.vercel.app/" target="_blank">Документация</a>
- body-scroll-lock | <a href="https://www.npmjs.com/package/body-scroll-lock" target="_blank">Документация</a>
- js-cookie | <a href="https://github.com/js-cookie/js-cookie/releases" target="_blank">Документация</a>
- cut-list | <a href="https://github.com/insales/jquery.cut-list" target="_blank">Документация</a>
- nouislider | <a href="https://refreshless.com/nouislider/" target="_blank">Документация</a>
- tvist-v1 - слайдер
- splide-grid - сетка для Splide
- gsap3 | <a href="https://gsap.com/" target="_blank">Документация</a>
- swiper | <a href="https://swiperjs.com/" target="_blank">Документация</a>
- sweetalert2 | <a href="https://sweetalert2.github.io/" target="_blank">Документация</a>
- tingle | <a href="https://tingle.robinparisi.com/" target="_blank">Документация</a>

Версии библиотек задаёт каталог платформы, в `info.json` указывают только handle.