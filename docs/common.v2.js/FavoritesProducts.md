# Избранное

Страница избранного доступна во всех магазинах по адресу `/favorites`.

Чтобы отредактировать содержимое страницы, добавьте в папку `templates` файл `favorite.liquid`. Массив товаров будет доступен в Liquid-переменной `products`.

В избранные можно добавлять только товары, выбранные варианты не сохраняются.

Список товаров сохраняется в аккаунте пользователя.

Если пользователь авторизуется с разных устройств, список будет одинаковый.

Для оптимизации, список кэшируется на 15 секунд, поэтому если быстро добавлять товары с разных устройств или разлогиниваться, счётчик может показывать старые значения.

## Назначение атрибутов

### data-ui-favorites-add

Кнопка для добавления товара. После добавления товара по умолчанию получает класс `favorites-added`. В качестве значения необходимо передать ID товара.

```html
<button data-ui-favorites-add="{{ product.id }}">
  Добавить товар в избранное
</button>
```
### data-ui-favorites-delete

Кнопка для удаления товара. После удаления товара по умолчанию получает класс `favorites-not-added`. В качестве значения необходимо передать ID товара.

```html
<button data-ui-favorites-delete="{{ product.id }}">
  Удалить из избранных
</button>
```
### data-ui-favorites-trigger

Кнопка-переключатель при нажатии на которую товар добавляется/удаляется из избранного. В зависимости от состояния, кнопка получает классы `favorites-added` или `favorites-not-added`. В качестве значения необходимо передать ID товара.

```html
<button data-ui-favorites-trigger="{{ product.id }}">
  <!-- Здесь может быть иконка или текст кнопки -->
</button>
```

Если при добавлении/удалении необходимо менять текст кнопки, то внутри должен быть дочерний элемент с атрибутами `data-ui-favorites-trigger-added-text` и `data-ui-favorites-trigger-not-added-text`:

```html
<button data-ui-favorites-trigger="{{ product.id }}">
  <span 
    data-ui-favorites-trigger-added-text="В избранном"
    data-ui-favorites-trigger-not-added-text="Добавить в избранное"
  ></span>
</button>
```

### data-ui-favorites-clear

Кнопка для удаления всех избранных товаров

```html
<button data-ui-favorites-clear>
  Очистить
</button>
```

### data-ui-favorites-counter-btn

Ссылка для перехода на страницу избранного. Если ни одного товара не добавлено, то получает класс `favorites-empty`. Это может быть удобно для того, чтобы красить ссылку после добавления товаров.

```html
<a href="/favorites" data-ui-favorites-counter-btn>
 Избранное
</a>
```

### data-ui-favorites-counter

Счётчик товаров добавленных в избранное

```html
<span data-ui-favorites-counter></span>
```

## Методы класса FavoritesProducts

### getFavoritesProducts

Получить текущее состояние избранного

```js
var favoritesState = FavoritesProducts.getFavoritesProducts();
console.log(favoritesState);
```

### add

Добавить товар в избранное

```js
/**
 * @param {number} item ID товара
 */
FavoritesProducts.add({
  item: 123456
});
```

### remove

Удалить товар из избранного

```js
/**
 * @param {number} item ID товара
 */
FavoritesProducts.remove({
  item: 123456
});
```

### clear

Очистить избранное

```js
FavoritesProducts.remove();
```

### update

Обновить состояние

```js
FavoritesProducts.update();
```

## События

| Событие                                 | Описание                                                         |
|-----------------------------------------|------------------------------------------------------------------|
| before:insales:favorites_products       | Срабатывает перед любым взаимодействием с компонентом избранного |
| always:insales:favorites_products       | Срабатывает после любого взаимодействия с компонентом избранного |
| update_items:insales:favorites_products | Список избранного обновлен                                       |
| add_item:insales:favorites_products     | Товар добавлен в избранное                                       |
| remove_item:insales:favorites_products  | Товар удален из избранного                                       |
| overload:insales:favorites_products     | Достигнуто максимальное количество избранных товаров             |


**Пример подписки на событие**

```js
EventBus.subscribe('add_item:insales:favorites_products', function (data) {
  console.log('Товар добавлен в избранное', data);
}); 
```
