# Виджет с блоками 

В данном уроке мы создадим виджет с блоками (<a href="/4%20поколение/Виджеты/info/#BlockListWidgetType">block_list_widget_type</a>), который будет содержать несколько блоков, внутри которых будут картинка и ссылка, и несколько настроек виджета. В данном виджете мы будем использовать шаблон привязанных блоков - <a href="/4%20поколение/Виджеты/info/#systembanner7">system-banner-7</a>. Поля: Картинка (Файл - image), Ссылка (Универсальная ссылка - link)

#### Шаг 1 (snippet.liquid)

Создаем файл snippet.liquid или мы можем поменять код в редакторе, нажав кнопку "редактировать код". Используем html разметку и liquid код, который отделяется двумя фигурными скобками - `{{ code }}`. В примере ниже мы прописываем класс `grid-list`, внутри `div` мы используем цикл `{% for slide in data.blocks %}`, перебирая блоки `slide`. Затем проверяем не передается ли пустое строковое значение в ссылке блока `slide` - `{% if slide.link != "" %}`. Далее, внутри атрибута `href` мы указываем поле <a href="/4%20поколение/Виджеты/info/#systembanner7">`link`</a> блока `slide` - `{{ slide.link }}`. Когда мы указываем поле ссылка, в редакторе пользователь сможет перейти в параметры блока и указать ссылку самостоятельно. 
Далее проверяем не передается ли пустое значение в картинке блока `slide` - `{% if slide.image %}`. Затем, внутри атрибута `data-src` мы указываем поле <a href="/4%20поколение/Виджеты/info/#systembanner7">`image`</a> блока `slide` - `{{ slide.image }}`. Когда мы указываем поле изображение, в редакторе пользователь сможет перейти в параметры блока и добавить картинку самостоятельно. 

Пример кода:

```html
<div class="banner-list grid-list">
  {% for slide in data.blocks %}
  {% if slide.link != "" %}
  <a href="{{ slide.link }}" class="banner-list__item">
    {% else %}
    <div class="banner-list__item">
      {% endif %}
      <div class="img-ratio img-fit banner-list__item-photo">
        <div class="img-ratio__inner">
          {% assign image_title = slide.name | escape %}
          {% if slide.image %}
              {% assign img_width = 686 %}
              <picture>
                <img data-src="{{ slide.image | image_url: img_width, resizing_type: 'fill-down', quality:100 }}" class="lazyload" alt="{{ image_title }}">
              </picture>
            {% endif %}
        </div>
      </div>
      {% if slide.link != "" %}
  </a>
  {% else %}</div>{% endif %}
  {% endfor %}
</div>
{% assign image_title = null %}
```

#### Шаг 2 (setup.json)
В файле setup мы прописываем количество блоков с параметрами 'image' и 'link', в примере ниже 6 блоков с пустыми ссылками и одинаковым id изображения. В качестве файла указывается id файла из <a target="_blank" href="http://file-store.myinsales.ru/">аккаунта</a>

Пример:
```json
{
  "blocks": [{
      "image": "16779404",
      "link": "#"
    },
    {
      "image": "16779404",
      "link": "#"
    },
    {
      "image": "16779404",
      "link": "#"
    },
    {
      "image": "16779404",
      "link": "#"
    },
    {
      "image": "16779404",
      "link": "#"
    },
    {
      "image": "16779404",
      "link": "#"
    }
  ]
}
```


#### Шаг 3 (settings_form.json)

Теперь в файле settings_form.json мы прописываем настройку с полем <a href="/4%20поколение/Виджеты/settings_form/#setting_form_text">типа</a> `text` и поле с настройкой  <a href="/4%20поколение/Виджеты/settings_form/#setting_form_rich_texts">типа</a> `rich-text`. 
`{{ messages.content }}` - Является заголовком группы - "Контент". Настройка `"banner-img"` типа файл, предлагает загрузить пользователю картинку в редакторе. Настройка `"banner-img"` является основной `"general": true`, `"general_position": 1` - будет первой в списке основных настроек. Настройка с именем `"name": "font-size"`, предлагает пользователю выбрать размер текста в редакторе. А настройка `"name": "hide-title"` - предлагает скрыть заголовок в редакторе. Пример:
```json
{
  "{{ messages.banner }}": [{
    "items": [{
        "class": "range",
        "name": "grid-list-row-gap",
        "min": 0,
        "max": 3,
        "step": 0.5,
        "unit": "rem",
        "label": "{{ messages.vertical_padding_between_blocks }}",
        "type":"number",
          "with_btns": true
      },
      {
        "class": "range",
        "name": "grid-list-column-gap",
        "min": 0,
        "max": 3,
        "step": 0.5,
        "unit": "rem",
        "label": "{{ messages.horizontal_padding_between_blocks }}",
        "type":"number",
        "with_btns": true
      },
  
  "{{ messages.label_widget }}": [{
      "group_name": "{{ messages.background }}",
      "items": [{
          "name": "bg",
          "label": "{{ messages.widget_background_color }}",
          "value": "",
          "type": "color",
          "clearable": true
        }
      ]
    },
    {
      "group_name": "{{ messages.adaptive }}",
      "items": [{
          "class": "checkbox",
          "name": "hide-desktop",
          "label": "{{ messages.hide_desktop }}",
          "value": null,
          "type": "checkbox"
        }
      ]
    }
  ]
}
```
#### Шаг 4 (messages.json)
В файле messages мы прописываем перевод ключа `hide_desktop` из settings_form.json на 4 языках. Более подробно можно почитать <a href="/4%20поколение/Виджеты/messages/">здесь</a>.

Пример:
```json
{
  "ru": {
    "hide_desktop": "Скрыть на десктопе"
  },
  "ua": {
    "hide_desktop": "Сховати на робочому столі"
  },
  "en": {
    "hide_desktop": "Hide on Desktop"
  },
  "es": {
    "hide_desktop": "Para Mostrar u ocultar favoritos, vaya a la configuración de la plantilla y Active favoritos"
  }
}

```
#### Шаг 5 (settings_data.json)

В данном файле мы прописываем значение настроек (settings_form.json), по умолчанию.
`hide-desktop` - скрыть на детскопе, по умолчанию `false`, что означает что мы не скрываем на детскопе наш виджет по умолчанию. `grid-list-row-gap` - отступ по вертикали, в `2` rem.
`grid-list-column-gap` - отступ по горизонтали, в `2` rem. `bg` - цвет фона по умолчанию `"#ffda33"`

Пример:

```json
{
  "hide-desktop": false,
  "grid-list-row-gap": 2,
  "grid-list-column-gap": 2,
  "bg": "#ffda33"
}


```

#### Шаг 6 (info.json)

- `"generation": 4` - Поколение виджета. Всегда указывается 4, более старые поколения виджетов больше не поддерживаются
- `"type":"block_list_widget_type"` - Тип виджета с привязкой блоков
- `"handle":"banner_with_button_1"` - Папка с виджетом. Главное чтобы имя папки было уникальным, наименование может быть любым, но не начинаться на `system_widget_`
- `"sku":"BG10"` - уникальный ID виджета
- `"page_kinds":["all"]` - виджет будет доступен на всех страницах шаблона, еще варианты страниц можно посмотреть по <a href="/4%20поколение/Виджеты/info/#page_kinds">ссылке</a>
- `"widget_list_kinds":["before_content", "content", "after_content"]` - виджет будет доступен на всех страницах шаблона
- `"widget_category_handle":"banner"` - сортировка виджетов по категориям, в данном случае - Баннеры. Доступные категории можно посмотреть по <a href="/4%20поколение/Виджеты/info/#widget_category_handle">ссылке</a>
- `"name"` - имя виджета
- `"description"` - описание виджета
- `"libraries"` - используемые библиотеки виджета в данном случае - jquery, my-layout, vanilla-lazyload. Список доступных библиотек можно посмотреть по <a href="/4%20поколение/Виджеты/info/#libraries">ссылке</a>
```json

{
  "type": "block_list_widget_type",
  "handle": "banner_with_button_1",
  "sku": "BG10",
  "name": {
    "ru": "Группа баннеров в 2 ряда",
    "en": "Group of banners in two rows",
    "ua": "Група банерів в два ряди",
    "es": "Grupo de pancartas en dos filas"
  },
  "description": {
    "ru": "Плитка из баннеров",
    "en": "Banner tile",
    "ua": "Плитка з банерів",
    "es": "Azulejo de banner"
  },
  "page_kinds": ["all"],
  "widget_list_kinds": ["before_content", "content", "after_content"],
  "generation": 4,
  "block_template_handle": "system-banner-7",
  "widget_category_handle": "banner",
  "libraries": [
    "jquery",
    "my-layout",
    "vanilla-lazyload"
  ]
}


```

#### Шаг 7 (preview.jpg)

Для загрузки превью виджета необходимо добавить в папку два файла с именами:
 
- `preview.jpg` | для десктопной версии устройства
- `mobile_preview.jpg` | для мобильной версии устройства

#### Шаг 8 (snippet.js)

В данном примере реализуем ленивую загрузку изображений с помощью плагина LazyLoad  | <a href="https://github.com/verlok/vanilla-lazyload" target="_blank">Github</a>

```js
$widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

```

#### Шаг 9 (snippet.scss)

Пропишем стили виджета и не забудем прописать стили для разных значений настроек. Интегрируем миксин `@include background-color(--bg)` и посмотрим как он работает на практике: 

```css
@include background-color(--bg);

&[style*="--img-fit:contain"] {
  .banner-list__item .img-ratio img {
    object-fit: contain;
  }
}

.banner-list {
  grid-template-columns: repeat(2, 1fr);
}

.banner-list__item {
  grid-column: auto /span 1;
  text-decoration: none;
}

@media screen and (max-width: 767px) {
  .banner-list__item {
    grid-column: auto /span 2;
    text-decoration: none;
  }
}

.banner-list__item {
  .img-ratio img {
    transition: all .5s;
  }
}

.banner-list__item-photo {
  position: relative;
  z-index: 1;
}

```
#### Шаг 10 (Способы добавления виджета)

* Через админку. Переходим в панель администратора -> Настройки -> Настройки сайта -> Виджеты, нажимаем кнопку "Создать". Вводим название - banner_test, описание banner_descr. Выбираем категорию - баннеры, тип - простой виджет. Артикул BANNER.1, Идентификатор - BB101, Типы страниц - все. Типы списков виджетов - основной контент. Далее находим в списке по id - BANNER.1 добавляем содержимое нашего snippet.scss и snippet.js. Выбираем Область применения - Зависимости - jquery, vamilla-lazyload, сохраняем изменения. Переходим в наш шаблон, слева в редакторе нажимаем кнопку "добавить виджет". В группе "Баннеры", мы увидим наш виджет banner_text. 

* Online. Для этого добавляем виджет в редакторе, нажимаем "Расширенный режим настроек", затем "Редактировать код", вставляем необходимый код по нужным нам файлам. 

- HTML - это snippet.liquid
- SCSS - это snippet.scss
- JS - это snippet.js
- Форма настроек (JSON) - это settings_form.js
- Настройки по умолчанию (JSON) - это settings_data.js

=== "Online"

    ![](/img/online.jpg)

=== "Через админку"

    ![](/img/widget-admin.jpg)



