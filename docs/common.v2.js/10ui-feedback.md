# Форма обратной связи

Компонент, с помощью которого вы можете реализовать форму обратной связи с отправкой через AJAX-запрос и проверкой полей. Письма после отправки формы будут приходить на E-mail для уведомлений, указанный в админ-панели, в разделе "Настройки" > "Карточка магазина"

## Назначение атрибутов

### data-feedback-form-wrapper

Обязательный атрибут для обёртки формы обратной связи

```html
<form
  method="post"
  action="/client_account/feedback"
  data-feedback-form-wrapper
>
  <!-- Код формы -->
</form>
```

### data-feedback-form-success

Атрибут для элемента, который содержит сообщение об успешной отправке формы. В качестве значения нужно указать, сколько секунд должен отображаться элемент в случае успешной отправки (получает класс `is-show`, который удаляется через указанный промежуток времени).

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
        "errorMessage": "Неправильно заполнено поле Имя"
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

Для всех полей можно передать текст, который будет выводиться в случае ошибки в элементе с атрибутом `data-feedback-form-field-error`, а также указать обязательность заполнения поля. По умолчанию обязательными являются только поле from (можно отключить) и чекбокс согласия на обработку персональных данных (нельзя отключить).

```html
<input
  name="name"
  data-feedback-form-field='{
    "isRequired": true,
    "errorMessage": "Неправильно заполнено поле Имя"
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
    "errorMessage": "Неправильно заполнено поле Телефон",
    "phoneNumberLength": 11,
    "secondPhoneNumberLength": 12
  }'
  type="text"
  autocomplete="off"
  value="" />
```

!!! info
    Если вам нужно сделать несколько отдельных полей для текста, то значения таких полей необходимо будет объединять с помощью JavaScript. Пример реализации вы можете увидеть в виджете FF2 в любом шаблоне 4 поколения.

    Поля from и content можно сделать необязательными, при этом во время отправки формы в них будет прокидываться системный текст. В случае с полем from в него попадёт e-mail владельца магазина, а в поле content будет текст "Сообщение не заполнено".

### data-feedback-form-recaptcha

Элемент для вывода кнопки "Я не робот" от Google reCAPTCHA.

!!! info
    Для использования необходимо, чтобы в панели администратора вашего магазина в разделе "Настройки" > "Карточка магазина" в разделе "Тип капчи" была выбрана "Google reCAPTCHA".

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
#### Google reCAPTCHA v3

При использовании Google reCAPTCHA v3 посетителю сайта не нужно нажимать на чекбокс "Я не робот". Проверка происходит автоматически при отправке формы.

##### data-recaptcha-type

Для использования новой версии в блок с атрибутом `data-feedback-form-recaptcha` необходимо добавить атрибут `data-recaptcha-type="invisible"`.

##### data-badge

В этом атрибуте можно задать где и как должен выводиться блок reCAPTCHA. По умолчанию блок выводится в левом нижнем углу экрана (`bottomleft`).

Возможные значения:

- `inline` - блок выводится как в старой версии, но без чекбокса
- `bottomleft` - фиксированный блок в левом нижнем углу экрана
- `bottomright` - фиксированный блок в правом нижнем углу экрана

Пример:

```html
{% if settings.feedback_captcha_enabled %}
  <div data-feedback-form-field-area class="feedback__field-area">
    <div
      data-recaptcha-type="invisible"
      data-badge="bottomleft"
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

### data-feedback-form-yandex-captcha

Атрибут для вывода кнопки "Я не робот" от Yandex SmartCaptcha.

!!! info
    Для использования необходимо, чтобы в панели администратора вашего магазина в разделе "Настройки" > "Карточка магазина" в разделе "Тип капчи" была выбрана "Yandex SmartCaptcha".

Пример:

```html
{% if settings.feedback_captcha_enabled %}
  <div data-feedback-form-field-area class="feedback__field-area">
    <div
      data-feedback-form-yandex-captcha='{
        "isRequired": true,
        "errorMessage": "{{messages.yandex_captcha_error | escape }}"
      }'
      class="feedback__yandex-captcha"
    ></div>
    <div data-feedback-form-field-error class="feedback__field-error"></div>
  </div>
{% endif %}
```

#### data-yandex-captcha-test

Если атрибут имеет значение `true`, то рендерит капчу в тестовом режиме. В этом случае при попытке отправки формы всегда будет показываться окно с заданием.

Пример:

```html
{% if settings.feedback_captcha_enabled %}
  <div data-feedback-form-field-area class="feedback__field-area">
    <div
      data-feedback-form-yandex-captcha='{
        "isRequired": true,
        "errorMessage": "{{messages.yandex_captcha_error | escape }}"
      }'
      data-yandex-captcha-test="true"
      class="feedback__yandex-captcha"
    ></div>
    <div data-feedback-form-field-error class="feedback__field-error"></div>
  </div>
{% endif %}
```

#### Yandex SmartCaptcha Invisible

##### data-yandex-captcha-type

Если атрибут имеет значение `invisible`, то рендерит невидимую капчу. Если атрибут не указан, то рендерит обычную капчу с кнопкой "Я не робот".

При использовании Yandex SmartCaptcha Invisible посетителю сайта не нужно нажимать на чекбокс "Я не робот". Проверка происходит автоматически при отправке формы.

##### data-yandex-captcha-shield-position

Позиция бейджа с уведомлением об обработке данных для невидимой капчи.

Возможные значения:

- `top-left`
- `center-left`
- `bottom-left`
- `top-right`
- `center-right`
- `bottom-right`

По умолчанию используется значение `bottom-right`.

##### data-yandex-captcha-hide-shield

Если атрибут имеет значение `true`, то скрывает бейдж с уведомлением об обработке данных для невидимой капчи. По умолчанию бейдж отображается.

Пример:

```html
{% if settings.feedback_captcha_enabled %}
  <div data-feedback-form-field-area class="feedback__field-area">
    <div
      data-feedback-form-yandex-captcha='{
        "isRequired": true,
        "errorMessage": "{{messages.yandex_captcha_error | escape }}"
      }'
      data-yandex-captcha-type="invisible"
      data-yandex-captcha-shield-position="bottom-left"
      class="feedback__yandex-captcha"
    ></div>
    <div data-feedback-form-field-error class="feedback__field-error"></div>
  </div>
{% endif %}
```

!!! warning
    Вы обязаны уведомлять пользователей о том, что их данные обрабатывает SmartCaptcha. Если вы скрываете блок с уведомлением, сообщите пользователям иным способом о том, что SmartCaptcha обрабатывает их данные.

### data-show-feedback-modal

Атрибут для кнопки вызова модального окна. При нажатии происходит публикация события EventBus `show-modal-feedback:insales:ui_feedback`.

В качестве значения можно передать ID модального окна. Это может быть удобно, если у вас несколько форм в модальных окнах.

```html
<button data-show-feedback-modal='{"modal_id": "123456"}'>Обратная связь</button>
```

```js
EventBus.subscribe('show-modal-feedback:insales:ui_feedback', (data) => {
  console.log(data)
});
```

## События

| Событие                                 | Описание                                                                                   |
|---------------------------------------------------|----------------------------------------------------------------|
| before-feedback-message-build:insales:ui_feedback | Срабатывает перед сборкой значений полей                       |
| before-send-feedback:insales:ui_feedback          | Срабатывает перед отправкой формы                              |
| send-feedback:insales:ui_feedback                 | Срабатывает при успешной отправке формы                        |
| error-feedback:insales:ui_feedback                | Срабатывает в случае ошибки при отправке формы                 |
| show-modal-feedback:insales:ui_feedback           | Срабатывает при нажатии на кнопку с атрибутом `data-show-feedback-modal`|

**Пример подписки на событие**

```js
EventBus.subscribe('send-feedback:insales:ui_feedback', function (data) {
  console.log('Форма успешно отправлена', data);
});
```

## Пример разметки

```html
<form
  method="post"
  action="/client_account/feedback"
  data-feedback-form-wrapper
>
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
        "errorMessage": "Неправильно заполнено поле Телефон",
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
        "errorMessage": "Неправильно заполнено поле Имя"
      }'
      type="text"
      value="" />
    <div data-feedback-form-field-error></div>
  </div>

  <div data-feedback-form-field-area>
  	<div>Текст</div>
    <textarea
      name="content"
      data-feedback-form-field='{"errorMessage": "Неправильно заполнено поле Текст"}'></textarea>
    <div data-feedback-form-field-error></div>
  </div>

  <div data-feedback-form-field-area>
  	<div>email</div>
    <input
      name="from"
      data-feedback-form-field='{"errorMessage": "Неправильно заполнено поле email"}'
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
    {% if account.captcha_type == 'google' %}
    <div data-feedback-form-field-area class="feedback__field-area">
      <div data-recaptcha-type="invisible" data-feedback-form-recaptcha='{"isRequired": true, "errorMessage": "{{messages.recaptcha_error | escape }}"}' class="feedback__recaptcha"></div>
      <div data-feedback-form-field-error class="feedback__field-error"></div>
    </div>
    {% elsif account.captcha_type == 'yandex' %}
    <div data-feedback-form-field-area class="feedback__field-area">
      <div data-yandex-captcha-type="invisible" data-feedback-form-yandex-captcha='{"isRequired": true, "errorMessage": "{{widget_messages.yandex_captcha_error | escape }}"}' class="feedback__yandex-captcha"></div>
      <div data-feedback-form-field-error class="feedback__field-error"></div>
    </div>
    {% endif %}
  {% endif %}

  <input type="text" value="Форма обратной связи" name="subject" />
  <div>
    <button class="button" type="submit">Отправить</button>
  </div>
</form>
```
