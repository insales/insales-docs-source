# ui-ajax-products

Компонент для упрощения реализации AJAX-подгрузки товаров из определенной категории интернет-магазина.

Примеры разметки и JavaScript кода можно найти в виджетах товаров из определенной категории с артикулами SP9, SP12 и SP16.

## Как это работает

1. На странице, где вы хотите использовать компонент, создайте блок с атрибутом `data-ajax-products`.
2. Внутри этого блока разместите другой блок с атрибутом `data-ajax-products-list`, в который будут добавляться товары.
3. В значение атрибута `data-ajax-products-list` передайте объект с настройками:
    - `collection` — handle категории, из которой нужно получить товары
    - `limit` — максимальное количество товаров для загрузки
    - `imageResizingRules` — правила изменения размеров изображений товаров, их формат, качество и параметры изменения размера
    - `switchImages` — определяет загрузку первых двух изображений товара (true) или только первого изображения (false)
    - `shortDescriptionWordsCount` — ограничение количества слов в кратком описании товара
4. Разместите шаблоны внутри элемента с атрибутом `data-ajax-products`

Пример разметки:

```html
<div data-ajax-products>
  <div data-ajax-products-list='{
    "collection": "my-collection",
    "limit": "20",
    "imageResizingRules": [
      {"size":"1000", "format":"webp", "resizing_type":"fit_width", "quality":"100"},
      {"size":"500", "format":"webp", "resizing_type":"fit_width", "quality":"100"},
      {"size":"100", "resizing_type":"fit_width", "quality":"100"}
    ],
    "hideVariants": "true",
    "switchImages": "false",
    "shortDescriptionWordsCount": "10"
  }'></div>

  <!-- Здесь должны быть шаблоны -->
</div>
```


## Инициализация компонента

После события `DOMContentLoaded` в компоненте происходит подписка на событие `ui-ajax-products:load-products-list`. Чтобы инициализировать компонент, нужно опубликовать это событие через JavaScript и передать в него DOM-элемент с атрибутом `data-ajax-products-list`.

```js
// Получаем массив с элементами с атрибутом data-ajax-products-list
const productListNodes = Array.from(document.querySelectorAll('[data-ajax-products-list]'));

// Если элементы есть, то проходим по массиву и для каждого элемента публикуем событие ui-ajax-products:load-products-list
if (productListNodes && productListNodes.length) {
  productListNodes.forEach(productListNode => {
    EventBus.publish('ui-ajax-products:load-products-list', productListNode);
  });
}
```

## Работа с загруженными товарами

Компонент загрузит и обработает информацию о товарах, затем отобразит каждый товар в блоке с атрибутом `data-ajax-products-list` в соответствии с заданными шаблонами. По завершению этого процесса, компонент опубликует событие `init-products:ui-ajax-products`. Вы можете подписаться на это событие, чтобы выполнять дополнительные манипуляции с полученными и отрисованными товарами на странице.

### Подписка на событие `init-products:ui-ajax-products`

```js
// Получаем массив с элементами с атрибутом data-ajax-products-list
const productListNodes = Array.from(document.querySelectorAll('[data-ajax-products-list]'));

// Если элементы есть, то проходим по массиву и для каждого элемента публикуем событие ui-ajax-products:load-products-list
if (productListNodes && productListNodes.length) {
  productListNodes.forEach(productListNode => {
    EventBus.publish('ui-ajax-products:load-products-list', productListNode);
  });
}

// Подписываемся на событие init-products:ui-ajax-products, чтобы после загрузки и отрисовки товаров продолжить работу с ними
EventBus.subscribe('init-products:ui-ajax-products', initAjaxProductsCallback);

function initAjaxProductsCallback(data) {
  // Код, который должен выполниться после того, как товары были загружены и отрисованы.
  // Например, здесь может быть код инициализации слайдера или других интерактивных элементов.
}
```

Теперь, когда вы подписались на событие `init-products:ui-ajax-products`, ваша функция `initAjaxProductsCallback` будет вызвана после того, как товары будут успешно загружены и отрисованы на странице. В этой функции вы можете выполнять любые действия, связанные с полученными товарами, такие как: инициализация слайдеров, применение фильтров или добавление анимаций.

## Подробно о шаблонах

Шаблоны играют ключевую роль в структурировании и отображении превью товаров. Чтобы лучше понять их функциональность, давайте разобьем превью товара на древовидную структуру:

-  Превью товара
	- Изображение товара
	- Вывод значений свойств в виде изображений или текста

Для рендера каждой отдельной ветки вышеописанного дерева в Common.js были реализованы отдельные шаблоны.

Всего реализовано 4 шаблона:

 - Шаблон превью товара ([`data-ajax-products-list-item-template`](#data-ajax-products-list-item-template))
	- Шаблон изображения товара ([`data-ajax-products-list-item-image-template`](#data-ajax-products-list-item-image-template))
	- Шаблон для вывода значений свойств вариантов в виде изображений ([`data-ajax-products-list-item-option-values-images-item-template`](#data-ajax-products-list-item-option-values-images-item-template))
	- Шаблон для вывода значений свойств вариантов в виде текста  ([`data-ajax-products-list-item-option-values-item-text-template`](#data-ajax-products-list-item-option-values-item-text-template))

Чтобы показать зависимость других шаблонов от шаблона превью товара, они указаны в списке как вложенные, хотя ни один из них не является дочерним по отношению к другому. Каждый представляет собой отдельный фрагмент кода внутри блока с атрибутом `data-ajax-products`. Для корректной работы достаточно использовать первые два шаблона. Шаблоны для вывода значений свойств являются необязательными, но могут быть полезными, если вы хотите показать значения свойств при наведении на превью, как это сделано в виджете товаров определенной категории SP12.

### data-ajax-products-list-item-template

Основной шаблон, отвечающий за отрисовку превью каждого товара из запрашиваемой категории.

#### Корневые элементы

##### data-ajax-products-list-item

Корневой элемент шаблона превью товара, внутри которого будет располагаться форма товара (`data-ajax-products-list-item-form`).

##### data-ajax-products-list-item-form

Корневой элемент шаблона превью товара, внутри которого будет находиться весь контент превью товара. Должен размещаться внутри элемента с атрибутом `data-ajax-products-list-item`.

Пример разметки для шаблона превью товара:

```html
<template data-ajax-products-list-item-template>
	<div
	  data-ajax-products-list-item
	>
		<form
		  action="{{ cart_url }}"
		  method="post"
		  data-ajax-products-list-item-form
		>
			<!-- Код формы -->
		</form>
	</div>
</template>
```

#### Вложенные элементы формы товара (`data-ajax-products-list-item-form`)

##### data-ajax-products-list-item-title

Добавляет название товара в `textContent` элемента.

Пример использования:

```html
<span
  data-ajax-products-list-item-title
></span>
```

##### data-ajax-products-list-item-link

Добавляет элементу атрибут `href` со ссылкой на товар. Можно использовать в связке с названием товара, например:

```html
<a
  data-ajax-products-list-item-link
  data-ajax-products-list-item-title
></a>
```

##### data-ajax-products-list-item-image

Атрибут для рендера [шаблона](#data-ajax-products-list-item-image-template) вывода изображения товара (`data-ajax-products-list-item-image-template`).

##### data-ajax-products-list-item-short-description

Атрибут для вывода краткого описания товара внутри элемента.

Пример использования:

```html
<div
  data-ajax-products-list-item-short-description
></div>
```

##### data-ajax-products-list-item-price-min

Атрибут для вывода минимальной цены товара. Может быть использован для товаров с вариантами, у которых отличаются цены.

Пример использования:

```html
<span
  data-ajax-products-list-item-price-min
></span>
```

Может быть использован в связке со стандартными атрибутами формы товара, например:

```html
<div class="product-preview__price">
  <span
	class="product-preview__price-label"
>{{messages.from }}</span>
  <span
	class="product-preview__price-min"
	data-ajax-products-list-item-price-min
></span>
  <span
	class="product-preview__price-cur"
	data-product-card-price-from-cart
></span>
  <span
	class="product-preview__price-old"
	data-product-card-old-price
></span>
</div>
```

Чтобы скрыть ненужные элементы, вы можете использовать классы на форме товара, которые перечислены [здесь](#data-ajax-products-list-item-form_2)

Пример использования:

```html
<span
	class="product-preview__price-max"
	data-ajax-products-list-item-price-max
></span>
```

##### data-ajax-products-list-item-price-max

Атрибут для вывода максимальной цены товара. Может быть использован для товаров с вариантами, у которых отличаются цены.

##### data-ajax-products-list-item-variants-select-block

Позволяет вывести селектор для выбора варианта товара. Работает по тому же принципу, как и в случае со [стандартной карточкой товара](/common.v2.js/2Products/#data-product-variants), только вид отображения необходимо передать в значении атрибута `data-ajax-products-list-item-variants-select-block`, а не `data-product-variants`.

Пример использования:

```html
<div
  data-ajax-products-list-item-variants-select-block='{
	"default": "option-radio",
	"Цвет": "{{widget_settings.display-property-color }}"
  }'
>
  <select
	name="variant_id"
	data-product-variants
></select>
</div>
```

##### data-ajax-products-list-item-add-cart

Удаляет из разметки элемент, которому назначен этот атрибут, если товара нет в наличии и в настройках магазина включена опция "Запретить заказывать больше, чем есть в наличии".

Например, если описанное выше условие истинно, то весь блок ниже будет удалён из разметки:

```html
<div
  data-ajax-products-list-item-add-cart
>
  <button type="submit" data-item-add>
    Добавить в корзину
  </button>
</div>
```

##### data-ajax-products-list-item-option-values

Используется для отображения значений свойств товаров в виде текста или изображений с помощью шаблонов [`data-ajax-products-list-item-option-values-images-item-template`](#data-ajax-products-list-item-option-values-images-item-template) и [`data-ajax-products-list-item-option-values-item-text-template`](#data-ajax-products-list-item-option-values-item-text-template). Пример использования можно увидеть в виджете SP12, где при наведении на карточку превью товара отображаются значения свойств вариантов.

В значении можно передать две настройки:

1. `imagesOptionNames` — в значении этого свойства можно указать возможные названия свойств, которые должны выводиться в виде изображений. Обычно это свойство "Цвет". Возможные значения можно перечислить через запятую, указав при этом названия свойств на других языках.
2. `showVariantsText` — если передать `true`, то все значения свойств всегда будут выводиться в виде текста для всех товаров. Если `false`, то значения свойств будут выводиться в виде картинок и текста.

Для вывода значений свойств в виде изображений необходимо создать вложенный блок с атрибутом `data-ajax-products-list-item-option-values-images`.

Текстовые значения будут автоматически разбиты на отдельные блоки и добавлены в блок с атрибутом `data-ajax-products-list-item-option-values`.

Пример использования:

```html
<div
  data-ajax-products-list-item-option-values='{
	"imagesOptionNames": "цвет,color,расцветка,цвет товара"
	"showVariantsText":"{{ widget_settings.show-variants-text }}",
  }'
>
  <div class="option-list-values with-images">
	<div
	  class="option-list-images"
	  data-ajax-products-list-item-option-values-images
></div>
  </div>
</div>
```

Управлять отображением элементов вы можете с помощью [классов](#data-ajax-products-list-item-option-values_1).

##### data-ajax-products-list-item-stickers

Позволяет отобразить стикеры (значения параметра товара, у которого `handle` равен `label`). В качестве вложенных элементов могут быть использованы стандартные элементы формы товара, такие как `data-product-card-sale-value` (скидка на товар, если старая цена выше цены продажи) или ваши собственные стикеры.

Пример использования:

```html
<div
  class="stickers"
  data-ajax-products-list-item-stickers
>
  <div
	class="sticker sticker-sale"
	data-product-card-sale-value
  ></div>
  <div
	class="sticker sticker-preorder"
  >{{messages.pre_order}}</div>
</div>
```

##### data-ajax-products-list-item-favorites-trigger

Позволяет добавить кнопку для добавления товара в избранное. Работает в связке со стандартным атрибутом `data-ui-favorites-trigger`.

Пример использования:

```html
{% if settings.favorite_enabled %}
<span
  class="button button_size-s favorites_btn"
  data-ui-favorites-trigger
  data-ajax-products-list-item-favorites-trigger
>
  <span class="btn-icon icon-favorites-o"></span>
  <span class="btn-icon icon-favorites-f"></span>
</span>
{% endif %}
```

Для корректной работы кнопки после загрузки и отрисовки товаров необходимо вызвать метод `update` класса `FavoritesProducts`.

Пример кода на JavaScript:

```js
// Подписываемся на событие init-products:ui-ajax-products, чтобы после загрузки и отрисовки товаров продолжить работу с ними
EventBus.subscribe('init-products:ui-ajax-products', initAjaxProductsCallback);

function initAjaxProductsCallback(data) {
	// Обновляем состояние избранных товаров
	FavoritesProducts.update();

	// Код, который должен выполниться после того, как товары были загружены и отрисованы. Например, здесь может быть код инициализации слайдера.
}
```

Подробнее о работе с избранными товарами можно узнать [здесь](/common.v2.js/6FavoritesProducts/).

##### data-ajax-products-list-item-compare-trigger

Работает аналогично атрибуту избранных товаров.

Пример использования:

```html
{% if settings.compare_enabled == null or settings.compare_enabled %}
<div class="product__compare">
<span
  data-compare-trigger
  data-ajax-products-list-item-compare-trigger
>
  <span class="product__user-btn-icon icon-compare"></span>
  <span
	data-compare-trigger-added-text="{{ messages.btn_compare_text_active }}"
	data-compare-trigger-not-added-text="{{ messages.btn_compare_text }}"
>{{ messages.btn_compare_text }}</span>
</span>
</div>
{% endif %}
```

После отрисовки товаров, как и в случае с избранными товарами, необходимо обновить состояние с помощью метода `update` класса `Compare`.

Пример кода на JavaScript:

```js
// Подписываемся на событие init-products:ui-ajax-products, чтобы после загрузки и отрисовки товаров продолжить работу с ними
EventBus.subscribe('init-products:ui-ajax-products', initAjaxProductsCallback);

function initAjaxProductsCallback(data) {
	// Обновляем состояние избранных товаров и товаров в сравнении
	FavoritesProducts.update();
	Compare.update();

	// Код, который должен выполниться после того, как товары были загружены и отрисованы. Например, здесь может быть код инициализации слайдера.
}
```

Подробнее о работе со сравнением товаров можно узнать [здесь](/common.v2.js/5Compare/).

### data-ajax-products-list-item-image-template

Шаблон, отвечающий за отрисовку изображений товаров из запрашиваемой категории. Должен подключаться внутри формы товара `data-ajax-products-list-item-form` с помощью элемента с атрибутом [`data-ajax-products-list-item-image`](#data-ajax-products-list-item-image).

#### Корневые элементы

##### data-ajax-products-list-item-picture

Корневой элемент, содержащий изображения, который должен быть вложен в шаблон. Обычно используется для элемента `<picture>`.

#### Вложенные элементы

##### data-ajax-products-image-resizing-rules-index

Используется для указания порядка вывода изображений из массива `imageResizingRules`, переданного в качестве свойства объекта настроек `data-ajax-products-list`.

Например, мы передали в `data-ajax-products-list` следующий массив:

```html
<div data-ajax-products-list='{
  "imageResizingRules": [
	{"size":"1080", "format":"webp", "resizing_type":"fit_width", "quality":"100"},
	{"size":"240", "format":"webp", "resizing_type":"fit_width", "quality":"100"},
	{"size":"1080", "resizing_type":"fit_width", "quality":"100"}
  ]
}'></div>
```

Если нужно вывести полученные изображения по порядку, указываем значения, начиная с нулевого элемента массива. Пример разметки шаблона:

```html
<!-- Шаблон фото в превью-карточке товара -->
<template data-ajax-products-list-item-image-template>
	<picture data-ajax-products-list-item-picture>
	  <source
		media="(min-width:481px)"
		data-ajax-products-image-resizing-rules-index="0"
		type="image/webp"
		class="lazyload">
	  <source
		media="(max-width:480px)"
		data-ajax-products-image-resizing-rules-index="1"
		type="image/webp"
		class="lazyload">
	  <img
		data-ajax-products-image-resizing-rules-index="2"
		class="lazyload"
      >
	</picture>
</template>
```

Если не использовать этот атрибут или не указать для него значение, то для всех элементов <source> `<source>` и `<img>` в качестве значений атрибутов `src` и `data-srcset` будет задана ссылка на изображение оригинальных размеров.

### data-ajax-products-list-item-option-values-images-item-template

Шаблон для вывода значений свойств вариантов в виде изображений. Может использоваться для отображения при наведении на превью товара, например, как в виджете SP12. Шаблон можно подключить в форме товара `data-ajax-products-list-item-form` с помощью элемента с атрибутом [`data-ajax-products-list-item-option-values`](#data-ajax-products-list-item-option-values).

#### Корневые элементы

##### data-ajax-products-list-item-option-values-images-item

Корневой элемент, содержащий изображения, который должен быть вложен в шаблон.

#### Вложенные элементы

##### data-ajax-products-list-item-option-values-images-item-img

Создает для элемента `<img>` атрибут `src` со ссылкой на изображение, заданное для варианта, в котором используется значение свойства.

Пример шаблона:

```html
<template data-ajax-products-list-item-option-values-images-item-template>
	<div
	  class="option-list-image"
	  data-ajax-products-list-item-option-values-images-item
    >
	  <div class="img-ratio img-fit">
		<div class="img-ratio__inner">
		  <img
			width="48"
			data-ajax-products-list-item-option-values-images-item-img
          >
		</div>
	  </div>
	</div>
</template>
```

### data-ajax-products-list-item-option-values-item-text-template

Шаблон для вывода значений свойств вариантов в виде текста. Может использоваться для отображения при наведении на превью товара, например, как в виджете SP12. Шаблон можно подключить в форме товара `data-ajax-products-list-item-form` с помощью элемента с атрибутом [`data-ajax-products-list-item-option-values`](#data-ajax-products-list-item-option-values).

#### Вложенные элементы

##### data-ajax-products-list-item-option-values-item-text

В `textContent` элемента будет записано название значения свойства товара.

##### data-ajax-products-list-item-option-values-item-id

В значение этого атрибута будет записан ID значения свойства товара из панели администратора магазина.

Пример шаблона:

```html
<template data-ajax-products-list-item-option-values-item-text-template>
	<div
	  class="option-list-value"
	  data-ajax-products-list-item-option-values-item-text
	  data-ajax-products-list-item-option-values-item-id
    ></div>
</template>
```

## События

- `ui-ajax-products:load-products-list` — событие, которое необходимо инициализировать в JavaScript.
- `init-products:ui-ajax-products` — срабатывает после загрузки и отрисовки всех товаров.

Подробную информацию о событиях компонента вы можете найти [здесь](#_2).

## Доступные классы

Ниже представлены классы для элементов с атрибутами компонента.

### data-ajax-products-list

- `ajax-products-is-loading` — класс присваивается на время загрузки и отрисовки товаров.
- `ajax-products-is-init` — класс присваивается в момент, когда товары были загружены и отрисованы.

### data-ajax-products-list-item-form

- `ajax-products-list-item-has-many-variants` — класс присваивается, если у товара больше одного варианта и задано хотя бы одно свойство.
- `ajax-products-list-item-has-many-old-prices` — класс присваивается, если у вариантов товара различаются старые цены.
- `ajax-products-list-item-has-many-sale-prices` — класс присваивается, если у вариантов товара различаются цены продажи.
- `ajax-products-list-item-is-bundle` — класс присваивается, если товар является комплектом.

Кроме того, для формы товара доступны стандартные классы:

- `with-old-price` — присваивается, если у варианта товара есть старая цена.
- `without-old-price` — присваивается, если у варианта товара нет старой цены.
- `with-sku` — присваивается, если у варианта товара есть артикул.
- `without-sku` — присваивается, если у варианта товара нет артикула.
- `is-available` — присваивается, если вариант товара в наличии.
- `not-available` — присваивается, если варианта товара нет в наличии.
- `with-sale-value` — присваивается, если цена продажи варианта меньше старой цены.

### data-ajax-products-list-item-option-values

- `ajax-products-list-item-option-list-values` — класс присваивается каждому блоку с текстовыми значениями свойств.
- `ajax-products-list-item-option-images-values-first` — класс присваивается, если свойство с изображениями имеет минимальную позицию в панели администратора (раздел "Настройки" > "Свойства вариантов") среди всех свойств товара.
- `ajax-products-list-item-option-images-values-last` — класс присваивается, если свойство с изображениями имеет максимальную позицию в панели администратора (раздел "Настройки" > "Свойства вариантов") среди всех свойств товара.
- `ajax-products-list-item-option-list-values-colors` — класс присваивается, если у варианта со свойством, для которого должно выводиться изображение, этого изображения не оказалось.
