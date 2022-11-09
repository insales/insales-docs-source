# Виджет с блоками 

В данном уроке мы создадим виджет с блоками (<a href="/4%20поколение/Виджеты/info/#BlockListWidgetType">blockListWidgetType</a>), который будет содержать несколько блоков, внутри которых будут картинка и ссылка, и несколько настроек виджета. В данном виджете мы будем использовать шаблон привязанных блоков - <a href="/4%20поколение/Виджеты/info/#systembanner7">system-banner-7</a>. Поля: Картинка (Файл - image), Ссылка (Универсальная ссылка - link)

#### Шаг 1 (создание виджета)
Создаем виджет в панели администратора:

* Переходим в панель администратора Вашего сайта -> Настройки -> Настройки сайта -> Виджеты. Нажимаем кнопку "Создать".
* В адресной строке должно быть - Имя_Вашего_Магазина.myinsales.ru/admin2/widget_types/new <br>
Выбираем тему в которой будем использовать виджет.
Вводим название: banner_test_block, описание: banner_descr_block. 
* Выбираем категорию - баннеры, тип - **Виджет с блоком**. Артикул: BBT1.2, Идентификатор: BB102, Типы страниц - все. Типы списков виджетов - основной контент. Шаблон блока - Универсальная ссылка + Картинка
* Нажимаем сохранить и переходим в раздел дизайн и выбираем указанную тему, нажимаем "редактировать шаблон". В левой панели редактора выбираем "Контент". Нажимаем кнопку "Добавить виджет". Выбираем группу "баннеры" и выбираем виджет с артикулом BBT1.2.
* В левой панели редактора нажимаем кнопку "редактировать код"
* Добавляем код из примеров ниже.

#### Шаг 2. HTML (snippet.liquid)
Редактируем snippet.liquid. <br>

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
`{% for slide in data.blocks %}` - цикл для перебора блоков `slide`. <br> 
`{% if slide.link != "" %}` - проверка передачи пустого строкового значения в ссылке блока `slide`. <br> 
`{{ slide.link }}` - внутри атрибута `href` мы указываем поле <a href="/4%20поколение/Виджеты/info/#systembanner7">`link`</a> блока `slide`. В редакторе будет отображаться пустое поле для ссылки.
<br> 
`{% if slide.image %}` - проверка передачи пустого значения в поле с изображением блока `slide`.
<br> 
`data-src="{{ slide.image }}` - поле <a href="/4%20поколение/Виджеты/info/#systembanner7">`image`</a> блока `slide`. В редакторе будет отображаться поле с загрузкой изображения.


#### Шаг 3. Настройки блоков JSON (setup.json)
В файле setup мы прописываем блоки с параметрами `image` и `link`, в примере ниже 6 блоков с пустыми ссылками и одинаковыми изображениями. 

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


#### Шаг 4. Форма настроек JSON (settings_form.json)
Редактируем settings_form.json. <br>

Пример кода:

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

`{{ messages.content }}` - является заголовком группы - "Контент". <br>
`"banner-img"` - типа файл, предлагает загрузить пользователю картинку в редакторе. <br>
`"general": true` - основная настройка. <br>
`"general_position": 1` - порядок в списке основных настроек. <br> 
`"name": "font-size"` - размер текста. <br>
`"name": "hide-title"` - скрыть заголовок в редакторе.

#### Шаг 5. Переводы сообщений для формы (messages.json)
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
#### Шаг 6  Настройки по умолчанию JSON (settings_data.json)
Редактируем settings_data.json. <br>
Пример:


```json
{
  "hide-desktop": false,
  "grid-list-row-gap": 2,
  "grid-list-column-gap": 2,
  "bg": "#ffda33"
}


```

`hide-desktop` - скрыть на детскопе, по умолчанию `false`, что означает что мы не скрываем на детскопе виджет. <br>
`grid-list-row-gap` - отступ по вертикали, в `2` rem. <br>
`grid-list-column-gap` - отступ по горизонтали, в `2` rem. <br>
`bg` - цвет фона по умолчанию `"#ffda33"`


#### Шаг 7 (info.json)
Панель администратора -> настройки -> Настройки сайта -> Виджеты, выбираем виджет с артикулом BBT1.1 и нажимаем на иконку карандаша. Подключаем зависимости: jquery, my-layout, vanilla-lazyload.

<!-- Редактируем info.json. <br>
Пример:

```json

{
  "type": "blockListWidgetType",
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

- `"generation": 4` - Поколение виджета. Всегда указывается 4, более старые поколения виджетов больше не поддерживаются
- `"type":"blockListWidgetType"` - Тип виджета с привязкой блоков
- `"handle":"banner_with_button_1"` - Папка с виджетом. Главное чтобы имя папки было уникальным, наименование может быть любым, но не начинаться на `system_widget_`
- `"sku":"BG10"` - уникальный ID виджета
- `"page_kinds":["all"]` - виджет будет доступен на всех страницах шаблона, еще варианты страниц можно посмотреть по <a href="/4%20поколение/Виджеты/info/#page_kinds">ссылке</a>
- `"widget_list_kinds":["before_content", "content", "after_content"]` - виджет будет доступен на всех страницах шаблона
- `"widget_category_handle":"banner"` - сортировка виджетов по категориям, в данном случае - Баннеры. Доступные категории можно посмотреть по <a href="/4%20поколение/Виджеты/info/#widget_category_handle">ссылке</a>
- `"name"` - имя виджета
- `"description"` - описание виджета
- `"libraries"` - используемые библиотеки виджета в данном случае - jquery, my-layout, vanilla-lazyload. Список доступных библиотек можно посмотреть по <a href="/4%20поколение/Виджеты/info/#libraries">ссылке</a> 

#### Шаг 7 (preview.jpg)

Для загрузки превью виджета необходимо добавить в папку виджета два файла с именами:
 
- `preview.jpg` | для десктопной версии устройства
- `mobile_preview.jpg` | для мобильной версии устройства
-->
#### Шаг 8. JS (snippet.js)
Редактируем snippet.js. <br>
Пример:


```js
$widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

```
В данном примере реализуем ленивую загрузку изображений с помощью плагина LazyLoad  | <a href="https://github.com/verlok/vanilla-lazyload" target="_blank">Github</a>

#### Шаг 9. SCSS (snippet.scss)

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
<!-- #### Шаг 10 (Способы добавления виджета)

* Через админку. Переходим в панель администратора -> Настройки -> Настройки сайта -> Виджеты, нажимаем кнопку "Создать". Вводим название - banner_test, описание banner_descr. Выбираем категорию - баннеры, тип - простой виджет. Артикул BANNER.1, Идентификатор - BB101, Типы страниц - все. Типы списков виджетов - основной контент. Далее находим в списке по id - BANNER.1 добавляем содержимое нашего snippet.scss и snippet.js. Выбираем Область применения - Зависимости - jquery, vamilla-lazyload, сохраняем изменения. Переходим в наш шаблон, слева в редакторе нажимаем кнопку "добавить виджет". В группе "Баннеры", мы увидим наш виджет banner_text. 

* Через редактор шаблона. Для этого добавляем виджет в редакторе, нажимаем "Расширенный режим настроек", затем "Редактировать код", вставляем необходимый код по нужным нам файлам. 

- HTML - это snippet.liquid
- SCSS - это snippet.scss
- JS - это snippet.js
- Форма настроек (JSON) - это settings_form.js
- Настройки по умолчанию (JSON) - это settings_data.js

=== "Через редактор шаблона"

    ![](/img/online.jpg)

=== "Через админку"

    ![](/img/widget-admin.jpg)
 -->


