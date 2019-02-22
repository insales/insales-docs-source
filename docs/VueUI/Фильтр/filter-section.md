# Компонент секции фильтра. `ui-filter-section`

Предназначен для вывода секции фильтра

## Пример использования

```html
<ui-filter-section
	title="{{ option.title | escape }}"
	data-view="checkbox"
	data-type="options"
	data-id="{{ option.id }}"
	:options="{{ options | escape | strip_newlines }}"
	hide-submit
>
</ui-filter-section>
```

## Параметры компонента

- `type` - Тип секции (`range`,`checkbox`)
- `dataType` - Тип данных (`characteristics`,`options`)
- `dataId` - Id характеристики/опции
- `options` - Массив данных для вывода (`value` и `name`)
- `rangeData` - Обьект данных для вывода ползунка `ui-range`
- `selected` - Массив или Обьект для вывода выбранных чекбоксов
- `loaded` - флаг для старта вывода `ui-range`

## Темизация

### color-sheme

* `default` - Название секции фильтра цветом текста, итемы контрастным цветом текста
* `mono` - Название секции фильтра залито фоном

### layout

* `default` - Внизу граница
* `row-item` - Кнопка секции растянута на 100%

### themes

* `border` - секция с обводкой
