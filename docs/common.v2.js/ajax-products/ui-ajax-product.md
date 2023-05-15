# ui-ajax-product

Компонент для упрощения реализации AJAX-подгрузки определенного товара интернет-магазина по его идентификатору в InSales.

Примеры разметки и JavaScript-кода можно найти в виджетах товаров из определенной категории с артикулами SP9, SP12 и SP16 (модальное окно при добавлении в корзину товара с вариантами).

## Как это работает

1. На странице, где вы хотите использовать компонент, создайте блок с атрибутом `data-ajax-product`.
2. Задайте значения атрибута `data-ajax-product`, указывая настройки для загрузки товаров:
    - `productId` — ID товара в InSales, который нужно получить и вывести
    - `productData` — сюда необходимо передать в виде массива строк данные товара, которые вы хотите получить. Полный список доступных данных можно найти по [ссылке](#productdata).
    - `initOnLoadPage` — определяет, нужно ли загружать и отрисовывать данные о товаре сразу после загрузки страницы (событие `DOMContentLoaded`). Возможные значения: `true`/`false`
    - `imageResizingRules` — правила изменения размеров изображений товаров, их формат, качество и параметры изменения размера
    - `videoBeforeImage` — определяет должны ли видео отображаться до изображений товара. Возможные значения: `true`/`false`
    - `videoLinksDetails` — загружает детали о видео товара (iframe, превью). Рекомендуемое значение - всегда `true`
3. Внутри элемента с атрибутом `data-ajax-product` разместите шаблоны для отрисовки товара. Подробно о шаблонах можно прочитать [здесь](#_4)

Пример разметки:

```html
<div data-ajax-product='{
	"productId": "00000000",
	productData: ["variants", "short_description", "price_kinds", "first_image", "images", "properties", "characteristics", "option_names", "bundle_info", "video_links"],
	"initOnLoadPage": "true",
	"imageResizingRules": [
	      {"size":"1000", "format":"webp", "resizing_type":"fit_width", "quality":"100"},
	      {"size":"500", "format":"webp", "resizing_type":"fit_width", "quality":"100"},
	      {"size":"1000", "resizing_type":"fit_width", "quality":"100"}
	],
	"videoBeforeImage": "false",
	"videoLinksDetails": "true"
}'>
	<!-- Здесь должны быть шаблоны -->
</div>
```

## Автоматическая инициализация компонента при загрузке страницы

В отличие от компонента [`ui-ajax-products`](/common.v2.js/ajax-products/ui-ajax-products/), в этом компоненте предусмотрены два способа инициализации. Если вы установите опцию `initOnLoadPage` в значение `true`, компонент будет автоматически инициализирован после загрузки страницы (событие `DOMContentLoaded`) с настройками, указанными в атрибуте `data-ajax-product`.

Чтобы выполнить дополнительные манипуляции с товаром после его загрузки и отрисовки, подпишитесь на событие `init-product:ui-ajax-product`:

```js
EventBus.subscribe('init-product:ui-ajax-product', initAjaxProductCallback)

function initAjaxProductCallback(data) {
  // Код, который должен выполниться после того, как товар был загружен и отрисован.
  // Например, здесь может быть код инициализации галереи товара
}
```

## Инициализация компонента путём публикации события

Если вы не указываете настройки в атрибуте `data-ajax-product`, можно инициализировать компонент самостоятельно, путём публикации события `ui-ajax-product:load-product` через JavaScript передав DOM-элемент в качестве аргумента.

Пример HTML-кода:

```html
<div data-ajax-product>
	<!-- Здесь должны быть шаблоны -->
</div>
```

Пример кода на JavaScript:

```js
// Получаем массив с элементами с атрибутом data-ajax-product
const ajaxProductNodes = Array.from(document.querySelectorAll('[data-ajax-product]'));

// Если элементы есть, то проходим по массиву и для каждого элемента записываем настройки в значении атрибута data-ajax-product и публикуем событие ui-ajax-products:load-products-list
if (ajaxProductNodes && ajaxProductNodes.length) {
  ajaxProductNodes.forEach(ajaxProductNode => {
	ajaxProductNode.dataset.ajaxProduct = JSON.stringify({
		productId,
		productData: ['variants', 'short_description', 'price_kinds', 'first_image', 'images', 'properties', 'characteristics', 'option_names', 'bundle_info', 'video_links'],
		initOnLoadPage: false,
		imageResizingRules: [
		  { size: 1000, format: 'webp', resizing_type: 'fit_width', quality: 100 },
		  { size: 500, format: 'webp', resizing_type: 'fit_width', quality: 100 },
		  { size: 1000, resizing_type: 'fit_width', quality: 100 }
		],
		hideVariants: false,
		videoBeforeImage: false,
		videoLinksDetails: true
	});

	EventBus.publish('ui-ajax-product:load-product', ajaxProductNode);
  }
}

// Далее, также как и в первом случае подписываемся на событие init-product:ui-ajax-product
EventBus.subscribe('init-product:ui-ajax-product', initAjaxProductCallback)

function initAjaxProductCallback(data) {
  // Код, который должен выполниться после того, как товар был загружен и отрисован.
  // Например, здесь может быть код инициализации галереи товара
}
```

## Подробно о шаблонах

Шаблоны играют важную роль в структурировании и представлении информации о товаре. Для понимания принципов работы шаблонов, рассмотрим структуру карточки товара в виде иерархического дерева:

-  Карточка товара
	- Галерея изображений
	- Краткое описание товара
	- Полное описание товара
	- Параметры товара
	- Компоненты комплекта (если товар является комплектом)

В Common.js для каждого уровня данного дерева реализованы специализированные шаблоны.

Всего предусмотрено 7 шаблонов:

 - Шаблон карточки товара (`data-ajax-product-template`)
	 - Шаблон галереи фото и видео товара (`data-ajax-product-gallery-template`)
	 - Шаблон с единственным фото товара (`data-ajax-product-one-photo-template`)
	 - Шаблон краткого описания товара (`data-ajax-product-short-description-template`)
	 - Шаблон полного описания товара (`data-ajax-product-full-description-template`)
	 - Шаблон параметров товара (`data-ajax-product-properties-template`)
	 - Шаблон компонента комплекта (`data-ajax-product-bundle-components-item-template`)
	 - Шаблон вывода названий и значений свойств компонента комплекта (`data-ajax-product-bundle-components-item-options-template`)

Хотя в данном списке шаблоны представлены как вложенные друг в друга, на самом деле каждый из них является самостоятельным и независимым фрагментом кода, размещенным внутри блока с атрибутом `data-ajax-product`. Вложенность шаблонов в списке демонстрирует их взаимосвязь в контексте карточки товара.

### Шаблон для отрисовки карточки товара: `data-ajax-product-template`

Основной шаблон, отвечающий за визуализацию карточки товара. Внутри обязательно должен присутствовать элемент формы с атрибутом `data-ajax-product-form`.

#### Вложенные элементы формы товара (`data-ajax-product-form`)

##### data-ajax-product-title

Добавляет название товара в `textContent` элемента.

Пример:

```html
<span data-ajax-product-title></span>
```

##### data-ajax-product-link

Добавляет элементу атрибут `href` со ссылкой на товар. Можно использовать совместно с названием товара:

```html
<a
  data-ajax-product-link
  data-ajax-product-title
></a>
```

##### data-ajax-product-stickers

Позволяет отобразить стикеры (значения параметра товара, у которого `handle` равен `label`). В качестве дочерних элементов можно использовать стандартные элементы формы товара, такие как `data-product-card-sale-value` (скидка на товар, если старая цена выше цены продажи) или ваши собственные стикеры.

Пример:

```html
<div
  class="stickers"
  data-ajax-product-stickers
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

!!! warning
		Для отображения стикеров необходимо передать параметры товара (`properties`) и их значения (`characteristics`) в настройке `productsData`.
		Полный список доступных данных можно найти по [ссылке](#productdata).

##### data-ajax-product-sizes-table-btn

Удаляет элемент из разметки, если у товара отсутствует вариант со свойством, название которого соответствует переданным значениям. Исключение составляет случай, когда товар является комплектом.

Пример:

```html
<div data-ajax-product-sizes-table-btn="Размер,Size">
	<button>Размерная сетка</button>
</div>
```

##### data-ajax-product-add-cart

Удаляет элемент из разметки, если товара нет в наличии и в настройках магазина активирована опция "Запретить заказывать больше, чем есть в наличии".

Например, если описанное выше условие истинно, то весь нижеприведенный блок будет удален из разметки:

```html
<div data-ajax-product-add-cart>
  <button type="submit" data-item-add>
    Добавить в корзину
  </button>
</div>
```

##### data-ajax-product-gallery

Атрибут для отрисовки [шаблона галереи товара (`data-ajax-product-gallery-template`)](#data-ajax-product-gallery-template).

Пример:

```html
<div data-ajax-product-gallery></div>
```

##### data-ajax-product-one-photo

Атрибут для отображения [шаблона единственного изображения товара (`data-ajax-product-one-photo-template`)](#data-ajax-product-one-photo-template).

```html
<div data-ajax-product-one-photo></div>
```

##### data-ajax-product-variants-select-block

Позволяет выводить селектор для выбора варианта товара. Работает по тому же принципу, что и в случае со [стандартной карточкой товара](/common.v2.js/2Products/#data-product-variants), но вид отображения должен быть указан в значении атрибута `data-ajax-product-variants-select-block`, а не `data-product-variants`.

Пример:

```html
<div
	data-ajax-product-variants-select-block='{
	"default": "{% if widget_settings.display-property-color == "option-radio" %}option-radio{% else %}option-span{% endif %}",
	"Цвет": "{{widget_settings.display-property-color }}"
	}'
>
	<select
		name="variant_id"
		data-product-variants
    ></select>
</div>
```

!!! warning
		Для отображения вариантов необходимо передать варианты товара (`variants`) в настройке `productsData`.
		Полный список доступных данных можно найти по [ссылке](#productdata).

##### data-ajax-product-short-description

Атрибут для отрисовки [шаблона краткого описания товара (`data-ajax-product-short-description-template`)](#data-ajax-product-short-description-template).

Пример:

```html
<div data-ajax-product-short-description></div>
```

##### data-ajax-product-full-description

Атрибут для отрисовки [шаблона краткого описания товара (`data-ajax-product-full-description-template`)](#data-ajax-product-full-description-template).

Пример:

```html
<div data-ajax-product-full-description></div>
```

##### data-ajax-product-properties

Атрибут для отрисовки [шаблона параметров товара (`data-ajax-product-properties-template`)](#data-ajax-product-properties-template).

Принимает 3 настройки:
 - `maxCount` - ограничивает максимальное количество выводимых параметров (по умолчанию 100 штук)
 - `maxVisibleItemsCount` - указывает количество отображаемых параметров, остальным элементам с параметрами будет присвоен класс `ajax-product-property-hidden`
 - `excludeHandles` - позволяет указать через запятую handle параметров, которые не должны выводиться

Пример:

```html
<div
	data-ajax-product-properties='{
	  "maxCount": "100",
	  "maxVisibleItemsCount": "5",
	  "excludeHandles": "label"
	}'
></div>
```

##### data-ajax-product-unit

Добавляет единицы измерения товара в `textContent` элемента.

Пример:

```html
<span data-ajax-product-unit></span>
```

##### data-ajax-product-favorites-trigger

Позволяет добавить кнопку для добавления товара в избранное. Работает в связке со стандартным атрибутом `data-ui-favorites-trigger`.

Пример:

```html
{% if settings.favorite_enabled %}
<span
	data-ui-favorites-trigger
	data-ajax-product-favorites-trigger
>
	<span class="btn-icon icon-favorites-o"></span>
	<span class="btn-icon icon-favorites-f"></span>
</span>
{% endif %}
```

Для корректной работы кнопки после загрузки и отрисовки товаров необходимо вызвать метод `update` класса `FavoritesProducts`.

Пример кода на JavaScript:

```js
EventBus.subscribe('init-product:ui-ajax-product', initAjaxProductCallback)

function initAjaxProductCallback(data) {
	// Обновляем состояние избранных товаров
	FavoritesProducts.update();

	// Код, который должен выполниться после того, как товар был загружен и отрисован.
	// Например, здесь может быть код инициализации галереи товара
}
```

Подробнее о работе с избранными товарами можно узнать [здесь](/common.v2.js/6FavoritesProducts/).

##### data-ajax-product-compare-trigger

Позволяет добавить кнопку для добавления товара в сравнение. Работает в связке со стандартным атрибутом `data-compare-trigger`.

Пример:

```html
{% if settings.compare_enabled == null or settings.compare_enabled %}
<div>
  <span
	data-compare-trigger
	data-ajax-product-compare-trigger
>
	<span class="product__user-btn-icon icon-compare"></span>
	<span
	  data-compare-trigger-added-text="{{ messages.btn_compare_text_active }}"
	  data-compare-trigger-not-added-text="{{ messages.btn_compare_text }}"
>
	  {{ messages.btn_compare_text }}
	</span>
  </span>
</div>
{% endif %}
```

После отрисовки товаров, аналогично случаю с избранными товарами, необходимо обновить состояние с помощью метода `update` класса `Compare`.

Пример кода на JavaScript:

```js
EventBus.subscribe('init-product:ui-ajax-product', initAjaxProductCallback)

function initAjaxProductCallback(data) {
	// Обновляем состояние избранных товаров и товаров в сравнении
	FavoritesProducts.update();
	Compare.update();

	// Код, который должен выполниться после того, как товар был загружен и отрисован.
	// Например, здесь может быть код инициализации галереи товара
}
```

Подробнее о работе со сравнением товаров можно узнать [здесь](/common.v2.js/5Compare/).

##### data-ajax-product-bundle-discount

Если товар является комплектом и имеет скидку, то выводит скидку на весь комплект.

Пример:

```html
<div class="product__bundle-discount">
	<span class="product__bundle-discount-label">{{messages.product_bundle_discount_label}}:</span>
	<span
	  class="product__bundle-discount-value"
	  data-ajax-product-bundle-discount
    ></span>
</div>
```

##### data-ajax-product-bundle-components

Атрибут для отрисовки [шаблона вывода компонентов комплекта (`data-ajax-product-bundle-components-item-template`)](#data-ajax-product-bundle-components-item-template), если товар является комплектом.

Во время загрузки комплекта элементу будет присвоен класс `ajax-product-bundle-items-loading`. После загрузки комплекта и его отображения будет присвоен класс `ajax-product-bundle-items-loaded`.

Полный список классов доступен по [ссылке](#css).

Пример:

```html
<div data-ajax-product-bundle-components></div>
```

### Шаблон для отрисовки галереи товара: `data-ajax-product-gallery-template`

Шаблон для отображения изображений и видео товара, включая миниатюры изображений и видео. Шаблон можно подключить в форме товара `data-ajax-product-form` с помощью элемента с атрибутом [`data-ajax-product-gallery`](#data-ajax-product-gallery).

!!! info
		Шаблон будет использован, если у товара имеется более одного изображения или видео.

!!! warning
		Обратите внимание: чтобы шаблон был отрисован, в `productsData` необходимо передать изображения товара (`images`) и ссылки на видео товара (`video_links`).
		Полный список доступных данных можно найти по [ссылке](#productdata).

В шаблоне могут быть размещены до 6 блоков для отображения изображений и видео каждого типа.

#### Блок для отображения изображения товара: `data-ajax-product-gallery-image-item`

Блок для отображения изображений товара.

**Вложенные элементы**

##### data-ajax-product-image-link

Добавляет элементу атрибут `href` со ссылкой на изображение.

##### data-ajax-product-image-id

Добавляет элементу атрибут `id` с идентификатором изображения в системе.

##### data-ajax-product-image-resizing-rules-index

Используется для указания порядка отображения изображений из массива `imageResizingRules`, переданного в качестве свойства объекта настроек `data-ajax-product`. Элементы размещаются в теге `<picture>`.

Например, передаем следующий массив в `data-ajax-product`:

```html
<div data-ajax-product='{
  "imageResizingRules": [
	{"size":"1080", "format":"webp", "resizing_type":"fit_width", "quality":"100"},
	{"size":"240", "format":"webp", "resizing_type":"fit_width", "quality":"100"},
	{"size":"1080", "resizing_type":"fit_width", "quality":"100"}
  ]
}'></div>
```

Для вывода полученных изображений в порядке, начиная с нулевого элемента массива, используйте следующий пример разметки шаблона:

```html
<!-- Шаблон галереи фото и видео товара -->
<template data-ajax-product-gallery-template>
	<div data-ajax-product-gallery-image-item>
	  <a data-ajax-product-image-link>
		<div>
		  <picture>
			<source
			  data-ajax-product-image-resizing-rules-index="0"
			  media="(min-width:768px)"
			  type="image/webp"
			  class="lazyload"
>
			<source
			  media="(max-width:767px)"
			  data-ajax-product-image-resizing-rules-index="1"
			  type="image/webp"
			  class="lazyload"
>
			<img
			  data-ajax-product-image-resizing-rules-index="2"
			  class="lazyload"
			/>
		  </picture>
		</div>
	  </a>
	</div>

	<!-- Остальные блоки шаблона -->
</template>
```

Если атрибут не указан или не присвоено значение, то для всех элементов `<source>` и `<img>` в качестве значений атрибутов `src` и `data-srcset` будет использована ссылка на изображение оригинальных размеров. Это означает, что если вы не хотите настраивать отображение изображений с помощью атрибута `data-ajax-product-image-resizing-rules-index`, изображения будут отображаться в своих первоначальных размерах, что может привести к замедлению загрузки страницы или неоптимальному отображению на разных устройствах.

#### Блок для отображения миниатюры изображения товара: `data-ajax-product-gallery-thumb-image-item`

Блок, предназначенный для отображения миниатюры изображения товара.

Пример использования:

```html
<!-- Шаблон галереи фото и видео товара -->
<template data-ajax-product-gallery-template>
	<div data-ajax-product-gallery-thumb-image-item>
		<div>
		  <picture>
			<source
			  data-ajax-product-image-resizing-rules-index="3"
			  type="image/webp"
			  class="lazyload"
>
			<img
			  data-ajax-product-image-resizing-rules-index="4"
			  class="lazyload"
			/>
		  </picture>
		</div>
	</div>

	<!-- Остальные блоки шаблона -->
</template>
```

#### Блок для отображения iframe-видео товара: `data-ajax-product-gallery-main-iframe`

Блок, предназначенный для отображения видео товара во фрейме (YouTube/Vimeo/Rutube).

Список возможных вложенных элементов:

- `data-ajax-product-gallery-media-link` — добавляет атрибут `href` с ссылкой на видео.
- `data-ajax-product-gallery-media-index-href` — добавляет атрибут `href` с якорной ссылкой на видео. Может быть полезно для связывания видео с миниатюрой. ID будет иметь вид `#video-000000`, где `000000` – ID видео в системе.
- `data-ajax-product-gallery-media-preview` — добавляет атрибут `src` со ссылкой на превью видео.
- `data-ajax-product-gallery-media-content` — добавляет в `innerHTML` элемент `<iframe>` с видео.

Пример использования:

```html
<!-- Шаблон галереи фото и видео товара -->
<template data-ajax-product-gallery-template>
	<div data-ajax-product-gallery-main-iframe>
	  <a data-ajax-product-gallery-media-index-href>
		<div class="control play">
		  <span class="center"></span>
		</div>
		<div class="img-ratio__inner">
		  <img data-ajax-product-gallery-media-preview />
		</div>
		<div data-ajax-product-gallery-media-content></div>
	  </a>
	</div>

	<!-- Остальные блоки шаблона -->
</template>
```

#### Блок для отображения миниатюры iframe-видео товара: `data-ajax-product-gallery-thumb-iframe`

Блок, предназначенный для отображения миниатюры iframe-видео товара (YouTube/Vimeo/Rutube). Может содержать те же вложенные элементы, что и блок с атрибутом [`data-ajax-product-gallery-main-iframe`](#iframe-data-ajax-product-gallery-main-iframe).

Пример использования:

```html
<!-- Шаблон галереи фото и видео товара -->
<template data-ajax-product-gallery-template>
	<div data-ajax-product-gallery-thumb-iframe>
		<div class="control play">
			<span class="center"></span>
		</div>
		<div class="img-ratio__inner">
		  <img data-ajax-product-gallery-media-preview />
		</div>
	</div>

	<!-- Остальные блоки шаблона -->
</template>
```

#### Блок для отображения видео товара из файлов интернет-магазина: `data-ajax-product-gallery-main-video`

Блок, предназначенный для отображения видео товара, загруженных в панели администратора в разделе "Сайт" > "Файлы".

Список возможных вложенных элементов:

- `data-ajax-product-gallery-media-link` — добавляет атрибут `href` со ссылкой на видео.
- `data-ajax-product-gallery-media-preview` — добавляет атрибут `src` со ссылкой на картинку-заглушку.
- `data-ajax-product-gallery-media-content` — заменяет элемент на элемент `<video>` с внутренним источником (`<source>`).

Пример:

```html
<!-- Шаблон галереи фото и видео товара -->
<template data-ajax-product-gallery-template>
	<div data-ajax-product-gallery-main-video>
	  <a data-ajax-product-gallery-media-link>
		<div data-ajax-product-gallery-media-content></div>
	  </a>
	</div>

	<!-- Остальные блоки шаблона -->
</template>
```

#### Блок для отображения миниатюры видео товара: `data-ajax-product-gallery-thumb-video`

Блок, предназначенный для отображения миниатюры видео товара, загруженных в панели администратора в разделе "Сайт" > "Файлы". Может содержать те же вложенные элементы, что и блок с атрибутом [`data-ajax-product-gallery-main-video`](#-data-ajax-product-gallery-main-video).

### Шаблон для отрисовки единственного изображения товара: `data-ajax-product-one-photo-template`

Шаблон, предназначенный для отображения единственного изображения товара (в случае, если у товара только одно изображение и нет видео). Внутри этого шаблона необходим элемент с атрибутом `data-ajax-product-one-photo-item`. Шаблон можно подключить в форме товара `data-ajax-product-form` с помощью элемента с атрибутом [`data-ajax-product-one-photo`](#data-ajax-product-one-photo).

Как и в шаблоне галереи изображений и видео, здесь используется элемент с атрибутом `data-ajax-product-image-resizing-rules-index`, описание которого можно найти по [ссылке](#data-ajax-product-image-resizing-rules-index).

Пример использования:

```html
<!-- Шаблон с единственным фото товара -->
<template data-ajax-product-one-photo-template>
	<div data-ajax-product-one-photo-item>
		<a data-ajax-product-image-link>
			<picture>
			  <source
				data-ajax-product-image-resizing-rules-index="0"
				media="(min-width:768px)"
				type="image/webp"
				class="lazyload"
              >
			  <source
				media="(max-width:767px)"
				data-ajax-product-image-resizing-rules-index="1"
				type="image/webp"
				class="lazyload"
              >
			  <img
				data-ajax-product-image-resizing-rules-index="2"
				class="lazyload"
			  />
			</picture>
		</a>
	</div>
</template>
```

!!! warning
		Обратите внимание: для отображения этого шаблона необходимо, чтобы в настройке `productsData` были переданы изображения товара (`images`). Полный список доступных данных можно найти по [ссылке](#productdata).

### Шаблон для отрисовки краткого описания товара: `data-ajax-product-short-description-template`

Шаблон, предназначенный для отрисовки краткого описания товара. Шаблон можно подключить в форме товара `data-ajax-product-form` с помощью элемента с атрибутом [`data-ajax-product-short-description`](#data-ajax-product-short-description).

В этом шаблоне могут присутствовать различные элементы с любой вложенностью. Описание всегда будет записано в элемент с атрибутом `data-ajax-product-short-description-item-text`. Это позволяет настроить отображение описания по вашему усмотрению, например, добавить кнопки "Свернуть описание"/"Развернуть описание", как это реализовано в виджете SP16.

Пример использования:

```html
<!-- Шаблон краткого описания товара -->
<template data-ajax-product-short-description-template>
	<div data-ajax-product-short-description-item-text></div>
</template>
```

!!! warning
		Обратите внимание: для отображения этого шаблона необходимо, чтобы в настройке `productsData` было передано краткое описание товара (`short_description`). Полный список доступных данных можно найти по [ссылке](#productdata).

### Шаблон для отрисовки полного описания товара: `data-ajax-product-full-description-template`

Шаблон, предназначенный для отрисовки полного описания товара. Шаблон можно подключить в форме товара `data-ajax-product-form` с помощью элемента с атрибутом [`data-ajax-product-full-description`](#data-ajax-product-full-description).

В этом шаблоне могут присутствовать различные элементы с любой вложенностью. Описание всегда будет записано в элемент с атрибутом `data-ajax-product-full-description-item-text`. Это позволяет настроить отображение описания по вашему усмотрению, например, добавить кнопки "Свернуть описание"/"Развернуть описание", как это реализовано в случае с кратким описанием виджете SP16.

Пример использования:

```html
<!-- Шаблон краткого описания товара -->
<template data-ajax-product-full-description-template>
	<div data-ajax-product-full-description-item-text></div>
</template>
```

!!! warning
		Обратите внимание: для отображения этого шаблона необходимо, чтобы в настройке productsData было передано полное описание товара (description). Полный список доступных данных можно найти по [ссылке](#productdata).

### Шаблон для отрисовки параметров товара: `data-ajax-product-properties-template`

Шаблон, предназначенный для отрисовки параметров товара и их значений. Шаблон можно подключить в форме товара `data-ajax-product-form` с помощью элемента с атрибутом [`data-ajax-product-properties`](#data-ajax-product-properties).

Структура вложенности этого шаблона должна быть следующей:

1. Блок параметра (`data-ajax-product-property`)
	1. Название параметра (`data-ajax-product-property-title`)
	2. Значение параметра (`data-ajax-product-property-characteristic-title`)
2. Кнопка "Показать ещё" (`data-ajax-product-properties-show-more-btn`)
3. Кнопка "Свернуть" (`data-ajax-product-properties-hide-btn`)

Кнопки "Показать ещё" и "Свернуть" не являются обязательными, но для их отображения необходимо указать соответствующие data-атрибуты, описанные выше. Кнопки не будут добавлены в разметку, если количество параметров меньше, чем максимальное количество отображаемых параметров (`maxVisibleItemsCount`), переданное в настройках элемента с атрибутом [`data-ajax-product-properties`](#data-ajax-product-properties).

Пример использования:

```html
<!-- Шаблон для отрисовки параметров товара -->
<template data-ajax-product-properties-template>
	<div class="content-properties">
		<div class="properties-items">
			<div class="property" data-ajax-product-property>
				<div class="property-name" data-ajax-product-property-title></div>
				<div class="delimiter"></div>
				<div
				  class="property-content"
				  data-ajax-product-property-characteristic-title
                ></div>
			</div>
			<span
				data-ajax-product-properties-show-more-btn
				class="button-link more-items js-more-prop"
            >{{ messages.more_prop }}</span>
			<span
				data-ajax-product-properties-hide-btn
				class="button-link hide-items js-hide-prop"
            >{{ messages.more_prop }}</span>
		</div>
	</div>
</template>
```

!!! warning
		Обратите внимание: для отрисовки этого шаблона необходимо, чтобы в настройке `productsData` были переданы параметры товара (`properties`) и их значения (`characteristics`). Полный список доступных данных можно найти по [ссылке](#productdata).

### Шаблон компонента комплекта: `data-ajax-product-bundle-components-item-template`

Шаблон предназначен для отрисовки компонентов комплекта, если товар является комплектом. Внутри обязательно должен присутствовать элемент с атрибутом `data-ajax-product-bundle-components-item`, содержащий все необходимые дочерние элементы.

Шаблон можно подключить в форме товара `data-ajax-product-form` с помощью элемента с атрибутом [`data-ajax-product-bundle-components`](#data-ajax-product-bundle-components).

#### Вложенные элементы компонента комплекта (`data-ajax-product-bundle-components-item`)

##### data-ajax-product-bundle-components-item-title

Добавляет название товара в `textContent` элемента.

##### data-ajax-product-bundle-components-item-link

Добавляет атрибут `href` элементу, содержащий ссылку на товар.

##### data-ajax-product-bundle-components-item-image

Устанавливает атрибут `src` элементу, содержащий ссылку на изображение товара.

##### data-ajax-product-bundle-components-item-quantity

Записывает количество товара в комплекте в `textContent` элемента.

##### data-ajax-product-bundle-components-item-product-price

Добавляет цену товара в `textContent` элемента. Если цена товара равна нулю, элемент с атрибутом `data-ajax-product-bundle-components-item` получает класс `ajax-product-bundle-item-is-free`.

##### data-ajax-product-bundle-components-item-variant-price

Добавляет цену варианта товара в `textContent` элемента. Если цена варианта товара равна нулю, элемент с атрибутом `data-ajax-product-bundle-components-item` получает класс `ajax-product-bundle-item-is-free`.

##### data-ajax-product-bundle-components-item-options

Атрибут используется для отрисовки шаблона, содержащего названия и значения свойств варианта товара (`data-ajax-product-bundle-components-item-options-template`), о котором можно узнать по [ссылке](#data-ajax-product-bundle-components-item-options-template).

Пример:

```html
<!-- Шаблон компонента комплекта -->
<template data-ajax-product-bundle-components-item-template>
	<div data-ajax-product-bundle-components-item>
	  <div class="bundle-item__photo">
		<div class="img-ratio img-ratio_cover product__photo">
		  <div class="img-ratio__inner">
			<a
			  data-ajax-product-bundle-components-item-link
			  target="_blank"
            >
			  <img data-ajax-product-bundle-components-item-image>
			</a>
		  </div>
		</div>
	  </div>
	  <div class="bundle-item__info">
		<div class="bundle-item__name">
		  <a
			data-ajax-product-bundle-components-item-title
			data-ajax-product-bundle-components-item-link
			target="_blank"
          >
		  </a>
		</div>
		<div
		  data-ajax-product-bundle-components-item-options
		  class="bundle-item__property-list"
        ></div>
		<div class="bundle-item__price">
		  <div class="bundle-item__free">
			<span data-ajax-product-bundle-components-item-quantity></span> x <span>{{widget_messages.product_bundle_gift_text}}</span>
		  </div>

		  <div class="bundle-item__not_free">
			<span data-ajax-product-bundle-components-item-quantity></span> x <span data-ajax-product-bundle-components-item-variant-price></span>
		  </div>
		</div>
	  </div>
	</div>
</template>
```

!!! warning
	Обратите внимание: для отрисовки этого шаблона необходимо, чтобы в настройке `productsData` была передана информация о комплекте (`bundle_info`). Полный список доступных данных можно найти по [ссылке](#productdata).

### Шаблон для отрисовки названий и значений свойств компонента комплекта: `data-ajax-product-bundle-components-item-options-template`

Шаблон для отрисовки названий и значений свойств вариантов товаров, являющихся компонентами комплекта. Внутри шаблона обязательно должен присутствовать элемент с атрибутом `data-ajax-product-bundle-components-item-options-item`, содержащий название и/или значение свойства.

Шаблон можно подключить внутри шаблона компонента комплекта `data-ajax-product-bundle-components-item-template` с помощью элемента с атрибутом [`data-ajax-product-bundle-components-item-options`](#data-ajax-product-bundle-components-item-options).

Пример:

```html
<!-- Шаблон вывода названий и значений свойств компонента комплекта -->
<template data-ajax-product-bundle-components-item-options-template>
	<div
	  data-ajax-product-bundle-components-item-options-item
	  class="bundle-item__property-item"
    >
		<span data-ajax-product-bundle-components-item-options-item-name-title></span>: <span data-ajax-product-bundle-components-item-options-item-value-title></span>
	</div>
</template>
```

!!! warning
		Обратите внимание: для отрисовки этого шаблона необходимо, чтобы в настройке `productsData` была передана информация о комплекте (`bundle_info`). Полный список доступных данных можно найти по [ссылке](#productdata).


## События

- `ui-ajax-product:load-product` — событие, которое необходимо инициализировать в JavaScript.
- `init-product:ui-ajax-product` — срабатывает после успешной загрузки и отрисовки товара.

Подробнее о событиях компонента можно узнать по следующей [ссылке](#_3).

## Список доступных данных для настройки `productData`

### Данные по умолчанию (если ничего не передать):
 - URL товара
 - Название товара
 - Наличие
 - Единицы измерения
 - Минимальная цена
 - Максимальная цена

### Данные которые можно получить и использовать в компоненте:
- `variants` — варианты товара
- `short_description` — краткое описание
- `description` — полное описание
- `price_kinds` — типы цен
- `first_image` — первое изображение товара
- `images` — все изображения товара
- `properties` — параметры товара
- `characteristics` — значения параметров
- `option_names` — названия свойств вариантов
- `bundle_info` — информация о компонентах комплекта
- `video_links` — ссылки на видео

## CSS классы

Ниже представлены классы для элементов с атрибутами компонента.

### data-ajax-product

- `ajax-product-is-loading` — присваивается во время загрузки и отрисовки товара.
- `ajax-product-is-init` — присваивается после успешной загрузки и отрисовки товара.

### data-ajax-product-form

- `ajax-product-has-many-variants` — присваивается, если у товара больше одного варианта и задано хотя бы одно свойство.
- `ajax-product-has-many-old-prices` — присваивается, если у вариантов товара различаются старые цены.
- `ajax-product-has-many-sale-prices` — присваивается, если у вариантов товара различаются цены продажи.
- `ajax-product-is-bundle` — присваивается, если товар является комплектом.
- `ajax-product-gallery-video-before-image` — присваивается, если в `productData` передан параметр `videoBeforeImage` со значением `true`.

Кроме того, для формы товара доступны стандартные классы:

- `with-old-price` — присваивается, если у варианта товара есть старая цена.
- `without-old-price` — присваивается, если у варианта товара нет старой цены.
- `with-sku` — присваивается, если у варианта товара есть артикул.
- `without-sku` — присваивается, если у варианта товара нет артикула.
- `is-available` — присваивается, если вариант товара в наличии.
- `not-available` — присваивается, если варианта товара нет в наличии.
- `with-sale-value` — присваивается, если цена продажи варианта меньше старой цены.

### data-ajax-product-property

- `ajax-product-property-hidden` — присваивается параметрам, которые выходят за рамки заданного значения `maxVisibleItemsCount` и не должны отображаться на странице.

### data-ajax-product-bundle-components

- `ajax-product-bundle-items-loading` — присваивается на время загрузки и отрисовки компонентов комплекта.
- `ajax-product-bundle-items-loaded` — присваивается после успешной загрузки и отрисовки компонентов комплекта.

### data-ajax-product-bundle-components-item

- `ajax-product-bundle-item-is-free` — присваивается, если компонент комплекта товара имеет нулевую цену.
