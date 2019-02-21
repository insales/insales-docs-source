# ui-search-widget
  Компонент формы поиска. Представлет собой текстовое поле с кнопкой.

## Пример использования

````html
 <ui-search-widget
  drop
  layout="toggle-without-submit"
  theme='no-shadow'
  color-sheme="transparent"
  placeholder="{{ widget_messages.search_placeholder }}"
  class="in-header"
  search-icon="fa fa-search"
>
</ui-search-widget>
````

## Параметры

Данный компонент поддерживает следущие параметры

* `searchCaption` - Текст внутри кнопки поиска.
* `placeholder` - placeholder внутри текстового поля
* `drop` - Меняет вид форм на тогл с выпадашкой.
* `dropPosition` - Позиция выпадающего меню. По-умолчанию слева.

## Темизация
* `layout` - 
  - `toggle-without-submit` - Подходит для стилизации виджета в виде dropdown. Анимирует выпадашка слева. 
* `color-sheme`
  - `transparent` - Кнопка прозрачная.
* `theme`
  - `no-shadow` - Убирает тень поля ввода.