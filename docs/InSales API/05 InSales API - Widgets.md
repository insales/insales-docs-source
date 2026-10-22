---
seo_title: "Виджеты приложения в бэк-офисе — InSales API"
description: "Встраивание приложения в карточку заказа или товара InSales: iframe-виджеты ApplicationWidget, поля, HTML-код и методы API."
---

# Виджеты приложения

Виджет приложения позволяет встроить интерфейс интеграции в карточку заказа или товара в бэк-офисе. InSales выводит его в iframe, используя HTML из поля `code`. Методы ресурса `ApplicationWidget` описаны в [справочнике](https://api.insales.ru/).

Поля:

* `code` — HTML или JavaScript. В JSON передаётся обычной строкой, экранировать угловые скобки не нужно.
* `height` — высота iframe в пикселях.
* `page_type` — карточка, в которой появится виджет: `order` — заказ, `product` — товар. Если поле не передать, виджет создаётся для заказа.

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

Перед выполнением кода из `code` страница виджета задаёт глобальные переменные с данными текущей карточки и пользователя.

На карточке заказа (`page_type: order`):

* `window.order_info` — JSON текущего заказа, тот же состав, что у заказа в API
* `window.account_id`
* `window.user_id`

В карточке товара (`page_type: product`) данные товара доступны в `window.product_info`. Переменные `window.account_id` и `window.user_id` также доступны.

Короткий фрагмент для заказа:

```html
<p>Номер заказа: <b id="order-number"></b></p>
<script>
  document.getElementById("order-number").textContent = window.order_info.id;
</script>
```

Для получения данных с вашего сервера добавьте соответствующий запрос в `code`. Браузер ограничивает доступ между окнами разных доменов, поэтому для обмена данными с приложением обычно используют запросы к его серверу.
