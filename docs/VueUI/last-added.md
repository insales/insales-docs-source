# ui-last-added
  Компонент выводит последний добавленый товар в корзину/сравнение.

## Пример использования

````html
<ui-last-added
  unit-title ="{{ widget_messages.unit_title }} "
  total-items-caption= "{{ widget_messages.total_item_cart }}"
  in-cart
  >
</ui-last-added>
````

## Параметры

Данный компонент поддерживает следущие параметры

* `unitTitle` - Единица измерения(`шт., ед., ...`).
* `totalItemsCaption` - Заголовок перед вывод общего колличества в корзине/сравнении.
* `inCart` - Выводить последний добавленый из корзины.
* `inCompare` - Выводить последний добавленый из сравнения.
* `hideImage` - Скрыть картинку товара.
* `hideText` - Скрыть название товара.