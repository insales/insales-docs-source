# snippet.liquid

Данный сниппет предназначен для написания html разметки. Осуществляется с помощью шаблонизатора <a href="https://liquidhub.ru/collection/shpargalka-liquid" target="_blank">liquidhub</a>


#### В примере ниже:
- Получить значения настроек виджета из файла <a href="/4%20поколение/Виджеты/settings_form/">settings_form.json</a> можно с помощью liquid-переменной `widget_settings`. Например, значение настройки ширины контента можно так:
```HTML 
{{ widget_settings.layout-wide-content }}
```
- Если виджет блочный, то блоки можно получить из liquid-переменной `data.blocks`.
Пример цикла для перебора блоков и получения значения свойства блока: 
```HTML 
{% for block in data.blocks %}

{{ block.name }}

{% endfor %}
```
- `block.name` - название указанное в блоке. Доступные поля можно посмотреть - <a href="/4%20поколение/Виджеты/info/#blocks_example">здесь</a>


#### Пример:
```HTML
{% assign img_width = widget_settings.layout-content-max-width | default: settings.layout-content-max-width  %}
{% if widget_settings.layout-wide-content %}
{% assign img_width = 1920 %}
{% endif %}

<div class="banner-list__item {% unless widget_settings.banner-img-m %}show-mobile{% endunless %}">
  {% assign img_width = widget_settings.layout-content-max-width | default: settings.layout-content-max-width  %}
    {% if widget_settings.layout-wide-content %}
    {% assign img_width = 1920 %}
    {% endif %}
    <div class="h4 heading">{{ widget_settings.title_text-default }}</div>
    <div class="gallery-contanier">
      <div class="splide gallery-splide">
        <div class="splide__slider">
          <div class="splide__track">
            <ul class="splide__list">
              {% assign slide_index = 0 %}
              {% for video in data.blocks %}
              <li class="splide__slide" data-slide-index="{{ slide_index }}">
                {% if video.link != blank %}
                <div class="iframe_wrapper">
                  {{ video.link | video_iframe_by_url: id: video_id }}
                </div>
                {% else %}
                <div class="banner-list__empty-video">
                  {{widget_settings.video-empty}}
                </div>
                {% endif %}

                {% if video.image %}
                  <picture class="picture">
                    <source media="(min-width:769px)" data-srcset="{{ video.image | image_url: img_width, format: 'webp', resizing_type: 'fit_width' }}" type="image/webp" class="lazyload">
                    <source media="(max-width:480px)" data-srcset="{{ video.image | image_url: 500, format: 'webp', resizing_type: 'fit_width' }}" type="image/webp" class="lazyload">
                    <source media="(max-width:768px)" data-srcset="{{ video.image | image_url: 768, format: 'webp', resizing_type: 'fit_width' }}" type="image/webp" class="lazyload">
                    <img data-src="{{ video.image | image_url: 940, resizing_type: 'fit_width' }}" class="lazyload">
                  </picture>
                {% else %}
                  <img class="picture" src="{{ video.link | video_preview_by_url }}" style="max-width: 100%" />
                {% endif %}
                <a href="" class="button banner-preview__play-btn">
                  <div class="triangle right"></div>
                </a>
              </li>
              {% assign slide_index = slide_index | plus: 1 %}
              {% endfor %}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="thumbnails-contanier js-init">
      <div class="splide thumbnails-splide">
        <div class="splide__track">
          <ul class="splide__list">
            {% for video in data.blocks %}
              <li class="splide__slide">
                {% if video.image %}
                  <picture>
                    <source media="(min-width:769px)" data-srcset="{{ video.image | image_url: img_width, format: 'webp', resizing_type: 'fit_width' }}" type="image/webp" class="lazyload">
                    <source media="(max-width:480px)" data-srcset="{{ video.image | image_url: 500, format: 'webp', resizing_type: 'fit_width' }}" type="image/webp" class="lazyload">
                    <source media="(max-width:768px)" data-srcset="{{ video.image | image_url: 768, format: 'webp', resizing_type: 'fit_width' }}" type="image/webp" class="lazyload">
                    <img data-src="{{ video.image | image_url: 940, resizing_type: 'fit_width' }}" class="lazyload">
                  </picture>
                  {% else %}
                   <img class="picture" src="{{ video.link | video_preview_by_url }}" style="max-width: 100%" />
                {% endif %}
              </li>
            {% endfor %}
          </ul>
        </div>
      </div>
    </div>
</div>
```


####Другие примеры:
Если вам нужно узнать какие переменные доступны на странице, или какие есть свойства у объекта, то используйте help:

`{% help %}` - выведет доступные переменные.

`{% help account %}` - выведет список свойств объекта account

Liquid-переменная `widget_messages` содержит переводы текстов для разных языковых версий из файла <a href="/4%20поколение/Виджеты/messages/">messages.json</a>
