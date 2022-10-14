# Для любых шаблонов с commonjs.v2

## JS

Добавить скрипт:

```js
EventBus.subscribe('recaptcha:insales:loaded', function () {
  var key = Shop.config.get('recaptcha_key').recaptcha_key;
  var customFormSelector = '#feedback_form';

  var recaptchaVerify = function (response) {
    jquery(customFormSelector + ' [name="g-recaptcha-response"]').html(response);
  };

  var recapchaNative = $(customFormSelector + ' .js-recaptcha-field, ' + customFormSelector + ' [name="g-recaptcha-response"]');
  if (recapchaNative.length == 0) {
    $(customFormSelector).append($('<div/>', {
      class: 'js-recaptcha-field'
    }))
  }

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

## Форма

Добавить в код формы:

```html
<div data-feedback-form-recaptcha></div>
```

## settings.html

Добавить настройку в редактор сайта:

```html
<fieldset>
  <legend>Форма обратной связи</legend>
  <table>
    <tr>
      <td>
      	ReCAPTCHA
      </td>
    </tr>
    <tr>
      <td> <label for="feedback_captcha_enabled">Включить проверку 'я не робот'</label> </td>
      <td> <input name="feedback_captcha_enabled" id="feedback_captcha_enabled" type="checkbox" /> </td>
    </tr>
  </table>
</fieldset>
```

## messages.json

Добавить название и описание настройки:

```json
"s_feedback_captcha_title": "Форма обратной связи",
"s_feedback_captcha_label": "Включить проверку 'я не робот'",

"s_feedback_captcha_title": "Feedback form",
"s_feedback_captcha_label": "Enable check",
```