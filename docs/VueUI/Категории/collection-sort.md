# Компонент сортировки `ui-collection-sort`

Компонент для вывода панели сортировки и выбора кол-ва выводимых товаров на странице

## Пример использования
```
<ui-collection-sort
	layout="{{ sort_layout }}"
	color-sheme="{{ sort_color_sheme }}"
	theme="{{ sort_theme }}"
	:order-options="{{ order_options }}"
	:page-size-options="{{ page_size_options }}"
>
</ui-collection-sort>
```

## Параметры компонента
* `vr-gutter` -  вертикальный отступ. По-умолчанию 0.5rem
* `hr-gutter` - горизонтальный отступ. По-умолчанию 0.5rem
* `order-options` - Параметры для сортировки. Принимает массив обьектов с ключами `value` и `label`. Пример параметров:
```
[{ value: '', label: '{{ messages.label_sort }}' }, { value: 'price', label: '{{ messages.sort_by_price }}' }, { value: 'descending_price', label: '{{ messages.sort_by_price_desc }}' }, { value: 'descending_age', label: '{{ messages.sort_by_createdon }}' }, { value: 'title', label: '{{ messages.sort_by_title }}' }]
```
* `page-size-options` - Параметры для выводимого кол-ва товаров. Максимальное - 100 товаров на странице. Принимает массив обьектов с ключами `value` и `label`. Пример параметров:
```
[{ value: '12', label: '12'}, { value: '24', label: '24'}, { value: '48', label: '48'}, { value: '96', label: '96'}]
```

## Темизация

### color-sheme

* `default` -  Кнопки сортировки залиты цветом фона

### layout

* `default` -  Кнопки сортировки прибиты к правому краю

### themes

* `bordered-item` - У кнопок сортировки появляются видимые границы
