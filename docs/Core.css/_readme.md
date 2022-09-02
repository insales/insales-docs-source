# Вводная

!!! info

    В Core.css прописаны основные стили для сайта где используются css переменные, гриды и прописанные стили для определенных классов. Посмотреть как это работает можно на странице: <a href="https://insales.github.io/my-layout/" target="_blank">  https://insales.github.io/my-layout/</a>


#### COLORS (Цвета)

Ниже прописаны переменные где содержаться цвета которые можно использовать:

```css
  --color-text-light: #fff;
  --color-text-dark: #111;
  --color-text-light-minor-shade: #f7f7f7;
  --color-text-light-major-shade: #ededed;
  --color-text-light-half-shade: #808080;
  --color-text-dark-minor-shade: #474747;
  --color-text-dark-major-shade: #5c5c5c;
  --color-text-dark-half-shade: #999999;
```


#### PAGE LAYOUT

Ниже прописаны переменные для сетки страницы, которые можно использовать:

```css
  --layout-cell-count: 36;
  --layout-cell-main: 38;
  --layout-cell-width: calc(var(--layout-content-max-width) / var(--layout-cell-count));
  --layout-delta: var(--delta_sidebar, 2);
  --initial-sidebar-start: 2;
  --initial-sidebar-end: calc(var(--theme-sidebar-end, 9) + var(--layout-delta));
  --initial-main-start: var(--initial-sidebar-end, 7);
  --initial-main-end: var(--theme-main-end, var(--layout-cell-main));
  --fixed-sidebar-color: var(--theme-fixed-sidebar-color, '#fff');
  --sticky-sidebar-offset: 10px;
  --initial-fixed-sidebar-end: calc(var(--theme-sidebar-fixed-end, 3) + var(--layout-delta));
  --initial-fixed-main-end: calc(var(--theme-sidebar-fixed-end, 3) + var(--layout-delta));
```

#### PAGE LAYOUT

Controls - Кнопки, элементы формы - input, textarea, select.
Специфичные настройки для кнопок - controls-btn-*, для элементов формы - --controls-form-*

```css
  */
  --controls-height-s: 30px;
  --controls-height-m: 40px;
  --controls-height-l: 50px;
  --controls-height-xl: 60px;
  /**/
  --controls-btn-padding-x: 1em;
  --controls-btn-padding-y: 0;
  --controls-btn-border-radius: 0;
  --controls-form-padding-x: 10px;
  --controls-form-padding-y: calc(1em * 0.4);
  --controls-form-border-radius: var(--controls-btn-border-radius, 0);
  /**/
  --controls-font-size-s: calc(var(--font-size) * 0.75);
  --controls-font-size-m: var(--font-size);
  --controls-font-size-l: calc(var(--font-size) * 1.25);
  --controls-font-size-xl: calc(var(--font-size) * 1.5);
  /**/
  --controls-border-width: 1px;
```

#### TEXT 

Controls - Кнопки, элементы формы - input, textarea, select.
Специфичные настройки для кнопок - controls-btn-*, для элементов формы - --controls-form-*

```css
  */
  --controls-height-s: 30px;
  --controls-height-m: 40px;
  --controls-height-l: 50px;
  --controls-height-xl: 60px;
  /**/
  --controls-btn-padding-x: 1em;
  --controls-btn-padding-y: 0;
  --controls-btn-border-radius: 0;
  --controls-form-padding-x: 10px;
  --controls-form-padding-y: calc(1em * 0.4);
  --controls-form-border-radius: var(--controls-btn-border-radius, 0);
  /**/
  --controls-font-size-s: calc(var(--font-size) * 0.75);
  --controls-font-size-m: var(--font-size);
  --controls-font-size-l: calc(var(--font-size) * 1.25);
  --controls-font-size-xl: calc(var(--font-size) * 1.5);
  /**/
  --controls-border-width: 1px;
```








#### Через панель администратора

Заходим в раздел `Настройки -> Виджеты`

Там доступно 2 варианта, создать с нуля или импортировать уже готовый виджет.

При создании нужно будет выбрать тему к которой привяжется виджет.

#### При загрузке шаблона

В директории шаблона, виджеты находятся в папке `widget_types`.

Имя папки виджета должно совпадать с полем `handle` в файле `info.json`.

Запрещено указывать названия с префиксом `system_`.

#### Добавление

Добавить виджет можно 2 способами:

1. Через <a href="/Generation%204/Темы/Структура/setup.json/">setup.json</a>
2. Через интерфейс визуального редактора сайта

#### setup.json

Фрагмент в котором мы добавили виджет с пермалинком `system_widget_v4_promo_slider_4` к виджет-листу `index-list`.

```json
"theme_widgets":{
  "widget_lists":[
    {
      "name":"index",
      "handle":"index-list",
      "kind":"content",
      "widgets": [
        {
          "settings_data":{
            "hide-mobile":false,
            "hide-desktop":false,
            "img-ratio":"3",
            "autoplay":false,
            "autoplay-delay":"5"
          },
          "widget_type":"system_widget_v4_promo_slider_4",
          "data_handle":"block-list-slider"
        }
      ]
    }
  ]
}
```

!!! info

    Виджет-листы требуются для разделения списков на области и страницы.

    Так как список виджетов главной страницы будет отличаться от списка виджетов каталога. И для виджеты основного контента необходимо отделить от виджетов подвала/сайдбара/хедера.
Виджет-листы    
![](/img/info2.svg)

#### Редактор сайта

В редакторе достаточно нажать на кнопку `+`. Будет предоставлен список доступных виджетов.

Разместив виджет на сайте, он автоматически запишется в setup.json при скачивании архива шаблона.

#### Вывод на сайт

Виджет-листы доступны в переменной `widget_lists`.

Пример вывода виджетов из виджет-листа `index-list`:

```liquid
{% for widgetDrop in widget_lists.index-list.widgets %}
  {% widget widgetDrop %}
{% endfor %}
```

Стили и скрипты виджетов выводятся отдельным тегом `widgets_assets`, в качестве параметра указываются названия виджет-листов через запятую.

```liquid
{% widgets_assets "header-list, footer-list, index-list" %}
```
