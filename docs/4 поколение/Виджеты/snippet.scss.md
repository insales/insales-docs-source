# snippet.scss
Мы используем scss и методолгию <a href="https://ru.bem.info/" target="_blank">БЭМ</a>.
#### Доступные миксины:

```scss
@mixin background-color($color) {
  $dark_selector: '[style*="#{$color}-is-dark:true"]';
  $light_selector: '[style*="#{$color}-is-light:true"]';
  background-color: var(#{$color});
  @at-root #{selector-append($dark_selector, &)} {
    color: var(--color-text-light);
    --color-text: var(--color-text-light);
    --color-text-minor-shade: var(--color-text-light-minor-shade);
    --color-text-major-shade: var(--color-text-light-major-shade);
    --color-text-half-shade: var(--color-text-light-half-shade);
  }
  @at-root #{selector-append($light_selector, &)} {
    color: var(--color-text-dark);
    --color-text: var(--color-text-dark);
    --color-text-minor-shade: var(--color-text-dark-minor-shade);
    --color-text-major-shade: var(--color-text-dark-major-shade);
    --color-text-half-shade: var(--color-text-dark-half-shade);
  }
}
```

Можно использовать уже готовый миксин, чтобы при изменении цвета фона, цвет текста менялся на читаемый:

```scss
@include background-color(--bg);
```
У корневого дива при изменении настроек меняется значение css переменных.
В стилях можно прописывать состояния для класса css при изменении настроек, примеры:

```scss
&[style*="--article-hide-photo:true"] {
  .article-photo {
    display: none!important;
  }
}
```
```scss
&[style*="--btn-position-vertical-1:100%"][style*="--btn-position-horizontal-1:0"]{
  .banner-list__item:nth-child(2n + 1) {
    .banner-list__item-title {
      margin: -2rem 0 0 2rem;
      transform: translateX(calc(var(--btn-position-horizontal-1) * -1%)) translateY(calc(var(--btn-position-vertical-1) * -1));
      @media screen and (max-width: 767px) {
        margin: -1rem 0 0 1rem;
      }
    }
  }
}
```


Где:

- & - автоматически генерируемый класс виджета
- article-hide-photo - "name":"article-hide-photo" наименование настройки, которые мы задаем в <a href="/4%20поколение/Виджеты/settings_form/#setting_form_name">setting_form.json</a> и прописываем настройки по умолчанию в  - <a href="/4%20поколение/Виджеты/settings_data/#setting_data_name">setting_data.json</a>


Учитываем две настройки одновременно:
```scss
&[style*="--btn-position-vertical-1:100%"][style*="--btn-position-horizontal-1:0"]{
  .banner-list__item:nth-child(2n + 1) {
    .banner-list__item-title {
      margin: -2rem 0 0 2rem;
      transform: translateX(calc(var(--btn-position-horizontal-1) * -1%)) translateY(calc(var(--btn-position-vertical-1) * -1));
      @media screen and (max-width: 767px) {
        margin: -1rem 0 0 1rem;
      }
    }
  }
}
```

#### Переменные
С полным списком переменных можно ознакомится по <a href="https://github.com/insales/my-layout/blob/main/dist/css/core-css.css" target="_blank">ссылке</a>, а посмотреть как они работают по <a href="https://insales.github.io/my-layout/#" target="_blank">ссылке</a>

Пример:
```scss
.reviews {
  .date {
    color: var(--color-text-half-shade);
  }
  .author {
    font-size: 1.1rem;
    font-weight: bold;
  }
}

```
Мы используем методологию БЭМ, grid-areas и поддерживаем последние версии браузеров.

Пример:
```scss
.product {
  display: grid;
  grid-template-areas: "photo info"
                       "photo title"
    				           "photo price"
                       "photo variants"
                       "photo description"
    				           "photo properties"
                       "photo buy"
                       "photo calculate-delivery"
                       "photo link";
  grid-template-columns: 40% 1fr;
  grid-template-rows: repeat(7,auto) 1fr;
  grid-column-gap: 2rem;
  &__area-photo {
    grid-area: photo;
    min-width: 0;
    position: relative;
  }
  &__area-title {
    grid-area: title;
  }
}

```
