# Аромат2, Фантазия2, Чистота

## insales.ui.forms.js

Можно взять весь файл из свежей установки шаблона или действовать по инструкции ниже.

Вместо этого кода:

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

```js
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

Стили:

```css
.feedback-form .form-row.recaptcha-wide {
  flex-basis: 100%;
  justify-content: center;
  max-width: 100%;
}
```

## index.js

Между этим кодом:

```js
if (Site.template != 'index') {
  return;
}
```

и этим:

```js
  $(document).on('submit', '.js-widget-feedback', function (event) {
```

Вставить:

```js
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

В этой части кода:

```js
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

Заменить `fail`:

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

```html
{% if settings.feedback_captcha_enabled %}
<div class="form-row recaptcha-wide">
  <div class="js-g-recaptcha">
  </div>
</div>
{% endif %}
```

## scripts.liquid

Вставить в Site.messages строку:

```js
field_captcha: '{{ messages.field_captcha }}',
```

Как должно получиться:

```js
    messages: {
      field_name: '{{ messages.field_name }}',
      field_email: '{{ messages.field_email }}',
      field_message: '{{ messages.field_message }}',
      label_product: '{{ messages.label_product }}',
      label_variant: '{{ messages.label_variant }}',
      field_captcha: '{{ messages.field_captcha }}',

      preorder: '{{ messages.preorder }}',
      button_submit: '{{ messages.button_submit }}'
    }
```

## product.js

Вставить перед `alertify.modal({ formDefination: preorderForm }).set('title', Site.messages.preorder);`

```js
    if(Shop.config.config.feedback_captcha_enabled) {
      preorderForm.fields.push({
        title: Site.messages.field_captcha,
        type: 'captcha',
        required: true,
      })
    }

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
"s_feedback_captcha_label": "Включить проверку 'Я не робот'",

"s_feedback_captcha_title": "Feedback form",
"s_feedback_captcha_label": "Enable check",
```