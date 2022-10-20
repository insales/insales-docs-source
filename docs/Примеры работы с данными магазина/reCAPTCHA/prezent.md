# Презент, Монпансье, Плэнер

## jquery.serialize-object.js

Заменить эту часть кода:

```js
var patterns = {
  validate: /^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,
  key:      /[a-z0-9_]+|(?=\[\])/gi,
  push:     /^$/,
  fixed:    /^\d+$/,
  named:    /^[a-z0-9_]+$/i
};
```

На эту:

```js
var patterns = {
  validate: /^[a-z_\-][a-z0-9_\-]*(?:\[(?:\d*|[a-z0-9_\-]+)\])*$/i,
  key:      /[a-z0-9_\-]+|(?=\[\])/gi,
  push:     /^$/,
  fixed:    /^\d+$/,
  named:    /^[a-z0-9_\-]+$/i
};
```

## plugin.alertify.js

Заменить эту часть кода:

```js
alertify.error(val[0]);
```

На эту:

```js
var errorText = (typeof error == 'string') ? error : error[0];
alertify.error(errorText);
```

## main.js

Перед этим кодом:

```js
if (Site.template != 'index') {
  return;
}

$(document).on('submit','.js-widget-feedback', function(event) {
```

Добавить код инициализации капчи:

```js
EventBus.subscribe('recaptcha:insales:loaded', function () {
  var key = Shop.config.get('recaptcha_key').recaptcha_key;

  var recaptchaVerify = function (response) {
    jquery('[name="g-recaptcha-response"]').html(response);
  };

  var recapchaNative = $('#feedback_form .js-recaptcha-field, #feedback_form [name="g-recaptcha-response"]');
  if (recapchaNative.length == 0) {
    $('#feedback_form').append($('<div/>', {
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

## main.js

Заменить эту часть кода:

```js
  .fail(function (response) {
    $.each(response.errors, function (i, val) {
      alertify.error(val[0]);
    });
  });
```

На эту:
```js
  .fail(function (response) {
    $.each(response.errors, function (i, val) {
      var errorText = (typeof val == 'string') ? val : val[0];
      alertify.error(errorText);
    });
  });
```

## widget_feedback.liquid

Добавить в код формы:

```js
<div class="cell-xl-12">
  <div class="js-recaptcha-field"></div>
</div>
```

## modals.liquid

В код формы `.js-preorder-form` добавить:

```html
<div class="form-row row">
  <div class="cell-xl-12">
    <div class="js-recaptcha-field"></div>
  </div>
</div>
```

## settings.html

Добавить настройку в редактор сайта:

```html
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

Добавить название и описание настройки:

```json
"s_feedback_captcha_title": "Форма обратной связи",
"s_feedback_captcha_label": "Включить проверку 'я не робот'",

"s_feedback_captcha_title": "Feedback form",
"s_feedback_captcha_label": "Enable check",
```
