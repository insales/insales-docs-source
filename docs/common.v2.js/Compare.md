# Сравнение

## Назначение атрибутов

### data-compare-add

Кнопка для добавления товара в сравнение. После добавления товара по умолчанию получает класс `compare-added`.

```html
<button data-compare-add="{{ product.id }}">
  Добавить товар в сравнение
</button>
```

### data-compare-delete

Кнопка для удаления товара из сравнения. После удаления товара по умолчанию получает класс `compare-not-added`.

```html
<button data-compare-delete="{{ product.id }}">
  Удалить из сравнения
</button>
```

### data-compare-clear

Кнопка удаления всех товаров из сравнения

```html
<button data-compare-clear>
  Очистить сравнение
</button>
```

### data-compare-counter-btn

Ссылка для перехода на страницу сравнения. Если ни одного товара не добавлено, то получает класс `compare-empty`. Может быть удобно для того, чтобы красить ссылку после добавления товаров.

```html
<a href="/compares" data-compare-counter-btn="">
 Сравнение
</a>
```

### data-compare-counter

Счётчик товаров добавленных в сравнение

```html
<span data-compare-counter></span>
```

## Методы класса Compare

### getCompare

Получить текущее состояние сравнения

```js
var compareState = Compare.getCompare();
console.log(compareState);
```
### add

Добавить товар в сравнение

```js
/**
 * @param {number} item id товара
 */
Compare.add({
  item: 123456
});
```


**События**

> События класса EventBus

* before:insales:compares
* add_items:insales:compares
* update_items:insales:compares
* always:insales:compares


```js
EventBus.subscribe('add_item:insales:compares', function (data) {
  console.log('Товар добавлен в сравнение');
});
```

### update

Обновить состояние сравнения

```js
Compare.update();
```

### remove

Удалить товар из сравнение

```js
/**
 * @param {number} item id товара
 */
Compare.remove({
  item: 123456
});
```


**События**

> События класса EventBus

* before:insales:compares
* remove_item:insales:compares
* update_items:insales:compares
* always:insales:compares


```js
EventBus.subscribe('add_item:insales:compares', function (data) {
  console.log('Товар добавлен в сравнение');
});
```

### clear

Удалить все товары из сравнения

```js
Compare.clear();
```