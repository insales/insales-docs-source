---
seo_title: "Счётчик товара в корзине — common.v2.js InSales"
description: "Как показать количество товара в корзине на карточке InSales и менять его кнопками: атрибуты и разметка счётчика common.v2.js."
---

# Счётчик в корзине на карточке

Компонент показывает, сколько единиц варианта уже лежит в корзине, и меняет это количество кнопками на карточке. Он стоит внутри формы с `data-product-id` и полем `name="variant_id"`.

Краткий пример разметки есть также в разделе [товара](/common.v2.js/2Products/).

## Атрибуты

| Атрибут | Назначение |
|---|---|
| data-add-cart-counter | Корень. В значении JSON можно передать `step` и `min` |
| data-add-cart-counter-btn | Кнопка первого добавления |
| data-add-cart-counter-minus | Уменьшить количество или убрать товар |
| data-add-cart-counter-plus | Увеличить количество |
| data-add-cart-counter-count | Текст с текущим количеством |
| data-add-cart-counter-max-quantity | Максимум, который можно положить в корзину |
| data-add-cart-counter-is-ready | Стоит на кнопке, когда счётчик уже можно нажимать |

```html
<div class="add-cart-counter" data-add-cart-counter='{"step": "1"}'>
  <button type="button" data-add-cart-counter-btn>В корзину</button>
  <div>
    <button type="button" data-add-cart-counter-minus>-</button>
    <span data-add-cart-counter-count></span>
    <button type="button" data-add-cart-counter-plus>+</button>
  </div>
</div>
```

Когда товар добавлен, у корня появляется класс `is-add-cart`. По нему показывают блок с количеством и скрывают кнопку первого добавления.

Счётчик учитывает выбранный вариант, опции товара и обновление корзины. Если в магазине нельзя заказать больше остатка и следующее нажатие превысит `data-add-cart-counter-max-quantity`, количество не меняется.

## События

`unchange_quantity:insales:ui_add-cart-counter` — нажатие не изменило количество, потому что достигнут максимум. В данных есть `button`.

```js
EventBus.subscribe('unchange_quantity:insales:ui_add-cart-counter', function (data) {
  console.log(data.button);
});
```
