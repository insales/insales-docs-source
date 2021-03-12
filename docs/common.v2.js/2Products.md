# Товар

## Назначение атрибутов

![](/img/product-sheme.jpg)

## Пример разметки товара

```twig
<form action="{{ cart_url }}" method="post" data-product-id="{{ product.id }}">
  <div class="product__sku">
    <span data-product-card-sku='{
        "skuLabel": "Артикул."
      }'
    ></span>
  </div>

  <span data-product-card-available='{
      "availableText": "Товар в наличии",
      "notAvailableText": "Нет в наличии"
    }'
  >
  </span>

  <div data-product-card-old-price></div>
  <div data-product-card-price></div>

  {% if product.show_variants? %}
    <select name="variant_id" data-product-variants='{"default": "option-radio"}'>
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title | escape }}</option>
      {% endfor %}
    </select>
  {% else %}
    <input type="hidden" name="variant_id" value="{{product.variants.first.id}}" >
  {% endif %}

  <input type="text" name="comment" value="">

  <div data-quantity data-min="1">
    <input type="text" name="quantity" value="1" />
    <span data-quantity-change="-1">-</span>
    <span data-quantity-change="1">+</span>
  </div>

  <button type="submit" data-item-add>
    Добавить в корзину
  </button>

  {% if account.quick_checkout.enabled %}
    <button data-quick-checkout="[data-product-id='{{ product.id }}']">
      Купить в 1 клик
    </button>
  {% endif %}
</form>
```

### Атрибуты корневого элемента

#### data-product-id

Обязательный атрибут для инициализации товара, принимает id товара

#### data-product-without-cache

Отключить кеширование информации о данном товаре

#### data-product-json

Передать данные о товаре через ликвид. Это может ускорить отображение селектора модификаций

```
data-product-json="{{ product|json|escape }}"
```

#### data-set-config

Передать настройки товара через дата атрибут

```
<form action="{{ cart_url }}" data-set-config='{"decimal": {"kgm": 1}}' method="post" data-product-id="{{ product.id }}">
```

### Вложенные элементы

#### data-product-variants

Выбрать вариант для добавления в корзину.

Вариант состоит из свойств, например "Красный/42, Синий/38".

Каждое свойство нужно отобразить отдельно.

Для отображения свойств, нужно добавить атрибут `data-product-variants` в селект со списком вариантов.

В качестве значения можно передать вид отображения свойств.

Доступные виды:

- option-select
- option-span
- option-radio
- option-preview
- option-default (option-select)

Разметка для видов храниться в commonjs как lodash шаблоны.

В следующем примере установлен вид по умолчанию `option-select`, для свойства "Цвет" `option-preview`, для свойства "Размер" `option-span`.

```
  {% if product.show_variants? %}
    <select name="variant_id" data-product-variants='{
      "default": "option-select",
      "Цвет": "option-preview",
      "Размер": "option-span"
    }'>
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title | escape }}</option>
      {% endfor %}
    </select>
  {% else %}
    <input type="hidden" name="variant_id" value="{{product.variants.first.id}}" >
  {% endif %}
```

##### Шаблоны для вывода свойств

Можно написать свой шаблон для выбора свойств. 

В разметку нужно добавить тег script с дата атрибутом `data-template-id` в качестве значения указывается id шаблона.

```
<script type="text/template" data-template-id="custom-span">
  <div class="<%= classes.option %> is-span">
    <label class="<%= classes.label %>"><%= title %></label>
    <div class="<%= classes.values %>">
      <% _.forEach(values, function (value){ %>
        <button class="<%= value.classes.all %> is-span"
          <%= value.controls %>
          <%= value.state %>
        >
          <%= value.title %>
        </button>
      <% }) %>
    </div>
  </div>
</script>
```

После чего можно указать свой шаблон по умолчанию.
```
  {% if product.show_variants? %}
    <select name="variant_id" data-product-variants='{
      "default": "custom-span"
    }'>
      {% for variant in product.variants %}
        <option value="{{ variant.id }}">{{ variant.title | escape }}</option>
      {% endfor %}
    </select>
  {% else %}
    <input type="hidden" name="variant_id" value="{{product.variants.first.id}}" >
  {% endif %}
```

#### data-quantity

Обязательный атрибут для обёртки кнопок изменения колличества и инпута quantity

Для установки минимального значения в инпуте кол-ва товара укажите атрибут data-min
```twig
  <div data-quantity data-min="10">
    <input type="text" name="quantity" value="10" />
    <span data-quantity-change="-10">-</span>
    <span data-quantity-change="10">+</span>
  </div>
```

#### data-quantity-change

Атрибут для кнопок +/-, принимает число


#### data-item-add

Добавление товара в корзину


#### name="comment"

Комментарий к позиции заказа, для работы поля с данным атрибутом комментарии к заказам должны быть включены в бэк-офисе

```
<input type="text" name="comment" value="">
```



## События

| Событие                           | Описание                                                              |
|-----------------------------------|-----------------------------------------------------------------------|
| before:insales:product            | Событие срабатывает перед любым взаимодействием с компонетом продукта |
| always:insales:product            | Событие срабатывает после любого взаимодействия с компонетом продукта |
| change_quantity:insales:product   | Обновление кол-ва в продукте                                          |
| unchange_quantity:insales:product | Если введено кол-во больше доступного                                 |
|overload:quantity:insales:product| Событие срабатывает когда с помощью +/- накликали до максимального значения  quantity (Работает если вы используете параметр useMax)|
|max:quantity:insales:product| Cрабатывает всегда когда в инпуте установлено максимальное кол-во, даже при загрузке страницы (Работает если вы используете параметр useMax)|
| update_variant:insales:product    | Обновление варианта в продукте                                        |

## Селектор модификаций

### Привязка шаблона модификации к опции

> В методе `setConfig` нужно передать объект options в виде `имя опции: id шаблона`

```js
Products.setConfig({
  options: {
    'Цвет': 'option-image',
    'Размер': 'option-radio',
    'Материал': 'option-select',
    'Жесткий диск': 'option-span'
  }
});
```

Пример шаблона

```html
<script type="text/template" data-template-id="option-span">
  <div class="<%= classes.option %> is-span">
    <label class="<%= classes.label %>"><%= title %></label>
    <div class="<%= classes.values %>">
      <% _.forEach(values, function (value){ %>
        <button class="<%= value.classes.all %> is-span"
          <%= value.controls %>
          <%= value.state %>
        >
          <%= value.title %>
        </button>
      <% }) %>
    </div>
  </div>
</script>
```



### Передать изображения для шаблона селектора модификаций

> Ссылки формируются в виде `значение свойства + .png | file_url`

```twig
<script>
  {% comment %}
    создание объекта с картинками из файлов для collection
  {% endcomment %}
  if (!fileUrl) {
   var fileUrl = {}
  }
  {% assign option_title  = 'Цвет' %}
  {% assign collection_handle  = 'all' %}
  {% assign image_format  = '.png' %}
  {% for option_name in collections[collection_handle].options %}
    {% if option_name.title == option_title %}
      {% for option_value in option_name.values %}
        {% capture fileName %}{{option_value.title | replace: ' ',  '_' }}{{image_format}}{% endcapture %}
        {% assign fileURL = fileName | file_url  %}
        {% if fileURL %}
          fileUrl['{{ option_value.title | downcase }}'] = '{{ fileURL }}';
        {% endif %}
      {% endfor %}
    {% endif %}
  {% endfor %}
</script>

<script>
  {% comment %}
    создание объекта с картинками из файлов для product
  {% endcomment %}
  if (!fileUrl) {
   var fileUrl = {}
  }
  {% assign option_title  = 'цвет' %}
  {% assign image_format  = '.png' %}
  {% for option in product.options %}
    {% assign option-title = option.title | downcase %}
    {% if option-title == option_title %}
     {% for value in option.values %}
       {% capture fileName %}{{value.title | replace: ' ',  '_'}}{{image_format}}{% endcapture %}
       {% assign fileURL = fileName | downcase | file_url  %}
       {% if fileURL %}
        fileUrl['{{ value.title | downcase }}'] = encodeURI('{{ fileURL }}');
       {% endif %}
     {% endfor %}
    {% endif %}
  {% endfor %}
</script>

<script>
  Products.setConfig({
    fileUrl: (typeof fileUrl == 'undefined') ? {} : fileUrl
  });
</script>
```



### Шаблоны для селектора модификаций


**select**

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


**span**

```html
<script type="text/template" data-template-id="option-span">
  <div class="<%= classes.option %> is-span">
    <label class="<%= classes.label %>"><%= title %></label>
    <div class="<%= classes.values %>">
      <% _.forEach(values, function (value){ %>
        <button class="<%= value.classes.all %> is-span"
          <%= value.controls %>
          <%= value.state %>
        >
          <%= value.title %>
        </button>
      <% }) %>
    </div>
  </div>
</script>
```


**radio**

```html
<script type="text/template" data-template-id="option-radio">
  <div class="<%= classes.option %> is-radio">
    <label class="<%= classes.label %>"><%= title %></label>

    <div class="<%= classes.values %>">
      <% _.forEach(values, function (value){ %>
        <label class="<%= value.classes.all %> is-radio">
          <input class="<%= value.classes.state %>"

            type="radio"
            name="<%= handle %>"

            <%= value.state %>
            <%= value.controls %>
          >
          <span><%= value.title %></span>
        </label>
      <% }) %>
    </div>
  </div>
</script>
```


**image**

```html
<script type="text/template" data-template-id="option-image">
  <div class="<%= classes.option %> option-<%= option.handle %>">
    <label class="<%= classes.label %>"><%= title %></label>
    <div>
      <% _.forEach(option.values, function (value){ %>
        <span
          data-option-bind="<%= option.id %>"
          data-value-position="<%= value.position %>"
          class="option-image
          <% if (option.selected == value.position & initOption) { %>active<% } %>
          <% if (!value.available) { %>disabled<% } %>"
        >
          <% if (images[value.name]) { %>
            <img src="<%= images[value.name].small_url %>" alt="<%= value.title %>">
          <% }else{ %>
            <span><%= value.title %></span>
          <% } %>
        </span>
      <% }) %>
    </div>
  </div>
</script>
```



**preview**

```html
<script type="text/template" data-template-id="option-preview">
<div class="<%= classes.option %> option-<%= option.handle %>" is-span is-preview">
  <label class="<%= classes.label %>"><%= title %></label>
  <div class="<%= classes.values %>">
    <% _.forEach(values, function (value){ %>
      <button class="<%= value.classes.all %> is-span is-preview"
        <%= value.controls %>
        <%= value.state %>
      >
        <% if(value.imageFromVariant){ %>
          <img width="40px" src="<%= value.imageFromVariant.medium_url %>" alt="<%= value.titleWithoutQuotes %>" title="<%= value.titleWithoutQuotes %>">
        <% }else{ %>
          <span><%= value.title %></span>
        <% } %>
      </button>
    <% }) %>
  </div>
</div>

</script>
```



## Методы класса Products

### get

Получить объект с информацией о товаре

```js
/**
 * @param {number} id id товара
 * @return {Deferred}
 */
Products.get(123456)
  .done(function (onDone) { console.log('onDone', onDone) })
  .fail(function (onFail) { console.log('onFail', onFail) });
```


### getList

Получение списка товаров

```js
/**
 * @param {Array} idList - массив, состоящий из id товаров
 * @return {Deferred}
 */
Products.getList([123456, 123455, 1234454, 123458])
  .done(function (onDone) { console.log('onDone', onDone) })
  .fail(function (onFail) { console.log('onFail', onFail) });
```



### setConfig

Обновление настроек

Параметры

| Property     | Default       | Назначение                                                                                                                                |
|--------------|---------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| options      | ```{ 'default': 'option-default' }``` | Через данный объект задаются шаблоны для вывода опций                                                                                     |
| fileUrl      | Пустой объект | Объект для хранения картинок из раздела «Файлы»                                                                                           |
| decimal      | Пустой объект | Колличество символов после запятой, для единиц измерения                                                                                  |
| filtered     | true          | Если значение true, то недоступные опции не выводятся в шаблон. |
| disableHideItem     | false          | Показывает недоступные варианты товаров, даже если в бек-офисе они отключены |
| selectUnavailable     | true          | Разрешить выбирать недоступный вариант (актуально если `filtered: false`) |
| allowUnavailable     | false          | Разрешить выбирать первым недоступный вариант |
| showVariants | true          | При значении false, рендер опций не производится                                                                                          |
| initOption   | true          | Отмечать активные опции при инициализации?                                                                                                |
| useMax       | false         | Использовать максимальное колличество? Если значение true, в quantity невозможно указать колличество больше чем доступно на складе.       |

```js
Products.setConfig({
  showVariants: true,
  hideSelect: true,
  initOption: true,
  fileUrl: (typeof fileUrl == 'undefined') ? {} : fileUrl,
  filtered: true,
  selectUnavailable: true
})
```



### getInstance

Получаем экземпляр класса ProductInstance из jQuery DOM element

```js
/**
 * @param {jQuery DOM element} $node jQuery DOM element например $('.product-cart-control')
 */
 Products.getInstance($('.product-cart-control'))
   .done(function (onDone) { console.log('onDone', onDone) })
   .fail(function (onFail) { console.log('onFail', onFail) });
```


### initInstance

Инициализировать форму товара


```js
/**
 * @param {jQuery DOM element} $node jQuery DOM element например $('.product-cart-control')
 */
Products.initInstance($('.product-cart-control'))
   .done(function (onDone) { console.log('onDone', onDone) })
   .fail(function (onFail) { console.log('onFail', onFail) });
```
