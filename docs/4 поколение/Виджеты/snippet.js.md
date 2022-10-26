# snippet.js

Сниппет нужен для написания javascript кода, относящегося к данному виджету. 
В сниппете доступна библиотека jquery.
`$widget` - будет использоваться автоматически генерируемый класс родительского блока виджета. 
Для того чтобы избежать багов при использовании более одного виджета на странице, их нужно перебирать через метод `each`:

```js
$widget.each(function(index, el) {
  new LazyLoad({container: $(el).get(0),
    elements_selector: '.lazyload'});
});
```

Можно использовать встроенные события EventBus, подробнее можно ознокомиться <a href="/common.v2.js/EventBus/" target="_blank">здесь</a>

```js
  EventBus.subscribe('change_variant:insales:product', function(data) {
    let is_product_instance_in_modal_panel = !!$(data.action.product[0]).parents(".modal-product-preview.is-open").length;

    if (data.action && data.action.product && data.first_image.url && is_product_instance_in_modal_panel) {
      let product_node = $(data.action.product[0]);
      product_node.find(".product-preview__photo img").attr("src", data.first_image.medium_url);
    }
  });
```

#### Доступные зависимости (плагины). Зависимости используются только, те которые установлены на стороне платформы:
Можно посмотреть <a href="/4%20поколение/Виджеты/info/#libraries">здесь</a>.