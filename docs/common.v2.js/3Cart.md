# Корзина
## Назначение атрибутов

В этом разделе вы найдёте описания и примеры использования data-атрибутов формы корзины и карточки товара внутри корзины.
### Корневой элемент

#### data-cart-form

Обязательный атрибут тега form

```html
<form data-cart-form action="{{ cart_url }}" method="post">
  <!-- Код формы -->
</form>
```

#### data-reload-on-coupon

Перезагрузка страницы после применения купона. Чтобы отключить перезагрузку, нужно указать `false` в качестве значения

```html
<form data-reload-on-coupon="false" data-cart-form action="{{ cart_url }}" method="post">
  <!-- Код формы -->
</form>
```

### Вложенные элементы


#### data-item-id

Обязательный атрибут для позиций в корзине. В качестве значения необходимо передать ID позиции.

#### data-product-id

Обязательный атрибут для инициализации товара. В качестве значения необходимо передать ID товара.

```html
{% for item in cart.items %}
<div data-product-id="{{ item.product.id }}" data-item-id="{{ item.id }}" class="cart-item {{ cart_class }}">
 <!-- Код товара -->
</div>
{% endfor %}
```

#### data-quantity

Обязательный атрибут для обёртки кнопок изменения количества и инпута quantity

```html
<div data-quantity>
  <button type="button" data-quantity-change="-1">-</button>
  <input type="text" value="{{ item.quantity }}" name="cart[quantity][{{item.id}}]"/>
  <button type="button" data-quantity-change="1">+</button>
</div>
```

#### data-quantity-change

Атрибут для кнопок изменения количества +/-, принимает число

#### data-cart-item-price

Цена позиции товара

#### data-cart-item-total-price

Итоговая цена позиции товара в зависимости от его количества

#### data-cart-total-price

Итоговая цена всех позиций в корзине без учёта скидок

#### data-cart-full-total-price

Итоговая цена всех позиций в корзине с учётом скидок

#### data-cart-positions-count

Количество позиций в корзине

#### data-cart-item-count

Количество товаров в корзине

#### data-item-delete

Кнопка удаления позиции из корзины

```html
<button data-item-delete="{{ item.id }}" type="submit">{{ messages.delete }}</button>
```

#### data-cart-discounts-ajax

Получение и вывод информации о скидках (в форму корзины нужно добавить  `data-reload-on-coupon="false"`)

```html
<div data-cart-discounts-ajax></div>
```

#### data-cart-discounts-error

Элемент, в котором будут выводиться ошибки при вводе купона или применении других скидок

```html
<div data-cart-discounts-error></div>
```

#### data-cart-clear

Кнопка очистки корзины

```html
<button data-cart-clear>Очистить</button>
```

#### data-coupon-submit

Кнопка отправки купона

```html
<div class="coupon-content">
  <input type="text" placeholder="{{ messages.coupon_placeholder }}" name="cart[coupon]" value="{{ cart.coupon }}"/>
  <button type="submit" class="coupon-button" data-coupon-submit>{{ messages.activate }}</button>
</div>
```

### Пример разметки корзины

**Подробнее**

```html
<form action="{{ cart_url }}" method="post" data-cart-form>
  <input type="hidden" name="_method" value="put">
  <input type="hidden" name="make_order" value="">

  {% for item in cart.items %}
    <div data-product-id="{{ item.product.id }}" data-item-id="{{ item.id }}">
      <div data-quantity>
        <input type="text" name="cart[quantity][{{ item.id }}]" value="{{ item.quantity }}">
        <span data-quantity-change="-1">-</span>
        <span data-quantity-change="1">+</span>
      </div>
      <span data-item-delete="{{ item.id }}">X</span>
    </div>
  {% endfor %}

  <div>
    <label> Купон </label>
    <input type="text" name="cart[coupon]" value="{{ cart.coupon }}" />
    <input type="button" value="Применить" data-coupon-submit/>
  </div>

  <input type="submit" value="Оформить" data-cart-submit>
  <button data-cart-clear>Очистить</button>
  <button data-cart-update>Обновить</button>
</form>
```

## Методы класса Cart

### add

Добавить в корзину заданное количество вариантов товаров

```js
/**
 * @param {Object} items объект с параметрами variant_id: quantity
 * @param {Object} items.accessoriable_variant_ids объект с параметрами variant_id: [{quantity: quantity, accessory_value_ids: {accessory_value_id: quantity}}]
 * @param {Object} comments комментарий к позиции заказа. Ключ ID варианта, значение текст комментария
 * @param {string} coupon купон
 */
{
  items: {
    // Варианты товаров без опций
    123456: 2,
    123457: 1,

    // Варианты товаров с опциями
    accessoriable_variant_ids: {
      123458: [
        {
          quantity: 1,
          accessory_value_ids: {
              1234: 1,
              1235: 1,
          }
        },
        {
          quantity: 1,
          accessory_value_ids: {
              1236: 1,
              1237: 1,
          }
        }
      ]
    }
  },
  comments: {
    123457: 'Мой комментарий'
  },
  coupon: 'Мой купон'
}
```

**События**

> События класса EventBus

* before:insales:cart
* add_items:insales:cart
* add_items:insales:cart:light (в order_lines не будет объекта product)
* update_items:insales:cart
* update_items:insales:cart:light (в order_lines не будет объекта product)
* always:insales:cart

```js
EventBus.subscribe('add_items:insales:cart', function (data) {
  console.log('Товар добавлен');
});
```

### delete

Удалить позиции из корзины

```js
/**
 * @param {Array} items массив ID вариантов к удалению
 */
Cart.delete({
  items: [160549240, 160549242]
})
```

Удалить позиции с опциями

```js
/**
 * @param {Object} items объект с параметрами variant_id: variant_id
 * @param {Object} items.accessoriable_variant_ids объект с параметрами variant_id: [{quantity: quantity, accessory_value_ids: {accessory_value_id: quantity}}]
 */
Cart.delete({
  items: {
    // Позиции без опций
    160549240: 160549240,
    160549242: 160549242,

    // Позиции с опциями
    accessoriable_variant_ids: {
      160549243: [
        {
            quantity: 0,
            accessory_value_ids: {
                1234: 1,
                1235: 1,
            }
        },
        {
            quantity: 0,
            accessory_value_ids: {
                1236: 1,
                1237: 1,
            }
        }
      ]
    }
  }
})
```

**События**

> События класса EventBus

* before:insales:cart
* delete_items:insales:cart
* update_items:insales:cart
* update_items:insales:cart:light (в order_lines не будет объекта product)
* always:insales:cart


```js
EventBus.subscribe('delete_items:insales:cart', function (data) {
  console.log('Товары удалены');
});
```

### clear

Полностью очистить корзину

```js
Cart.clear();
```

**События**

> События класса EventBus

* before:insales:cart
* clear_items:insales:cart
* update_items:insales:cart
* update_items:insales:cart:light (в order_lines не будет объекта product)
* always:insales:cart

```js
EventBus.subscribe('clear_items:insales:cart', function (data) {
  console.log('Корзина очищена');
});
```

### forceUpdate

Принудительно обновить данные корзины

```js
Cart.forceUpdate()
```

### remove

Удалить из корзины заданное количество вариантов товаров

```js
/**
*  @param {Object} items объект с параметрами variant_id: quantity
*  @param {Object} items.accessoriable_variant_ids объект с параметрами variant_id: [{quantity: quantity, accessory_value_ids: {accessory_value_id: quantity}}]
*/
Cart.remove({
  items: {
    // Варианты товаров без опций
    138231315: 1,
    138231316: 1,

    // Варианты товаров с опциями
    accessoriable_variant_ids: {
      138231317: [
        {
            quantity: 1,
            accessory_value_ids: {
                1234: 1,
                1235: 1,
            }
        },
        {
            quantity: 1,
            accessory_value_ids: {
                1236: 1,
                1237: 1,
            }
        }
      ]
    }
  }
})
```

**События**

> События класса EventBus

* before:insales:cart
* remove_items:insales:cart
* update_items:insales:cart
* update_items:insales:cart:light (в order_lines не будет объекта product)
* always:insales:cart


```js
EventBus.subscribe('remove_items:insales:cart', function (data) {
  console.log('Товары удалены');
});
```

### set

Устанавливает количество для каждой позиции в корзине

```js
/**
* @param {Object} items объект с параметрами variant_id: quantity
* @param {Object} items.accessoriable_variant_ids объект с параметрами variant_id: [{quantity: quantity, accessory_value_ids: {accessory_value_id: quantity}}]
*/
Cart.set({
  items: {
    // Позиции без опций
    138231315: 1,
    138231316: 1,

    // Позиции с опциями
    accessoriable_variant_ids: {
      138231317: [
        {
            quantity: 1,
            accessory_value_ids: {
                1234: 1,
                1235: 1,
            }
        },
        {
            quantity: 1,
            accessory_value_ids: {
                1236: 1,
                1237: 1,
            }
        }
      ]
    }
  }
})
```

**События**

> События класса EventBus

* before:insales:cart
* set_items:insales:cart
* update_items:insales:cart
* update_items:insales:cart:light (в order_lines не будет объекта product)
* always:insales:cart


```js
EventBus.subscribe('set_items:insales:cart', function (data) {
  console.log('Корзина обновлена');
});
```
### setCoupon

Устанавливает купон

**Параметры**

```js
/**
* @param {string} coupon код купона
*/
Cart.setCoupon({
  coupon: 'Мой купон'
})
```

**События**

> События класса EventBus

* before:insales:cart
* set_coupon:insales:cart
* update_items:insales:cart
* update_items:insales:cart:light (в order_lines не будет объекта product)
* always:insales:cart


```js
EventBus.subscribe('set_coupon:insales:cart', function (data) {
  console.log('Добавлен купон');
});
```

### order.get

Получить состав корзины

```js
var order = Cart.order.get();
console.log(order);
```

### order.getItemByID

Получить информацию о позиции по ID

```js
var item = Cart.order.getItemByID(138231315);
console.log(item);
```

### События изменения позиции товара

* before:insales:item
* change_quantity:insales:item
* update_variant:insales:item
* always:insales:item
