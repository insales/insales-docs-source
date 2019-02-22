# Компонент фильтра `ui-filter`

Позволяет выводить товары в каталоге лишь с определенно заданными параметрами/характеристиками

## Пример использования
```
<ui-filter
  action="{{ collection.url }}"
  caption-apply="{{ messages.button_apply }}"
  caption-reset="{{ messages.button_reset_filters }}"
  icon-clear="fa fa-remove"
  :icon-toggle="['fa fa-angle-down', 'fa fa-angle-up']"
  >
  {% unless hide_heading %}
    <div class="sidebar-block-heading" slot="title">
      {{ heading_messages }}
    </div>
  {% endunless %}

  {% assign coll_min = collections[collection.handle].products_price_min | round: 0 %}
  {% assign coll_max = collections[collection.handle].products_price_max | round: 0 %}

  <ui-filter-section
    title="{{ messages.label_price }}"
    data-view="range"
    data-type="price"
    :range-data="{ min: {{ coll_min }}, max: {{ coll_max }}}"
    hide-submit
  >

  </ui-filter-section>

  {% if show_options %}
    {% for option in collection.options %}
      {% capture options %}[
      {% for value in option.values %}{ 'value': '{{ value.id | escape | strip_newlines }}', 'label': '{{ value.title | escape | strip_newlines}} <span>{{value.products_count}}</span>'},{% endfor %}
      ]{% endcapture %}

      <ui-filter-section
        title="{{ option.title | escape }}"
        data-view="checkbox"
        data-type="options"
        data-id="{{ option.id }}"
        :options="{{ options | escape | strip_newlines }}"
        hide-submit
      >
    </ui-filter-section>
    {% endfor %}
  {% endif %}

  {% for property in collection.properties %}
    {% if property.is_numeric? %}
      {% assign min_val = property.characteristics.first.name | round: 0 %}
      {% assign max_val = property.characteristics.first.name | round: 0 %}

      {% for characteristic in property.characteristics %}
        {% assign val = characteristic.name | round: 0 %}
        {% if val < min_val %}
          {% assign min_val = val %}
        {% endif %}

        {% if val > max_val %}
          {% assign max_val = val %}
        {% endif %}
      {% endfor %}
    {% endif %}

    {% unless property.is_numeric? %}
      {% capture options %}[
      {% for characteristic in property.characteristics %}{ 'value': '{{ characteristic.id | escape | strip_newlines}}', 'label': '{{ characteristic.title | escape | strip_newlines }} <span>{{characteristic.products_count}}</span>'},{% endfor %}
      ]{% endcapture %}

      <ui-filter-section
        title="{{ property.title | escape}}"
        data-view="checkbox"
        data-type="characteristics"
        :options="{{ options | escape | strip_newlines}}"
        hide-submit
      >
    </ui-filter-section>

    {% else %}
      <ui-filter-section
        title="{{ property.title | escape }}"
        data-view="range"
        data-type="property"
        data-id="{{ property.id }}"
        :range-data="{ min: {{ min_val }}, max: {{ max_val }}}"
        hide-submit
      >
    </ui-filter-section>
    {% endunless %}
  {% endfor %}

</ui-filter>
```

### Параметры компонента
- `action` - принимает url коллекции по которой будет искать характеристики и параметры
- `caption-apply` -Надпись для кнопки применения фильтра
- `caption-reset` - Надпись для кнопки сброса фильтра

### Темизация
* `color-sheme` - Параметры:
 - `default` -  Фильтр залит фоном
 - `mono` - Не залит
* `layout` - Параметры:
  - `default` - Кнопки без заливки с обводкой.
  - `row` - кололки фильтров минимум с шириной 220px
* `themes` - параметры:
   - `btn-decor-underline` - кнопки с подчеркиванием
