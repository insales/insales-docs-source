# Простой виджет

В данном уроке мы создадим простой виджет (<a href="/4%20поколение/Виджеты/info/#SimpleWidgetType">SimpleWidgetType</a>), который будет содержать текст, изображение и несколько настроек.

#### Шаг 1 (snippet.liquid)

Создаем файл snippet.liquid или мы можем поменять код в редакторе, нажав кнопку "редактировать код". Используем html разметку и liquid код, который отделяется двумя фигурными скобками - `{{ code }}`. В примере ниже мы указываем настройку виджета `widget_settings.banner_name`, слева в редакторе пользователь сможет поменять текст данной настройки. `widget_settings.banner-img` - картинку можно будет заменить через редактор. `{% if widget_settings.banner-img %}` - если картинка загружена, то ширину картинки берем из общих настроек контента в шаблоне `img_width = widget_settings.layout-content-max-width`  
<br>
<a name="snippet_liquid"></a>Пример кода:

```html
<div class="banner-list__item">
  <div class="banner-list__item-title h2">
    {{ widget_settings.banner_name }}
  </div>
  <div class="banner-list__item-image">
    {% if widget_settings.banner-img %}
      {% assign img_width = widget_settings.layout-content-max-width | default: settings.layout-content-max-width | divided_by: 2 %}
      {% if widget_settings.layout-wide-content %}
        {% assign img_width = 1000 %}
      {% endif %}
      <div class="img-ratio">
        <div class="img-ratio__inner">
          <picture>
            <source media="(min-width:769px)" data-srcset="{{ widget_settings.banner-img | image_url: img_width, format: 'webp', resizing_type: 'fit_width', quality: 100 }}" type="image/webp" class="lazyload">
            <source media="(max-width:480px)" data-srcset="{{ widget_settings.banner-img | image_url: 500, format: 'webp', resizing_type: 'fit_width', quality: 100 }}" type="image/webp" class="lazyload">
            <source media="(max-width:768px)" data-srcset="{{ widget_settings.banner-img | image_url: 768, format: 'webp', resizing_type: 'fit_width', quality: 100 }}" type="image/webp" class="lazyload">

            <img data-src="{{ widget_settings.banner-img | image_url: img_width, resizing_type: 'fit_width', quality: 100 }}" class="lazyload">
          </picture>
        </div>
      </div>
    {% endif %}
  </div>
</div>
```

#### Шаг 2 (settings_form.json)

Теперь в файле settings_form.json мы прописываем настройку с полем <a href="/4%20поколение/Виджеты/settings_form/#setting_form_text">типа</a> `text` и поле с настройкой  <a href="/4%20поколение/Виджеты/settings_form/#setting_form_rich_texts">типа</a> `rich-text`. 
`{{ messages.content }}` - Является заголовком группы - "Контент". Настройка `"banner-img"` типа файл, предлагает загрузить пользователю картинку в редакторе. Настройка `"banner-img"` является основной `"general": true`, `"general_position": 1` - будет первой в списке основных настроек. Настройка с именем `"name": "font-size"`, предлагает пользователю выбрать размер текста в редакторе. А настройка `"name": "hide-title"` - предлагает скрыть заголовок в редакторе. Пример:
<a name="settings_form"></a>
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
           "name":"banner-img",
           "label":"{{ messages.picture }}",
           "value":null,
           "type":"file",
           "general": true,
           "help": "{{ messages.recommended_size }}: 915x458 px",
           "general_position": 1
          },
          {
            "class": "range",
            "name": "font-size",
            "label": "{{ messages.font_size }}",
            "min": 14,
            "max" : 24,
            "step": 2,
            "type":"number",
            "with_btns": true,
            "unit": "px",
            "hide_mobile": true
          },
          {
            "class": "checkbox",
            "name": "hide-title",
            "label": "{{ messages.hide_title }}",
            "value": null,
            "type": "checkbox",
            "general": true
          }
        ]
      }
    ]
  }
```

#### Шаг 3 (settings_data.json)

В данном файле мы прописываем значение настроек по умолчанию, они могут быть переведены на другие языки. А размер языка выбираем в 20 пикселей. Заголовок по умолчанию скрывать не будем. Картинка по умолчанию, по id из нашего магазина. Пример:
<a name="settings_data"></a>
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
  },
  "font-size": 20,
  "hide-title": false,
  "banner-img": "14935940"
}

```

#### Шаг 4 (info.json)

- `"generation": 4` - Поколение виджета. Всегда указывается 4, более старые поколения виджетов больше не поддерживаются
- `"type":"SimpleWidgetType"` - Тип виджета без привязки блоков
- `"handle":"banner_with_button_1"` - Папка с виджетом. Главное чтобы имя папки было уникальным, наименование может быть любым, но не начинаться на `system_widget_`
- `"sku":"BB1"` - уникальный ID виджета
- `"page_kinds":["all"]` - виджет будет доступен на всех страницах шаблона, еще варианты страниц можно посмотреть по <a href="/4%20поколение/Виджеты/info/#page_kinds">ссылке</a>
- `"widget_list_kinds":["before_content", "content", "after_content"]` - виджет будет доступен на всех страницах шаблона
- `"widget_category_handle":"banner"` - сортировка виджетов по категориям, в данном случае - Баннеры. Доступные категории можно посмотреть по <a href="/4%20поколение/Виджеты/info/#widget_category_handle">ссылке</a>
- `"name"` - имя виджета
- `"description"` - описание виджета
- `"libraries"` - используемые библиотеки виджета в данном случае - jquery, my-layout, vanilla-lazyload. Список доступных библиотек можно посмотреть по <a href="/4%20поколение/Виджеты/info/#libraries">ссылке</a>
```json
{
  "generation": 4,
  "type":"SimpleWidgetType",
  "handle":"banner_with_button_1",
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

В данном примере реализуем ленивую загрузку изображений с помощью плагина LazyLoad  | <a href="https://github.com/verlok/vanilla-lazyload" target="_blank">Github</a>
<a name="snippet_js"></a>
```js
$widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

```

#### Шаг 7 (snippet.scss)

Пропишем стили виджета и не забудем прописать стили для разных значений настроек
<a name="snippet_scss"></a>
```css
.banner-list__item {
  display: grid;
  grid-template-columns: auto var(--img-size, 50%);
  gap: 1.5em;
  position: relative;
  align-items: var(--align-content, start);
  font-size: var(--font-size, 16px);
  --controls-font-size-m: var(--font-size);
}
&[style*="--hide-title:true;"] .banner-list__item-title {
  display: none;
}

```
#### Шаг 8 (Способы добавления виджета)


- Через панель администратора: 
    * Переходим в панель администратора Вашего сайта -> Настройки -> Настройки сайта -> Виджеты, нажимаем кнопку "Создать".
    * В адресной строке должно быть - Имя_Вашего_Магазина.myinsales.ru/admin2/widget_types/new
    Вводим название - banner_test, описание - banner_descr. 
    * Выбираем категорию - баннеры, тип - простой виджет. Артикул BANNER.1, Идентификатор - BB101, Типы страниц - все. 
    * Типы списков виджетов - основной контент. Во вкладку "СНИППЕТ" добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_liquid">Шаг 1 (snippet.liquid)</a>
    * Далее находим в списке по id - BANNER.1 добавляем содержимое нашего кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_scss">Шаг 7 (snippet.scss)</a> и <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_js">Шаг 6 (snippet.js)</a>. 
    * Выбираем Область применения - Зависимости: jquery, vamilla-lazyload, и сохраняем изменения. 
    * Переходим в наш шаблон, слева в редаторе нажимем кнопк "добавить виджет". В группе "Баннеры", мы увидим наш виджет с именем banner_text. 

- <a name="online"></a>Online, через редактор шаблона. Для этого добавляем виджет в редакторе, включаем "Расширенный  режим настроек", затем "Редактировать код", вставляем необходимый код по нужным нам файлам:
    * HTML - добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_liquid">Шаг 1 (snippet.liquid)</a>
    * SCSS - добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_scss">Шаг 7 (snippet.scss)</a>
    *  JS - добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_js">Шаг 6 (snippet.js)</a>
    * Форма настроек (JSON) - добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#settings_form">Шаг 2 (settings_form.js)</a>
    * Настройки по умолчанию (JSON) -  добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#settings_data">Шаг 3 (settings_data.js)</a>


=== "Online"

    ![](/img/online.jpg)

=== "Через админку"

    ![](/img/widget-admin.jpg)



