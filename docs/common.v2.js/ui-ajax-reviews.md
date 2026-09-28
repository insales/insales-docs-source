---
seo_title: "AJAX-отзывы — common.v2.js InSales"
description: "Вывод отзывов магазина InSales через AJAX: data-ajax-reviews, параметры списка, шаблоны разметки и настройка common.v2.js."
---

# AJAX-отзывы

Компонент выводит список отзывов магазина по шаблонам в разметке. Форма отправки отзыва описана отдельно: [форма отзыва к товару](/common.v2.js/ui-reviews/).

## Разметка

Корень — `data-ajax-reviews`. Список — `data-ajax-reviews-list`. В значении списка лежит JSON:

| Поле | Назначение |
|---|---|
| reviewscollection | Набор отзывов. Значение `nospam` исключает спам |
| limit | Сколько отзывов запросить и показать |
| rating | Минимальная оценка. `0` — без ограничения, иначе уходят оценки от этого числа до 5 |
| sort | Порядок по дате, уходит как `created_asc` |
| unique | Строка. Пустая строка допустима |

Шаблон отзыва — `data-ajax-reviews-list-item-template`, корневой элемент шаблона — `data-ajax-reviews-list-item`.

| Атрибут внутри шаблона | Что подставляется |
|---|---|
| data-ajax-reviews-list-item-author | Автор |
| data-ajax-reviews-list-item-product | Название товара |
| data-ajax-reviews-list-item-product-url | Ссылка на товар |
| data-ajax-reviews-list-item-content | Текст |
| data-ajax-reviews-list-item-rating | Оценка |
| data-ajax-reviews-list-item-date | Дата |
| data-ajax-reviews-list-item-image | Изображение |
| data-ajax-reviews-list-item-reply | Ответ магазина |
| data-ajax-reviews-list-item-reply-date | Дата ответа |
| data-ajax-reviews-list-item-reply-container | Блок ответа |
| data-ajax-reviews-list-item-reply-title | Заголовок ответа |

Картинка собирается из шаблона `data-ajax-reviews-list-item-image-template`. Индекс правила ресайза задаётся атрибутом `data-ajax-reviews-image-resizing-rules-index` на элементе `data-ajax-reviews-list-item-picture`.

Пока список грузится, у корня есть класс `ajax-reviews-is-loading`. После отрисовки список получает класс `ajax-reviews-is-init`. Если отзывов нет, корень скрывается.

## Запуск

Список рисуется после события `ui-ajax-reviews:load-reviews-list`. В событие передаётся DOM-элемент с `data-ajax-reviews-list`.

```js
document.querySelectorAll('[data-ajax-reviews-list]').forEach(function (node) {
  EventBus.publish('ui-ajax-reviews:load-reviews-list', node);
});
```

Когда отзывы вставлены в страницу, приходит `init-reviews:ui-ajax-reviews`. В данных есть `reviewsListNode`.

```js
EventBus.subscribe('init-reviews:ui-ajax-reviews', function (data) {
  console.log(data.reviewsListNode);
});
```

После обновления виджета с `data-widget-id` список можно запросить тем же событием ещё раз.
