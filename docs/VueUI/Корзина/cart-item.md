# Компонент товара в корзине. `ui-cart-item`

Служит для вывода информации о товаре в корзине, его кол-ве и цене. Используется в связке с компонентом `cart-list`

## Пример использования

```html
<ui-cart-item
	:item="item"
	:image-cover="itemImageCover"
	:image-ratio="itemImageRatio"
	:show-sku="true"
	:sku-caption="14551252"
	:show-old-price="false"
	:caption-remove="Удалить"
	:caption-counter="кол-во"
	:read-comment="false"
	:show-comment="true"
	:comment-caption="Комментарии к заказу"
/>
```

## Параметры компонента

- `show-old-price` - Показывать ли старую цену.Тип Boolean
- `image-cover` - Делать ли замещение изображения. Тип Boolean
- `image-contain` - Делать ли вписывание изображения в контейнер.Тип Boolean
- `image-ratio` - Соотношение сторон картинки товара
- `read-comment` - Если false, то можно добавить свой комментарий к позиции заказа
- `show-comment` - Показывать ли комментарии заказа. Тип Boolean
- `comment-caption` - Заголовок комментариев корзины
- `comment-placeholder` - Подсказка для инпута ввода комментария
- `show-sku` - Показывать ли артикль товара.Тип Boolean
- `no-icon-remove` - Если true, то иконки удаления товара с корзины не будет
- `caption-remove` - Надпись удаления товара с корзины
- `sku-caption` - Надпись для артикля товара
- `caption-counter` - Надпись для кол-ва товара
- `product-id` - id товара
- `item` - обьект товара корзины
