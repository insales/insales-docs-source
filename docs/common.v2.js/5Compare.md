# Сравнение

Страница сравнения доступна во всех магазинах по адресу `/compares`.

Чтобы отредактировать содержимое страницы, добавьте в папку `templates` файл `compare.liquid`. Массив товаров будет доступен в Liquid-переменной `products`.

В сравнение можно добавлять только товары, выбранные варианты не сохраняются.

## Назначение атрибутов

### data-compare-add

Кнопка для добавления товара в сравнение. После добавления товара по умолчанию получает класс `compare-added`. В качестве значения необходимо передать ID товара.

```html
<button data-compare-add="{{ product.id }}">
  Добавить товар в сравнение
</button>
```

### data-compare-delete

Кнопка для удаления товара из сравнения. После удаления товара по умолчанию получает класс `compare-not-added`. В качестве значения необходимо передать ID товара.

```html
<button data-compare-delete="{{ product.id }}">
  Удалить из сравнения
</button>
```
### data-compare-trigger

Кнопка-переключатель при нажатии на которую товар добавляется/удаляется из сравнения. В зависимости от состояния кнопка получает классы `compare-added` или `compare-not-added`. В качестве значения необходимо передать ID товара.

```html
<button data-compare-trigger="{{ product.id }}">
  <!-- Здесь может быть иконка или текст кнопки -->
</button>
```

Если при добавлении/удалении необходимо менять текст кнопки, то внутри должен быть дочерний элемент с атрибутами `data-compare-trigger-added-text` и `data-compare-trigger-not-added-text`:

```html
<button data-compare-trigger="{{ product.id }}">
  <span 
    data-compare-trigger-added-text="В сравнении"
    data-compare-trigger-not-added-text="Добавить в сравнение"
  ></span>
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

Ссылка для перехода на страницу сравнения. Если ни одного товара не добавлено, то получает класс `compare-empty`. Это может быть удобно для того, чтобы красить ссылку после добавления товаров.

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
 * @param {number} item ID товара
 */
Compare.add({
  item: 123456
});
```

### remove

Удалить товар из сравнения

```js
/**
 * @param {number} item ID товара
 */
Compare.remove({
  item: 123456
});
```

### clear

Удалить все товары из сравнения

```js
Compare.clear();
```

### update

Обновить состояние сравнения

```js
Compare.update();
```

## События

| Событие                            | Описание                                                        |
|------------------------------------|-----------------------------------------------------------------|
| before:insales:compares            | Срабатывает перед любым взаимодействием с компонентом сравнения |
| always:insales:compares            | Срабатывает после любого взаимодействия с компонентом сравнения |
| update_items:insales:compares      | Обновление товаров в сравнении                                  |
| add_item:insales:compares          | Добавление товара в сравнение                                   |
| remove_item:insales:compares       | Удаление товара из сравнения                                    |
| overload:insales:compares          | Достигнуто максимальное количество товаров в сравнении              |

**Пример подписки на событие**

```js
EventBus.subscribe('add_item:insales:compares', function (data) {
  console.log('Товар добавлен в сравнение', data);
}); 
```
