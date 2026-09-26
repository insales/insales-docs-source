# Периодические счета приложения

Периодический счёт — ежемесячная оплата приложения. Он один на приложение в магазине. Разовый платёж за действие оформляется отдельно, см. [счета приложения](06%20InSales%20API%20-%20Счета%20приложения.md).

Методы — `RecurringApplicationCharge` в [справочнике](https://api.insales.ru/). В пути нет id: ресурс единственный.

* `POST /admin/recurring_application_charge.json` — создать
* `GET /admin/recurring_application_charge.json` — прочитать
* `PUT /admin/recurring_application_charge.json` — сменить сумму
* `DELETE /admin/recurring_application_charge.json` — удалить, ответ `{ "status": "ok" }`
* `PATCH /admin/recurring_application_charge/add_free_days.json` — добавить бесплатные дни

## Создание

Обязательное поле — `monthly`, сумма в месяц. `trial_expired_at` — дата конца пробного периода. Если её не передать, берётся пробный период приложения.

```json
{
  "recurring_application_charge": {
    "monthly": 200
  }
}
```

Ответ `201`:

```json
{
  "monthly": "200.0",
  "trial_expired_at": "2026-10-10",
  "created_at": "2026-09-26T13:21:27.792+03:00",
  "updated_at": "2026-09-26T13:21:27.792+03:00",
  "paid_till": "2026-10-10",
  "blocked": false
}
```

`paid_till` — до какой даты оплачен доступ. `blocked` — доступ по этому счёту остановлен.

Смена суммы — `PUT` с новым `monthly`. Пробная дата в этом запросе не меняется.

## Бесплатные дни

```json
{
  "recurring_application_charge": {
    "days_count": 3
  }
}
```

В ответе смотрите `paid_till`. `trial_expired_at` при этом тоже может сдвинуться, а может остаться прежней: для проверки срока ориентируйтесь на `paid_till`.
