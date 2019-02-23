# Преимущество. ui-benefit
Компонет представляем собой картинку с заголовком и описание. Подходит для представления преимуществ компании.

## Пример использования
```html
<ui-benefit 
	layout="image-left, image-mobile-top"
>
	<img is="ui-image"
		src="{{ benefit.image }}"
		title="{{ benefit.description | escape }}"
		alt="{{ benefit.description | escape }}"
		ratio="1:1"
		data-field-value-handle="image"
		slot="image"
	/>
	
	<ui-editor slot="title">
		<span data-field-value-handle="name">{{ benefit.name | editable }}</span>
		</ui-editor>
		<ui-editor slot="description">
		<span data-field-value-handle="description">{{ benefit.description | editable }}</span>
	</ui-editor>
</ui-benefit>
```

## Параметры

* `vr-gutter` - вертикальный внутрений отступ. По умолачание `1rem`.
* `hr-gutter` - горизонтальный внутрений отступ. По умолачание `1rem`.

## Слоты

* `image` - Картинка.
* `title` - Заголовок.
* `description` - Описание.

## Темизация

 ### `layout`
* `default` - Значение по-умолчанию. Картинка сверху, контент снизу.
* `content-center` - Выравнивание контента по центру.
* `image-left` - Картинка слева, контент справа.
* `image-top` - Картинка сверху-слева. Контент снизу.
* `image-mobile-top` - Меняет раскладу при ширине экрана `sm`, картинка сверху, контент снизу.

### `color-sheme`

* `default` - Значение по-умолчанию. 
* `background-sub` - Окрашивает фон блок в дополнительный цвет.

### `theme`

* `border-left` - Добавляет левую границу блока.
* `title-bold` - Добавляет жирный шрифт для заголовка.
