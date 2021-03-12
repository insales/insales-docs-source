# Избранное

Страница избранного доступна во всех магазинах по адресу `/favorites`.

Чтобы отредактировать содержимое страницы, добавьте в папку `templates` файл `favorite.liquid`.

В файле `favorite.liquid` будет доступен массив товаров в переменной `products`.

```liquid
{% if products.size > 0 %}
  {% for product in products %}
    <div>
      <div>
        {{ product.title }}
      </div>
      <button data-ui-favorites-delete="{{ product.id }}">
        Удалить из избранного
      </button>
    </div>
  {% endfor %}
{% else %}
  Избранное пусто
{% endif %}
```

## Элементы

### Добавить/удалить

Добавление и удаление можно реализовать 2 способами.

Через кнопку переключатель (`data-ui-favorites-trigger`) или через отдельные кнопки добавления и удаления (`data-ui-favorites-add`/`data-ui-favorites-delete`)

#### data-ui-favorites-trigger

В качестве значения передаётся id товара

Если нужно менять текст при добавлении или удалении, то внутрь нужно добавить элемент с атрибутами `data-ui-favorites-trigger-added-text`, `data-ui-favorites-trigger-not-added-text`

```html
<span data-ui-favorites-trigger="{{ product.id }}">
  <span class="btn-icon icon-heart"></span>
  <span class="btn-text" 
    data-ui-favorites-trigger-added-text="В избранном"
    data-ui-favorites-trigger-not-added-text="Добавить в избранное"
  ></span>
</span>
```

#### data-ui-favorites-add

Добавить в избранное

#### data-ui-favorites-delete

Удалить из избранного

#### data-ui-favorites-clear

Очистить избранное

### Cчётчик

#### data-ui-favorites-counter

Атрибут `data-ui-favorites-counter` отвечает за смену цифр. 
Атрибут `data-ui-favorites-counter-btn` меняет классы состояния избранного.

```
<a href="/favorites" class="header__control-btn header__compare" data-ui-favorites-counter-btn>
  <span class="icon icon-heart">
    <span class="header__control-bage" data-ui-favorites-counter>0</span>
  </span>
</a>
```

## Методы

### add

Добавить товар в избранное. В качестве параметра передаётся id товара.

```
FavoritesProducts.add({ 
  item: 123456 
});
```

### add

Удалить товар из избранного. В качестве параметра передаётся id товара.

```
FavoritesProducts.remove({ 
  item: 123456 
});
```

### clear

Очистить избранное.

```
FavoritesProducts.remove();
```

### update

Обновить состояние.

```
FavoritesProducts.update();
```

## События

### update_items:insales:favorites_products

Список избранного обновлен

```js
EventBus.subscribe('update_items:insales:favorites_products', (data) => {
  console.log(`Товаров в избранном: ${data.products.length}`)
})
```

### add_item:insales:favorites_products

Товар добавлен в избранное 

### remove_item:insales:favorites_products

Товар удален из избранного

```js
EventBus.subscribe('remove_item:insales:favorites_products', (data) => {
  $('.favorites [data-product-id="'+data.action.item+'"]').fadeOut()
})
```

### overload:insales:favorites_products

Достигнуто максимальное кол-во товаров избранного
