# Живой поиск по сайту

### Назначение атрибутов

|Атрибут|Назначение|Расположение|
|-|-|-|
|data-search-field|Поле для ввода поискового запроса|Тег form|
|data-search-result|Блок в который записывается результат поиска|Тег form|
|[name="lang"]|Текущий язык|Тег form|


```twig
<form action="/search" method="get">
  <input type="hidden" name="lang" value="{{ language.locale }}">
  <input type="text" name="q" value="" placeholder="Поиск" data-search-field />
  <button type="submit">Поиск</button>
  <div data-search-result></div>
</form>
```



---

### Разметка для поиска

```twig
<form action="/search" method="get">
  <input type="hidden" name="lang" value="{{ language.locale }}">
  <input type="text" name="q" value="" placeholder="Поиск" data-search-field />
  <button type="submit">Поиск</button>
  <div data-search-result></div>
</form>
```


---

## Методы

### setConfig

Обновление настроек

```js
/**
 * @param {number} letters с какого символа начинать поиск
 * @param {number} delay задержка между запросами
 */

 AjaxSearch.setConfig({
   letters: 3,
   delay: 300
 });
```



**События**

> События класса EventBus

* before:insales:search -	Событие срабатывает перед любым взаимодействием с компонетом поиск
* update:insales:search -	Событие срабатывает после обновления результатов поиска
* always:insales:search -	Событие срабатывает после любого взаимодействия с компонетом поиск


```js
EventBus.subscribe('update:insales:search', function (data) {
  console.log(data);
});
```
