# Простой виджет

В данном уроке мы создадим простой виджет (<a href="/4%20поколение/Виджеты/info/#SimpleWidgetType">SimpleWidgetType</a>), который будет содержать текст, изображение и несколько настроек.

#### Шаг 1 (создание виджета)
Создаем виджет в панели администратора:

* Переходим в панель администратора Вашего сайта -> Настройки -> Настройки сайта -> Виджеты. Нажимаем кнопку "Создать".
* В адресной строке должно быть - Имя_Вашего_Магазина.myinsales.ru/admin2/widget_types/new <br>
Выбираем тему в которой будем использовать виджет.
Вводим название: banner_test, описание: banner_descr. 
* Выбираем категорию - баннеры, тип - простой виджет. Артикул: BBT1.1, Идентификатор: banner_test, Типы страниц - все. Типы списков виджетов - основной контент. 
* Нажимаем сохранить и переходим в раздел дизайн и выбираем указанную тему. Нажимаем кнопку "Добавить виджет". Выбираем группу "баннеры" и выбираем виджет с артикулом BBT1.1.
* В левой панели редактора нажимаем кнопку "редактировать код"
* Добавляем код из примеров ниже.

#### Шаг 2. HTML (snippet.liquid)
Редактируем snippet.liquid.

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
`widget_settings.banner_name` - название баннера из настроек виджета <br> 
`{% if widget_settings.banner-img %}` - условие если картинка загружена, то ширину картинки берем из общих настроек контента в шаблоне 
<br>
#### Шаг 3. Форма настроек JSON (settings_form.json)
Редактируем settings_form.json. <br>
Пример:
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
`{{ messages.content }}` - является заголовком группы - "Контент". <br>
`"banner-img"` - типа файл, предлагает загрузить пользователю картинку в редакторе. <br>
`"general": true` - основная настройка. <br>
`"general_position": 1` - порядок в списке основных настроек. <br> 
`"name": "font-size"` - размер текста. <br>
`"name": "hide-title"` - скрыть заголовок в редакторе.

#### Шаг 4. Настройки по умолчанию JSON (settings_data.json)
Редактируем settings_data.json. <br>
Пример:
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
  "hide-title": false
}

```
В данном файле мы прописываем значение настроек по умолчанию, они переведены на другие языки. <br>
`"font-size": 20` - размер языка в 20 пикселей. <br>
`"hide-title": false` - не скрывать заголовок.

#### Шаг 5 (info.json)
Панель администратора -> настройки -> Настройки сайта -> Виджеты, выбираем виджет с артикулом BBT1.1 и нажимаем на иконку карандаша. Подключаем зависимости: jquery, my-layout, vanilla-lazyload.


<!--  Редактируем info.json.  <br>
Пример:
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


#### Шаг 5 (preview.jpg)

Для загрузки превью виджета необходимо добавить в папку виджета два файла с именами:
 
- `preview.jpg` | для десктопной версии устройства
- `mobile_preview.jpg` | для мобильной версии устройства -->


#### Шаг 6. JS (snippet.js)
Редактируем snippet.js. <br>
Пример:

<a name="snippet_js"></a>
```js
$widget.each(function(index, el) {
  new LazyLoad({
    container: $(el).get(0),
    elements_selector: '.lazyload'
  });
});

```
В данном примере реализуем ленивую загрузку изображений с помощью плагина LazyLoad  | <a href="https://github.com/verlok/vanilla-lazyload" target="_blank">Github</a>

#### Шаг 6. SCSS (snippet.scss)

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
<!-- #### Шаг 8 (Способы добавления виджета)


- Через панель администратора: 
    * Переходим в панель администратора Вашего сайта -> Настройки -> Настройки сайта -> Виджеты, нажимаем кнопку "Создать".
    * В адресной строке должно быть - Имя_Вашего_Магазина.myinsales.ru/admin2/widget_types/new
    Вводим название - banner_test, описание - banner_descr. 
    * Выбираем категорию - баннеры, тип - простой виджет. Артикул BBT1.1, название - banner_test, Типы страниц - все. 
    * Типы списков виджетов - основной контент. Во вкладку "СНИППЕТ" добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_liquid">Шаг 1 (snippet.liquid)</a>
    * Форма настроек (JSON) - Во вкладку "Форма настроек" добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#settings_form">Шаг 2 (settings_form)</a>
    * ПЕРЕВОДЫ СООБЩЕНИЙ (JSON) и НАСТРОЙКИ ПО УМОЛЧАНИЮ (JSON). Пропускаем "переводы сообщений" и добавляем содержимое нашего кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#settings_data">Шаг 73 (settings_data.json)</a>
    * Стили. <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_scss">Шаг 7 (snippet.scss)</a> и <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_js">Шаг 6 (snippet.js)</a>. 
    * Выбираем Область применения - Зависимости: jquery, vamilla-lazyload, и сохраняем изменения. 
    * Переходим в наш шаблон, слева в редаторе нажимем кнопк "добавить виджет". В группе "Баннеры", мы увидим наш виджет с именем banner_text. 

- <a name="online"></a>Через редактор шаблона. Для этого добавляем виджет в редакторе, включаем "Расширенный  режим настроек", затем "Редактировать код", вставляем необходимый код по нужным нам файлам:
    * HTML - добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_liquid">Шаг 1 (snippet.liquid)</a>
    * SCSS - добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_scss">Шаг 7 (snippet.scss)</a>
    *  JS - добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#snippet_js">Шаг 6 (snippet.js)</a>
    * Форма настроек (JSON) - добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#settings_form">Шаг 2 (settings_form.js)</a>
    * Настройки по умолчанию (JSON) -  добавляем содержимое пример кода из <a href="/4%20поколение/Виджеты/Примеры/SimpleWidgetType/#settings_data">Шаг 3 (settings_data.js)</a>


=== "Через редактор шаблона"

    ![](/img/online.jpg)

=== "Через админку"

    ![](/img/widget-admin.jpg) -->



