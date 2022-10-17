# EventBus

EventBus (шина событий) предназначена для простого взаимодействия базового функционала с остальными скриптами, не привязываясь при этом к верстке и вспомогательным объектам.

Работает по принципу Pub/Sub (Издатель/Подписчик) и построена на Deferred, что позволяет:

*   привязать к одному событию (Издателю) несколько обработчиков (Подписчиков)
*   обработчики событий сработают, даже если событие произошло раньше того, как мы к нему привязали обработчик
*   не важен порядок объявления Издателя и Подписчиков

Работа с шиной производится через объект EventBus.

### subscribe

В работе с API необходимо привязываться к подписчикам, так как издатели объявлены внутри API.
Например, при добавлении товара в корзину внутри API публикуется событие `add_items:insales:cart`:

```js
EventBus.publish('add_items:insales:cart', data);
```

Данные, которые переданы через EventBus.publish, доступны в подписчике.

```js
EventBus.subscribe('add_items:insales:cart', function (data) {
  console.log('add_items:insales:cart:', data);
});
```

**Параметры**

В данных подписчика всегда доступен объект **action**. Он содержит свойство `method`, а также дополнительные сведения в зависимости от события.

В дополнительных свойствах объекта **action** могут быть:

*   Ссылка на jQuery объект DOM узла, с которым произошло взаимодействие
*   Обновленные данные компонента (Cart, Products и т.д.)
*   Остальное смотреть через console.log или EventBus.logger

```js
/**
 * @param {String} eventId название события
 * @param {function} callback функция обработчик события
 */
```


**Пример**

```js
EventBus.subscribe('event_id', function (data) {
  console.log(data)
});

EventBus.subscribe('add_items:insales:cart', function (data) {
  console.log('Товар добавлен');
});
```


### publish

Публикация события

**Параметры**

```js
/**
 * @param {String} eventId название события
 * @param {Object} data любой тип данных, преимущественно `Object`
 */
```


**Пример**

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

Список компонентов:

- cart
- product
- search
- compares
- favorites_products
- quick_checkout

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
