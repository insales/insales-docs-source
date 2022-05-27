# snippet.js

Мы используем jquery и Javascript.
$widget - будет использоваться автоматически генерируемый класс родительского блока виджета. 
Для того чтобы избежать багов при использовании более одного виджета на странице их нужно перебирать через метод each:

```js
$widget.each(function(index, el) {
  new LazyLoad({container: $(el).get(0),
    elements_selector: '.lazyload'});
});
```

Можно использовать встроенные события EventBus, подробнее можно почитать по <a href="https://liquidhub.ru/collection/start" target="_blank">ссылке</a>

```js
  EventBus.subscribe('change_variant:insales:product', function(data) {
    let is_product_instance_in_modal_panel = !!$(data.action.product[0]).parents(".modal-product-preview.is-open").length;

    if (data.action && data.action.product && data.first_image.url && is_product_instance_in_modal_panel) {
      let product_node = $(data.action.product[0]);
      product_node.find(".product-preview__photo img").attr("src", data.first_image.medium_url);
    }
  });
```

#### Доступные зависимости (плагины). Зависимости используются только те которые установлены на стороне платформы:
- commonjs_v2 | Фреймворк insales, <a href="https://liquidhub.ru/collection/start" target="_blank">документация</a> 
- jquery | <a href="https://jquery.com/" target="_blank">Документация</a> 
- microalert	|<a href="https://github.com/VladimirIvanin/microAlert" target="_blank"> Github</a> 
- my-layout	| <a href="https://github.com/insales/my-layout" target="_blank">Github </a> 
- vanilla-lazyload | <a href="https://github.com/verlok/vanilla-lazyload" target="_blank">Github </a>
- splide | <a href="https://splidejs.com/" target="_blank">Документация </a>
- splide3 | <a href="https://splidejs.com/" target="_blank">Документация </a> 
- fslightbox | <a href="https://fslightbox.com/" target="_blank">Документация</a> 
- micromodal | <a href="https://micromodal.vercel.app/" target="_blank">Документация</a>
- body-scroll-lock | <a href="https://www.npmjs.com/package/body-scroll-lock" target="_blank">Документация</a>
- js-cookie | <a href="https://github.com/js-cookie/js-cookie/releases" target="_blank">Документация</a>
- cut-list | <a href=" https://github.com/insales/jquery.cut-list" target="_blank">Документация</a>
- nouislider | <a href=" https://refreshless.com/nouislider/" target="_blank">Документация</a>