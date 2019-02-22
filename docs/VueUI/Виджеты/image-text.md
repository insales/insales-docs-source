# Текс с картинкой. ui-image-text

Компонент выводит изображение с текстом.

## Пример использования

```html
<ui-image-text
	hr-position="{{ block.horizontal_position }}"
	vr-position="{{ block.vertical_position }}"
>
	<img is="ui-image"
		src="..src/image.png"
		title="title"
		alt="alt"
		data-field-value-handle="image"
		slot="image"
	>
	<ui-editor slot="content">
		Контент...
	</ui-editor>
</ui-image-text>
```

## Параметры

Данный компонент поддерживает следущие параметры:
* `hrPosition` - Горизонтальная позиция картинки. Доступные значение `left`, `right`.
* `vrPosition` - Вертикальная позиция картинки. Доступные значение `top`, `center`, `bottom`.

## Слоты

* `image`
* `content`
