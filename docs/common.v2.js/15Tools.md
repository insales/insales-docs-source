# Tools

`Tools` — набор функций для адреса страницы и готовности документа.

## Tools.url

Разбор текущего адреса.

| Свойство или метод | Что возвращает |
|---|---|
| location | `window.location` |
| keys | Параметры query. У каждого ключа массив значений |
| search | Собранная строка query, начиная с `?` |
| selectedFilter | Фильтр коллекции: `characteristics`, `options`, `properties`, `price` и остальные параметры |
| collection | Permalinks сегмента `collection` в пути |
| collectionFilter | Второй сегмент после `collection`, если он есть |
| getKeyValue(key) | Первое значение параметра или `false` |
| getKeysValue(keys) | Объект только с переданными ключами |
| collectSearch(keys) | Собрать query из объекта параметров. Без аргумента берётся `keys` |

```js
var lang = Tools.url.getKeyValue('lang');
var filter = Tools.url.selectedFilter;
```

Значения `true` и `false` в query читаются как булевы.

## Tools.getLinkCurrentLang

Добавляет или заменяет параметр `lang` в ссылке на текущий язык магазина. Внешние адреса другого сайта не меняются. Якоря и ссылки, в которых язык уже есть, этим методом обычно не обрабатывают.

```js
var href = Tools.getLinkCurrentLang('/collection/all', Tools.url.getKeyValue('lang'));
```

Ссылки внутри элемента `data-multi-lang="true"` получают текущий язык сами: у ссылки не должно быть `lang` в адресе, и она не должна начинаться с `#`.

```html
<div data-multi-lang="true">
  <a href="/collection/all">Каталог</a>
</div>
```

## Tools.domReady

Вызвать функцию после `DOMContentLoaded`. Если страница восстановлена из кэша браузера, функция вызывается ещё раз.

```js
Tools.domReady(function () {
  console.log('Страница готова');
});
```

## Tools.translit

Транслитерация строки. Пробелы и знаки препинания заменяются на `_`.

```js
var translit = new Tools.translit();
translit.replace('Категория товара');
```

## Человекочитаемые адреса фильтров

Если в настройках страницы включены человекочитаемые URL, фильтр коллекции подставляет в адрес permalink свойств и характеристик вместо числовых id.

Признак включения:

```js
var settings = Shop.config.get('human_readable_urls');
var enabled = settings && settings.human_readable_urls;
```

Для обычной формы фильтра, без AJAX, данные коллекции можно положить в атрибут `data-collection`. Значение — JSON ответа коллекции со статусом `ok`. Если атрибута нет, данные берутся из `collectionData` или `collection` на странице, а затем из запроса текущей коллекции.

AJAX-фильтр использует те же адреса, когда настройка включена.
