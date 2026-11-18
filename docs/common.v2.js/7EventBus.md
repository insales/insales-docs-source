---
seo_title: "EventBus — шина событий common.v2.js InSales"
description: "Как публиковать события в EventBus InSales, подписываться через listen и subscribe и снимать подписки вручную или через AbortSignal."
---

# EventBus

Шина событий `EventBus` связывает модули витрины и скрипты темы. Один скрипт публикует событие по имени, а другие получают его данные в зарегистрированных обработчиках.

## Последние данные события {#event-memory}

Шина запоминает последние данные каждого опубликованного события. При вызове `subscribe` или `listen` обработчик может выполниться синхронно, ещё до возврата из метода. Подготовьте всё, что ему понадобится, до подписки. Последние данные хранятся и после снятия всех подписок на событие.

## Методы

### listen

`EventBus.listen(events, handler, options?)` подписывает обработчик на событие и возвращает функцию отписки. В `events` передайте имя или массив имён событий, в `handler` — функцию или массив функций. Массивы обработчиков могут быть вложенными. Функция отписки снимает все регистрации этого вызова `listen`. Её можно вызвать повторно.

```js
const stopListening = EventBus.listen('add_items:insales:cart', data => {
  console.log('Товар добавлен', data);
});

// Вызовите при завершении работы компонента.
// stopListening();
```

Чтобы снять несколько подписок одновременно, передайте им один `AbortSignal` в `options.signal`.

```js
const controller = new AbortController();
const options = { signal: controller.signal };

EventBus.listen('add_items:insales:cart', data => {
  console.log('Товар добавлен', data);
}, options);

EventBus.listen('update_items:insales:cart', data => {
  console.log('Корзина обновлена', data);
}, options);

// Вызовите при завершении работы компонента.
// controller.abort();
```

Если сигнал уже отменён, `listen` пропускает регистрацию. Вызов `abort()` из обработчика останавливает оставшиеся вызовы подписок, связанных с этим сигналом. Используйте заранее созданный `AbortController`, если обработчик может отменить подписку при получении последних данных. Функция отписки в этот момент ещё может быть недоступна.

В виджетах передавайте `lifecycle.signal`. [Жизненный цикл виджетов](widget-lifecycle.md)

### subscribe

Метод `EventBus.subscribe(events, handler)` регистрирует подписку. Передайте имя события или массив имён. Для одного события можно зарегистрировать несколько обработчиков. Каждая повторная регистрация той же функции добавляет отдельный вызов.

Например, при добавлении товара в корзину API публикует событие `add_items:insales:cart`. Обработчик получает опубликованные данные:

```js
EventBus.subscribe('add_items:insales:cart', function (data) {
  console.log('add_items:insales:cart:', data);
});
```

Состав данных зависит от события. Например, в событиях корзины `data.action.method` содержит имя операции, а в `data.action` также могут быть ссылки на элементы в виде jQuery-объектов. Чтобы увидеть данные конкретного события, выведите их в консоль из обработчика или подключите `EventBus.logger`.

### unsubscribe

Метод `EventBus.unsubscribe(events, handler)` снимает все регистрации той же функции, сделанные через `subscribe` для указанных событий. Храните ссылку на исходную функцию. Для подписок через `listen` используйте возвращённую функцию отписки или отмену сигнала.

```js
function onCartUpdate(data) {
  console.log(data);
}

EventBus.subscribe('update_items:insales:cart', onCartUpdate);

// Вызовите при завершении работы компонента.
// EventBus.unsubscribe('update_items:insales:cart', onCartUpdate);
```


### publish

Метод `EventBus.publish(events, data)` публикует данные для одного события или для массива имён событий. Обработчик получает `data` как первый аргумент. Можно передать значение любого типа.

```js
EventBus.publish('event_id', {
  isTest: true,
  title: 'Test',
  status: 'ok'
});
```

### logger.add

Добавление логера для компонента

**Параметры**

Имя компонента — последняя часть имени события после двоеточия. Например, для `add_items:insales:cart` это `cart`.

Список компонентов:

- cart
- product
- item
- search
- compares
- favorites_products
- quick_checkout
- ui_product
- ui_feedback
- ui_comments
- ui_reviews
- ui_accessories
- ui_add-cart-counter

```js
/**
 * @param {String} componentTitle название компонента
 */
EventBus.logger.add('cart')
```

**Пример**

```js
EventBus.logger.add('cart')
EventBus.logger.add('product')
```
