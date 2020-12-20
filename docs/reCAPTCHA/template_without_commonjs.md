# Для шаблонов без commonjs.v2

## Js

```js
// колбек добавления рекапчи в форму автоматически
window.recaptchaCallbackInsalesCommon = function () {
  var key = $('[name="shop-config"]').data('config').recaptcha_key;
  var recaptchaVerify = function (response) {
    jquery('[name="g-recaptcha-response"]').html(response);
  };

  // селектор формы на странице обратной связи.
  var nativeForm = '[action="/client_account/feedback"]';

  // Добавляем блок js-recaptcha-field в формы feedback автоматически
  $(nativeForm).each(function(index, el) {
    var recapchaNative = $(el).find('.js-recaptcha-field, [name="g-recaptcha-response"]');
    if (recapchaNative.length == 0) {
      $('#feedback_form').append($('<div/>', {
        class: 'js-recaptcha-field'
      }))
    }
  });

  // добавляем к блокам с классом js-recaptcha-field рекапчу
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
}

function scriptLoader (src) {
  var testDouble = document.querySelector('script[src="'+src+'"]');
  if (!testDouble) {
    var script_tag = document.createElement('script');
    script_tag.setAttribute('src', src);
    script_tag.setAttribute('async', '');
    script_tag.setAttribute('defer', '');
    document.body.insertAdjacentElement('afterend', script_tag);
  }
}

// window load и setTimeout, чтобы скрипт рекапчи не блокировал загрузку сайта
window.addEventListener('load', function() {
  var shopConfig = $('[name="shop-config"]').data('config');
  setTimeout(function () {
    if (shopConfig.feedback_captcha_enabled) {
      scriptLoader('https://www.google.com/recaptcha/api.js?onload=recaptchaCallbackInsalesCommon&hl=' + shopConfig.locale + '&render=explicit');
    }
  }, 2500)
});
```

## Верстка

В верстку вставить div с классом `js-recaptcha-field`


## settings.html

```
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
