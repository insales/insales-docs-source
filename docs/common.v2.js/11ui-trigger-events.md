# Trigger Events

Небольшой компонент, который с помощью data-атрибута позволяет повесить слушатель на нужный вам элемент и при клике на него публиковать EventBus-событие.

## data-trigger-click

В значении атрибута необходимо указать название EventBus-события.

```html
<button data-trigger-click="my_button:insales:site">Кнопка</div>
```

В подписчике будет элемент по которому кликнули.

```js
EventBus.subscribe('my_button:insales:site', data => {
  console.log('My button', data.event_target);
})
```