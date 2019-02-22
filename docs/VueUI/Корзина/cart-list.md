# Компонент списка товаров в корзине. `ui-cart-list`

Используется для вывода списка товаров в корзине

## Пример использования

```html
<ui-cart-list
	layout="default, adaptive-column"
	item-delete-icon="fa fa-trash-o"
	item-image-ratio="1:1"
	empty-state-text="Корзина пуста"
	show-old-price
	caption-item="Товар"
	caption-price="Цена"
	caption-quantity="количество"
	caption-total="Итого"
	caption-delete="Удалить"
>
</ui-cart-list>
```

## Параметры компонента

- `item-image-cover` - Делать ли замещение изображения. Тип Boolean
- `item-image-ratio` - Соотношение сторон картинки товара
- `item-show-sku` - Показывать ли артикль товара. Тип Boolean
- `sku-caption` - Надпись для артикля товара
- `no-icon-remove` - Если true, то иконки удаления товара с корзины не будет
- `caption-remove` - Надпись удаления товара с корзины
- `caption-counter` - Надпись для кол-ва товара
- `empty-state-text` - Надпись для пустой корзины
- `show-old-price` - Показывать ли старую цену. Тип Boolean
- `caption-item` - Надпись для товара в заголовке таблицы.
- `caption-price` - Надпись для цены в заголовке таблицы.
- `caption-quantity` - Надпись для кол-ва в заголовке таблицы.
- `caption-total` - Надпись для итоговой суммы.
- `caption-delete` - Надпись для удаления товара в заголовке таблицы.
- `comment-caption` - Заголовок комментариев корзины
- `comment-placeholder` - Подсказка для инпута ввода комментария
- `read-comment` - Если false, то можно добавить свой комментарий к позиции заказа
- `show-comment` - Показывать ли комментарии заказа

## Темизация

### color-sheme

- `default` - кнопка удаления товара с корзины с прозрачным фоном.

### layouts

- `default` - увеличены отступы по сравнению с `adaptive-column`.
- `adaptive-column` - На маленьких разрешениях экрана блок удаления товара идет наверх от картинки товара.
- `two-column`  - Более узкое расположение карточек товара в корзине.

### themes

- `counter-inline` - названия товаров увеличены, каунтер кол-ва товаров изменен (теперь "плюс" и "минус" друг над другом).
