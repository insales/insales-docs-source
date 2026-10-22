---
seo_title: "Периодические счета приложения — InSales API"
description: "Ежемесячная оплата приложения InSales через RecurringApplicationCharge: создание и управление периодическим счётом магазина."
---

# Периодические счета приложения

Периодический счёт используется для ежемесячной оплаты приложения. В одном магазине у приложения может быть один такой счёт. Для разовой оплаты отдельного действия используйте [счета приложения](06%20InSales%20API%20-%20Счета%20приложения.md).

Методы ресурса `RecurringApplicationCharge` описаны в [справочнике](https://api.insales.ru/). Идентификатор счёта в пути не нужен, поскольку ресурс единственный для приложения в магазине.

* `POST /admin/recurring_application_charge.json` — создать
* `GET /admin/recurring_application_charge.json` — прочитать
* `PUT /admin/recurring_application_charge.json` — сменить сумму
* `DELETE /admin/recurring_application_charge.json` — удалить, ответ `{ "status": "ok" }`
* `PATCH /admin/recurring_application_charge/add_free_days.json` — добавить бесплатные дни

## Создание

Для создания счёта передайте обязательное поле `monthly` — сумму ежемесячной оплаты. В `trial_expired_at` можно указать дату окончания пробного периода. Если поле не передать, InSales использует пробный период из настроек приложения.

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

`paid_till` содержит дату, до которой оплачен доступ. Значение `blocked` показывает, заблокирован ли доступ по этому счёту.

Чтобы изменить сумму оплаты, отправьте `PUT` с новым значением `monthly`. Дата окончания пробного периода при этом не меняется.

## Бесплатные дни

```json
{
  "recurring_application_charge": {
    "days_count": 3
  }
}
```

Чтобы добавить бесплатные дни, отправьте `PATCH /admin/recurring_application_charge/add_free_days.json` с указанным телом.

Проверьте новую дату в `paid_till` из ответа. Дата `trial_expired_at` при этой операции может измениться или остаться прежней, поэтому срок доступа проверяйте по `paid_till`.
