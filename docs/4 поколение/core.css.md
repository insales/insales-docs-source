---
seo_title: "Core.css — стили шаблонов InSales"
description: "Библиотека Core.css в шаблонах InSales: CSS-переменные, сетки, типографика, кнопки и классы для оформления страниц магазина."
---

# Core.css

!!! info

    На каждой странице магазина подключена библиотека стилей Core.css. Мы используем CSS-переменные и гриды. В библиотеке прописаны стили для определённых классов. Посмотреть, как это работает, можно на странице: <a href="https://insales.github.io/my-layout/" target="_blank">https://insales.github.io/my-layout/</a>. <br>
    Исходник библиотеки: <a href="https://github.com/insales/my-layout/blob/main/dist/styles/core-css.css" target="_blank">dist/styles/core-css.css</a>.

#### Сброс стилей CSS

Для сброса стилей CSS и для улучшения кроссбраузерности в стилях по умолчанию мы используем <a href="https://github.com/necolas/normalize.css" target="_blank">normalize.css</a>.

#### Обёртка layout

`layout` — родительский класс виджета. Платформа генерирует его автоматически и оборачивает им любой виджет. Настройки виджета типов color, checkbox, number и других, которые попадают в CSS, записываются в атрибут `style` этой обёртки. Как настройки становятся переменными, описано в <a href="/4%20поколение/Виджеты/snippet.scss/#css-variables">snippet.scss</a>.

`layout__content` — дочерний класс `layout`. Платформа генерирует его автоматически: это обёртка контента виджета. У контента максимальная ширина `--layout-content-max-width` (по умолчанию `1200px`), фон `--bg` и вертикальные отступы `--layout-pt` и `--layout-pb`.

```html
<div class="layout" style="--bg:#ffffff; --bg-is-light:true; --layout-wide-bg:true; --layout-wide-content:false; --layout-edge:false; --layout-pt:2vw; --layout-pb:2vw; --hide-mobile:false; --hide-desktop:false;">
  <div class="layout__content"></div>
</div>
```

|CSS-переменная|Настройка виджета|
|-|-|
|`--bg`|`Виджет -> Цвет фона виджета`|
|`--layout-wide-bg`|`Виджет -> Растянуть фон`|
|`--layout-wide-content`|`Виджет -> Растянуть контент`|
|`--layout-edge`|`Виджет -> Убрать отступы по краям`|
|`--layout-pt`|`Виджет -> Отступ сверху`|
|`--layout-pb`|`Виджет -> Отступ снизу`|
|`--hide-mobile`|`Виджет -> Скрыть на телефоне`|
|`--hide-desktop`|`Виджет -> Скрыть на десктопе`|

`--layout-wide-bg:true` красит фоном всю ширину обёртки `.layout`. `--layout-wide-content:true` снимает ограничение ширины контента. `--layout-edge:true` убирает боковые отступы. `--hide-mobile:true` скрывает виджет на экране до 767px, `--hide-desktop:true` — от 768px.

Значения по умолчанию задают в <a href="/4%20поколение/Виджеты/settings_data/">settings_data</a>:

```json
{
  "bg": null,
  "layout-wide-bg": true,
  "layout-wide-content": false,
  "layout-edge": false,
  "layout-pt": 1,
  "layout-pb": 1,
  "hide-mobile": false,
  "hide-desktop": false
}
```

#### Список блоков

`grid-list` — готовая сетка на CSS Grid. Число колонок подстраивается под ширину контейнера: колонка не уже `--grid-list-min-width` и не шире доступного места.

В библиотеке по умолчанию:

```css
--grid-list-min-width: 300px;
--grid-list-row-gap: 3rem;
--grid-list-column-gap: 3rem;
```

`--grid-list-min-width` — минимальная ширина колонки. `--grid-list-row-gap` — вертикальный отступ между блоками. `--grid-list-column-gap` — горизонтальный отступ.

В виджете эти значения обычно переопределяют. Частый вариант — колонка от 220px и отступы в `rem`:

```scss
& {
  --grid-list-min-width: 220px;
  --grid-list-row-gap: 1rem;
  --grid-list-column-gap: 1rem;
}
```

Стили сетки заданы у `.grid-list`. Дочерний блок может иметь любой класс.

Сетка с колонками одинаковой ширины:

```html
<div class="grid-list">
  <div>Первый блок</div>
  <div>Второй блок</div>
  <div>Третий блок</div>
  <div>Четвёртый блок</div>
</div>
```

`grid-list_wide` делит всю ширину строки между колонками.

```html
<div class="grid-list grid-list_wide">
  <div>Первый блок</div>
  <div>Второй блок</div>
  <div>Третий блок</div>
  <div>Четвёртый блок</div>
</div>
```

`grid-list_items-stretch` выравнивает элементы сетки по высоте строки.

#### Заголовки

Заголовок виджета оформляют классом `heading`. Размер считается от базового шрифта и коэффициента `--heading-ratio` (по умолчанию `2`). На экране до 767px размер уменьшается на четверть. Насыщенность задаёт `--heading-weight` (по умолчанию `700`).

```html
<div class="heading">Заголовок</div>
```

```css
font-size: calc(var(--font-size) * var(--heading-ratio, 2));
font-weight: var(--heading-weight, 700);
```

Отдельные масштабы заданы у тегов `h1`–`h6` и классов `.h1`–`.h6`. У `.h1` множитель `2.5`, у `.h2` — `2`, дальше шаг уменьшается до `.h6`, который равен `--font-size`. На узком экране у этих классов свои уменьшенные множители.

#### Текст из редактора

Класс `static-text` ставят на блок с HTML из редактора. Картинки и iframe внутри него ограничены шириной контейнера, у картинки высота подстраивается под ширину.

```html
<div class="static-text">
  {{ content }}
</div>
```

#### Цвета

При смене цвета фона платформа дописывает в `style` признак светлого или тёмного фона и оттенки. Подробнее — в <a href="/4%20поколение/Виджеты/snippet.scss/#css-variables">snippet.scss</a>.

У светлого фона в `style` есть `--bg-is-light:true`. Тогда `--color-text` берётся из `--color-text-dark`. У тёмного фона `--bg-is-dark:true`, и `--color-text` берётся из `--color-text-light`. Самой переменной `--color-text` в значениях по умолчанию библиотеки нет: её выставляют эти признаки фона.

В `snippet.scss` виджета обычно хватает такого набора:

- текст: `--color-text`, `--color-text-minor-shade`, `--color-text-major-shade`, `--color-text-half-shade`;
- акцент и ссылки: `--color-accent-text`;
- фон и его оттенки: `--bg`, `--bg-minor-shade`, `--bg-major-shade`, `--bg-half-shade`;
- кнопка: фон `--color-btn-bg`, текст `--color-btn-color`.

`minor-shade` — ближайший оттенок, `major-shade` — более заметный, `half-shade` — средний между цветом и противоположным тоном. Пары `light` и `dark` в именах вроде `--color-text-light` и `--color-text-dark-minor-shade` — это светлая и тёмная ветки палитры.

```scss
& {
  color: var(--color-text);
  border-bottom: 1px solid var(--bg-minor-shade);
}

a {
  color: var(--color-accent-text);
}
```

Базовые значения палитры:

```css
--color-text-light: #fff;
--color-text-dark: #111;
--color-text-light-minor-shade: #f7f7f7;
--color-text-light-major-shade: #ededed;
--color-text-light-half-shade: #808080;
--color-text-dark-minor-shade: #474747;
--color-text-dark-major-shade: #5c5c5c;
--color-text-dark-half-shade: #999999;
--color-accent-text: var(--color-btn-bg);
--color-btn-bg: #6360e0;
--bg: #ffffff;
--bg-minor-shade: #f7f7f7;
--bg-major-shade: #ededed;
--bg-half-shade: #808080;
```

Поле формы использует отдельные переменные. Цвет текста поля по умолчанию связан с `--color-text`:

```css
--color-form-controls-bg: #fff;
--color-form-controls-color: var(--color-text);
--color-form-controls-border-color: var(--color-text-half-shade);
```

#### Элементы формы

Класс `form-control` стилизует `input`, `textarea` и `select`. Высота и кегль общие с кнопками (`--controls-height-*`, `--controls-font-size-*`). Отступы и скругление поля задают переменные `--controls-form-*`, кнопки — `--controls-btn-*`.

```css
--controls-height-s: 30px;
--controls-height-m: 40px;
--controls-height-l: 50px;
--controls-height-xl: 60px;
--controls-btn-padding-x: 1em;
--controls-btn-padding-y: 0;
--controls-btn-border-radius: 0;
--controls-form-padding-x: 10px;
--controls-form-padding-y: calc(1em * 0.4);
--controls-form-border-radius: var(--controls-btn-border-radius, 0);
--controls-font-size-s: calc(var(--font-size) * 0.75);
--controls-font-size-m: var(--font-size);
--controls-font-size-l: calc(var(--font-size) * 1.25);
--controls-font-size-xl: calc(var(--font-size) * 1.5);
--controls-border-width: 1px;
```

Модификаторы:

- `form-control_size-s`, `form-control_size-m`, `form-control_size-l`, `form-control_size-xl` — высота 30, 40, 50 и 60px;
- `form-control_wide` — ширина 100%;
- `form-control_border-round` — скругление в половину высоты. Вместе с размером скругление считается от высоты этого размера.

`form-field` — обёртка одного поля с отступом снизу `1rem`. `form-message_error` красит текст в `--color-error`, `form-message_success` — в `--color-success`.

Частая форма: два поля в ряд на `grid-list_wide`, широкое текстовое поле и кнопка отправки.

```html
<form method="post">
  <div class="grid-list grid-list_wide">
    <div class="form-field">
      <input type="text" class="form-control form-control_size-l form-control_wide" name="name" placeholder="Имя">
    </div>
    <div class="form-field">
      <input type="text" class="form-control form-control_size-l form-control_wide" name="from" placeholder="Email">
    </div>
  </div>
  <div class="form-field">
    <textarea class="form-control form-control_wide" name="content" placeholder="Сообщение"></textarea>
  </div>
  <button class="button button_size-l" type="submit">Отправить</button>
</form>
```

Поле размера s со скруглёнными углами:

```html
<input type="text" class="form-control form-control_size-s form-control_border-round" name="" value="" placeholder="">
```

#### Скрыть элемент

Атрибут `hidden` скрывает элемент. В Core.css для него задано `display: none !important`.

```html
<div hidden>Скрытый блок</div>
```

Поле `<input type="hidden">` передаёт значение вместе с формой:

```html
<input type="hidden" name="_method" value="put">
```

#### Порядок наложения слоёв

Переменные задают порядок слоёв: выпадающие списки, прилипающие и фиксированные блоки, затемнение, модальные окна и подсказки.

```css
--zindex-dropdown: 1000;
--zindex-sticky: 1010;
--zindex-fixed: 1020;
--zindex-overlay: 1030;
--zindex-modal: 1040;
--zindex-tooltip: 1050;
```

#### Кнопки

Класс `button` выравнивает содержимое по центру. Размер по умолчанию — `m`, высота `--controls-height-m` (40px).

- `button_size-s` — маленькая кнопка, 30px;
- `button_size-m` — средняя кнопка, 40px;
- `button_size-l` — крупная кнопка, 50px;
- `button_size-xl` — самая крупная кнопка, 60px;
- `button_second` — вторая кнопка: фон `--color-btn-second-bg`, текст `--color-btn-second-color`, рамка `--color-btn-second-border-color`;
- `button_wide` — ширина 100%;
- `button_border-round` — скругление в половину высоты. Вместе с размером скругление считается от высоты этого размера.

Иконку внутри кнопки оборачивают в `button__icon`: у неё отступ справа 5px.

Кнопка размера l:

```html
<button class="button button_size-l" type="submit">Отправить</button>
```

Кнопка размера s со скруглёнными углами:

```html
<button class="button button_size-s button_border-round" type="submit">Отправить</button>
```

Вторая кнопка размера m:

```html
<button class="button button_size-m button_second" type="button">Отмена</button>
```

Кнопка размера l на всю ширину, с иконкой:

```html
<button class="button button_size-l button_wide" type="button">
  <span class="button__icon icon-cart"></span>
  Купить
</button>
```

Свою кнопку, со своим классом, красят теми же переменными. Фон — `--color-btn-bg`. Текст — `--color-btn-color`: платформа подставляет светлый или тёмный цвет по признаку `--color-btn-bg-is-dark` или `--color-btn-bg-is-light`. При наведении фон берут из `--color-btn-bg-minor-shade`.

```scss
.promo__button {
  background-color: var(--color-btn-bg);
  color: var(--color-btn-color);
  border: var(--controls-border-width) solid var(--color-btn-bg);

  &:hover {
    background-color: var(--color-btn-bg-minor-shade);
    border-color: var(--color-btn-bg-minor-shade);
    color: var(--color-btn-color);
  }
}
```

Если у кнопки свой цвет в настройках виджета, у настройки имя `color-btn-bg`. Тогда в `style` появятся `--color-btn-bg` и признак светлого или тёмного фона, и `--color-btn-color` останется парным к этому фону.

Тот же фон и подстройку текста даёт миксин из <a href="/4%20поколение/Виджеты/snippet.scss/#css-variables">snippet.scss</a>:

```scss
.promo__button {
  @include background-color(--color-btn-bg);
  color: var(--color-btn-color);
}
```

#### Масштаб изображений

`img-ratio` задаёт блоку пропорцию через `--img-ratio`. Высота блока считается как `padding-top: calc(100% / var(--img-ratio, 1))`. Картинку кладут в `img-ratio__inner`: он заполняет блок абсолютно.

- `img-ratio_cover` — картинка заполняет блок, лишнее обрезается (`object-fit: cover`);
- `img-ratio_contain` — картинка целиком помещается в блок (`object-fit: contain`);
- `img-fit` — модификатор `img-ratio`. Картинка заполняет блок по значению `--img-fit` (`cover` или `contain`, по умолчанию `contain`).

Карточка товара и превью в списке обычно используют `img-fit`: пропорцию задаёт `--img-ratio`, способ вписывания — `--img-fit`.

```html
<div class="img-ratio img-fit" style="--img-ratio: 1; --img-fit: contain;">
  <div class="img-ratio__inner">
    <img src="" alt="">
  </div>
</div>
```

Баннер и слайд обычно заполняют кадр целиком через `img-ratio_cover`:

```html
<div class="img-ratio img-ratio_cover" style="--img-ratio: 1.5;">
  <div class="img-ratio__inner">
    <picture>
      <source media="(min-width:481px)" data-srcset="" type="image/webp" class="lazyload">
      <source media="(max-width:480px)" data-srcset="" type="image/webp" class="lazyload">
      <img data-src="" class="lazyload" alt="">
    </picture>
  </div>
</div>
```
