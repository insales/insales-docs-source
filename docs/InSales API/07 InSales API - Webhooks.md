---
seo_title: "Вебхуки InSales API: события и уведомления"
description: "Вебхуки InSales для приложений: создание подписок, POST-уведомления о событиях магазина и сверка данных при пропуске доставки."
---

# Вебхуки

Когда в магазине происходит событие, InSales отправляет POST-запрос на адрес приложения, указанный в вебхуке. Так приложение получает уведомления об изменениях товаров, заказов и клиентов.

Доставка уведомления не гарантируется. Для полной сверки данных дополнительно запрашивайте списки с параметром [updated_since](03%20Получение%20только%20изменившихся%20данных.md).

Методы — `Webhook` в [справочнике](https://api.insales.ru/). Создавать вебхуки можно уже в обработчике [установки приложения](01%20readme.md).

## Темы

Параметр `topic` определяет событие, о котором нужно уведомлять приложение. Он обязателен при создании вебхука. В справочнике перечислены следующие темы:

* `orders/create`, `orders/update`, `orders/destroy`
* `products/create`, `products/update`
* `client/create`, `client/update`

Дополнительные поля:

* `format_type` — `json` или `xml`
* `warehouse_id` применяется только к темам заказов. Если указать идентификатор [склада](18%20Склады.md#склады), уведомления будут приходить только о заказах этого склада
* `sales_channel_id` применяется только к `products/update` и ограничивает уведомления товарами выбранного [канала продаж](14%20Приложения,%20выгрузки,%20задачи%20и%20диалоги.md#каналы-продаж)
* `batch_size` применяется только к `products/create` и `products/update`. Задаёт максимальное число товаров в одном уведомлении; по умолчанию — 10

## Создание

`POST /admin/webhooks.json`

```json
{
  "webhook": {
    "address": "https://myapp.example/insales/products",
    "topic": "products/update",
    "format_type": "json",
    "batch_size": 10
  }
}
```

Ответ `201` содержит `id`, `topic`, `format_type`, `warehouse_id`, `sales_channel_id`, `batch_size`.

Остальные методы:

* `GET /admin/webhooks.json`
* `GET /admin/webhooks/:id.json`
* `PUT /admin/webhooks/:id.json`
* `DELETE /admin/webhooks/:id.json` — `{ "status": "ok" }`

Для одного приложения нельзя создать два вебхука с одинаковыми адресом и темой.

## Что приходит на address

InSales отправляет уведомление POST-запросом на `address`. Заголовок `Content-Type` соответствует выбранному `format_type`: например, для JSON используется `application/json`.

Для `products/create` и `products/update` тело — JSON-массив товаров, те же поля, что у `GET /admin/products.json`. В одном запросе не больше `batch_size` товаров. При `batch_size: 1` тело всё равно содержит массив, состоящий из одного товара.

Для `orders/create`, `orders/update` и `orders/destroy` тело — один заказ в выбранном формате, как объект заказа в API.

Для `client/create` и `client/update` тело — один клиент, тоже в выбранном формате.
