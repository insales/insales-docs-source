# Кнопка. ui-button

Компонент кнопок.

## Параметры

Компонент кнопок принимать следующие параметры:

- href: Ссылка
- theme: Тема кнопки. Используется как название класса
- type: Тип кнопки `button, submit`
- variant: Вариант стилевого оформления `primary, secondary`. По-умолчанию `primary`
- size: Размер (фактический) кнопки. Значения `xs | s | m | l | xl`. По-умолчанию `m`
- icon: Иконка для кнопки из списка иконок (список иконок находится в файле темы `icons.js`)

## Темизация

### layout

* `default` - значение по-умолачанию
* `collapse-reverse` - Изменяет направление `flex` внутреннего контейнера.

### color-sheme

* `default` - Фон кнопки цвета ссылки, текст контрастный от цвета ссылки.
* `is-text` - Фон кнопки прозрачный, текст цвета текста.
* `transparent` - Фон кнопки прозрачный, текст цвета ссылки.

### themes

* `bold` - Жирный шрифт внутри кнопки.
* `border` - Граница вокруг кнопки.
* `fluid` - `min-height`, `min-widht` равны `100%`.
* `no-padding` - Убирает отступы у кнопки.
* `padding` - Отступ сверху и снизу `1rem`.
* `size_s`, `size_m`, `size_l`, `size_xl` - Устанавливает ширину и высоту кнопки отступами заданными переменными `var(--button-size-s)`, `var(--button-size-m)`, `var(--button-size-l)`, `var(--button-size-xl)`.
* `text-left` - Текст кнопки слева.
* `uppercase` - Преобразует текст кнопки в верхний регистр.

## Ниже представлен вариант исполнения кнопки:

```html
<ui-button
	type="submit"
	icon="filter.section.submit"
	:theme="secondary"
	:href="window.location"
	:icon="currentIcon"
>
	<slot></slot>
</ui-button>
```
