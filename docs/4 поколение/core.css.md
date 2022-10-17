# Core.css

!!! info

    На каждой странице магазина подключен набор стилей Core.css. Мы используем css переменные, гриды и прописанные стили для определенных классов. Посмотреть, как это работает, можно на странице: <a href="https://insales.github.io/my-layout/" target="_blank"> https://insales.github.io/my-layout/</a>.
    Более полную информацию можно посмотреть на <a href="https://github.com/insales/my-layout/blob/main/dist/css/core-css.css" target="_blank">github</a>. 


#### page_layout 
`page_layout` - это класс общего контейнера для шапки (header), основной части сайта (main), бокового сайдбара (aside) и футера (footer).
Шаблон делится на секции (<a href="/Generation%204/Виджеты/_readme/#ListWidgetInfo">Виджет-листы</a>). Секциями можно управлять в настройках шаблона или в <a href="/Generation%204/Темы/Структура/setup.json/"> setup.json</a> </br></br>
`page_layout_normal_left` или `page_layout_normal_right` - добавляются к `page_layout` в зависимости от настроек в редакторе.
`Настройки шаблона -> Сайдбар -> Показать сайдбар?`  
`Настройки шаблона -> Сайдбар -> Слева` или `Настройки шаблона -> Сайдбар -> Справа`
`page_layout_section_top` - добавляется к `page_layout` когда мы добавили секцию section_top
`page_layout_sticky_left` или `page_layout_sticky_right` - добавляются к `page_layout` в зависимости от настроек в редакторе.
`Настройки шаблона -> Сайдбар -> Тип сайдбара -> Прилипающий`

```css
.page_layout {
  min-height: calc(var(--vh, 100vh) - var(--fixed-panels-top-offset) - var(--fixed-panels-bottom-offset));
  display: grid;
  grid-column-gap: 0;
  grid-row-gap: 0;
  grid-template-columns: minmax(var(--layout-side-padding), 1fr) repeat(var(--layout-cell-count), minmax(0, var(--layout-cell-width))) minmax(var(--layout-side-padding), 1fr);
  grid-template-areas: "header header" "sidebar main" "footer footer";
  grid-template-rows: minmax(auto, max-content) auto minmax(auto, max-content);
}
@media (max-width: 767px) {
  .page_layout {
    grid-template-areas: "header" "sidebar" "main" "footer";
    grid-template-columns: 100%;
    grid-template-rows: max-content;
  }
}

.page_layout > header {
  grid-area: header;
  grid-column: 1 / -1;
}

.page_layout > main {
  grid-area: main;
  grid-column-start: var(--initial-main-start);
  grid-column-end: var(--initial-main-end);
}

@media (max-width: 767px) {
  .page_layout > main {
    grid-column-start: auto;
    grid-column-end: auto;
  }
}

.page_layout > aside {
  grid-area: sidebar;
  grid-column-start: var(--initial-sidebar-start);
  grid-column-end: var(--initial-sidebar-end);
}

@media (max-width: 767px) {
  .page_layout > aside {
    grid-column-start: auto;
    grid-column-end: auto;
  }
}

.page_layout > footer {
  grid-area: footer;
  grid-column: 1 / -1;
}

.page_layout > .page_section_top {
  grid-area: section-top;
  grid-column: 1 / -1;
}

.page_layout_section_top {
  grid-template-areas: "header header header header" "section-top section-top section-top section-top" ". sidebar main ." "footer footer footer footer";
  grid-template-rows: minmax(auto, max-content) minmax(auto, max-content) auto minmax(auto, max-content);
}

@media (max-width: 767px) {
  .page_layout_section_top {
    grid-template-areas: "header" "section-top" "sidebar" "main" "footer";
    grid-template-columns: 100%;
    grid-template-rows: max-content;
  }
}

@media (min-width: 768px) {
  .page_layout_normal_left > main, .page_layout_sticky_left > main {
    grid-column-start: calc(var(--initial-main-start) + 1);
  }
}

.page_layout_normal_right > main, .page_layout_sticky_right > main {
  grid-column-end: calc(calc(calc(var(--initial-sidebar-end) - var(--layout-cell-main) ) * -1) + 1);
  grid-column-start: 2;
}

@media (max-width: 767px) {
  .page_layout_normal_right > main, .page_layout_sticky_right > main {
    grid-column: 1 / -1;
  }
}

.page_layout_normal_right > aside, .page_layout_sticky_right > aside {
  grid-column-end: var(--layout-cell-main);
  grid-column-start: calc(calc(var(--initial-sidebar-end) - var(--layout-cell-main) - 2) * -1);
}

@media (max-width: 767px) {
  .page_layout_normal_right > aside, .page_layout_sticky_right > aside {
    grid-column: 1 / -1;
  }
}

.page_layout_sticky_left > aside > [data-sidebar], .page_layout_sticky_right > aside > [data-sidebar] {
  position: sticky;
  top: calc(var(--sticky-sidebar-offset, 10px) + var(--fixed-panels-top-offset, 0));
  z-index: var(--zindex-sticky);
}

.page_layout_sticky_left > aside.is-large, .page_layout_sticky_right > aside.is-large {
  display: flex;
  flex-direction: column;
}

.page_layout_sticky_left > aside.is-large:before, .page_layout_sticky_right > aside.is-large:before {
  content: '';
  height: auto;
  display: block;
  flex: 1;
}

.page_layout_sticky_left > aside.is-large > *, .page_layout_sticky_right > aside.is-large > * {
  width: 100%;
  flex: 0 1 auto;
}

.page_layout_sticky_left > aside.is-large > [data-sidebar], .page_layout_sticky_right > aside.is-large > [data-sidebar] {
  top: auto;
  bottom: calc(var(--sticky-sidebar-offset, 10px) + var(--fixed-panels-bottom-offset, 0));
}

.page_layout-clear {
  display: grid;
  grid-column-gap: 1.5rem;
  grid-row-gap: 0;
  min-height: 100vh;
  grid-template-columns: 100%;
  grid-template-rows: minmax(auto, max-content) auto minmax(auto, max-content);
  grid-template-areas: "header" "main" "footer";
}

.page_layout-clear header, .page_layout-clear main, .page_layout-clear aside, .page_layout-clear footer {
  grid-column: auto;
  max-width: 100%;
}

.page_layout-clear aside {
  display: none;
}

.page_layout-clear.page_layout_section_top {
  grid-template-areas: "header" "section-top" "main" "footer";
  grid-template-rows: minmax(auto, max-content) minmax(auto, max-content) auto minmax(auto, max-content);
}
```


#### layout 
`layout` - это родительский класс виджета, где прописаны все настройки в виде css переменных.
</br></br>
`[data-fixed-panels]` атрибут, который прописан у родительского div секции, где содержится виджет лист `Нижняя панель` в редакторе.

`.layout[style*="--bg:"][style*="--layout-wide-bg:true"]` - При выборе настроек `Виджет -> растянуть фон` и `Виджет -> Цвет фона виджета`. Это стандартные настройки для большей части виджетов. 

`.layout[style*="--layout-edge:true"]` - При выборе настроек `Виджет -> Убрать отступы по краям`. Это стандартные настройки для большей части виджетов. 

`.layout[style*="--hide-mobile:true"]` - При выборе настроек `Виджет -> Скрыть на телефоне`. Это стандартные настройки для большей части виджетов. 

`.layout[style*="--hide-desktop:true"]` - При выборе настроек `Виджет -> Скрыть на десктопе`. Это стандартные настройки для большей части виджетов. 

```css
[data-fixed-panels] {
  position: fixed;
  left: 0;
  right: 0;
  z-index: var(--zindex-fixed);
}

[data-fixed-panels="top"] {
  top: 0;
}

[data-fixed-panels="bottom"] {
  bottom: 0;
}

[data-fixed-panels].is-no-layouts {
  position: relative;
}

.layout {
  padding-left: var(--layout-side-padding);
  padding-right: var(--layout-side-padding);
  margin-top: var(--layout-mt);
  margin-bottom: var(--layout-mb);
}

@media screen and (max-width: 767px) {
  .layout {
    --layout-side-padding: var(--layout-side-padding-mobile);
  }
}

.layout[style*="--bg:"] {
  background: transparent;
}

.layout[style*="--bg:"] .layout__content {
  padding-left: var(--layout-side-padding);
  padding-right: var(--layout-side-padding);
}

.layout[style*="--bg:"][style*="--layout-wide-bg:true"] {
  background: var(--bg);
  padding-left: var(--layout-side-padding);
  padding-right: var(--layout-side-padding);
}

.layout[style*="--bg:"][style*="--layout-wide-bg:true"] .layout__content {
  background: transparent;
  padding-left: 0;
  padding-right: 0;
}

.layout[style*="--bg:"][style*="--layout-edge:true"] {
  padding-left: 0;
  padding-right: 0;
}

.layout[style*="--layout-edge:true"] {
  padding-left: 0;
  padding-right: 0;
}

.layout[style*="--layout-edge:true"] .layout__content {
  padding-left: 0;
  padding-right: 0;
}

.layout[style*="--layout-wide-content:true"] .layout__content {
  max-width: 100%;
}

@media screen and (max-width: 767px) {
  .layout {
    margin-top: calc(var(--layout-mt) * var(--layout-adaptive-vertical-indents-factor-decrease));
    margin-bottom: calc(var(--layout-mb) * var(--layout-adaptive-vertical-indents-factor-decrease));
  }
}

@media screen and (max-width: 767px) {
  .layout .layout__content {
    padding-top: calc(var(--layout-pt) * var(--layout-adaptive-vertical-indents-factor-decrease));
    padding-bottom: calc(var(--layout-pb) * var(--layout-adaptive-vertical-indents-factor-decrease));
  }
}

@media screen and (max-width: 767px) {
  .layout[style*="--hide-mobile:true"] {
    display: none !important;
  }
}

@media screen and (min-width: 768px) {
  .layout[style*="--hide-desktop:true"] {
    display: none !important;
  }
}

```

#### layout и grid-column
`layout__content` - это дочерний класс `layout`.
</br></br>
`grid-list` готовый класс для универсальной сетки написанной на гридах, где:

`--grid-list-min-width` это минимальная ширина блока, указанная в настройках.</br>
`--ggrid-list-row-gap` это вертикальный отступ между блоками, указанный в настройках.</br>
`--grid-list-column-gap` это горизонтальный отступ между блоками, указанный в настройках.



```css


.layout__content {
  max-width: var(--layout-content-max-width);
  margin: 0 auto;
  padding-top: var(--layout-pt);
  padding-bottom: var(--layout-pb);
  background: var(--bg);
}

.grid-column {
  display: grid;
  grid-template-columns: repeat(var(--column-count), 1fr);
  grid-template-rows: auto;
  grid-row-gap: var(--grid-column-row-gap);
  grid-column-gap: var(--grid-column-column-gap);
  align-items: self-start;
}

.grid-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(var(--grid-list-min-width), 100%), 1fr));
  grid-template-rows: auto;
  grid-row-gap: var(--grid-list-row-gap);
  grid-column-gap: var(--grid-list-column-gap);
  align-items: self-start;
}

.grid-list.grid-list_items-stretch {
  align-items: stretch;
}
.grid-list.grid-list_wide {
  grid-template-columns: repeat(auto-fit, minmax(min(var(--grid-list-min-width), 100%), 1fr));
}
```



#### Colors (Цвета)

Ниже прописаны css переменные где заданы цвета по умолчанию:

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

#### Controls 

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
Вы можете их переопределить для вашего виджета в `snippet.scss`, пример:
```css
& {
  --controls-height-s: 32px;
  --controls-btn-padding-x: 2em;
  --controls-btn-padding-y: 1em;
}
```

#### Text 

Здесь прописаны шрифты, жирность и высота строки. Вы можете переопределить их. На данный момент настройки будут подтягиваться из настроек редактора. `Настройки шаблона -> Шрифты`

```css
  --font-family-default: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  --font-family: var(--font-family-default);
  --font-family-heading: var(--font-family);
  --font-size: 16px;
  --font-weight: 400;
  --line-height: 1.5;
  --cursor-disabled: not-allowed;
```

#### Z-index 

Здесь прописаны порядок наложения слоев для всплывающих подсказок (tooltip), фиксированных элементов (zindex-fixed) 

```css
  --zindex-dropdown: 1000;
  --zindex-sticky: 1010;
  --zindex-fixed: 1020;
  --zindex-overlay: 1030;
  --zindex-modal: 1040;
  --zindex-tooltip: 1050;
```

#### Transitions

Здесь прописаны значения для свойства `transition` у кнопок и input.

```css
  --btn-transition: color .15s ease-in-out, background .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  --input-transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
```


#### Ключевые стили для фона и текста блока
При изменении цвета фона виджета `Виджет -> Цвет фона виджета`, автоматически в настройках определяется `--bg-is-dark:true` или `--bg-is-light:true`(в атрибуте style у тега html), в зависимости от этого подставляются другие значения в переменных и подбирается цветовая палитра, чтобы видимость элементов на данном фоне сохранялась. 
```css
[style*="--bg:"] {
  background: var(--bg);
}

[style*="--bg-is-dark:true"], [style*="--bg-is-light:false"], [style*="--bg-is-dark: true"], [style*="--bg-is-light: false"] {
  color: var(--color-text-light);
  --color-text: var(--color-text-light);
  --color-text-minor-shade: var(--color-text-light-minor-shade);
  --color-text-major-shade: var(--color-text-light-major-shade);
  --color-text-half-shade: var(--color-text-light-half-shade);
}

[style*="--bg-is-light:true"], [style*="--bg-is-dark:false"], [style*="--bg-is-light: true"], [style*="--bg-is-dark: false"] {
  color: var(--color-text-dark);
  --color-text: var(--color-text-dark);
  --color-text-minor-shade: var(--color-text-dark-minor-shade);
  --color-text-major-shade: var(--color-text-dark-major-shade);
  --color-text-half-shade: var(--color-text-dark-half-shade);
}
```

#### Цвета кнопок
При изменении цвета фона кнопок `Настройки шаблона -> Дизайн -> Цвет кнопок`, автоматически в настройках определяется `--color-btn-bg-is-dark:true` или `--color-btn-bg-is-dark:true`(в атрибуте style у тега html), в зависимости от этого подставляются другие значения в переменных и подбирается цветовая палитра, чтобы видимость элементов на данном фоне сохранялась. 
```css
[style*="--color-btn-bg-is-dark:true"], [style*="--color-btn-bg-is-light:false"], [style*="--color-btn-bg-is-dark: true"], [style*="--color-btn-bg-is-light: false"] {
  --color-btn-color: var(--color-text-light);
  --color-btn-color-minor-shade: var(--color-text-light-minor-shade);
  --color-btn-color-major-shade: var(--color-text-light-major-shade);
  --color-btn-color-half-shade: var(--color-text-light-half-shade);
}

[style*="--color-btn-bg-is-light:true"], [style*="--color-btn-bg-is-dark:false"], [style*="--color-btn-bg-is-light: true"], [style*="--color-btn-bg-is-dark: false"] {
  --color-btn-color: var(--color-text-dark);
  --color-btn-color-minor-shade: var(--color-text-dark-minor-shade);
  --color-btn-color-major-shade: var(--color-text-dark-major-shade);
  --color-btn-color-half-shade: var(--color-text-dark-half-shade);
}
```


#### Кнопки
Вы можете использовать готовые стили для кнопок с помощью данных классов:

- `.button` - класс для кнопок, где текст располагается по центру
- `.button` и `.button_size-s` - маленький размер кнопки
- `.button` и `.button_size-l`- средний размер кнопки
- `.button` и `.button_size-xl`- большой размер кнопки
- `.button` и `.button_second`- инвертированный цвет кнопки
- `.button` и `.button_wide` - кнопка растянется на всю ширину контейнера

```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--controls-height-m);
  max-width: 100%;
  font-family: var(--font-family);
  font-weight: var(--font-weight);
  font-size: var(--controls-font-size-m);
  line-height: 1;
  color: var(--color-btn-color);
  border-radius: var(--controls-btn-border-radius);
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  background: var(--color-btn-bg);
  border: var(--controls-border-width) solid transparent;
  box-shadow: var(--color-btn-shadow);
  padding: var(--controls-btn-padding-y) var(--controls-btn-padding-x);
  outline: none;
  transition: var(--btn-transition);
  /* Button icon */
  /* Button img icon */
}

.button:hover {
  background: var(--color-btn-bg-minor-shade);
  color: var(--color-btn-color);
  border-color: var(--color-btn-bg-minor-shade);
  box-shadow: var(--color-btn-shadow-hover);
  text-decoration: none;
}

.button:focus {
  outline: 0;
  box-shadow: var(--color-btn-shadow, none);
  color: var(--color-btn-color);
}

.button:disabled {
  background: var(--color-btn-bg-disabled) !important;
  color: var(--color-btn-color-disabled) !important;
  border-color: var(--color-btn-bg-disabled) !important;
  box-shadow: none !important;
  cursor: var(--cursor-disabled);
}

.button:not(:disabled):not(.disabled) {
  cursor: pointer;
}

.button:not(:disabled):not(.disabled):active, .button:not(:disabled):not(.disabled).active {
  box-shadow: var(--color-btn-shadow, none);
}

.button:not(:disabled):not(.disabled):active:focus, .button:not(:disabled):not(.disabled).active:focus {
  box-shadow: var(--color-btn-shadow, none);
}

.button.button_size-s {
  height: var(--controls-height-s);
  font-size: var(--controls-font-size-s);
}

.button.button_size-s.button_border-round {
  border-radius: calc(var(--controls-height-s) / 2);
}

.button.button_size-m {
  height: var(--controls-height-m);
  font-size: var(--controls-font-size-m);
}

.button.button_size-m.button_border-round {
  border-radius: calc(var(--controls-height-m) / 2);
}

.button.button_size-l {
  height: var(--controls-height-l);
  font-size: var(--controls-font-size-l);
}

.button.button_size-l.button_border-round {
  border-radius: calc(var(--controls-height-l) / 2);
}

.button.button_size-xl {
  height: var(--controls-height-xl);
  font-size: var(--controls-font-size-xl);
}

.button.button_size-xl.button_border-round {
  border-radius: calc(var(--controls-height-xl) / 2);
}

.button.button_second {
  border-color: var(--color-btn-second-border-color);
  background: var(--color-btn-second-bg);
  color: var(--color-btn-second-color);
  box-shadow: var(--color-btn-second-shadow);
}

.button.button_second:hover {
  background: var(--color-btn-second-bg-hover);
  color: var(--color-btn-second-color-hover);
  border-color: var(--color-btn-second-border-color-hover);
  box-shadow: var(--color-btn-second-shadow-hover);
}

.button.button_second:focus {
  box-shadow: var(--color-btn-second-shadow, none);
}

.button.button_second:disabled {
  background: var(--color-btn-second-bg-disabled) !important;
  color: var(--color-btn-second-color-disabled) !important;
  border-color: var(--color-btn-second-bg-disabled) !important;
}

.button.button_wide {
  width: 100%;
}

.button.button_border-round {
  border-radius: calc(var(--controls-height-m) / 2);
}

.button.button_only-icon {
  width: var(--controls-height-m);
  color: var(--color-text);
  border-radius: 0;
  background: none;
  border: none;
  box-shadow: none;
  padding: 0;
}

.button.button_only-icon:hover {
  background: none;
  color: var(--color-accent-text);
  box-shadow: none;
}

.button.button_only-icon:focus {
  outline: 0;
  box-shadow: none;
  color: var(--color-text);
}

.button.button_only-icon:disabled {
  background: none !important;
  color: var(--color-text-major-shade) !important;
}

.button.button_only-icon.button_size-s {
  width: var(--controls-height-s);
}

.button.button_only-icon.button_size-m {
  width: var(--controls-height-m);
}

.button.button_only-icon.button_size-l {
  width: var(--controls-height-l);
}

.button.button_only-icon.button_size-xl {
  width: var(--controls-height-xl);
}

.button.button_only-icon .button__img-icon {
  margin-right: 0;
}

.button__icon {
  margin-right: 5px;
}

.button__img-icon {
  max-height: 100%;
  margin-right: 5px;
  width: 1.5em;
  height: 1.5em;
}

a.button.disabled,
fieldset:disabled a.button {
  pointer-events: none;
}

.button-link {
  font-weight: var(--font-weight);
  color: var(--color-btn-bg);
  text-decoration: underline;
  cursor: pointer;
}

.button-link:hover {
  color: var(--color-btn-bg);
  text-decoration: none;
}

.button-link:focus, .button-link.focus {
  text-decoration: none;
}

.button-link:disabled, .button-link.disabled {
  color: var(--color-btn-bg);
  pointer-events: none;
  cursor: var(--cursor-disabled);
}
```



#### Input text, textarea, select
Вы можете использовать готовые стили для элементов форма с помощью данных классов:

- `.form-control`- элемент формы (Input text, textarea, select)
- `.form-control` и `.form-control_size-s` - маленький размер элемента
- `.form-control` и `.form-control_size-l`- средний размер элемента
- `.form-control` и `.form-control_size-xl`- большой размер элемента
- `.form-control` и `.form-control_wide` - элемент растянется на всю ширину контейнера

-
```css
.form-control {
  display: inline-block;
  height: var(--controls-height-m);
  padding: var(--controls-form-padding-y) var(--controls-form-padding-x);
  font-family: var(--font-family);
  font-size: var(--controls-font-size-m);
  font-weight: var(--font-weight);
  line-height: var(--line-height);
  color: var(--color-form-controls-color);
  background: var(--color-form-controls-bg);
  border: var(--controls-border-width) solid var(--color-form-controls-border-color);
  border-radius: var(--controls-form-border-radius);
  box-shadow: var(--color-form-controls-shadow);
  outline: 0;
  vertical-align: middle;
  transition: var(--input-transition);
}

.form-control:focus {
  border-color: var(--color-form-controls-border-color-focus);
  outline: 0;
  box-shadow: var(--color-form-controls-shadow-focus);
  color: var(--color-form-controls-color);
}

.form-control:disabled, .form-control[readonly] {
  background: var(--color-form-controls-bg-disabled);
  opacity: 1;
}

.form-control:disabled {
  cursor: var(--cursor-disabled);
}

.form-control::-ms-expand {
  background: transparent;
  background-color: transparent;
  border: 0;
}

.form-control:-moz-focusring {
  text-shadow: 0 0 0 var(--color-dark-text);
}

.form-control::placeholder {
  color: var(--color-form-controls-placeholder);
  opacity: 1;
}

.form-control.form-control_size-s {
  height: var(--controls-height-s);
  font-size: var(--controls-font-size-s);
}

.form-control.form-control_size-s.form-control_border-round {
  border-radius: calc(var(--controls-height-s) / 2);
}

.form-control.form-control_size-m {
  height: var(--controls-height-m);
  font-size: var(--controls-font-size-m);
}

.form-control.form-control_size-m.form-control_border-round {
  border-radius: calc(var(--controls-height-m) / 2);
}

.form-control.form-control_size-l {
  height: var(--controls-height-l);
  font-size: var(--controls-font-size-l);
}

.form-control.form-control_size-l.form-control_border-round {
  border-radius: calc(var(--controls-height-l) / 2);
}

.form-control.form-control_size-xl {
  height: var(--controls-height-xl);
  font-size: var(--controls-font-size-xl);
}

.form-control.form-control_size-xl.form-control_border-round {
  border-radius: calc(var(--controls-height-xl) / 2);
}

.form-control.form-control_border-round {
  border-radius: calc(var(--controls-height-m) / 2);
}

.form-control.form-control_wide {
  width: 100%;
}

input[type="date"].form-control,
input[type="time"].form-control,
input[type="datetime-local"].form-control,
input[type="month"].form-control {
  appearance: none;
}

select.form-control:focus::-ms-value {
  color: var(--color-dark-text);
  background-color: var(--color-form-controls-bg);
}

textarea.form-control {
  height: 100px;
}

/* Form message */
.form-message {
  font-size: calc(var(--font-size) * 0.75);
}

.form-message.form-message_error {
  color: var(--color-error);
}

.form-message.form-message_success {
  color: var(--color-success);
}

```




#### масштаб изображений
Ниже прописаны стили для изображений, чтобы при изменении настройки `Пропорции изображения` (`--img-ratio`) изменялся его масштаб. 
Вы можете использовать готовые стили для разного отображения изображений с помощью данных классов:

- `.img-ratio`- родительский элемент, внутри `img-ratio__inner`, внутри тэг `picture`, внутри которого мы подключаем изображений для разных экранов
- `.img-ratio` и `.img-ratio_cover` - изображение сохраняет пропорции и растягивается на весь блок
- `.img-ratio` и `.img-ratio_contain` - изображение подстраивается под область внутри блока пропорционально собственным параметрам


```css

.img-ratio {
  height: 0;
  position: relative;
  padding-top: calc(100% / (var(--img-ratio, 1)));
}

.img-ratio.img-ratio_cover, .img-ratio.img-ratio_contain, .img-ratio.img-fit {
  overflow: hidden;
}

.img-ratio.img-ratio_cover img, .img-ratio.img-ratio_contain img, .img-ratio.img-fit img {
  height: 100%;
  width: 100%;
  max-width: none;
  max-height: none;
  object-position: 50% 50%;
}

.img-ratio.img-fit img {
  object-fit: var(--img-fit, contain);
}

.img-ratio.img-ratio_cover img {
  object-fit: cover;
}

.img-ratio.img-ratio_contain img {
  object-fit: contain;
}

.img-ratio__inner {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.img-ratio__picture {
  width: 100%;
  height: 100%;
  text-align: center;
  display: block;
}

.img-ratio img {
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
}

[style*="--font-size"] {
  font-size: var(--font-size);
}

```