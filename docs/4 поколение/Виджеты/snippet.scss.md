# snippet.scss
Файл предназначен для написания CSS стилей. Мы используем SCSS и методологию <a href="https://ru.bem.info/" target="_blank">БЭМ</a>.

Html код виджета располагается внутри родительского элемента `div` с классом `layout` и уникального класса виджета. Чтобы написать стили к уникальному родительскому классу виджета в стилях используется символ `&`.

```scss
& {
  border-bottom: 1px solid var(--bg-minor-shade);
  box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.1);
  position: relative;
}

&[style*="--article-hide-photo:true;"] {
  .article-photo {
    display: none!important;
  }
}
```
- `article-hide-photo` - автоматически подставляется к родительскому классу виджета в атрибут `style`. В значении есть точка с запятой: `--article-hide-photo:true;`. Её нужно включать в селектор. <br>
- В `snippet.scss` виджета прописываются стили для разных состояний настроек. `"name":"article-hide-photo"` - наименование настройки в редакторе, которую мы прописываем в <a href="/4%20поколение/Виджеты/settings_form/#setting_form_name">settings_form.json</a>.

У родительского класса <a href="/4%20поколение/core.css/">layout</a> при изменении настроек в редакторе меняется значение css-переменных.
```html
<div class="layout widget-type_{handle}" style="--layout-wide-bg:true; --layout-pt:2vw; --layout-pb:2vw; --layout-wide-content:false; --layout-edge:true; --hide-desktop:false; --hide-mobile:false;">
  <div class="layout__content">
    <div class="banner-list__item">
    </div>
  </div>
</div>
```
Класс виджета всегда `widget-type_` и `handle` из `info.json`.

В стилях можно прописывать разные состояния, прописывая значения настроек, пример:


```scss
&[style*="--hide-favorites:true;"][style*="--hide-personal:false;"] {
  .navigation-bar {
    grid-template-columns: repeat(4, 1fr);
  }
}
```


#### Какие настройки становятся CSS-переменными <a name="css-variables"></a>

В атрибут `style` попадают настройки типов `color`, `checkbox`, `select`, `number`, `range`, `file`, `button_switch`, `button-switch`, `icon_group`, `icon-group`, `button-list`, `fonts_select`. Текст и rich-text в `style` не попадают: их читают через `widget_settings` в Liquid.

Для цвета платформа дополнительно пишет признак светлый/тёмный и оттенки. У настройки `bg` со значением `#111111` в `style` будут, среди прочего:

- `--bg:#111111;`
- `--bg-is-dark:true;` или `--bg-is-light:true;`
- `--bg-minor-shade`, `--bg-major-shade`, `--bg-half-shade`

В `snippet.scss` каждого виджета доступен миксин фона. Он ставит `background-color` и подстраивает цвет текста под светлый или тёмный фон:

```scss
@include background-color(--bg);
```

#### Переменные
На странице с виджетами подключаются стили <a href="/4%20поколение/core.css/">core.css</a>.
В core.css к определенным классам прописаны стили с css-переменными, которые меняют свое значение при изменении настроек шаблона и настроек виджета в редакторе (шрифты, цвета кнопок и т.п). Так же прописаны переменные со значениями, которые можно использовать или переопределять. 
Подробнее можно узнать <a href="/4%20поколение/core.css/">здесь</a>.

Пример:
```scss
& {
  --grid-list-min-width: 190px;
  --grid-list-row-gap: 1rem;
  --grid-list-column-gap: 2rem;


  @media screen and (max-width: 767px) {
    --grid-list-min-width: 50%;
  }
}

```
В данном примере меняется значение переменных `--grid-list-min-width`, `--grid-list-row-gap`, `--grid-list-column-gap` в стилях виджета. 