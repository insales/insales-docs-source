# Lodash шаблоны

Компонет «Template» отвечает за хранение и получение шаблонов написанных на шаблонизаторе библиотеки lodash.

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

Загрузка нового шаблона в список


```js
/**
* @param {Object} templateData - информация для шаблонизатора
* @param {string} template_id - название шаблона
 */
$(targetNode).html(Template.render({ title: 'Click me!' }, 'test-button' ));
```
