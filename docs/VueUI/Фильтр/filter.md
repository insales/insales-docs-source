# Компонент фильтра `ui-filter`

Позволяет выводить товары в каталоге лишь с определенно заданными параметрами/характеристиками

## Пример использования

```html
<ui-filter
	action="{{ collection.url }}"
	caption-apply="{{ messages.button_apply }}"
	caption-reset="{{ messages.button_reset_filters }}"
	icon-clear="fa fa-remove"
	:icon-toggle="['fa fa-angle-down', 'fa fa-angle-up']"
>
	{% unless hide_heading %}
		<div class="sidebar-block-heading" slot="title">
			{{ heading_messages }}
		</div>
	{% endunless %}

	{% assign coll_min = collections[collection.handle].products_price_min | round: 0 %}
	{% assign coll_max = collections[collection.handle].products_price_max | round: 0 %}

	<ui-filter-section
		title="{{ messages.label_price }}"
		data-view="range"
		data-type="price"
		:range-data="{ min: {{ coll_min }}, max: {{ coll_max }}}"
		hide-submit
	>
	</ui-filter-section>
</ui-filter>
```

## Параметры компонента

- `action` - принимает url коллекции по которой будет искать характеристики и параметры
- `caption-apply` -Надпись для кнопки применения фильтра
- `caption-reset` - Надпись для кнопки сброса фильтра

## Темизация

### color-sheme

- `default` -  Фильтр залит фоном
- `mono` - Не залит

### layout

- `default` - Кнопки без заливки с обводкой.
- `row` - кололки фильтров минимум с шириной 220px

### themes

- `btn-decor-underline` - кнопки с подчеркиванием
