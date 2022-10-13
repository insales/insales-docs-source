# Форма обратной связи

Компонент с помощью которого вы можете реализовать форму обратной связи с отправкой через AJAX-запрос и проверкой полей. Письма после отправки формы будут приходить на E-mail для уведомлений указанный в админ-панели, в разделе "Настройки" > "Карточка магазина"

## Назначение атрибутов

### data-feedback-form-wrapper

Обязательный атрибут для обёртки формы обратной связи

```html
<form method="post" action="/client_account/feedback" data-feedback-form-wrapper>
  <!-- Код формы -->
</form>
```

### data-feedback-form-success

Атрибут для элемента, который содержит сообщение об успешной отправке формы. В качестве значения нужно указать сколько секунд должен отображаться элемент в случае успешной отправки (получает класс `is-show`, который удаляется через указанный промежуток времени).

!!! info
    По умолчанию элемент не скрыт

```html
<div data-feedback-form-success='{"showTime": 10000}'>Успешно отправлено</div>
```

### data-feedback-form-field-area

Атрибут для блока каждого отдельного поля. Нужен для валидации поля и вывода ошибок в элементе с атрибутом `data-feedback-form-field-error`.

```html
<div data-feedback-form-field-area>
  	<div>Имя</div>
    <input 
      name="name" 
      data-feedback-form-field='{
        "isRequired": true, 
        "errorMessage": "Не верно заполнено поле Имя"
      }' 
      type="text" 
      value="" />  
    <div data-feedback-form-field-error></div>
</div>
```

### data-feedback-form-field

Атрибут поля ввода.

Виды полей определяются по значению атрибута `name`. Всего есть несколько видов:

- from (e-mail)
- phone (номер телефона)
- name (имя)
- content (сообщение)
- subject (тема письма)
- agree (чекбокс согласия на обработку персональных данных)

Для всех полей можно передать текст, который будет выводиться в случае ошибки в элементе с атрибутом `data-feedback-form-field-error`, а также указать обязательность заполнения поля. По умолчанию, обязательными являются только поле from (можно отключить), и чекбокс согласия на обработку персональных данных (нельзя отключить).

```html
<input 
  name="name" 
  data-feedback-form-field='{
    "isRequired": true, 
    "errorMessage": "Не верно заполнено поле Имя"
  }' 
  type="text" 
  value="" />  
```

Для поля ввода номера в свойствах `phoneNumberLength` и `secondPhoneNumberLength` можно указать ожидаемое количество цифр.

```html
<input 
  name="phone"
  data-feedback-form-field='{
    "isRequired": true, 
    "errorMessage": "Не верно заполнено поле Телефон", 
    "phoneNumberLength": 11, 
    "secondPhoneNumberLength": 12
  }' 
  type="text" 
  autocomplete="off" 
  value="" />  
```

!!! info
    Если вам нужно сделать несколько отдельных полей для текста, то значения таких полей необходимо будет объединять с помощью JavaScript. Пример реализации вы можете увидеть в виджете FF2 в любом шаблоне 4 поколения.

    Поля from и content можно сделать необязательными, при этом, во время отправки формы в них будет прокидываться системный текст. В случае с полем from в него попадёт e-mail владельца магазина, а в поле content будет текст "Сообщение не заполнено".

### data-feedback-form-recaptcha

Элемент для вывода кнопки "Я не робот"

```html
{% if settings.feedback_captcha_enabled %}
  <div data-feedback-form-field-area class="feedback__field-area">
    <div 
      data-feedback-form-recaptcha='{
        "isRequired": true, 
        "errorMessage": "{{messages.recaptcha_error | escape }}"
        }' 
      class="feedback__recaptcha"
    >
    </div>
    <div data-feedback-form-field-error class="feedback__field-error"></div>
  </div>
{% endif %}
```

### data-show-feedback-modal

Атрибут для кнопки вызова модального окна. При нажатии происходит публикация события EventBus `show-modal-feedback:insales:ui_feedback`.

В качестве значения можно передать ID модального окна. Это может быть удобно если у вас несколько форм в модальных окнах.

```html
<button data-show-feedback-modal='{"modal_id": "123456"}'>Обратная связь</button>
```

```js
EventBus.subscribe('show-modal-feedback:insales:ui_feedback', (data) => {
  console.log(data)
});
```

## События

| Событие               | Описание                                                                                   |
|-----------------------|--------------------------------------------------------------------------------------------|
| send-feedback:insales:ui_feedback | Срабатывает при успешной отправке формы                                        |
| error-feedback:insales:ui_feedback | Срабатывает в случае ошибки при отправке формы                                |
| show-modal-feedback:insales:ui_feedback | Срабатывает при нажатии на кнопку с атрибутом `data-show-feedback-modal` |

**Пример подписки на событие**

```js
EventBus.subscribe('send-feedback:insales:ui_feedback', function (data) {
  console.log('Форма успешно отправлена', data);
});
```

## Пример разметки

```html
<form method="post" action="/client_account/feedback" data-feedback-form-wrapper>
  <div 
    data-feedback-form-success='{"showTime": 10000}' 
    class="success-message"
  >Успешно отправлено</div>	

  <div data-feedback-form-field-area>
  	<div>Телефон</div>
    <input 
      name="phone"
      data-feedback-form-field='{
        "isRequired": true, 
        "errorMessage": "Не верно заполнено поле Телефон", 
        "phoneNumberLength": 11
      }'
      type="text" 
      autocomplete="off" 
      value="" />  
    <div data-feedback-form-field-error></div>
  </div>

  <div data-feedback-form-field-area>
  	<div>Имя</div>
    <input 
      name="name" 
      data-feedback-form-field='{
        "isRequired": true, 
        "errorMessage": "Не верно заполнено поле Имя"
      }' 
      type="text" 
      value="" />  
    <div data-feedback-form-field-error></div>
  </div>

  <div data-feedback-form-field-area>
  	<div>Текст</div>
    <textarea 
      name="content" 
      data-feedback-form-field='{"errorMessage": "Не верно заполнено поле Текст"}'></textarea> 
    <div data-feedback-form-field-error></div>
  </div>

  <div data-feedback-form-field-area>
  	<div>email</div>
    <input 
      name="from" 
      data-feedback-form-field='{"errorMessage": "Не верно заполнено поле email"}' 
      type="text" 
      value="" /> 
    <div data-feedback-form-field-error></div>
  </div>

  <div data-feedback-form-field-area>
    <label>
      <input 
        data-feedback-form-agree='{"errorMessage": "Необходимо подтвердить согласие"}' 
        type="checkbox" 
        name="agree" 
        value="" />
        Согласен на обработку данных	
    </label>
    <div data-feedback-form-field-error></div>
  </div>
          
  {% if settings.feedback_captcha_enabled %}
    <div data-feedback-form-field-area class="feedback__field-area">
      <div data-feedback-form-recaptcha='{
        "isRequired": true, 
        "errorMessage": "{{messages.recaptcha_error | escape }}"
      }' 
      class="feedback__recaptcha"></div>
      <div data-feedback-form-field-error class="feedback__field-error"></div>
    </div>
  {% endif %}
          
  <input type="text" value="Форма обратной связи" name="subject" />
  <div>	
    <button class="button" type="submit">Отправить</button>
  </div>
</form>
```