# Опции в карточке товара

Компонент предназначен для добавления различных пользовательских опций к карточке товара в интернет-магазине. Данный компонент позволяет отображать дополнительные аксессуары, или добавки к варианту товара, которые пользователь может выбирать. Более детальную информацию о функционале опций вы можете найти на [странице документации на сайте inSales](https://www.insales.ru/collection/doc-nastroyki-tovarov/product/optsii).

## Назначение атрибутов

### `data-product-accessories`

Этот обязательный атрибут применяется к контейнеру, который служит обёрткой для всех опций товара. Контейнер с этим атрибутом должен быть расположен внутри формы товара, содержащей атрибут `data-product-id`. Атрибут `data-product-accessories` обеспечивает связь между опциями и конкретным товаром.

### `data-product-accessories-template`

Атрибут `data-product-accessories-template` применяется к основному шаблону, который отвечает за отрисовку каждой отдельной опции и её значений. Этот шаблон задаёт структуру и визуальное представление опций, а также способ их взаимодействия с пользователем.

#### `data-product-accessories-item`

Корневой элемент шаблона для вывода опции, внутри которого будет располагаться информация об опции товара.

#### `data-product-accessory-name`

Добавляет название опции внутри элемента.

#### `data-product-accessory-minmax-count`

Выводит минимальное и максимальное количество значений, которые должны быть выбраны пользователем. В качестве значения можно передать JSON с текстом который будет выводиться перед минимальным и максимальным количеством значеним, например: от 3 до 6.

Пример кода:

```html
<span data-product-accessory-minmax-count='{
  "minCountMessage": "от",
  "maxCountMessage": "до"
}'></span>
```

#### `data-product-accessory-error`

Атрибут `data-product-accessory-error` используется для отображения сообщения об ошибке, когда выбранное количество значений опции выходит за пределы заданных минимального и максимального. Вы можете передать JSON со следующими свойствами:

- `lessThanMinCount`: Текст сообщения, отображаемого, когда выбранное количество меньше минимального.
- `moreThanMaxCount`: Текст сообщения, отображаемого, когда выбранное количество больше максимального.
- `scrollEnabled`: Установите в `true`, чтобы включить автоматическую прокрутку к сообщению об ошибке при его появлении.

Пример кода:

```html
<div
  data-product-accessory-error='{
    "lessThanMinCount": "Выбрано меньше, чем минимальное количество",
    "moreThanMaxCount": "Выбрано больше, чем максимальное количество",
    "scrollEnabled": "true"
  }'
  class="accessory-item__error"
></div>
```

#### `data-product-accessory-values`

Корневой элемент шаблона значения опции (`data-product-accessory-values-template`).

#### `data-product-accessory-values-template`

Шаблон с атрибутом `data-product-accessory-values-template` используется для отрисовки каждого значения отдельной опции. Это позволяет детально настроить отображение каждого возможного выбора в рамках одной опции, например, различных цветов, размеров или дополнительных аксессуаров.

#### `data-product-accessory-values-item`

Корневой элемент шаблона для вывода значения опции, внутри которого будет располагаться информация о значении опции товара.

#### `data-product-accessory-values-item-id`

Атрибут `data-product-accessory-values-item-id` применяется к элементу, который содержит идентификатор значения опции. Этот идентификатор используется для связи с конкретным значением опции товара.

#### `data-product-accessory-values-item-name`

Добавляет название значения опции внутри элемента.

#### `data-product-accessory-values-item-price`

Добавляет цену значения опции внутри элемента.

## Пример разметки

```html
{% unless product.is_bundle %}
    {% if product.accessories.size > 0 %}
      <div class="product__area-accessories">
        <div class="label-accessories">{{ messages.options }}</div>
        <div data-product-accessories></div>
      </div>

      <template data-product-accessories-template>
        <div
          class="accessory-item"
          data-product-accessories-item
        >
          <div class="accessory-name">
            <strong>
              <span data-product-accessory-name></span>
            </strong>

            <span data-product-accessory-minmax-count='{
              "minCountMessage": "{{ messages.from }}",
              "maxCountMessage": "{{ messages.to }}"
            }'></span>
          </div>

          <div class="accessory-values" data-product-accessory-values></div>

          <div
            data-product-accessory-error='{
              "lessThenMinCount": "Выбрано меньше минимального количества",
              "moreThenMaxCount": "Выбрано больше максимального количества",
              "scrollEnabled": "true"
            }'
            class="accessory-item__error"
          ></div>
        </div>
      </template>

      <template data-product-accessory-values-template>
        <label
          class="accessory-values__item"
          data-product-accessory-values-item
          data-product-accessory-values-item-id
        >
          <span data-product-accessory-values-item-name></span> (+<span data-product-accessory-values-item-price></span>)
        </label>
      </template>
    {% endif %}
  {% endunless %}
```
