# Баннер. ui-banner

Представляет собой ссылку с картинкой и описание внутри.

## Пример использования
````html
<ui-banner-list
	hr-gutter="1rem"
	vr-gutter="1rem"
	layout="mansonry-2-column"
>
	{% for slide in data.blocks %}

		<ui-banner
			class="editable-block"
			cells="12"
			ratio="{{ slide.ratio }}"
			data-block-id="{{ slide.id }}"
			img-src="{{ slide.image }}"
			link="{{ slide.link }}"
			layout="mansonry-item"
			theme="image-hover-shadow, title-bolder, title-margin"
		>
		</ui-banner>
	{% endfor %}
</ui-banner-list>
````

## Параметры

* `ratio` - Определяет соотношение сторон для картинки. Принимает строку формата `n:n`.
* `link` - Ваша ссылка.
* `imgSrc` - Путь к картинке.
* `title` - Описание к картинке соответствует атрибуту title.
* `cells` - Ширина блока.
* `cellsXs` - Ширина блока при ширине экрана `xs`.
* `cellsSm` - Ширина блока при ширине экрана  `sm`.

## Слоты

* `title` - Заголовок.
* `content` - Описание.

## Темизация

### `layout`

* `default` - Устанавливает высоту внутреннего контейнера равной 100%.
* `mansonry-item` - Запрещает перенос контента между колонками.
* `mobile-ratio-fix` - Сбрасывает соотношение сторон установленного картинкам компонента при ширине экрана `xs`.
* `title-bottom-left` - Позиционирует контент из `slot='title'` в нижнем углу картинки.

 ### `color-sheme`

* `default` - Принимает значения по умолчанию.
* `banner_title-background-sub` - Окрашивает в дополнительный цвет фон заголовка.

### `theme`

* `hover-slide-up-title` - Скрывает заголовок при наведении и показывает контент. Выплывает снизу блока.
* `image-hover-scale` - Увеличивает картинку при наведении на блок.
* `image-hover-shadow` - Квадратная тень при наведении на блок.
* `title-bolder` - Жирный шрифт для заголовка.
* `title-margin` - Отступ сверху от заголовка равный `1rem`.
