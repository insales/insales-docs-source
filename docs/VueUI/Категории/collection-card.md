# Карточка товара. ui-collection-card

Данный компонент используется для вывода информации о категории, например в виджетах подкатегорий.

## Пример использования

````html
<a is="ui-collection-card"
href="{{ collection.url }}"
theme="text-left, image-full"
>
	<img is="ui-image"
		src="{{ image }}"
		title="{{ collection.title | escape }}"
		ratio="2:1"
		slot="image"
	>
	<div slot='title'>
		{{ collection.title }}
	</div>
	
	{% unless widget_settings.hide_description %}
		{% if widget_settings.desc_limit != "all" %}
			<div slot='description'>{{ collection.description | strip_html | truncatewords: widget_settings.desc_limit }}</div>
		{% else %}
			<div slot='description'>{{ collection.description | strip_html }}</div>
		{% endif %}
	{% endunless %}
</a>
````

## Параметры

Данный компонент поддерживает следующие параметры:

* `direction` - ориентация раскладки дочерних блоков. Доступны значения `row`, `column`.
* `href` - Добавление ссылки(если требуется).

## Темизация

### layout

* `default` - Горизонтальная раскладка, блоки выстраиваются по порядку.

### color-sheme

* `default` - Стандартные цветовые настройки.

### themes
* `image-full` - Изображение категории во всю ширину блока.
* `no-shadow` - Убираем тень при наведении.
* `text-center` - Заголовок и описание выровнены по центру.
* `text-left` - Заголовок и описание выровнены по левому краю.
