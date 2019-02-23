# Компонент вывода продуктов сравнения `ui-products`

Предназначен для вывода товаров в сравнении

## Пример использования

```html
<ui-compare-products
	v-if="show"
	:products="products"
	:options="slider"
	
	@change="handleChange"
/>
```

## Параметры компонента

- `products` - Массив продуктов которые нужно вывести. Берется из события `update_items:insales:compares`.
- `options` - Обьек опций для слайдера
