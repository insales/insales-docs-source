# Товар

## Назначение атрибутов

![](/img/product-sheme.jpg)
### Пример разметки товара

```html
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

Обязательный атрибут для инициализации товара, принимает ID товара

```html
<form data-product-id="{{ product.id }}" action="{{ cart_url }}" method="post">
  <!-- Код формы -->
</form>
```

#### data-product-without-cache

Отключить кэширование информации о товаре

```html
<form data-product-without-cache data-product-id="{{ product.id }}" action="{{ cart_url }}" method="post" >
  <!-- Код формы -->
</form>
```
#### data-product-json

Позволяет передать данные о товаре через Liquid. Это может ускорить отображение селектора вариантов.

```html
<form data-product-id="{{ product.id }}" data-product-json="{{ product|json|escape }}" action="{{ cart_url }}" method="post">
  <!-- Код формы -->
</form>
```

#### data-set-config

Передать настройки товара через data-атрибут

```html
<form data-set-config='{"decimal": {"kgm": 1}}' data-product-id="{{ product.id }}" action="{{ cart_url }}" method="post">
  <!-- Код формы -->
</form>
```

### Атрибуты вложенных элементов

#### data-product-variants

Каждый вариант товара состоит из свойств и их значений, например: "Цвет: Красный, Размер: 42", "Цвет: Синий, Размер: 38".

Данный атрибут позволяет указать вид отображения значений свойств варианта товара в зависимости от названия свойства.

Доступные виды:

- option-select
- option-select-image
- option-span
- option-radio
- option-preview
- option-preview-text
- option-default (option-select)

Разметка каждого вида хранится внутри библиотеки в виде lodash-шаблонов. Посмотреть код шаблонов можно [здесь](/common.v2.js/2Products/#_9)

В следующем примере в качестве вида по умолчанию установлен `option-select`: для свойства "Цвет" - `option-preview`, для свойства "Размер" - `option-span`.

```html
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

**Можно ли написать свой шаблон для отображения свойств?**

Можно. Для этого в разметку нужно добавить тег script с data-атрибутом `data-template-id`, в качестве значения которого должен быть указан ID шаблона.

```html
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
```html
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

Обязательный атрибут для обёртки кнопок изменения количества и инпута quantity

Для установки минимального значения в input количества товара передайте атрибут data-min с нужным значением

```html
<div data-quantity>
  <button type="button" data-quantity-change="-1">-</button>
  <input type="text" value="1" name="quantity"/>
  <button type="button" data-quantity-change="1">+</button>
</div>
```


#### data-quantity-change

Атрибут для кнопок изменения количества +/-, принимает число

#### data-item-add

Добавление товара в корзину

#### data-add-cart-counter

Компонент, который совмещает в себе функционал добавления товара в корзину, изменения количества, отображения счётчика и возможность удаления из корзины. Он используется в виджетах карточек товаров в шаблонах 4 поколения.

В значении атрибута нужно указать шаг изменения количества товара: `data-add-cart-counter='{"step": "1"}'`

**Вложенные элементы:**

- **data-add-cart-counter-btn** — кнопка добавления товара в корзину
- **data-add-cart-counter-minus** — кнопка уменьшения количества или удаления из корзины
- **data-add-cart-counter-count** — счётчик количества товара в корзине
- **data-add-cart-counter-plus** — кнопка увеличения количества

**События:**

unchange_quantity:insales:ui_add-cart-counter - срабатывает если достигнуто максимальное количество товара в корзине

```js
EventBus.subscribe('unchange_quantity:insales:ui_add-cart-counter', data => {
  console.log(data);
})
```

**Пример кода:**

Всё что вам необходимо сделать для использования — это задать стили для элементов и скрывать/показывать нужные кнопки, если у корневого элемента есть класс `is-add-cart`.

```html
<div class="add-cart-counter" data-add-cart-counter='{"step": "1"}'>
  <button type="button" class="add-cart-counter__btn" data-add-cart-counter-btn>
    Add to cart
  </button>
  <div class="add-cart-counter__controls">
    <button data-add-cart-counter-minus class="add-cart-counter__controls-btn" type="button">-</button>
    <a href="{{cart_url}}" class="add-cart-counter__detail">
      <span class="add-cart-counter__detail-text">{{messages.btn_buy_active_text}} <span data-add-cart-counter-count></span> {{ product.unit }}</span>
    </a>
    <button data-add-cart-counter-plus class="add-cart-counter__controls-btn" type="button">+</button>
  </div>
</div>
```

#### data-product-card-preorder

Атрибут предназначен для кнопки вызова формы предзаказа. При загрузке страницы кнопка получает атрибуты `data-preorder-product-name` и `data-preorder-variant`, которые содержат название товара и название выбранного варианта. 

Значение атрибута `data-preorder-variant` обновляется при выборе варианта товара. 

Если подписаться на EventBus-событие `show-preorder:insales:ui_product`, то при нажатии на кнопку вы сможете получать название товара и выбранного варианта, чтобы использовать их в форме предзаказа.

```html
<button data-product-card-preorder type="button">{{messages.pre_order}}</button>
```

#### data-quick-checkout

Форма заказа в один клик

```html
<button data-quick-checkout></button>
```

В качестве значения можно передать ID конкретного товара. Однако, если в корзину уже добавлены другие товары, то они тоже попадут в заказ.

```html
<button data-quick-checkout="[data-product-id='{{ product.id }}']"></button>
```

#### data-product-card-price

Цена продажи варианта товара

```html
<span data-product-card-price></span>
```

#### data-product-card-price-from-cart

Цена продажи варианта товара с учётом типов цен

```html
<span data-product-card-price-from-cart></span>
```

#### data-product-card-old-price

Старая цена варианта товара

```html
<span data-product-card-old-price></span>
```

#### data-product-card-sku

Получение артикула варианта товара. В качестве значения можно передать label.

```html
<span data-product-card-sku='{"skuLabel": "{{messages.sku_label}}"}'></span>
```

#### data-product-card-available

Наличие варианта товара. 

В качестве значения можно передать объект со статусами.

```html
<span data-product-card-available='{"availableText": "Available", "notAvailableText": "Not available"}'>
```

#### name="comment"

Комментарий к позиции заказа. Для корректной работы необходимо, чтобы комментарии к заказам были включены в админ-панели, в разделе "Настройки" > "Оформление заказа"

```html
<input type="text" name="comment" value="">
```

## Селектор модификаций

### Привязка шаблона модификации к опции

> В методе `setConfig` нужно передать объект options в виде `имя опции: ID шаблона`

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

```html
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

<details>
<summary>select</summary>

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
</details>

<details>
<summary>select-image</summary>

```html
<script type="text/template" data-template-id="option-select-image">
<div class="<%= classes.option %> <%= _.find(values, 'image_url') ? 'is-system-color' : '' %> is-select">
  <% if (_.find(values, 'image_url')) { %>
    <label class="<%= classes.label %>">
      <%= title %>
    </label>
    <div class="<%= classes.values %>">
      <% _.forEach(values, function (value){ %>
        <label class="<%= value.classes.all %> is-radio">
          <input class="<%= value.classes.state %>" type="radio" name="<%= handle %>" <%= value.state %>
          <%= value.controls %>
            >
            <span class="option-value-system-color <%= value.image_url ? 'with-image-color' : 'without-image-color' %>">
              <% if (value.image_url) { %>
                <img width="40px" src="<%= value.image_url %>" alt="<%= value.titleWithoutQuotes %>"
                  title="<%= value.titleWithoutQuotes %>">
                <% } else { %>
                  <%= value.title %>
                <% } %>
            </span>
        </label>
        <% }) %>
    </div>
  <% } else { %>
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
    <% } %>
</div>
</script>
```
</details>

<details>
<summary>span</summary>

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
</details>

<details>
<summary>radio</summary>

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
</details>

<details>
<summary>preview</summary>

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
</details>

<details>
<summary>preview-text</summary>

```html
<script type="text/template" data-template-id="option-preview-text">
<div class="<%= classes.option %> is-span is-preview-text">
  <label class="<%= classes.label %>">
    <%= title %>
  </label>
  <div class="<%= classes.values %>">
    <% _.forEach(values, function (value){ %>
      <button class="<%= value.classes.all %> is-span is-preview-text <%= (value.variant.image_id ? 'is-img' : 'is-text') %>" <%= value.controls %>
        <%= value.state %>
          >
            <% if(value.imageFromVariant && value.variant.image_id){ %>
              <img width="40px" src="<%= value.imageFromVariant.medium_url %>" alt="<%= value.titleWithoutQuotes %>"
                title="<%= value.titleWithoutQuotes %>">
            <% }else{ %>
              <span>
                <%= value.title %>
              </span>
              <% } %>
      </button>
      <% }) %>
  </div>
</div>
</script>
```
</details>

## Методы класса Products

### get

Получить объект с информацией о конкретном товаре

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
 * @param {Object} options - объект, в котором можно передать опцию no_cache, если необходимо не кешировать товары в local storage.
 * @return {Deferred}
 */
Products.getList([123456, 123455, 1234454, 123458])
  .done(function (onDone) { console.log('onDone', onDone) })
  .fail(function (onFail) { console.log('onFail', onFail) });
```

!!! info
    Все полученные товары кэшируются в local storage. Это означает, что при отправке новых запросов товары, которые уже были получены с сервера в предыдущих запросах, будут доставаться из кэша. Это работает только в рамках одной сессии. То есть, если перезагрузить страницу, то товары снова будут получены запросом. Если по каким-то причинам вам нужно, чтобы этого не происходило, то необходимо вторым аргументом передать объект со свойством `no_cache` и значением `true`.

!!! warning
    В одном запросе можно получить не более 700 товаров. Если превысить этот лимит, то перед отправкой запроса на сервер массив будет обрезан.

### setConfig

Обновление настроек

Параметры

| Property          | Default                               | Назначение                                                                   |
|-------------------|---------------|------------------------------------------------------------------------------------------------------|
| options           | ```{ 'default': 'option-default' }``` | Через данный объект задаются шаблоны для вывода свойств варианта             |
| fileUrl           | Пустой объект                         | Объект для хранения картинок из раздела «Файлы»                              |
| decimal           | Пустой объект                         | Количество символов после запятой для единиц измерения                      |
| filtered          | true                                  | Если значение true, то недоступные опции не выводятся в шаблон.              |
| disableHideItem   | false                                 | Показывает отсутствующие в наличии варианты товаров, даже если в админ-панели их отображение отключено |
| selectUnavailable | true                                  | Разрешить выбирать недоступный вариант (актуально если `filtered: false`)    |
| allowUnavailable  | false                                 | Разрешить выбирать первым недоступный вариант                                |
| showVariants      | true                                  | При значении false рендер вариантов не производится                         |
| initOption        | true                                  | Отмечать активные свойства при инициализации?                                |
| useMax       | false                                      | Использовать максимальное количество? Если значение true, в quantity невозможно указать количество больше, чем доступно на складе |

!!! warning
    Вызов данного метода стоит оставлять в глобальной области видимости. Если запустить метод внутри `$(document).ready(function() {})`, результат может быть непредсказуем.

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

Инициализация формы товара

```js
/**
 * @param {jQuery DOM element} $node jQuery DOM element например $('.product-cart-control')
 */
Products.initInstance($('.product-cart-control'))
   .done(function (onDone) { console.log('onDone', onDone) })
   .fail(function (onFail) { console.log('onFail', onFail) });
```

### getRecentlyViewed

Возвращает массив с ID просмотренных товаров

```js
Products.getRecentlyViewed()
   .done(function (onDone) { console.log('onDone', onDone) })
   .fail(function (onFail) { console.log('onFail', onFail) });
```


## События

| Событие                           | Описание                                                                                           |
|-----------------------------------|----------------------------------------------------------------------------------------------------|
| init_instance:insales:product     | Срабатывает после инициализации оберток [data-product-id] с инициализацией всех дочерних элементов |
| before:insales:product            | Срабатывает перед любым взаимодействием с компонентом товара                                       |
| always:insales:product            | Срабатывает после любого взаимодействия с компонентом товара                                       |
| change_quantity:insales:product   | Обновление количества товара в инпуте quantity                                                     |
| unchange_quantity:insales:product | Если введено кол-во больше доступного                                                              |
| overload:quantity:insales:product | Событие срабатывает, когда с помощью +/- накликали до максимального значения  quantity (Работает, если вы используете параметр useMax) |
| max:quantity:insales:product      | Срабатывает всегда, когда в инпуте установлено максимальное кол-во, даже при загрузке страницы (Работает, если вы используете параметр useMax) |
| change_variant:insales:product    | Срабатывает при выборе варианта товара                                                             |
| update_variant:insales:product    | Обновление варианта товара                                                                         |


**Пример подписки на событие**

```js
EventBus.subscribe('change_quantity:insales:product', function (data) {
  console.log('Изменено количество товара в счётчике', data);
}); 
```
