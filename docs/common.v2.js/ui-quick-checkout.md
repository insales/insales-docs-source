---
seo_title: "Заказ в один клик и заявки — common.v2.js InSales"
description: "Как открыть формы заказа в один клик и заявки в InSales: data-quick-checkout, связь с формой товара и модальные окна common.v2.js."
---

# Формы заявки и заказа в один клик

Форма заказа в один клик и форма заявки по сути являются аналогичными. Они позволяют пользователю оставить заявку на товар, минуя процесс заполнения всех полей стандартной формы заказа. Обе формы по умолчанию отдаются сервером вместе с HTML-кодом страницы и реализованы как модальные окна, поэтому здесь будут описаны только способы их активации.

## Активация формы заказа в один клик

Для вызова формы заказа в один клик используется кнопка с data-атрибутом `data-quick-checkout`. В качестве значения этого атрибута указывается селектор формы товара, для которого будет вызвана форма. Пример:

```html
<button data-quick-checkout='[data-product-id="12345678"]'>Купить в один клик</button>
```

## Активация формы заявки

Форма заявки активируется аналогично форме заказа в один клик, через кнопку с атрибутом `data-quick-checkout` и указанием селектора формы товара. Отличие состоит в том, что необходимо добавить дополнительный атрибут `data-quick-checkout-modal-handle` со значением `service`. Пример:

```html
<button
  data-quick-checkout='[data-product-id="12345678"]'
  data-quick-checkout-modal-handle="service"
>
  Оформить заявку
</button>
```

## Активация формы без указания селектора формы товара

Если требуется вызов формы без привязки к конкретному товару, то в атрибуте кнопки `data-quick-checkout` вместо селектора формы товара нужно указать значение `fake_order`. Это приведет к созданию заказа с заглушкой вместо наименования товара. Для задания собственного наименования заглушки используйте атрибут `data-quick-checkout-fake-order-name`.

Пример для формы заказа в один клик:

```html
<button
  data-quick-checkout='fake_order'
  data-quick-checkout-fake-order-name="имя товара"
>
  Купить в один клик
</button>
```

Пример для формы заявки:

```html
<button
  data-quick-checkout='fake_order'
  data-quick-checkout-modal-handle="service"
  data-quick-checkout-fake-order-name="имя товара"
>
  Оформить заявку
</button>
```

## Дополнительные атрибуты

`data-quick-checkout-handle` задаёт имя модального окна на самой форме. Если атрибута нет, окно называется `default`. Кнопка открывает окно с тем же именем через `data-quick-checkout-modal-handle`.

`data-quick-checkout-use-common-cart` на модальном окне означает, что в быстрый заказ попадут и товары, которые уже лежат в корзине.

## События

| Событие | Описание |
|---|---|
| before:insales:quick_checkout | Перед отправкой формы. В данных параметры запроса |
| success:insales:quick_checkout | Заказ создан. В данных есть `task` и снимок корзины `cart` |
| errors:insales:quick_checkout | Сервер вернул ошибки формы |
| always:insales:quick_checkout | После успеха или ошибки |
| before_submit:insales:quick_checkout | Перед переходом на страницу успешного заказа |
| add_disabled:insales:quick_checkout | Нажата заблокированная кнопка. В данных есть `button` |
| add_checkout:insales:cart | Форма собрана и передана в оформление |

```js
EventBus.subscribe('errors:insales:quick_checkout', function (task) {
  console.log(task);
});
```
