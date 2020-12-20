# Аромат2, Фантазия2, Чистота

## insales.ui.forms.js

Заменить весь файл из свежей установки.

или

Заменить:
```js
var recaptchaVerify = function (response) {
  self.captcha = { solution: response };
  if (response) {
    self.unmark();
  }

  return ;
};

setTimeout(function () {
  var loadCapthca = setInterval(function () {
    if (grecaptcha) {
      grecaptchaWidget = grecaptcha.render('gRecaptcha', {
        sitekey: key,
        callback: recaptchaVerify
      });
      clearInterval(loadCapthca);
      window = { grecaptchaWidget: grecaptchaWidget };
    }
  }, 500);
}, 0);
```

Вставить:

```js
var recaptchaVerify = function (response) {
  self.captcha = { solution: response };
  if (response) {
    self.unmark();
  }

  jquery('[name="g-recaptcha-response"]').html(response);

  return ;
};

if (Shop.config.config.feedback_captcha_enabled) {
  EventBus.subscribe('recaptcha:insales:loaded', function () {
    var key = Shop.config.get('recaptcha_key').recaptcha_key;

    $('.form-row #gRecaptcha').each(function(index, el) {
      var randomId = 'gRecaptcha' + _.random(1, 99999999)
      $(this).attr('id', randomId);

      grecaptchaWidget = grecaptcha.render($(el).get(0), {
        sitekey: key,
        callback: recaptchaVerify
      });
      window = { grecaptchaWidget: grecaptchaWidget };
    });
  })
} else {
  setTimeout(function () {
    var loadCapthca = setInterval(function () {
      if (grecaptcha) {
        try {
          $('.form-row #gRecaptcha').each(function(index, el) {
            var randomId = 'gRecaptcha' + _.random(1, 99999999)
            $(this).attr('id', randomId);
            grecaptchaWidget = grecaptcha.render(randomId, {
              sitekey: key,
              callback: recaptchaVerify
            });
            window = { grecaptchaWidget: grecaptchaWidget };
          });

          clearInterval(loadCapthca);
        } catch (e) {
          console.log(e);
          clearInterval(loadCapthca);
        }
      }
    }, 500);
  }, 0);
}
```

## page.liquid

В `_options` добавить (не забыть про зяпятые при добавлении нового элемента массива):
```twig
{% if settings.feedback_captcha_enabled %}
{
  title: '{{ messages.field_captcha }}',
  type: 'captcha',
  required: true,
}
{% endif %}
```

## header.liquid

В `_backcallForm` добавить (не забыть про зяпятые при добавлении нового элемента массива):
```
{% if settings.feedback_captcha_enabled %}
{
  title: '{{ messages.field_captcha }}',
  type: 'captcha',
  required: true,
}
{% endif %}
```

## Виджет обратной связи на главной

Стили

```
.feedback-form .form-row.recaptcha-wide {
  flex-basis: 100%;
  justify-content: center;
  max-width: 100%;
}
```

## index.js

между
```
if (Site.template != 'index') {
  return;
}
```
и
```
  $(document).on('submit', '.js-widget-feedback', function (event) {
```
Вставить:
```
var recaptchaVerify = function (response) {
  jquery('[name="g-recaptcha-response"]').html(response);
};

EventBus.subscribe('recaptcha:insales:loaded', function () {
  var key = Shop.config.get('recaptcha_key').recaptcha_key;

  $('.form-row .js-g-recaptcha').each(function(index, el) {
    var randomId = 'gRecaptcha' + _.random(1, 99999999)
    $(this).attr('id', randomId);

    grecaptchaWidget = grecaptcha.render($(el).get(0), {
      sitekey: key,
      callback: recaptchaVerify
    });
    window = { grecaptchaWidget: grecaptchaWidget };
  });
})
```

## index.js

Исправить вывод ошибки

В коде отправки
```
Shop.sendMessage(msg)
  .done(function (response) {
    alertify.success(response.notice);
    $widgetFeedback.trigger('reset');
    val_send++;
    sessionStorage.setItem('send_success', val_send);
  })
  .fail(function (response) {
    $.each(response.errors, function (i, val) {
      alertify.error(val[0]);
    });
  });
```

Заменить `fail`
```
.fail(function (response) {
  $.each(response.errors, function (i, val) {
    var errorText = (typeof val == 'string') ? val : val[0];
    alertify.error(errorText);
  });
});
```

## widget_feedback.liquid

Вставить в конец формы

```
{% if settings.feedback_captcha_enabled %}
<div class="form-row recaptcha-wide">
  <div class="js-g-recaptcha">
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
```
