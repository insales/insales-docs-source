# snippet.js

Сниппет нужен для написания javascript кода, относящегося к данному виджету.
В сниппете доступна библиотека jquery.

Платформа оборачивает код сниппета так:

```js
try {
  let widget = '.widget-type_{handle}';
  let $widget = $('.widget-type_{handle}');
  // snippet.js
} catch (error) {
  console.error('Widget "widget-type_{handle}"', error);
}
```

`widget` — строка-селектор, `$widget` — jQuery-коллекция всех копий этого виджета на странице. Копии нужно перебирать через `each`, иначе обработчик затронет соседние экземпляры:

```js
$widget.each(function(index, el) {
  new LazyLoad({container: $(el).get(0),
    elements_selector: '.lazyload'});
});
```

Можно использовать встроенные события EventBus, подробнее можно ознакомиться <a href="/common.v2.js/EventBus/" target="_blank">здесь</a>

Подписку, которая меняет разметку, размещайте внутри `$widget.each` и проверяйте, что событие относится к текущему экземпляру:

```js
$widget.each(function(index, el) {
  EventBus.subscribe('change_variant:insales:product', function(data) {
    if (!data.action || !data.action.product) return;
    if (!$.contains(el, data.action.product[0])) return;

    let is_product_instance_in_modal_panel = !!$(data.action.product[0]).parents(".modal-product-preview.is-open").length;

    if (data.first_image.url && is_product_instance_in_modal_panel) {
      let product_node = $(data.action.product[0]);
      product_node.find(".product-preview__photo img").attr("src", data.first_image.medium_url);
    }
  });
});
```

#### События редактора

Пока открыт редактор шаблона, изменение настройки виджета публикует событие без перезагрузки страницы. Подписка на витрине:

```js
$widget.each(function(index, el) {
  const widgetItemId = $(el).data('widget-drop-item-id');

  EventBus.subscribe([
    'widget:input-setting:insales:system:editor',
    'widget:change-setting:insales:system:editor',
    'widget:input-color:insales:system:editor',
    'widget:change-color:insales:system:editor'
  ], function(data) {
    if (data.widget_item_id != widgetItemId) return;
    // data.setting_name, data.value, data.unit, data.type, data.widget_id
  });
});
```

`widget_item_id` совпадает с атрибутом `data-widget-drop-item-id` обёртки виджета. `widget_id` — идентификатор виджета в редакторе.

#### Доступные зависимости (плагины). Зависимости используются только, те которые установлены на стороне платформы:
Можно посмотреть <a href="/4%20поколение/Виджеты/info/#libraries">здесь</a>.