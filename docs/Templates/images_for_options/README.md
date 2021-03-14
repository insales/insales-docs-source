# Изображения вариантов

## Бек-офис

![](/img/images_variants.jpg)

## Liquid 

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

![](/img/json_variant_images.jpg)