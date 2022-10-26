# Core.css

!!! info

    На каждой странице магазина подключена библиотека стилей Core.css. Мы используем css переменные и гриды. В библиотеке прописаны стили для определенных классов. Посмотреть, как это работает, можно на странице: <a href="https://insales.github.io/my-layout/" target="_blank"> https://insales.github.io/my-layout/</a>. <br>
    Более подробную информацию можно найти на <a href="https://github.com/insales/my-layout/blob/main/dist/css/core-css.css" target="_blank">github</a>. 

#### Сброс стилей CSS

Для сброса стилей css и для улучшения кроссбраузерности в стилях по умолчанию мы используем <a href="https://github.com/necolas/normalize.css" target="_blank">normalize.css</a>

#### Обертка layout 
`layout` - это родительский класс виджета, где в атрибуте `[style]` прописаны настройки в виде css переменных. Класс layout генерируется автоматически и является оберткой любого виджета.
</br></br>
Стандартные настройки для большинства виджетов:

|Css переменные|Настройки виджета|
|-|-|
|`.layout[style*="--bg:#ffffff"]`|`Виджет -> Цвет фона виджета`|
|`.layout[style*="--layout-wide-bg:true"]`|`Виджет -> Растянуть фон`|
|`.layout[style*="--layout-edge:true"]`|`Виджет -> Убрать отступы по краям`|
|`.layout[style*="--hide-mobile:true"]`|`Виджет -> Скрыть на телефоне`|
|`.layout[style*="--hide-desktop:true"]`|`Виджет -> Скрыть на десктопе`|
|`.layout[style*="--bg:"][style*="--layout-wide-bg:true"]`|Мы можем комбинировать настройки. `Виджет -> Цвет фона виджета` и `Виджет -> Растянуть фон`|

Настройки по умолчанию можно прописать в <a href="/4%20поколение/Виджеты/settings_data/" >settings_data</a>

```json

{
  "bg": null,
  "layout-wide-bg": true,
  "layout-wide-content": false,
  "layout-pt": 1,
  "layout-pb": 1,
  "hide-mobile": false,
  "hide-desktop": false,
  "border-size": 3,
  "delimeter-type": "solid"
}

```

#### Контент layout и список блоков 
`layout__content` - это дочерний класс `layout`. Класс layout__content генерируется автоматически и является оберткой контента любого виджета.
</br></br>
`grid-list` готовый класс для верстки списка блоков, написанной на гридах, где:
Css переменные 
```css
--grid-list-min-width: 220
--grid-list-row-gap: 20
--grid-list-column-gap: 20
```

`--grid-list-min-width` минимальная ширина блока, указанная в настройках.</br>
`--grid-list-row-gap` вертикальный отступ между блоками, указанный в настройках.</br>
`--grid-list-column-gap` горизонтальный отступ между блоками, указанный в настройках.

Четыре столбца одинаковой ширины:
```html


<div class="grid-list">  
  <div class="grid-list__item">
    Первый блок магазина
  </div>
  <div class="grid-list__item">
    Второй блок магазина
  </div>
  <div class="grid-list__item">
    Третий блок магазина
  </div>
  <div class="grid-list__item">
    Четвертый блок магазина
  </div>
</div>
```

Четыре столбца одинаковой ширины, растянутые на всю строку:
```html


<div class="grid-list grid-list_wide">  
  <div class="grid-list__item">
    Первый блок магазина
  </div>
  <div class="grid-list__item">
    Второй блок магазина
  </div>
  <div class="grid-list__item">
    Третий блок магазина
  </div>
  <div class="grid-list__item">
    Четвертый блок магазина
  </div>
</div>
```



#### Colors (Цвета)

При изменении цвета фона виджета css переменные со значением цвета будут динамически менять свои значения таким образом, чтобы текст и элементы всегда были видны и оставались в одной палитре цвета с виджетом.


Поле формы и ссылка:
```css
.form-control {
  background-color: var(--bg-minor-shade);
  border-color: var(--bg-minor-shade);
  font-size: var(--controls-font-size-m);
  color: var(--color-text);
}
a {
  color: var(--color-accent-text);
}
```

- Переменные с префиксом `-light` - светлые тона.
- Переменные с префиксом `-dark` - темные тона.
- Переменные с префиксом `-dark-minor` - наименее темные тона.
- Переменные с префиксом `-dark-major` - наиболее темные тона.
```css
  --color-text-light: #fff;
  --color-text-dark: #111;
  --color-text-light-minor-shade: #f7f7f7;
  --color-text-light-major-shade: #ededed;
  --color-text-light-half-shade: #808080;
  --color-text-dark-minor-shade: #474747;
  --color-text-dark-major-shade: #5c5c5c;
  --color-text-dark-half-shade: #999999;
  --bg: #FFFFFF;
  --bg-minor-shade: #f7f7f7;
  --bg-major-shade: #ededed;
  --bg-half-shade: #808080;
```

#### Элементы формы 

Кнопки и элементы формы - input, textarea, select.
Переменные CSS для специфичных настроек кнопок - controls-btn-*, для элементов формы - --controls-form-*

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
Текстовое поле размера s со скругленными углами:
```html

<input type="text" class="form-control form-control_size-s form-control_border-round" name="" value="" placeholder="">

```

Текстовое поле размера m:
```html

<input type="text" class="form-control form-control_size-m" name="" value="" placeholder="">

```
Текстовое поле размера l:
```html

<input type="text" class="form-control form-control_size-l" name="" value="" placeholder="">

```
Текстовое поле размера xl:
```html

<input type="text" class="form-control form-control_size-xl" name="" value="" placeholder="">

```

Текстовое поле размера l растянутое на всю ширину контейнера:
```html

<textarea name="" placeholder="" class="form-control form-control_wide form-control_size-l"></textarea>

```

#### Скрыть элемент 

Чтобы скрыть элемент нужно прописать атрибут `hidden`

```html
<input type="hidden" name="_method" value="put">
```

#### Порядок наложения слоев

Здесь прописаны порядок наложения слоев для всплывающих подсказок (tooltip), фиксированных элементов (zindex-fixed) 

```css
  --zindex-dropdown: 1000;
  --zindex-sticky: 1010;
  --zindex-fixed: 1020;
  --zindex-overlay: 1030;
  --zindex-modal: 1040;
  --zindex-tooltip: 1050;
```

#### Кнопки
Вы можете использовать готовые стили для кнопок с помощью данных классов:

- `.button` - класс для кнопок, где текст располагается по центру
- `.button` и `.button_size-s` - маленький размер кнопки
- `.button` и `.button_size-l`- средний размер кнопки
- `.button` и `.button_size-xl`- большой размер кнопки
- `.button` и `.button_second`- инвертированный цвет кнопки
- `.button` и `.button_wide` - кнопка растянется на всю ширину контейнера
- `.button` и `.button_second` - кнопка с прозрачным фоном

Кнопка размера l:
```html
<button class="button button_size-l" type="submit">Отправить</button>
```
Кнопка размера s со скругленными углами:
```html
<button class="button button_size-l button_border-round" type="submit">Отправить</button>
```
Кнопка размера xl с прозрачным фоном:
```html
<button class="button button_size-xl button_second" type="submit">Отправить</button>
```
Кнопка размера m, растянутая на всю ширину контейнера:
```html
<button class="button button_size-s button_wide" type="submit">Отправить</button>
```

#### Масштаб изображений
Ниже прописаны стили для изображений, чтобы при изменении настройки `Пропорции изображения` (`--img-ratio`) изменялся его масштаб. 
Вы можете использовать готовые стили для разного отображения изображений с помощью данных классов:

- `.img-ratio`- родительский элемент с изображением
- `.img-ratio` и `.img-ratio_cover` - изображение сохраняет пропорции и растягивается на весь блок
- `.img-ratio` и `.img-ratio_contain` - изображение подстраивается под область внутри блока пропорционально собственным параметрам
- `.img-fit` - скрывает содержимое, выходящее за пределы контейнера. 

Изображение растягивается на весь блок.  <br>
Пример разметки:
```html
<div class="img-ratio img-ratio_cover">
  <div class="img-ratio__inner">
    <picture>
      <source media="(min-width:481px)" data-srcset="" type="image/webp" class="lazyload">
      <source media="(max-width:480px)" data-srcset="" type="image/webp" class="lazyload">
      <img data-src="" class="lazyload" alt="{{ img_title }}">
    </picture>
  </div>
</div>
```