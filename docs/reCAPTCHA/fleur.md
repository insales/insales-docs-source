# Флёр, Инсташоп, Cross

## theme.js

Добавить:

```js
EventBus.subscribe('recaptcha:insales:loaded', function () {
  var key = Shop.config.get('recaptcha_key').recaptcha_key;

  var recaptchaVerify = function (response) {
    jquery('[name="g-recaptcha-response"]').html(response);
  };

  $('.js-recaptcha-field').each(function(index, el) {
    if ($(window).width() < 360) {
      $(el).attr('data-size', 'compact').data('size', 'compact');
    }
    grecaptchaWidget = grecaptcha.render($(el).get(0), {
      sitekey: key,
      callback: recaptchaVerify
    });
    window = { grecaptchaWidget: grecaptchaWidget };
  });
})
```

## main.scss

Увеличить размер модального окна

```
#feedback-modal {
	max-width: 344px;
}
```

## feedback.js

Обновить до 0.16.0 или выше

https://cdn.jsdelivr.net/gh/VladimirIvanin/InSalesFeedback@0.16.0/dist/feedback.js


## feedback.liquid

```
{% if settings.feedback_captcha_enabled %}
<div class="feedback-row is-required m-b-15" data-feedback-field>
  <label class="form-label m-b-5">{{ messages.field_captcha }}</label>
  <div class="feedback-field-wrap js-recaptcha-field">
  </div>
</div>
{% endif %}
```

## js-form-feedback.liquid

```
{% if settings.feedback_captcha_enabled %}
<div class="feedback-row is-required m-b-15" data-feedback-field>
  <label class="form-label m-b-5">{{ messages.field_captcha }}</label>
  <div class="feedback-field-wrap js-recaptcha-field">
  </div>
</div>
{% endif %}
```

## settings.html

```
<fieldset>
  <legend>{{ messages.s_feedback_captcha_title }}</legend>
  <table>
    <tr>
      <td>
      	ReCAPTCHA
      </td>
    </tr>
    <tr>
      <td> <label for="feedback_captcha_enabled">{{ messages.s_feedback_captcha_label }}</label> </td>
      <td> <input name="feedback_captcha_enabled" id="feedback_captcha_enabled" type="checkbox" /> </td>
    </tr>
  </table>
</fieldset>
```

## messages.json

```
"s_feedback_captcha_title": "Форма обратной связи",
"s_feedback_captcha_label": "Включить проверку 'я не робот'",

"s_feedback_captcha_title": "Feedback form",
"s_feedback_captcha_label": "Enable check",

"s_feedback_captcha_title": "Форма зворотного зв'язку",
"s_feedback_captcha_label": "Увімкнути перевірку 'я не робот'",

"s_feedback_captcha_title": "Formulario de comentarios",
"s_feedback_captcha_label": "Active la casilla de verificación 'No soy un robot'",
```
