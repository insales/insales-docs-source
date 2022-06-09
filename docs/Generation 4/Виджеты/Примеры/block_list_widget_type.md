# Простой виджет

В данном уроке мы создадим простой виджет (<a href="/Generation%204/Виджеты/Структура/info/#SimpleWidgetType">SimpleWidgetType</a>), который будет ссодержать текст, изображение и несколько настроек.

#### Шаг 1 (snippet.liquid)

Создаем файл snippet.liquid или мы можем поменять код в редакторе, нажав кнопку "редактировать код". Используем html разметку и liquid код, который отделется двумя фигурными скобками - `{{ code }}`. В примере ниже мы указываем настройку виджета `widget_settings.banner_name`, слева в редакторе пользователь сможет поменять текст данной настройки. Пример кода:

```html
<div class="banner-list__item-title h2">
  {{ widget_settings.banner_name }}
</div>
<div class="banner-list__item-content">
  {{ widget_settings.banner_content }}
</div>
```

#### Шаг 2 (settings_form.json)

Теперь в файле settings_form.json мы прописываем настройку с полем <a href="/Generation%204/Виджеты/Структура/settings_form/#setting_form_text">типа</a> `text` и поле с настройкой  <a href="/Generation%204/Виджеты/Структура/settings_form/#setting_form_rich_texts">типа</a> `rich-text`.
```json
{
    "{{ messages.content }}": [
      {
        "items": [
          {
            "class": "text",
            "name": "banner_name",
            "label": "{{ messages.title }}",
            "value": null,
            "type": "text",
            "general": true
          },
          {
            "name": "banner_content",
            "label": "{{ messages.main_text }}",
            "value": null,
            "type": "rich-text",
            "general": true
          }
        ]
      }
    ]
  }
```

#### Шаг 3 (settings_data.json)

В данном файле мы прописываем значение настроек по умолчанию, они могут быть переведены на другие языки пример:

```json
{
  "banner_name": {
    "ru": "Как подобрать подарок?",
    "en": "How to choose a gift?",
    "ua": "Як підібрати подарунок?ы",
    "es": "¿Cómo recoger un regalo?ы"
  },
  "banner_content": {
    "ru": "Мы сталкиваемся с этим вопросом каждый раз перед праздниками.",
    "en": "We face this question every time before the holidays.",
    "ua": "Ми стикаємося з цим питанням щоразу перед святами.",
    "es": "Nos enfrentamos a esta pregunta cada vez antes de las vacaciones."
  }
}

```

#### Шаг 4 (info.json)

- `"generation": 4` - поколение виджета
- `"type":"SimpleWidgetType"` - Тип виджета без привязки блоков.
- `"handle":"system_widget_v4_page_banner_1"` - Путь к репе
- `"sku":"BB1"` - уникальный ID виджета
- `"page_kinds":["all"]` - виджет будет доступен на всех страницах шаблона, еще варианты страниц можно посмотреть по <a href="/Generation%204/Виджеты/Структура/info/#page_kinds">ссылке</a>.
- `"page_kinds":["all"]` - виджет будет доступен на всех страницах шаблона
- `"widget_list_kinds":["before_content", "content", "after_content"]` - виджет будет доступен на всех страницах шаблона
- `"widget_category_handle":"banner"` - сортировка виджетов по категориям, в данном случае - Баннеры. Доступные категории можно посмотреть по <a href="/Generation%204/Виджеты/Структура/info/#widget_category_handle">ссылке</a>
- `"name"` - имя виджета.
- `"description"` - описание виджета.
- `"libraries"` - используемые библиотеки виджета в данном случае - jquery, my-layout, vanilla-lazyload. Доступные библиотеки можно посмотреть по <a href="/Generation%204/Виджеты/Структура/info/#libraries">ссылке</a>
```json
{
  "generation": 4,
  "type":"SimpleWidgetType",
  "handle":"system_widget_v4_page_banner_1",
  "sku":"BB1",
  "page_kinds":["all"],
  "widget_list_kinds":["before_content", "content", "after_content"],
  "widget_category_handle":"banner",
  "name": {
    "ru": "Баннер с текстом и кнопкой",
    "es": "Banner - 1"
  },
  "description": {
    "ru": "Баннер с текстом и кнопкой",
    "es": "Banner con texto y botón"
  },      
  "libraries": [
    "jquery",
    "my-layout",
    "vanilla-lazyload"
  ]
}

```

#### Шаг 5 (preview.jpg)

Для загрузки превью виджета необходимо добавить в папку два файла с именами:
 
- `preview.jpg` | для десктопной версии устройства
- `mobile_preview.jpg` | для мобильной версии устройства

#### Шаг 6 (snippet.js)

В данном примере реализуем ленивую загруку изображений

```js
$widget.each(function(index, el) {
  new LazyLoad({container: $(el).get(0),
    elements_selector: '.lazyload'});
});
```

#### Шаг 7 (snippet.scss)

Пропишем стили виджета и не забудем прописать стили для разных значений настроек

```css
@include background-color(--bg);
.banner-list__item {
  display: grid;
  grid-template-columns: auto var(--img-size, 50%);
  gap: 1.5em;
  position: relative;
  align-items: var(--align-content, start);
  font-size: var(--font-size, 16px);
  --controls-font-size-m: var(--font-size);
  @media (max-width: 767px) {
    font-size: var(--font-size-mobile, 16px);
    --controls-font-size-m: var(--font-size-mobile, 16px);
  }
  .banner-list__item-text {
    display: grid;
    grid-auto-columns: auto;
    grid-template-rows: min-content min-content min-content;
    gap: 1.5em;
  }
  .banner-list__item-title {
    margin: 0;
    font-size: 1.5em;
  }
  .banner-list__item-image {
    position: relative;
    height: 100%;
    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: var(--img-fit, cover);
    }
  }
  .banner-list__item-content {
    font-size: 1em;
    line-height: 1.5em;
  }
}

&[style*="--img-position:left;"] .banner-list__item-image {
  order: -1;
}
&[style*="--img-position:left;"] .banner-list__item {
  grid-template-columns: var(--img-size, 50%) auto;
}
&[style*="--hide-button:true;"] .banner-list__item-button {
  display: none;
}
&[style*="--hide-button:true;"] .banner-list__item-text {
  grid-template-rows: min-content min-content;
}


@media (max-width: 767px) {
  &[style*="--img-position:left;"] .banner-list__item,
  .banner-list__item {
    grid-template-columns: 100%;
  }
  .banner-list__item-image {
    order: -1;
  }
}

a.no-text {
  background: transparent;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%!important;

  &:hover {
    background: transparent;
    border: none;
  }
}

```
#### Шаг 8 (Способы добавления виджета)

* Архивом
* Online

#### Шаг 9 (Что должно получиться)

=== "SimpleWidgetType (виджет без блоков)"

    ![](/img/widget-w-blocks.jpg)

=== "block_list_widget_type (виджет с блоками)"

    ![](/img/widget-v-blocks.jpg)

