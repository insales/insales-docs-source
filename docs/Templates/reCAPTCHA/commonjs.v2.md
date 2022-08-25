# Для любых шаблонов с commonjs.v2

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

## Добавить в форму
```html
<div data-feedback-form-recaptcha></div>
```

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
