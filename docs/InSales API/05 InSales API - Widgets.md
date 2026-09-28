---
seo_title: "Виджеты приложения в бэк-офисе — InSales API"
description: "Встраивание приложения в карточку заказа или товара InSales: iframe-виджеты ApplicationWidget, поля, HTML-код и методы API."
---

# Виджеты приложения

Виджет приложения — iframe в карточке заказа или товара в бэк-офисе. В него попадает HTML из поля `code`. Методы — `ApplicationWidget` в [справочнике](https://api.insales.ru/).

Поля:

* `code` — HTML или JavaScript. В JSON передаётся обычной строкой, экранировать угловые скобки не нужно.
* `height` — высота iframe в пикселях.
* `page_type` — `order` или `product`. Без поля виджет создаётся для заказа.

## Создание

`POST /admin/application_widgets.json`

```json
{
  "application_widget": {
    "code": "<p>Номер заказа: <b id=\"order-number\"></b></p>",
    "height": 80,
    "page_type": "order"
  }
}
```

Ответ `201`:

```json
{
  "code": "<p>Номер заказа: <b id=\"order-number\"></b></p>",
  "created_at": "2026-09-26T13:21:27.492+03:00",
  "id": 1,
  "height": 80,
  "page_type": "order"
}
```

Остальные методы:

* `GET /admin/application_widgets.json` — список
* `GET /admin/application_widgets/:id.json` — один виджет
* `PUT /admin/application_widgets/:id.json` — изменить `code`, `height` или `page_type`
* `DELETE /admin/application_widgets/:id.json` — удалить, в ответе `{ "status": "ok" }`

## Что видно внутри iframe

Страница виджета задаёт глобальные переменные и затем вставляет `code`.

На карточке заказа (`page_type: order`):

* `window.order_info` — JSON текущего заказа, тот же состав, что у заказа в API
* `window.account_id`
* `window.user_id`

На карточке товара (`page_type: product`) вместо заказа приходит `window.product_info`. `window.account_id` и `window.user_id` есть и там.

Короткий фрагмент для заказа:

```html
<p>Номер заказа: <b id="order-number"></b></p>
<script>
  document.getElementById("order-number").textContent = window.order_info.id;
</script>
```

Данные своего сервера виджет забирает сам, например отдельным запросом из `code`. Доступ к iframe с чужого домена ограничен браузером, поэтому обмен с приложением обычно идёт через запрос на адрес приложения, а не через родительское окно бэк-офиса.
