---
seo_title: "snippet.js — JavaScript виджета InSales"
description: "Как устроен snippet.js виджета InSales, как инициализировать экземпляры через WidgetLifecycle и подписываться на события редактора."
---

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

Для виджетов с подписками, DOM-обработчиками или другими ресурсами используйте `WidgetLifecycle.mount(widget, initialize)`. Для каждого корня он создаёт отдельный объект `lifecycle`, через который можно настроить очистку ресурсов. [Жизненный цикл виджетов](../../common.v2.js/widget-lifecycle.md)

Размещайте подписку внутри `initialize` и проверяйте, что событие относится к текущему корню. Передайте `lifecycle.signal` в `EventBus.listen`, чтобы снять подписку при уничтожении экземпляра. [Методы EventBus](../../common.v2.js/7EventBus.md#listen)

```js
WidgetLifecycle.mount(widget, (element, lifecycle) => {
  EventBus.listen('change_variant:insales:product', data => {
    const product = data?.action?.product?.[0];
    if (!product || !element.contains(product)) return;
    if (!product.parentElement?.closest('.modal-product-preview.is-open')) return;

    const image = product.querySelector('.product-preview__photo img');
    if (image && data.first_image?.medium_url) {
      image.src = data.first_image.medium_url;
    }
  }, { signal: lifecycle.signal });
});
```

#### События редактора

В редакторе шаблона изменение настройки виджета публикует событие без перезагрузки страницы. Если виджет уже использует `mount`, добавьте подписку на настройки в ту же функцию `initialize`. Пример подписки через ID размещения:

```js
WidgetLifecycle.mount(widget, (element, lifecycle) => {
  const widgetItemId = lifecycle.widgetItemId;
  if (widgetItemId === null) return;

  EventBus.listen([
    'widget:input-setting:insales:system:editor',
    'widget:change-setting:insales:system:editor',
    'widget:input-color:insales:system:editor',
    'widget:change-color:insales:system:editor'
  ], data => {
    if (String(data.widget_item_id) !== widgetItemId) return;
    // data.setting_name, data.value, data.unit, data.type, data.widget_id
  }, { signal: lifecycle.signal });
});
```

`widget_item_id` совпадает с атрибутом `data-widget-drop-item-id` обёртки виджета. `widget_id` — идентификатор виджета в редакторе.

Если настройки меняют CSS-переменные и JavaScript должен прочитать уже применённые значения, используйте [`lifecycle.onCssChange`](../../common.v2.js/widget-lifecycle.md#css-settings).

#### Доступные зависимости (плагины). Зависимости используются только, те которые установлены на стороне платформы:
Можно посмотреть <a href="/4%20поколение/Виджеты/info/#libraries">здесь</a>.
