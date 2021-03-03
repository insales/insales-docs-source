# Сравнение

## Интерфейс

> Для быстрого создания интерфейсов в commonjs предусмотрены готовые обработчики форм.

> Обработчики ссылаются на data-атрибуты. В data-атрибуты пробрасывается информация из liquid.

### Кнопки добавить/удалить из сравнения

```html
<button data-compare-add="{{ product.id }}">
  Добавить товар в сравнение
</button>
<button data-compare-delete="{{ product.id }}">
  Удалить из сравнения
</button>
```


## Методы

> Методы класса `Compare`

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



### getCompare

Получить текущее состояние сравнения

```js
var compareState = Compare.getCompare();
console.log(compareState);
```

### update

Обновить состояние сравнения

```js
Compare.update();
```
