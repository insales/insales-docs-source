# Форма комментария к статье

Компонент, с помощью которого вы можете реализовать форму комментария к статье с отправкой через AJAX-запрос и проверкой полей. Комментарии к статье можно увидеть в админ-панели в разделе "Сайт" > "Блог и статьи".

## Назначение атрибутов

### data-comments-form-wrapper

Обязательный атрибут для обёртки формы комментария к статье

```html
<form
  class="comment-form"
  method="post"
  data-comments-form-wrapper='{
    "reviews_moderated": {{ account.reviews_moderated? }},
    "url": "{{ article.url }}"
  }'
  action="/blogs/blog/333/comments#comment_form"
>
  <!-- Код формы -->
</form>
```

### data-comments-form-success

Атрибут для элемента, который содержит сообщение об успешной отправке формы. В качестве значения нужно указать, сколько секунд должен отображаться элемент, сообщение, также вы можете указать нужно ли перезагружать страницу после отправки. В случае успешной отправки (получает класс `is-show`, который удаляется через указанный промежуток времени).

!!! info
    По умолчанию элемент не скрыт

```html
<div
  data-comments-form-success='{
    "showTime": 10000,
    "message": "{{ success_message }}",
    "reloadPage": false
  }'
  class="notice-success"
></div>
```

### data-comments-form-field-area

Атрибут для блока каждого отдельного поля. Нужен для валидации поля и вывода ошибок в элементе с атрибутом `data-comments-form-field-error`.

```html
<div
  data-comments-form-field-area
  class="form-row form-author is-required {% if review.errors contains 'author' %}is-error{% endif %}"
>
  <label class="form-label">{{ widget_messages.field_name }} <span class="text-error">*</span></label>
  <input
    name="comment[author]"
    placeholder="{{ widget_messages.field_name }}"
    value="{{ review.author }}"
    type="text"
    class="form-control form-control_size-m"
    data-comments-form-field='{"isRequired": true, "errorMessage": "ошибка"}'
  />
  <div
    data-comments-form-field-error
    class="feedback__field-error"
  ></div>
</div>
```

### data-comments-form-field

Атрибут поля ввода.

Виды полей определяются по значению атрибута `name`. Всего есть несколько видов:

- `comment[author]` (имя)
- `comment[email]` (e-mail)
- `comment[content]` (сообщение)

Для всех полей можно передать текст, который будет выводиться в случае ошибки в элементе с атрибутом `data-comments-form-field-error`, а также указать обязательность заполнения поля. Все поля являются обязательными.

```html
<input
  name="comment[author]"
  placeholder="{{ widget_messages.field_name }}"
  value="{{ review.author }}"
  type="text"
  class="form-control form-control_size-m"
  data-comments-form-field='{"isRequired": true, "errorMessage": "ошибка"}'
/>
<div data-comments-form-field-error class="feedback__field-error"></div>
```

### data-comments-form-recaptcha

Элемент для вывода кнопки "Я не робот"

```html
{% if comment.captcha_enabled? %}
<div
  data-comments-form-field-area
  class="form-row form-captcha {% if comment.errors contains 'captcha_solution' %}is-error{% endif %}"
>
  <div
    data-comments-form-recaptcha='{
      "isRequired": true,
      "errorMessage": "{{ messages.recaptcha_error | escape }}"
    }'
    id="captcha_challenge"
    class="captcha-recaptcha"
  ></div>
  <div data-comments-form-field-error class="form__field-error"></div>
</div>
{% endif %}
```
#### ReCaptcha v3

При использовании ReCaptcha v3 посетителю сайта больше не нужно нажимать на чекбокс "Я не робот". Проверка происходит автоматически при отправке формы.

##### data-recaptcha-type

Для использования новой версии в блок с атрибутом `data-comments-form-recaptcha` необходимо добавить атрибут `data-recaptcha-type="invisible"`.

##### data-badge

В этом атрибуте можно задать где и как должен выводиться блок ReCaptcha. По умолчанию блок выводится в левом нижнем углу экрана (`bottomleft`).

Возможные значения:
- `inline` - блок выводится как в старой версии, но без чекбокса
- `bottomleft` - фиксированный блок в левом нижнем углу экрана
- `bottomright` - фиксированный блок в правом нижнем углу экрана

Пример:

```html
{% if comment.captcha_enabled? %}
<div
  data-comments-form-field-area
  class="form-row form-captcha {% if comment.errors contains 'captcha_solution' %}is-error{% endif %}"
>
  <div
    data-recaptcha-type="invisible"
    data-badge="bottomleft"
    data-comments-form-recaptcha='{
      "isRequired": true,
      "errorMessage": "{{ messages.recaptcha_error | escape }}"
    }'
    id="captcha_challenge"
    class="captcha-recaptcha"
  ></div>
  <div data-comments-form-field-error class="form__field-error"></div>
</div>
{% endif %}
```

### data-show-comments-modal

Атрибут для кнопки вызова модального окна. При нажатии происходит публикация события EventBus `show-modal-comments:insales:ui_comments`.

В качестве значения можно передать ID модального окна. Это может быть удобно, если у вас несколько форм в модальных окнах.

```html
<button data-show-comments-modal='{"modal_id": "123456"}'>Форма комментария к статье</button>
```

```js
EventBus.subscribe('show-modal-comments:insales:ui_comments', (data) => {
  console.log(data)
});
```

## События

| Событие                                 | Описание                                                                 |
|-----------------------------------------|--------------------------------------------------------------------------|
| send-comment:insales:ui_comments        | Срабатывает при успешной отправке формы                                  |
| error-comments:insales:ui_comments      | Срабатывает в случае ошибки при отправке формы                           |
| show-modal-comments:insales:ui_comments | Срабатывает при нажатии на кнопку с атрибутом `data-show-comments-modal` |

**Пример подписки на событие**

```js
EventBus.subscribe('send-comment:insales:ui_comments', function (data) {
  console.log('Форма успешно отправлена', data);
});
```

## Пример разметки

```html
{% if blog.comments_enabled? %}
<form
  class="comment-form"
  method="post"
  data-comments-form-wrapper='{
    "reviews_moderated": {{ account.reviews_moderated? }},
    "url": "{{ article.url }}"
  }'
  action="{{ aritcle.url }}/comments#comment_form"
>
  <div
    data-comments-form-success='{
      "showTime": 10000,
      "message": "Добавлен"
    }'
    class="h4 feedback__success-message"
  ></div>

  <div class="reviews-wrapper {% unless comment.errors.size > 0 %}hidden{% endunless%}">
    <div class="review-form-header">
      <div class="review-form-title">{{ widget_messages.review_write_new_title }}</div>
      <span class="button-link hide-form-btn js-hide-form">{{ widget_messages.review_write_new_cancel }}</span>
    </div>
    <div class="reviews-form">
      <div id="comment_form" class="js-review-wrapper">
        <div
          data-comments-form-field-area
          class="form-row form-author is-required {% if review.errors contains 'author' %}is-error{% endif %}"
        >
          <label class="form-label">{{ widget_messages.field_name }} <span class="text-error">*</span></label>
          <input
            name="comment[author]"
            placeholder="{{ widget_messages.field_name }}"
            value="{{ review.author }}"
            type="text"
            class="form-control form-control_size-m"
            data-comments-form-field='{"isRequired": true, "errorMessage": "ошибка"}'
          />
          <div data-comments-form-field-error class="feedback__field-error"></div>
        </div>
        <div
          data-comments-form-field-area
          class="form-row form-email is-required {% if review.errors contains 'email' %}is-error{% endif %}"
        >
          <label class="form-label">{{ widget_messages.field_email }} <span class="text-error">*</span></label>
          <input
            name="comment[email]"
            placeholder="{{ widget_messages.field_email }}"
            value="{{ review.email }}"
            type="text"
            class="form-control form-control_size-m"
            data-comments-form-field='{
              "isRequired": true,
              "errorMessage": "ошибка"
            }'
          />
          <div data-comments-form-field-error class="feedback__field-error"></div>
        </div>
        <div
          data-comments-form-field-area
          class="form-row form-comment is-required {% if review.errors contains 'content' %}is-error{% endif %}"
        >
          <label class="form-label">{{ widget_messages.field_message }} <span class="text-error">*</span></label>
          <textarea
            name="comment[content]"
            placeholder="{{ widget_messages.field_message }}"
            class="form-control form-control_size-m is-textarea"
            data-comments-form-field='{
              "isRequired": true,
              "errorMessage": "ошибка"
            }'
          >{{ comment.content }}</textarea>
          <div data-comments-form-field-error class="feedback__field-error"></div>
        </div>
        {% if comment.captcha_enabled? %}
        <div
          data-comments-form-field-area
          class="form-row form-captcha {% if comment.errors contains 'captcha_solution' %}is-error{% endif %}"
        >
          <div
            data-recaptcha-type="invisible"
            data-comments-form-recaptcha='{
              "isRequired": true,
              "errorMessage": "{{ messages.recaptcha_error | escape }}"
            }'
            id="captcha_challenge"
            class="captcha-recaptcha"
          ></div>
          <div data-comments-form-field-error class="form__field-error"></div>
        </div>
        {% endif %}
        <div class="form-controls">
          <button type="submit" class="button button_size-m">{{ widget_messages.button_submit }}</button>
        </div>
      </div>
      {% if blog.moderated? %}
      <div class="moderation">
        <p>{{ widget_messages.reviews_are_moderated }}</p>
      </div>
      {% endif %}
    </div>
  </div>
</form>
{% endif %}
```
