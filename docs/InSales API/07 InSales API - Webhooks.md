---
seo_title: "Вебхуки InSales API: события и уведомления"
description: "Вебхуки InSales для приложений: создание подписок, POST-уведомления о событиях магазина и сверка данных при пропуске доставки."
---

# Вебхуки

Вебхук — POST на адрес приложения, когда в магазине происходит событие. Доставка не гарантируется: для полной сверки дополнительно читайте списки через [updated_since](03%20Получение%20только%20изменившихся%20данных.md).

Методы — `Webhook` в [справочнике](https://api.insales.ru/). Создавать вебхуки можно уже в обработчике [установки приложения](01%20readme.md).

## Темы

`topic` при создании обязателен. В справочнике перечислены:

* `orders/create`, `orders/update`, `orders/destroy`
* `products/create`, `products/update`
* `client/create`, `client/update`

Дополнительные поля:

* `format_type` — `json` или `xml`
* `warehouse_id` — только для тем заказов, в рассылку попадают заказы этого склада
* `sales_channel_id` — только для `products/update`, фильтр по каналу продаж
* `batch_size` — только для `products/create` и `products/update`. Товары уходят пачками, по умолчанию 10

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

Пара адрес + тема уникальны в рамках приложения.

## Что приходит на address

Это POST. `Content-Type` соответствует `format_type`: для JSON — `application/json`.

Для `products/create` и `products/update` тело — JSON-массив товаров, те же поля, что у `GET /admin/products.json`. В одном запросе не больше `batch_size` товаров. При `batch_size: 1` массив из одного товара.

Для `orders/create`, `orders/update` и `orders/destroy` тело — один заказ в выбранном формате, как объект заказа в API.

Для `client/create` и `client/update` тело — один клиент, тоже в выбранном формате.
