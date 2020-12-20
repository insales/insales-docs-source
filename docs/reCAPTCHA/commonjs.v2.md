# Для любых шаблонов с commonjs.v2

## Добавить в форму
```html
<div  data-feedback-form-recaptcha></div>
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
