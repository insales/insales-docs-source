# reCaptchaCommon API

Небольшое API, которое должно помочь разработчикам в подключении модуля reCaptcha для кастомных форм.

## Метод render

```js
/**
 * @param {DOMelement} selector пустой элемент для рендера
 * @param {String} formType тип формы:
 * feedback - форма обратной связи,
 * comment - комментарии к статьям, отзывы к товарам
 */
```

Метод вызывает загрузку скрипта Google reCaptcha, если он ещё не был загружен. Далее запускается рендер капчи внутри элемента, который был передан в качестве аргумента (selector).

В качестве второго аргумента в виде строки нужно передать тип формы.

Метод может быть использован для рендера капчи в кастомных формах. Перед отправкой формы вам необходимо будет получить value из элемента `name="feedback[g-recaptcha-response]`, и отправить его вместе с остальными полями формы в свойстве `g-recaptcha-response`.

!!! info
    Если ничего не передать в метод, то произойдёт попытка загрузить скрипт капчи, при этом, рендер не отработает.

!!! warning 
    Элемент передаваемый в качестве аргумента (selector) обязательно должен быть пустым.

Пример вызова:

```js
$(function() {
  reCaptchaCommon.render(document.querySelector('.js-captcha-block'), 'feedback');
})
```

Пример запроса для отправки формы обратной связи:

```js
$('#myCustomForm').on('submit', () => {
  // Собираем все поля в один объект
  let feedback = {
    lang: "{{ language.locale }}",
    "feedback[name]": 'Test',
    "feedback[from]": 'test@insales.ru',
    "feedback[phone]": '00000000000',
    "feedback[subject]": 'Обратная связь',
    "feedback[content]": 'Без сообщения',
  }

  // Получаем элемент в котором хранится ключ
  let recaptchaElement = $('#myCustomForm [name="feedback[g-recaptcha-response]"]');

  // Если посетитель поставил галочку "Я не робот", то достаём ключ и добавляем поле для отправки формы
  if (recaptchaElement) {
    feedback['g-recaptcha-response'] = recaptchaElement.val();
  }
    
  $.post('/client_account/feedback.json', feedback).
    done(function (done) {
      console.log(done);
    });
})
```