# Опции в корзине

Компонент обеспечивает отображение выбранных пользователем опций товара непосредственно в корзине. Это особенно важно, если опции применяются в карточке товара, чтобы обеспечить целостность информации о товаре и его опциях вплоть до момента оформления заказа.

## Назначение атрибутов

### `data-item-accessories`

Этот атрибут применяется к контейнеру, содержащему опции для товара в корзине. Контейнер с `data-item-accessories` должен находиться внутри элемента с атрибутом `data-item-id`, обозначающим конкретный товар в корзине. Такая структура обеспечивает четкую связь между опциями товара и самим товаром.

### `data-item-accessory-value-id`

Этот обязательный атрибут используется для контейнера, который является обёрткой для всех значений опций товара. Контейнер, помеченный `data-item-accessory-value-id`, должен находиться внутри контейнера с атрибутом `data-item-accessories`. Это обеспечивает правильную связь между значениями опций и конкретным товаром.

!!! warning
    Атрибут важен при отправке данных формы корзины, так как он используется для передачи информации о выбранных опциях на страницу оформления заказа.

## Пример разметки

Ниже приведён пример разметки для отображения опций товара в корзине:

```html
{% if item.accessory_lines.size > 0 %}
  <div class="item-accessories" data-item-accessories>
    <div class="item-accessories__header">
        Опции товара
    </div>
    <div class="item-accessories__items">
      {% for accessory in item.accessory_lines %}
      <div class="accessory-item">
          <span class="accessory-item__name" data-item-accessory-value-id="{{ accessory.accessory_value_id }}">{{ accessory.accessory_value_name }}</span>
          <span class="accessory-item__price">{{ accessory.accessory_value_price | money }}</span>
      </div>
      {% endfor %}
    </div>
  </div>
{% endif %}
```
