# Компонент ввода купона в корзине. `ui-cart-discount-form`

Компонент для отображения поля ввода купона в корзине

## Пример использования
```html
<ui-cart-discount-form
	button-icon="fa fa-arrow-right"
	placeholder="Введите промокод"
	coupon="{{ cart.coupon }}"
	:enable-coupon="{{ cart.enable_coupon? }}"
></ui-cart-discount-form>
```

## Параметры компонента

- `button-сaption` - Надпись на кнопке отправки купона
- `placeholder` - Подсказка в поле для ввода купона
- `coupon` - Введенный код купона
- `enable-сoupon` - Включен ли купон в бекофисе.

## Темизация

### color-sheme

- `btn-transparent` - кнопка отправки купона с прозрачным фоном

### layouts

- `default` - Стандартное поле ввода с кнопкой и инпутом высотой 48px
- `between`  - Компонент растягивается на всю строку.

### themes

- `btn-border` - Кнопка с границей
- `collapse` - Компонент на всю ширину строки
