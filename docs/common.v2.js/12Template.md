---
seo_title: "Lodash-шаблоны — common.v2.js InSales"
description: "Компонент Template в common.v2.js: хранение и получение Lodash-шаблонов, разметка и использование шаблонов в скриптах магазина InSales."
---

# Lodash шаблоны

Компонент «Template» отвечает за хранение и получение шаблонов написанных на шаблонизаторе библиотеки Lodash.

## Разметка

Шаблоны записываются в тег script с обязательными атрибутами `type`, `data-template-id`.

```html
<script type="text/template" data-template-id="option-select">
 <div class="<%= classes.option %> is-select">
   <label class="<%= classes.label %>"><%= title %></label>
   <select class="<%= classes.values %>" data-option-bind="<%= option.id %>">
     <% _.forEach(values, function (value){ %>
       <option
         <%= value.controls %>
         <%= value.state %>
       >
         <%= value.title %>
       </option>
     <% }) %>
   </select>
 </div>
</script>
```

## Методы

> Методы класса `Template`

### load

Загрузка нового шаблона в список


```js
/**
* @param {string} template_body - верстка шаблона
* @param {string} template_id - название шаблона
 */
Template.load('<button class="button button--click_me"><%= title %></button>', 'test-button')
```


### render

Собрать HTML по уже загруженному шаблону. Метод корректно работает после `DOMContentLoaded`: до этого момента шаблоны из разметки ещё не прочитаны. Если шаблона с таким id нет, метод возвращает пустую строку.

Синтаксис тела шаблона — `<%= %>`, `<% %>` и функции lodash, например `_.forEach`.


```js
/**
* @param {Object} templateData - информация для шаблонизатора
* @param {string} template_id - название шаблона
*
* @return {string} html
 */
$(targetNode).html(Template.render({ title: 'Click me!' }, 'test-button' ));
```

### has

Проверить, есть ли шаблон с указанным id.

```js
Template.has('test-button');
```

### getTemplate

Вернуть функцию шаблона по id. Если шаблон не загружен, результат пустой.

```js
var compiled = Template.getTemplate('test-button');
```

### addCompiled

Положить в список уже собранную функцию шаблона.

```js
/**
* @param {function} compiledTemplate - функция шаблона
* @param {string} template_id - название шаблона
 */
Template.addCompiled(compiledTemplate, 'test-button');
```

## Встроенные шаблоны

Библиотека заранее содержит шаблоны:

- `option-default`
- `option-select`
- `option-select-image`
- `option-radio`
- `option-span`
- `option-preview`
- `option-preview-text`
- `search-default`

Свой шаблон с тем же `data-template-id` заменяет встроенный.
