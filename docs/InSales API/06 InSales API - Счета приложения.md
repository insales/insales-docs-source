# Счета приложения

Разовый счёт нужен, чтобы взять оплату с владельца магазина через InSales, а не напрямую. Комиссия согласуется при публикации приложения.

Пользователь соглашается на действие с ценой. Приложение создаёт счёт и отправляет его на `confirmation_url` из ответа. Там счёт оплачивают или отклоняют. После этого InSales один раз вызывает `return_url`. Повторной доставки нет, поэтому счета без уведомления стоит перечитывать, например раз в сутки.

Методы — `ApplicationCharge` в [справочнике](https://api.insales.ru/). Периодическая оплата — отдельный ресурс, см. [периодические счета](08%20InSales%20API%20-%20Периодические%20счета.md).

## Поля

* `name` — назначение платежа
* `price` — сумма
* `return_url` — адрес уведомления
* `test` — тестовый счёт, оплату можно подтвердить без реального платежа
* `confirmation_url` — страница оплаты, её отдаёт создание счёта
* `status` — `pending`, `accepted` или `declined`

## Создание

`POST /admin/application_charges.json`

```json
{
  "application_charge": {
    "name": "Sms 200",
    "price": 180.0,
    "return_url": "https://myapp.example/charges/15",
    "test": true
  }
}
```

Ответ `201`:

```json
{
  "id": 1,
  "name": "Sms 200",
  "price": "180.0",
  "return_url": "https://myapp.example/charges/15",
  "test": true,
  "status": "pending",
  "confirmation_url": "http://SHOP/admin/application_charges/1",
  "created_at": "2026-09-26T13:21:27.639+03:00",
  "updated_at": "2026-09-26T13:21:27.639+03:00"
}
```

Дальше браузер пользователя открывает `confirmation_url` из этого ответа. Путь страницы берите из поля, не из примера: в ответе приходит готовый адрес.

На `return_url` приходит уведомление. По своему id на этом URL найдите id счёта InSales и прочитайте его.

## Чтение и список

`GET /admin/application_charges/:id.json`

`GET /admin/application_charges.json` — счета этого приложения.

## Отклонение

`POST /admin/application_charges/:id/decline.json` с заголовком `Content-Type: application/json`.

Отклоняется неоплаченный счёт. В ответе тот же объект со `status: declined`.
