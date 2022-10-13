# AJAX-фильтры

Компонент с помощью которого вы можете реализовать подгрузку фильтров через AJAX-запросы.

## Принцип работы

Инициализация происходит после события `DOMContentLoaded` на странице категории, где есть форма с атрибутом `data-ajax-filter`. Если необходимо, чтобы значения свойств вариантов выводились в виде картинок, то в качестве значения атрибута передайте объект со свойством `useImages` и значением `true`. 

Сначала мы получаем все фильтры с помощью AJAX-запроса, далее с помощью шаблонов происходит рендер каждой отдельной группы фильтров. Каждая такая группа попадает в блок с атрибутом `data-ajax-filter-items`.

### Подробно о шаблонах

Классическое дерево фильтров можно изобразить так:

- Фильтр по цене товаров
- Свойства 
    - Размер
        - 41
        - 42
        - 43
    - Цвет
        - Красный
        - Синий
        - Белый
- Параметры
    - Материал
        - Натуральная кожа
        - Искусственная кожа
    - Сезон
        - Зима
        - Лето

Для рендера каждой отдельной ветки вышеописанного дерева в Common.js были реализованы отдельные шаблоны. Для удобства, в примере разметки ниже мы разместили каждый шаблон внутри тега `<template>`. 

Всего реализовано 5 шаблонов:

 - Шаблон элемента фильтра по цене
 - Шаблон элемента фильтра
    - Шаблон значений параметров и свойств
    - Шаблон значений свойств в виде картинок
    - Шаблон значений параметра если он задан как числовой

Чтобы показать зависимость шаблонов значений от шаблона элемента фильтра, в списке они показаны как вложенные, однако ни один из шаблонов не вложен в другой. Каждый из них это отдельная часть кода внутри формы. Для того чтобы всё работало корректно в коде формы рекомендуется использовать все перечисленные шаблоны.

## Пример разметки

```html
{% assign coll_min = collections[collection.handle].products_price_min | round: 0 %}
{% assign coll_max = collections[collection.handle].products_price_max | round: 0 %}

{% if coll_min == coll_max %}
  {% assign display_filter = false %}
{% endif %}

{% if filter_shown or collection.properties.size > 0 or collection.options.size > 0 %}
  {% assign display_filter = true %}
{% endif %}

{% if collection.current_option_values.size > 0 or collection.current_characteristics.size > 0 %}
  {% assign filter_active = true %}
{% endif %}

{% if price_min or price_max %}
  {% assign filter_active = true %}
{% endif %}

{% if display_filter and collection.products.size > 1 %}
  {% assign display_filter = true %}
{% elsif collection.products.size < 2 and filter_active  %}
  {% assign display_filter = true %}
{% else %}
  {% assign display_filter = false %}
{% endif %}

<form
  data-ajax-filter='{"useImages": "false"}'
  action="{{ collection.url }}"
  method="get"
>
  <div class="filter__content">
    <div class="filter__head">
      <div class="filter__head-title">Фильтры</div>
    <div class="filter__items" data-ajax-filter-items></div>
  </div>

  <div class="filter__controls">
    <button type="submit">Применить</button>
  </div>

  {% if order %}
  <input type="hidden" name="order" value="{{ order }}" />
  {% endif %}

  {% if page_size %}
  <input type="hidden" name="page_size" value="{{ page_size }}"/>
  {% endif %}

  {% if language.not_default? %}
  <input type="hidden" name="lang" value="{{ language.locale }}"/>
  {% endif %}

  {% if search.query != '' %}
  <input type="hidden" name="q" value="{{ search.query }}"/>
  {% endif %}

  <!-- Шаблон элемента фильтра по цене -->
  <template data-ajax-filter-template-price>
    <div class="filter-item filter-item_price">
      <div class="filter-item__head">
        <span class="filter-item__name">{{messages.filter_price_title}}</span>
      </div>
      <div class="filter-item__content">
        <div
          data-ajax-filter-range
          class="filter-range"
        >
          <div class="filter-range__values">
            <div class="filter-range__values-item">
              <span class="filter-range__values-label">От</span>
              <input
                data-ajax-filter-range-field-min
                type="text"
                name="price_min"
                value="{{ price_min }}"
                {% unless price_min %} disabled {% endunless %}
              />
            </div>
            <div class="filter-range__values-item">
              <span class="filter-range__values-label">До</span>
              <input
                data-ajax-filter-range-field-max
                type="text"
                name="price_max"
                value="{{ price_max }}"
                {% unless price_max %} disabled {% endunless %}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <!-- Шаблон элемента фильтра -->
  <template data-ajax-filter-template-item>
    <div class="filter-item" data-ajax-filter-item>
      <div class="filter-item__head">
        <span class="filter-item__name" data-ajax-filter-item-title></span>
      </div>
      <div class="filter-item__content">
        <div class="filter-item__list" data-ajax-filter-item-content></div>
      </div>
    </div>
  </template>
        
  <!-- Шаблон значений параметров и свойств -->
  <template data-ajax-filter-template-usual>
    <div class="filter-item__list-item">
      <label class="filter-option _checkbox">
        <input
          autocomplete="off"
          class="filter-option__field"
          type="checkbox"
        />
        <span class="filter-option__content">
          <span class="filter-option__label" data-ajax-filter-option-label></span>
        </span>
      </label>
    </div>
  </template>

  <!-- Шаблон значений свойств в виде картинок -->
  <template data-ajax-filter-template-color>
    <div class="filter-item__list-item ">
      <label class="filter-option _checkbox">
        <input
          autocomplete="off"
          class="filter-option__field"
          type="checkbox"
          name="options[][]"
        >
        <span class="filter-option__content">
          <span class="filter-option__label" data-ajax-filter-option-image></span>
        </span>
      </label>
    </div>
  </template>
        
  <!-- Шаблон значений параметра если он задан как числовой -->
  <template data-ajax-filter-template-numeric>
    <div
      data-ajax-filter-range
      class="filter-range"
    >
      <div class="filter-range__values">
        <div class="filter-range__values-item">
          <span class="filter-range__values-label">От</span>
          <input
            data-ajax-filter-range-field-min
            type="text"
          />
        </div>
        <div class="filter-range__values-item">
          <span class="filter-range__values-label">До</span>
          <input
            data-ajax-filter-range-field-max
            type="text"
          />
        </div>
      </div>
    </div>
  </template>
</form>
```