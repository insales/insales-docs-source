# Изображения вариантов

## Бек-офис

К варианту можно добавить изображения из основного массива изображений товара.

![](/img/images_variants.jpg)

## Liquid

В переменной `variant` доступен массив `images`.

```
{% for variant in product.variants %}
  <div class="variant_gallery" data-variant-gallery="{{ variant.id }}">
    {% for image in variant.images %}
      <img src="{{ image.large_url }}">
    {% endfor %} 
  </div>
{% endfor %}
```

## JSON

У варианта есть массив `image_ids` который состоит из id изображений товара. 

Ссылки к изображениям доступны только в корневом объекте `product` в свойстве `images`.

![](/img/json_variant_images.jpg)