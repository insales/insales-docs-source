# Компонент описания коллекции товаров. ui-collection-description

Компонент для добавления описания коллекции товаров

## Пример использования

```
<ui-collection-description>
	{% unless widget_settings.category_image_hidden or filter.description %}
		{% unless collection.image.original_url contains 'no_image' %}
			<img src="{{ collection.image.original_url }}"
				alt="{{ collection.title | escape }}"
				title="{{ collection.title | escape }}"
				is="ui-image"
				slot="image"
			/>
		{% endunless %}
	{% endunless %}
	
	{% if filter.description %}
		<ui-editor>
			{{ filter.description | editable }}
		</ui-editor>
	{% elsif collection.description %}
		<ui-editor>
			{{ collection.description | editable }}
		</ui-editor>
	{% endif %}
</ui-collection-description>
```

## Параметры компонента

## Слоты:
* `image` - слот для вставки картинки
