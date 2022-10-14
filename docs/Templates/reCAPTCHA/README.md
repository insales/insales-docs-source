# Общие сведения

В шаблонах есть возможность защитить формы обратной связи от спама c помощью добавления модуля reCaptcha.

Чтобы проверка заработала нужно добавить в настройки шаблона чекбокс с `name=feedback_captcha_enabled`.

## Для settings.json

Добавить настройку в редактор сайта:

```json
  "Форма обратной связи":[
    {
      "group_name":"reCAPTCHA",
      "items":[
        {
                  "name":"feedback_captcha_enabled",
                  "type":"checkbox",
                  "label":"Включить проверку 'Я не робот'",
                  "value":null,
                  "help":""
                }
      ]
    }
  ]
```

## Для settings.html

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
      <td> <label for="feedback_captcha_enabled">Включить проверку 'Я не робот'</label> </td>
      <td> <input name="feedback_captcha_enabled" id="feedback_captcha_enabled" type="checkbox" /> </td>
    </tr>
  </table>
</fieldset>
```

Когда данная настройка включена, сервер проверяет значение поля `feedback[g-recaptcha-response]` в запросе `/client_account/feedback.json`
