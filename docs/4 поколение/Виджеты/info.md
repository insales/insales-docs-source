# info.json  

Метаданные виджета, в которых прописывается: поколение виджета, тип виджета, id (идентификатор), доступность в шаблонах страницы магазина, виджет-лист (раздел виджетов), категории виджетов, используемый шаблон блоков, доступные зависимости (плагины).

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
С блоками (необходимо добавить файл <a href="/4%20поколение/Виджеты/setup/">setup.json</a> с указанием параметром блоков). Виджет с блоками позволяет пользователю добавлять блоки и менять их местами через редактор:
```json
"type": "blockListWidgetType"
```


#### Типы виджетов, примеры:

=== "SimpleWidgetType (виджет без блоков)"

    ![](/img/widget-w-blocks.jpg)

=== "blockListWidgetType (виджет с блоками)"

    ![](/img/widget-v-blocks.jpg)

#### handle виджета
Виджет лежит в определенной директории. handle виджета должен совпадать с названием папки в которой лежат все файлы виджета. Главное - чтобы имя папки было уникальным, при этом наименование может быть любым.
```json
"handle":"v4_article_products_beauty_article_1"
```

#### Уникальный артикул виджета
Мы придумываем артикул на основе сокращений его названия, `F` - footer, `M` - medium, `1` - первый в группе. Важно проверить, что артикул виджета уникален. Вы можете посмотреть артикул виджета в редакторе шаблона при добавлении. При изменении виджета путем редактирования кода <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#online">online</a> в его артикул добавляется точка (пример `FM1.1`). При добавлении виджета с одинаковым артикулом в наименование добавляется тире `-` (пример `FM1-1` и `FM1-2`).
```json
"sku":"FM1"
```

#### Привязка к типу страницы <a name="page_kinds"></a>

```json
"page_kinds":["product,collection"]
```
Если указать, например, "collection", то виджет будет доступен только на странице каталога. Как они выглядят, можно увидеть посередине верхней панели. Там расположен выпадающий список со всеми страницами шаблона. <br>
Доступный список страниц (то как мы прописываем page_kinds в файле info.json:

- all - все страницы
- index - главная страница
- collection - каталог 
- product - карточка товара
- cart - страницы корзины
- page
- search  - страницы поиска
- blog - страницы блога
- compare - страница сравнения
- article - страница статьи
- favorite - страница избранного

#### Области страницы

Привязка к типу виджет-листа. Доступные области страницы:

- Верхняя панель - top_panel
- Шапка - header
- Контент - content
- Подвал - footer
- Нижняя панель - bottom_panel
- Вне контента - outside
- Сайдбар - sidebar

<span style="text-align:left; display: block;" align="">Виджет-листы</span>    
![](/img/info2.svg)
Нужен чтобы, например, в виджет-листе сайдбара не было виджетов шапки/футера.

```json
"widget_list_kinds":["before_content", "content", "after_content"]
```
Может содержать элементы из следующего списка:


#### Категории виджетов <a name="widget_category_handle"></a>

Категории виджетов нужны для сортировки виджетов по категориям. <br>
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


#### Шаблон привязанных блоков

```json
"block_template_handle": "system-banner-2"
```

Доступные шаблоны блоков:

- `system-banner` | Поля: Название - `name` (тип поля в редакторе - Текст), Изображение - `image` (тип поля в редакторе - Файл), Пропорции - `ratio` (тип поля в редакторе - Выпадающий список), Ссылка - `link` (тип поля в редакторе - Текст)
- `system-banner-2` | Поля: Название - `name` (тип поля в редакторе - Текст), Изображение - `image` (тип поля в редакторе - Файл), Ссылка - `link` (тип поля в редакторе - Текст)
- `system-banner-3` | Поля:  Изображение - `image` (тип поля в редакторе - Файл), Ссылка - `link` (тип поля в редакторе - Текст)
- `system-banner-4` | Поля: Изображение - `image` (тип поля в редакторе - Файл)
- `system-banner-5` | Поля: Изображение - `image` (тип поля в редакторе - Файл), Изображение на мобильном - `image-mobile` (тип поля в редакторе - Файл), Заголовок - `caption` (тип поля в редакторе - (Текст), Название - `name` (тип поля в редакторе - Текст), Текст на кнопке - `link-text` (тип поля в редакторе - Текст), Ссылка - `link` (тип поля в редакторе - Текст)
- `system-banner-6` | Поля:  Изображение - `image` (тип поля в редакторе - Файл), Заголовок - `caption` (тип поля в редакторе - (Текст), Подзаголовок - `subtitle` (тип поля в редакторе - (Текст), Описание - `description` (тип поля в редакторе - HTML), Текст ссылки - `link-text` (тип поля в редакторе - Текст), Ссылка - `link` (тип поля в редакторе - Текст), Выравнивание - `text-align` (тип поля в редакторе - Выпадающий список)
<a name="systembanner7"></a>
- `system-banner-7` | Поля: Изображение - `image` (тип поля в редакторе - Файл),  Ссылка - `link` (тип поля в редакторе - Текст)
- `system-banner-8` | Поля: Название - `name` (тип поля в редакторе - Текст), Изображение - `image` (тип поля в редакторе - Файл), Ссылка - `link` (тип поля в редакторе - Текст)

- `system-banner-block-2` | Поля: Название - `name` (тип поля в редакторе - Текст), Описание - `content` (HTML), Изображение - `image` (тип поля в редакторе - Файл), Ссылка - `link` (Универсальная ссылка), Текст ссылки - `button_text` (Текст)
- `system-banner-block-3` | Поля: Название - `name` (тип поля в редакторе - Текст), Описание - `content` (HTML), Карта - `map` (Текст)
- `system-banner-image-text` | Поля: Изображение - `image` (тип поля в редакторе - Файл), Положение изображения - `image_position` (Выпадающий список), Ссылка на изображение - `link_image` (Текст), Текст - `content` (HTML)
- `system-banner-mansonry` | Поля: Название - `name` (тип поля в редакторе - Текст), Контент - `content` (HTML), Ссылка - `link` (тип поля в редакторе - Текст), Изображение - `image` (Файл), Соотношение сторон - `ratio` (Высота / Ширина) (Выпадающий список)
- `system-banner-video` <a name="blocks_example"></a> | Поля: Ссылка - `link` (тип поля в редакторе - Текст), Заставка - `image` (Файл)
- `system-banner-video-2` | Поля: Ссылка - `link` (Универсальная ссылка), Заставка - `image` (Файл)
- `system-benefit` | Поля: Описание - `description` (Текст), Изображение - `image` (тип поля в редакторе - Файл)
- `system-benefit-2` | Поля: Заголовок - `name` (Текст), Описание - `description` (HTML), Изображение - `image` (тип поля в редакторе - Файл)
- `system-collection` | Поля: Категория - `name` (Категория)
- `system-collection-2` | Поля: Название вкладки - `name` (Текст), Категория - `collection` (Категория)
- `system-collection-3` | Поля: Категория - `collection` (Категория), Заголовок - `name` (Текст), Изображение - `image` (тип поля в редакторе - Файл)
- `system-collection-4` | Поля: Категория - `collection` (Категория), Изображение - `image` (тип поля в редакторе - Файл)
- `system-collection-5` | Поля: Товар - `product` (Товар), Расположение по горизонтали - `	raspolozhenie-po-gorizontali` (Число из диапазона с полем ввода), Расположение по вертикали - `raspolozhenie-po-vertikali` (Число из диапазона с полем ввода), Скрывать цену - `skryvat-tsenu` (Чекбокс), Скрывать название - `skryvat-nazvanie` (Чекбокс), Скрывать изображение - `skryvat-kartinku` (Чекбокс)
- `system-collection-with-description` | Поля: Коллекция - `collection` (Категория), Описание - `description` (HTML)

- `system-custom-block` | Поля: Контент - `content` (HTML), Фон - `theme` (Выпадающий список), Ширина блока - `cells` (Выпадающий список), Ширина блока на планшете - `cells_sm` (Выпадающий список), Ширина блока на телефоне - `cells_xs` (Выпадающий список), Вертикальное выравнивание внутри блока - `align_self` (Выпадающий список), Вертикальный отступ блока - `padding_y` (Выпадающий список), Горизонтальный отступ блока - `padding_x` (Выпадающий список), Скругление углов - `border_radius` (Выпадающий список)  

- `system-element-header` | Поля: Элемент - `element` (Выпадающий список), Ширина блока [десктоп] - `	cell_desktop` (Выпадающий список), Выравнивание - `align_desktop` [десктоп] (Выпадающий список), Скрыть - `hide_desktop` [десктоп] (Чекбокс), Ширина блока - `cell_tablet` [планшет] (Выпадающий список), Выравнивание - `align_tablet` [планшет] (Выпадающий список), Скрыть - `hide_tablet` [планшет] (Чекбокс), Ширина блока - `cell_phone` [телефон] (Выпадающий список), Выравнивание - `align_phone` [телефон] (Выпадающий список), Скрыть - `hide_phone` [телефон] (Чекбокс), Контент для элемента "Текст" - `content` (HTML)

- `system-faq` | Поля: Вопрос - `question` (Текст), Ответ - `answer` (HTML)

- `system-faq-2` | Поля: 	Вопрос - `question` (Текст), Ответ - `answer` (HTML)
- `system-form-constructor` | Поля: Название - `name` (тип поля в редакторе - Текст), Тип поля - `type` (Выпадающий список), Значения - `type` (через запятую) (Только для групп чекбоксов, радио и списка) (Текст), Обязательное поле - `required` (Чекбокс)

- `system-form-constructor-2` | Поля: Тип поля- `type` (Выпадающий список), Ширина поля- `cells`(Выпадающий список), Название - `label` (тип поля в редакторе - Текст), Подсказка - `placeholder` (только для текста и текстовая область) (Текст), Значения - `values` (через запятую) (Только для групп чекбоксов, радио и списка) (Текст), Обязательное поле - `required` (Чекбокс)

- `system-form-constructor-3` | Поля: Тип поля - `type` (Выпадающий список), Название - `label` (тип поля в редакторе - Текст), Обязательное поле - `required` (Чекбокс)

- `system-image` | Поля: Название - `name` (тип поля в редакторе - Текст), Изображение - `image` (Файл)

- `system-image-and-content` | Поля: Вертикальная позиция изображения - `vertical_position` (Выпадающий список), Скрыть изображение? - `hide_image` (Чекбокс), Текст - `content` (HTML), Горизонтальная позиция изображения - `horizontal_position` (Выпадающий список), Изображение - `image` (тип поля в редакторе - Файл)

- `system-image-link-text` | Поля: Изображение - `image` (тип поля в редакторе - Файл), Кнопка - `link` (Текст), Текст кнопки - `link_text` (Текст)
- `system-image_text` | Поля: Текст - `text` (HTML), Изображение - `image` (Файл)
- `system-image-text-button-icon` | Поля: Название - `name` (тип поля в редакторе - Текст), Описание - `content` (HTML), Изображение - `image` (тип поля в редакторе - Файл), Ссылка - `link` (тип поля в редакторе - Текст), Текст кнопки - `button_text` (Текст), Иконка - `icon` (Файл)
- `system-messenger` | Поля: Заголовок - `caption` (Текст), Иконка - `icons` (Выпадающий список), Ссылка - `link` (тип поля в редакторе - Текст), Цвет - `color` (Текст)
- `system-messengers` | Поля: Заголовок - `caption` (Текст), Иконка - `icons` (Выпадающий список), Ссылка - `link` (тип поля в редакторе - Текст), Цвет- `color` (Цвет)
- `system-payments` | Поля: Ссылка - `link` (Текст)
- `system-payments-prime` | Поля: Иконка - `image` (Файл), Название - `name` (title) (Текст)
- `system-payments-social` | Поля: Название - `name` (тип поля в редакторе - Текст), Иконка - `image` (Файл), Тип - `type` (Выпадающий список), Ссылка - `link` (тип поля в редакторе - Текст)
- `system-personal` | Поля: Изображение - `image` (тип поля в редакторе - Файл), Описание - `description` (HTML), Подзаголовок - `subtitle` (Текст), Заголовок - `name` (Текст)
- `system-promo-slide` | Поля: Описание - `description` (Текст), Изображение - `image` (тип поля в редакторе - Файл), Ссылка - `link` (Текст)
- `system-promo-slide-2` | Поля: Описание - `description` (Текст), Изображение - `image` (тип поля в редакторе - Файл), Ссылка - `link` (Универсальная ссылка)
- `system-promo-slider-2` | Поля: Заголовок - `name` (Текст), Описание - `description` (Текст), Ссылка - `link` (тип поля в редакторе - Текст), Изображение - `image` (Файл), Надпись на кнопке - `button_title` (Текст)
- `system-promo-slider-3` | Поля: Надпись на кнопке - `button_title` (Текст), Изображение для мобильных устройств - `image_mobile` (Файл), Изображение - `image` (тип поля в редакторе - Файл), Ссылка - `link` (тип поля в редакторе - Текст), Описание - `description` (Текст), Заголовок - `name` (Текст)
- `system-promo-slider-4` | Поля: Описание - `description` (Текст), Заголовок - `name` (Текст), Ссылка - `link` (тип поля в редакторе - Текст), Изображение - `image` (Файл)
- `system-promo-slider-5` | Поля: Заголовок - `name` (Текст), Описание - `description` (Текст), Ссылка - `link` (Универсальная ссылка), Изображение - `image` (Файл), Надпись на кнопке - `button_title` (Текст)
- `system-promo-slider-6` | Поля: Изображение - `image` (тип поля в редакторе - Файл), Изображение для мобильных устройств - `image_mobile` (Файл), Заголовок - `name` (Текст), Описание - `description` (Текст), Ссылка - `link` (Универсальная ссылка), Надпись на кнопке - `button_title` (Текст)
- `system-promo-slider-7` | Поля: Описание - `description` (Текст), Заголовок - `name` (Текст), Ссылка - `link` (Универсальная ссылка), Изображение - `image` (Файл)
- `system-promo-slider-8` | Поля: Изображение - `image` (тип поля в редакторе - Файл), Изображение для мобильных устройств - `image_mobile` (Файл), Заголовок - `name` (Текст), Описание - `description` (Текст), Ссылка - `link` (Универсальная ссылка)
- `system-review` | Поля: Скрыть изображение? - `hide_image` (Чекбокс), Текст - `content` (HTML), Имя - `name` (Текст), Позиция изображения - `image_position` (Выпадающий список), Изображение - `image` (тип поля в редакторе - Файл)
- `system-review-2` | Поля: Скрыть изображение? - `hide_image` (Чекбокс), Имя - `name` (Текст), Текст - `content` (HTML), Изображение - `image` (Файл)
- `system-review-4` | Поля: Заголовок - `name` (Текст), Подзаголовок - `company` (Текст), Текст - `content` (HTML), Изображение - `image` (тип поля в редакторе - Файл), Скрыть изображение? - `hide_image` (Чекбокс)
- `system-review-shop` | Поля: Имя  - `name`(Текст), Текст - `content` (HTML), Рейтинг - `rating` (Число из диапазона со слайдером), Дата - `date` (Текст), Изображение - `image` (тип поля в редакторе - Файл), Скрыть изображение? - `hide_image` (Чекбокс)
- `system-review-social` | Поля: Ссылка - `link` (тип поля в редакторе - Текст)
- `system-social-2` | Поля: Иконка - `icons` (Выпадающий список), Ссылка - `link` (тип поля в редакторе - Текст)
- `system-special_products` | Поля: Заголовок - `name` (Текст), Категория - `collection` (Категория)
- `system-text-column` | Поля: Контент - `content` (HTML)
- `system-text-hex` | Поля: Название - `name` (тип поля в редакторе - Текст), Цвет - `hex` (hex формат) (Текст)
- `system-text-hex-2` | Поля: Название - `name` (тип поля в редакторе - Текст), Цвет - `hex` (Цвет)
- `system-text-link` | Поля: Текст - `text` (Текст), Ссылка - `link` (Универсальная ссылка)
- `system-title-and-content` | Поля: Содержание - `content` (HTML)
- `system-widget-feedback` | Поля: Текст на кнопке - `submit-text` (Текст)

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
- cut-list | <a href=" https://github.com/insales/jquery.cut-list" target="_blank">Документация</a>
- nouislider | <a href=" https://refreshless.com/nouislider/" target="_blank">Документация</a>