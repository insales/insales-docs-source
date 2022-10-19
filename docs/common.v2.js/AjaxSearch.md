# Живой поиск по сайту

## Назначение атрибутов

|Атрибут|Назначение|Расположение|
|-|-|-|
|data-search-field|Поле для ввода поискового запроса|Тег form|
|data-search-result|Блок, в который записывается результат поиска|Тег form|
|[name="lang"]|Текущий язык|Тег form|

### Пример разметки

```html
<form action="/search" method="get">
  <input type="hidden" name="lang" value="{{ language.locale }}">
  <input type="text" name="q" value="" placeholder="Поиск" data-search-field />
  <button type="submit">Поиск</button>
  <div data-search-result></div>
</form>
```

## Методы

### setConfig

Обновление настроек

```js
/**
 * @param {number} letters с какого символа начинать поиск
 * @param {number} delay задержка между запросами
 * @param {boolean} hide_items_out_of_stock нужно ли скрывать товары, которых нет в наличии
 */

 AjaxSearch.setConfig({
   letters: 3,
   delay: 300,
   hide_items_out_of_stock: true
 });
```

## События

| Событие               | Описание                                                     |
|-----------------------|--------------------------------------------------------------|
| before:insales:search | Срабатывает перед любым взаимодействием с компонентом поиска |
| update:insales:search | Срабатывает после обновления результатов поиска              |
| always:insales:search | Срабатывает после любого взаимодействия с компонентом поиска |

**Пример подписки на событие**

```js
EventBus.subscribe('update:insales:search', function (data) {
  console.log(data);
});
```
