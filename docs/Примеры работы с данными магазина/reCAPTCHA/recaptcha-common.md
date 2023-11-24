# reCaptchaCommon API

Небольшое API, которое должно помочь разработчикам в подключении модуля ReCaptcha для кастомных форм.

## Метод render

```js
/**
 * @param {DOMelement} recaptchaBlock - DOM-элемент, в котором будет рендериться капча.
 * @param {String} formType тип формы:
 * feedback - форма обратной связи,
 * comment - комментарии к статьям, отзывы к товарам
 * review - отзыв к товару
 */
```

Метод вызывает загрузку скрипта Google ReCaptcha, если он ещё не был загружен. Далее запускается рендер капчи внутри элемента, если он был передан в качестве аргумента (`recaptchaBlock`).

В качестве второго аргумента в виде строки можно передать тип формы.

Метод может быть использован для рендера капчи в кастомных формах. Перед отправкой формы вам необходимо будет получить value из элемента `name="g-recaptcha-response"` и отправить его вместе с остальными полями формы.

!!! info
    Если ничего не передать в метод, то произойдёт попытка загрузить скрипт капчи, если он ещё не загружен.

!!! info
    Если у переданного блока есть атрибут `data-recaptcha-type="invisible"`, то будет вызван рендер ReCaptcha V3 Invisible.

!!! warning
    Элемент передаваемый в качестве аргумента (recaptchaBlock) обязательно должен быть пустым.

Пример вызова:

```js
$(function() {
  reCaptchaCommon.render(document.querySelector('.js-captcha-block'), 'feedback');
})
```

### Пример кода

Допустим, у вас есть форма:

```html
<form id="myCustomForm" method="post">
  <div>
      <label for="name">Имя:</label>
      <input type="text" id="name" name="feedback[name]" placeholder="Имя">
  </div>
  <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="feedback[from]" placeholder="Email">
  </div>
  <div>
      <label for="phone">Телефон:</label>
      <input type="tel" id="phone" name="feedback[phone]" placeholder="Номер телефона">
  </div>
  <div>
      <label for="subject">Тема:</label>
      <input type="text" id="subject" name="feedback[subject]" placeholder="Обратная связь">
  </div>
  <div>
      <label for="content">Сообщение:</label>
      <textarea id="content" name="feedback[content]" placeholder="Сообщение"></textarea>
  </div>

  <!-- Контейнер для ReCaptcha -->
  <div id="recaptchaBlock"></div>

  <button type="submit">Отправить</button>
</form>
```

Пример JS-обработки при отправке формы:

```js
$(function() {
  // После загрузки страницы выполняем рендер виджета ReCaptcha
  reCaptchaCommon.render(document.querySelector('#recaptchaBlock'), 'feedback')

  // Вешаем обработчик на событие отправки формы
  $(document).on('submit', '#myCustomForm', function(e) {
    e.preventDefault();
    const $form = $(this);
    const formData = new FormData($form.get(0));

    // Собираем значения полей
    let feedback = {
      lang: "{{ language.locale }}",
      "feedback[name]": formData.get('feedback[name]'),
      "feedback[from]": formData.get('feedback[from]'),
      "feedback[phone]": formData.get('feedback[phone]'),
      "feedback[subject]": formData.get('feedback[subject]'),
      "feedback[content]": formData.get('feedback[content]') || 'Без сообщения',
      // Если пользователь прошёл верификацю, то ReCaptcha сама создаст поле с атрибутом name="g-recaptcha-response", нам нужно лишь получить значение этого поля
      'g-recaptcha-response': formData.get('g-recaptcha-response'),
    }

    // Не забываем про CSRF-токен
    const csrfTokenElement = document.querySelector("meta[name='csrf-token']");

    if (csrfTokenElement) {
      let csrfToken = csrfTokenElement.content;

      $.ajaxSetup({ headers: { 'X-CSRF-Token': csrfToken } });
    } else {
      console.error('CSRF token meta tag not found. AJAX requests may fail.');
    }

    $.post('/client_account/feedback.json', feedback).
      done(function (done) {
        console.log(done);
      });
  })
});
```

## Метод executeInvisible (ReCaptcha v3 Invisible)

```js
/**
 * @description
 * 1. Находит виджет ReCaptcha
 * 2. Если капча уже верифицирована (executed), то получает токен и возвращает его.
 * 3. Если нужна верификация, то делает execute и возвращает null (отправку формы нужно отменить). После того как верификация будет пройдена произойдёт вызов callback-функции для отправки формы, в качестве аргументов передаётся форма и полученный ответ от капчи.
 *
 * @param {DOMElement} form - форма
 * @param {function} callback - коллбек для повторной отправки формы. При вызове передаются аргументы: form, token.
 * @param {string} formType - тип формы
 *
 * @returns {string, null} - токен или null
 */
```

В отличие от предыдущих версий ReCaptcha, которые требовали от пользователя нажатия на чекбокс 'Я не робот' перед отправкой формы, новая версия ReCaptcha v3 Invisible выполняет эту проверку автоматически. В этом случае, необходимо самостоятельно запросить и получить верификационный ответ от ReCaptcha до того, как форма будет отправлена.

### Пример кода

В методе render есть проверка на атрибут `data-recaptcha-type="invisible"`. Если он задан, то будет выполнен рендер виджета ReCaptcha третьей версии. Также, для использования третьей версии вам необходимо создать скрытое поле с атрибутами `name="recaptcha_type"` и `value="invisible"`. Это необходимо для того чтобы при отправке формы сервер понял, что вы используете третью версию ReCaptcha, так как у разных версий существуют разные ключи для проверки токена.

!!! info
    Для блока ReCaptcha вы можете задать атрибут `data-badge`

    В этом атрибуте можно задать где и как должен выводиться блок ReCaptcha. По умолчанию блок выводится в левом нижнем углу экрана (`bottomleft`).

    Возможные значения:

    * `inline` - блок выводится как в старой версии, но без чекбокса
    * `bottomleft` - фиксированный блок в левом нижнем углу экрана
    * `bottomright` - фиксированный блок в правом нижнем углу экрана

Допустим, у вас есть всё та же форма, но уже с ReCaptcha v3 Invisible:

```html
<form id="myCustomForm" method="post">
  <div>
      <label for="name">Имя:</label>
      <input type="text" id="name" name="feedback[name]" placeholder="Имя">
  </div>
  <div>
      <label for="email">Email:</label>
      <input type="email" id="email" name="feedback[from]" placeholder="Email">
  </div>
  <div>
      <label for="phone">Телефон:</label>
      <input type="tel" id="phone" name="feedback[phone]" placeholder="Номер телефона">
  </div>
  <div>
      <label for="subject">Тема:</label>
      <input type="text" id="subject" name="feedback[subject]" placeholder="Обратная связь">
  </div>
  <div>
      <label for="content">Сообщение:</label>
      <textarea id="content" name="feedback[content]" placeholder="Сообщение"></textarea>
  </div>

  <!-- Контейнер для ReCaptcha Invisible со скрытым полем, где указан тип капчи -->
  <div id="recaptchaBlock" data-recaptcha-type="invisible"></div>
  <input type="hidden" name="recaptcha_type" value="invisible">

  <button type="submit">Отправить</button>
</form>
```

Пример JS-обработки при отправке формы:

```js
$(function() {
  // После загрузки страницы выполняем рендер виджета ReCaptcha
  reCaptchaCommon.render(document.querySelector('#recaptchaBlock'), 'feedback')

  // Вешаем обработчик на событие отправки формы
  $(document).on('submit', '#myCustomForm', function(e) {
    e.preventDefault();
    const $form = $(this);
    sendFeedbackForm($form.get(0));
  })

  // Функция для отправки формы
  function sendFeedbackForm(form) {
    // Выполняем отправку и все остальные действия только после того как получили ответ от ReCaptcha. После верификации ReCaptcha будет выполнен обратный вызов функции sendFeedbackForm, куда в качестве аргументов будет передана форма и токен.
    const recaptchaResponse = reCaptchaCommon.executeInvisible(form, sendFeedbackForm, 'feedback');
    if (!recaptchaResponse) { return }

    const formData = new FormData(form);

    // Собираем все поля в один объект
    let feedback = {
      lang: "{{ language.locale }}",
      "feedback[name]": formData.get('feedback[name]'),
      "feedback[from]": formData.get('feedback[from]'),
      "feedback[phone]": formData.get('feedback[phone]'),
      "feedback[subject]": formData.get('feedback[subject]'),
      "feedback[content]": formData.get('feedback[content]') || 'Без сообщения',
      // После успешной верификации ReCaptcha сама создаст поле с атрибутом name="g-recaptcha-response", нам нужно лишь получить значение этого поля
      'g-recaptcha-response': formData.get('g-recaptcha-response'),
      // Достаём значение поля recaptcha_type
      'recaptcha_type': formData.get('recaptcha_type')
    }

    // Не забываем про CSRF-токен
    const csrfTokenElement = document.querySelector("meta[name='csrf-token']");

    if (csrfTokenElement) {
      let csrfToken = csrfTokenElement.content;

      $.ajaxSetup({ headers: { 'X-CSRF-Token': csrfToken } });
    } else {
      console.error('CSRF token meta tag not found. AJAX requests may fail.');
    }

    $.post('/client_account/feedback.json', feedback).
      done(function (done) {
        console.log(done);
      });
  }
});
```
