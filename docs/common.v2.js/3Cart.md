# Корзина

## Интерфейс

> Для быстрого создания интерфейсов в commonjs предусмотрены готовые обработчики форм.

> Обработчики ссылаются на data-атрибуты. В data-атрибуты пробрасывается информация из liquid.

### Назначение атрибутов

| Атрибут              | Назначение                                                                      | Расположение                                              |
|----------------------|---------------------------------------------------------------------------------|-----------------------------------------------------------|
| data-cart-form       | Обязательный атрибут для тега form                                              | Тег form для корзины                                      |
| data-item-id         | Обязательный атрибут для позиций в корзине. Атрибут принимает id позиции.       | Обертка для позиции в корзине                             |
| data-product-id      | Обязательный атрибут для инициализации товара. В атрибут передаётся id товара.  | Обертка для позиции в корзине                             |
| data-item-delete     | Удаление из корзины                                                             | Обертка для позиции в корзине                             |
| data-cart-update     | Обновление корзины                                                              | Внутри обёртки с атрибутом data-cart-form                 |
| data-cart-discounts-ajax     | Информацию о скидках (В форму корзины нужно добавить  `data-reload-on-coupon="false"`)                                                              | Внутри обёртки с атрибутом data-cart-form                 |
| data-reload-on-coupon     | Перезагрузка страницы после применения купона. Чтобы отключить перезагрузку, нужно указать `false` в качестве значения                                                              | Форма с атрибутом data-cart-form                 |
| data-cart-clear      | Очищение корзины                                                                | Внутри обёртки с атрибутом data-cart-form                 |
| data-coupon-submit   | Отправка купона                                                                 | Внутри обёртки с атрибутом data-cart-form                 |
| data-quantity        | Обязательный атрибут для обёртки кнопок изменения колличества и инпута quantity | Внутри обертки с атрибутом data-product-id и data-item-id |
| data-quantity-change | Атрибут для кнопок +/-, принимает число                                         | Внутри обёртки с атрибутом data-quantity                  |



### Разметка товара


**Подробнее**

```twig
<form action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}">
  {% if product.show_variants? %}
    <select name="variant_id" data-product-variants>
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title | escape }}</option>
      {% endfor %}
    </select>
  {% else %}
    <input type="hidden" name="variant_id" value="{{product.variants.first.id}}" >
  {% endif %}
  <input type="text" name="comment" value="">
  <div data-quantity>
    <input type="text" name="quantity" value="1" />
    <span data-quantity-change="-1">-</span>
    <span data-quantity-change="1">+</span>
  </div>
  <button type="submit" data-item-add>
    Добавить в корзину
  </button>
</form>
```




### Разметка корзины


**Подробнее**

```twig
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

Добавить в корзину заданное кол-во товаров

```js
/**
 * @param {Object} items объект с параметрами variant_id: quantity
 * @param {Object} comments комментарий к позиции заказа. Ключ id варианта, значение текст комментария
 * @param {string} coupon купон
 */
{
  items: {
    123456: 2,
    123457: 1
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
* update_items:insales:cart
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
 * @param {Array} items массив id вариантов к удалению
 */
 Cart.delete({
   items: [160549240, 160549242]
 })
```


**События**

> События класса EventBus

* before:insales:cart
* delete_items:insales:cart
* update_items:insales:cart
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

Удалить из корзины заданное кол-во товаров

```js
/**
*  @param {Array} items объект с параметрами variant_id: quantity
*/
Cart.remove({
  items: {
    138231315: 1,
    138231316: 1
  }
})
```

**События**

> События класса EventBus

* before:insales:cart
* remove_items:insales:cart
* update_items:insales:cart
* always:insales:cart


```js
EventBus.subscribe('remove_items:insales:cart', function (data) {
  console.log('Товары удалены');
});
```



### set

Устанавливает кол-во товаров в корзине для каждой позиции

```js
/**
* @param {Array} items объект с параметрами variant_id: quantity
*/
Cart.set({
  items: {
    138231315: 1,
    138231316: 1
  }
})
```


**События**

> События класса EventBus

* before:insales:cart
* set_items:insales:cart
* update_items:insales:cart
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

Получить информацию о позиции по id

```js
var item = Cart.order.getItemByID(138231315);
console.log(item);
```
