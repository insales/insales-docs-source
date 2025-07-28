# Форма отзыва к товару

Компонент, с помощью которого вы можете реализовать форму отзыва к товару с отправкой через AJAX-запрос и проверкой полей. Отзывы можно увидеть в админ-панели в разделе "Товары" > "Отзывы".

## Назначение атрибутов

### data-reviews-form-wrapper

Обязательный атрибут для обёртки формы отзыва к товару

```html
<form
  data-reviews-form-wrapper='{
    "reviews_moderated": {{ account.reviews_moderated? }},
    "url": "{{ product.url }}"
  }'
  class="review-form"
  method="post"
  action="{{ product.url }}/reviews#review_form"
  enctype="multipart/form-data"
>
  <!-- Код формы -->
</form>
```

### data-reviews-form-success

Атрибут для элемента, который содержит сообщение об успешной отправке формы. В качестве значения нужно указать, сколько секунд должен отображаться элемент, сообщение, также вы можете указать нужно ли перезагружать страницу после отправки. В случае успешной отправки (получает класс `is-show`, который удаляется через указанный промежуток времени).

!!! info
    По умолчанию элемент не скрыт

```html
<div
  data-reviews-form-success='{
    "showTime": 10000,
    "message": "{{ success_message }}",
    "reloadPage": false
  }'
  class="notice-success"
></div>
```

### data-reviews-form-field-area

Атрибут для блока каждого отдельного поля. Нужен для валидации поля и вывода ошибок в элементе с атрибутом `data-reviews-form-field-error`.

```html
<div
  data-reviews-form-field-area
  class="form-field is-required {% if review.errors contains 'author' %}is-error{% endif %}"
>
  <label class="form-field__label">{{ messages.name }}
    <span class="text-error">*</span>
  </label>
  <input
    data-reviews-form-field='{"isRequired": true, "errorMessage": "{{ messages.name_error | escape }}"}'
    name="review[author]"
    placeholder="{{ messages.name }}"
    value="{{ review.author }}"
    type="text"
    class="form-control form-control_size-m" />
  <div data-reviews-form-field-error class="form__field-error"></div>
</div>
```

### data-reviews-form-field

Атрибут поля ввода.

Виды полей определяются по значению атрибута `name`. Всего есть несколько видов:

- `review[author]` (имя)
- `review[email]` (e-mail)
- `review[content]` (сообщение)
- review[image_attributes][image] (файл изображения)

Для всех полей можно передать текст, который будет выводиться в случае ошибки в элементе с атрибутом `data-reviews-form-field-error`, а также указать обязательность заполнения поля. Обязательными являются все поля кроме `review[image_attributes][image]`

```html
<input
  data-reviews-form-field='{"isRequired": true, "errorMessage": "{{ messages.name_error | escape }}"}'
  name="review[author]"
  placeholder="{{ messages.name }}"
  value="{{ review.author }}"
  type="text"
  class="form-control form-control_size-m"
/>
<div data-reviews-form-field-error class="form__field-error"></div>
```

### data-reviews-form-recaptcha

Элемент для вывода кнопки "Я не робот" от Google reCAPTCHA.

!!! info
    Для использования необходимо, чтобы в панели администратора вашего магазина в разделе "Настройки" > "Карточка магазина" в разделе "Тип капчи" была выбрана "Google reCAPTCHA".

```html
{% if review.captcha_enabled? %}
  <div
    data-reviews-form-field-area
    class="form-row form-field form-captcha {% if review.errors contains 'captcha_solution' %}is-error{% endif %}"
  >
    <div
      data-reviews-form-recaptcha='{
        "isRequired": true,
        "errorMessage": "{{ messages.recaptcha_error | escape }}"
      }'
      id="captcha_challenge"
      class="captcha-recaptcha"
    ></div>
    <div data-reviews-form-field-error class="form__field-error"></div>
  </div>
{% endif %}
```
#### Google reCAPTCHA v3

При использовании reCAPTCHA v3 посетителю сайта не нужно нажимать на чекбокс "Я не робот". Проверка происходит автоматически при отправке формы.

##### data-recaptcha-type

Для использования новой версии в блок с атрибутом `data-reviews-form-recaptcha` необходимо добавить атрибут `data-recaptcha-type="invisible"`.

##### data-badge

В этом атрибуте можно задать где и как должен выводиться блок reCAPTCHA. По умолчанию блок выводится в левом нижнем углу экрана (`bottomleft`).

Возможные значения:

- `inline` - блок выводится как в старой версии, но без чекбокса
- `bottomleft` - фиксированный блок в левом нижнем углу экрана
- `bottomright` - фиксированный блок в правом нижнем углу экрана

Пример:

```html
{% if review.captcha_enabled? %}
  <div
    data-reviews-form-field-area
    class="form-row form-field form-captcha {% if review.errors contains 'captcha_solution' %}is-error{% endif %}"
  >
    <div
      data-reviews-form-recaptcha='{"isRequired": true, "errorMessage": "{{ messages.recaptcha_error | escape }}"}'
      data-recaptcha-type="invisible"
      data-badge="bottomleft"
      id="captcha_challenge"
      class="captcha-recaptcha"
    ></div>
    <div data-reviews-form-field-error class="form__field-error"></div>
  </div>
{% endif %}
```

### data-reviews-form-yandex-captcha

Атрибут для вывода кнопки "Я не робот" от Yandex SmartCaptcha.

!!! info
    Для использования необходимо, чтобы в панели администратора вашего магазина в разделе "Настройки" > "Карточка магазина" в разделе "Тип капчи" была выбрана "Yandex SmartCaptcha".

Пример:

```html
{% if review.captcha_enabled? %}
  <div
    data-reviews-form-field-area
    class="form-row form-field form-captcha {% if review.errors contains 'captcha_solution' %}is-error{% endif %}"
  >
    <div
      data-reviews-form-yandex-captcha='{"isRequired": true, "errorMessage": "{{ messages.recaptcha_error | escape }}"}'
      id="captcha_challenge"
      class="captcha-recaptcha"
    ></div>
    <div data-reviews-form-field-error class="form__field-error"></div>
  </div>
{% endif %}
```

#### data-yandex-captcha-test

Если атрибут имеет значение `true`, то рендерит капчу в тестовом режиме. В этом случае при попытке отправки формы всегда будет показываться окно с заданием.

Пример:

```html
{% if review.captcha_enabled? %}
  <div
    data-reviews-form-field-area
    class="form-row form-field form-captcha {% if review.errors contains 'captcha_solution' %}is-error{% endif %}"
  >
    <div
      data-reviews-form-yandex-captcha='{"isRequired": true, "errorMessage": "{{ messages.recaptcha_error | escape }}"}'
      data-yandex-captcha-test="true"
      id="captcha_challenge"
      class="captcha-recaptcha"
    ></div>
    <div data-reviews-form-field-error class="form__field-error"></div>
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
{% if review.captcha_enabled? %}
  <div
    data-reviews-form-field-area
    class="form-row form-field form-captcha {% if review.errors contains 'captcha_solution' %}is-error{% endif %}"
  >
    <div
      data-reviews-form-yandex-captcha='{"isRequired": true, "errorMessage": "{{ messages.recaptcha_error | escape }}"}'
      data-yandex-captcha-type="invisible"
      data-yandex-captcha-shield-position="bottom-left"
      id="captcha_challenge"
      class="captcha-recaptcha"
    ></div>
    <div data-reviews-form-field-error class="form__field-error"></div>
  </div>
{% endif %}
```

!!! warning
    Вы обязаны уведомлять пользователей о том, что их данные обрабатывает SmartCaptcha. Если вы скрываете блок с уведомлением, сообщите пользователям иным способом о том, что SmartCaptcha обрабатывает их данные.

### data-show-reviews-modal

Атрибут для кнопки вызова модального окна. При нажатии происходит публикация события EventBus `show-modal-reviews:insales:ui_reviews`.

В качестве значения можно передать ID модального окна. Это может быть удобно, если у вас несколько форм в модальных окнах.

```html
<button data-show-reviews-modal='{"modal_id": "123456"}'>Форма отзыва</button>
```

```js
EventBus.subscribe('show-modal-reviews:insales:ui_reviews', (data) => {
  console.log(data)
});
```

## События

| Событие                               | Описание                                                                 |
|---------------------------------------|--------------------------------------------------------------------------|
| send-review:insales:ui_reviews        | Срабатывает при успешной отправке формы                                  |
| error-reviews:insales:ui_reviews      | Срабатывает в случае ошибки при отправке формы                           |
| show-modal-reviews:insales:ui_reviews | Срабатывает при нажатии на кнопку с атрибутом `data-show-reviews-modal`  |

**Пример подписки на событие**

```js
EventBus.subscribe('send-review:insales:ui_reviews', function (data) {
  console.log('Форма успешно отправлена', data);
});
```

## Пример разметки

```html
{% if account.reviews_enabled? %}
<form
  data-reviews-form-wrapper='{
    "reviews_moderated": {{ account.reviews_moderated? }},
    "url": "{{ product.url }}"
  }'
  class="review-form"
  method="post"
  action="{{ product.url }}/reviews#review_form"
  enctype="multipart/form-data"
>
  {% assign success_message = messages.review_is_added %}
  {% if account.reviews_moderated? %}
    {% assign success_message = messages.review_is_added_moderated %}
  {% endif %}

  <div
    data-reviews-form-success='{
      "showTime": 10000,
      "message": "{{ success_message }}",
      "reloadPage": false
    }'
    class="notice-success"
  ></div>

  <div
    id="review_form"
    class="reviews-wrapper {% unless review.errors.size > 0 %}is-hide{% endunless%}"
  >
    <div class="reviews-form">
      <div class="reviews-form__header">
        <div class="reviews-form__title">{{ messages.give_feedback }}</div>
      </div>

      <div class="reviews-form__content">
        <div class="form-field reviews-form__rating">
          <label class="form-field__label">{{ messages.field_rating }}
            <span class="text-error">*</span>
          </label>
          <div data-reviews-form-field-area class="star-rating-wrapper">
            <div class="star-rating">
              {% assign r = 5 %}
              {% for i in (1..5) %}
                <input
                  data-reviews-form-field
                  name="review[rating]"
                  id="star{{ r }}-{{ product.id }}"
                  type="radio"
                  name="reviewStars"
                  class="star-radio"
                  value="{{ r }}" />
                <label
                  title="{{ r }}"
                  for="star{{ r }}-{{ product.id }}"
                  class="star-label icon icon-star"></label>
                {% assign r = r | minus: 1 %}
              {% endfor %}
            </div>
            <div data-reviews-form-field-error class="form__field-error"></div>
          </div>
        </div>
        <div class="grid-list grid-list_wide">
          <div
            data-reviews-form-field-area
            class="form-field is-required {% if review.errors contains 'author' %}is-error{% endif %}"
          >
            <label class="form-field__label">{{ messages.name }}
              <span class="text-error">*</span>
            </label>
            <input
              data-reviews-form-field='{
                "isRequired": true,
                "errorMessage": "{{ messages.name_error | escape }}"
              }'
              name="review[author]"
              placeholder="{{ messages.name }}"
              value="{{ review.author }}"
              type="text"
              class="form-control form-control_size-m" />
            <div data-reviews-form-field-error class="form__field-error"></div>
          </div>
          <div data-reviews-form-field-area class="form-field is-required {% if review.errors contains 'email' %}is-error{% endif %}">
            <label class="form-field__label">{{ messages.field_email }}
              <span class="text-error">*</span>
            </label>
            <input
              data-reviews-form-field='{
                "isRequired": true,
                "errorMessage": "{{ messages.email_error | escape}}"
              }'
              name="review[email]"
              placeholder="{{ messages.field_email }}"
              value="{{ review.email }}"
              type="text"
              class="form-control form-control_size-m"
            />
            <div data-reviews-form-field-error class="form__field-error"></div>
          </div>
        </div>
        <div
          data-reviews-form-field-area
          class="form-field form-comment is-required {% if review.errors contains 'content' %}is-error{% endif %}">
          <label class="form-field__label">{{ messages.review }}
            <span class="text-error">*</span>
          </label>
          <textarea
            data-reviews-form-field='{
              "isRequired": true,
              "errorMessage": "{{ messages.please_enter_message | escape }}"
            }'
            name="review[content]"
            placeholder="{{ messages.review }}"
            class="form-control form-control_size-m is-textarea"
          >{{ review.content }}</textarea>
          <div data-reviews-form-field-error class="form__field-error"></div>
        </div>
        {% if account.reviews_images_enabled? %}
          <div
            data-reviews-form-field-area
            class="form-field form-file is-required {% if review.errors contains 'image.image' %} input--error{% endif %}"
          >
            <label class="form-label icon icon-camera">
              <span class="load-review-image-name">{{ messages.add_photo }}</span>
              <input
                data-reviews-form-image
                type="file"
                class="js-load-review-image hidden"
                name="review[image_attributes][image]" />
            </label>
            <div data-reviews-form-field-error class="form__field-error"></div>
          </div>
        {% endif %}

        {% if review.captcha_enabled? %}
          {% if account.captcha_type == 'google' %}
          <div data-reviews-form-field-area class="form-row form-captcha {% if review.errors contains 'captcha_solution' %}is-error{% endif %}">
            <div
              data-recaptcha-type="invisible"
              data-reviews-form-recaptcha='{"isRequired": true, "errorMessage": "{{ messages.recaptcha_error | escape }}"}'
              id="captcha_challenge"
              class="captcha-recaptcha"
            ></div>
            <div data-reviews-form-field-error class="form__field-error"></div>
          </div>
          {% elsif account.captcha_type == 'yandex' %}
          <div data-reviews-form-field-area class="form-row form-captcha {% if review.errors contains 'captcha_solution' %}is-error{% endif %}">
            <div
              data-yandex-captcha-type="invisible"
              data-reviews-form-yandex-captcha='{"isRequired": true, "errorMessage": "{{ widget_messages.yandex_captcha_error | escape }}"}'
              id="captcha_challenge"
              class="captcha-recaptcha"
            ></div>
            <div data-reviews-form-field-error class="form__field-error"></div>
          </div>
          {% endif %}
        {% endif %}

        <div class="form-field form-field_conctrols">
          <button type="submit" class="button button_wide">{{ messages.give_feedback }}</button>
        </div>
      </div>
      {% if account.reviews_moderated? %}
        <div class="reviews-form__moderation-info">
          {{ messages.reviews_are_moderated }}
        </div>
      {% endif %}
    </div>
  </div>
</form>
{% endif %}
```
