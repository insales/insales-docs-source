# ui-banner-list
Данный компонент используется для создания баннеров, предпочтительно использовать с `ui-banner`, но возможно использование и с другими компонентами.

## Пример использования


````html
<ui-banner-list
  hr-gutter="1rem"
  vr-gutter="1rem"
  layout="mansonry-2-column"
>
  {% for slide in data.blocks %}

  <ui-banner
    class="editable-block"
    cells="12"
    ratio="{{ slide.ratio }}"
    data-block-id="{{ slide.id }}"
    img-src="{{ slide.image }}" 
    link="{{ slide.link }}"
    layout="mansonry-item"
    theme="image-hover-shadow, title-bolder, title-margin"
  >
  </ui-banner>
  {% endfor %}
</ui-banner-list>
````

## Параметры

Данный компонент поддерживает следущие параметры:

* `vr-gutter` - вертикальный отступ для дочерних узлов. По умолачание `1rem`.
* `hr-gutter` - горизонтальный отступ для дочерних узлов. По умолачание `1rem`.
* `direction` - ориентация раскладки дочерних блоков. Доступны значения `row`, `column`.

## Темизация

* ### `layout`
`default` - Горизонтальная раскладка, блоки выстраиваются по порядку.
`mansonry-2-column` - Grid-mansonry в 2 колонки. Блоки выстраиваются "кирпичиками".
`mansonry-3-column` - Grid-mansonry в 3 колонки. Блоки выстраиваются "кирпичиками".
`mansonry-2-column-mobile` - Использует медиа-запрос, для выстраивание в 2 колонки при ширине экрана `sm`.

* ### `color-sheme`
`default` - Стандартные цветовые настройки.