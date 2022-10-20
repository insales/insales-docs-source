# snippet.scss
Мы используем scss и методолгию <a href="https://ru.bem.info/" target="_blank">БЭМ</a>.

У родительского класса <a href="/4%20поколение/core.css/">layout</a> при изменении настроек меняется значение css переменных.
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
- article-hide-photo - автоматически подставляется к родительскому классу виджета в атрибут style.`"name":"article-hide-photo"`- наименование настройки, которые мы задаем в <a href="/4%20поколение/Виджеты/settings_form/#setting_form_name">setting_form.json</a> и меняем в редакторе. <br> Настройки по умолчанию в <a href="/4%20поколение/Виджеты/settings_data/#setting_data_name">setting_data.json</a>


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
С полным списком переменных можно ознакомится по <a href="https://github.com/insales/my-layout/blob/main/dist/css/core-css.css" target="_blank">ссылке</a>, а посмотреть как они работают - <a href="https://insales.github.io/my-layout/#" target="_blank">здесь</a>

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
Мы используем методологию БЭМ, grid и поддерживаем последние версии браузеров.

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
