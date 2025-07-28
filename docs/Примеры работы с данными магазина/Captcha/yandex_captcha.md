# Yandex Captcha

Небольшое API, которое должно помочь разработчикам в подключении модуля Yandex Captcha для кастомных форм на сайте. Модуль представляет из себя набор функций для инициализации и рендера виджетов Yandex Captcha, а также для работы с невидимой капчей.

!!! info
    Для использования необходимо, чтобы в панели администратора вашего магазина в разделе "Настройки" > "Карточка магазина" в разделе "Тип капчи" была выбрана "Yandex SmartCaptcha".

## `initForUIBlocks()`

Если у вас в магазине включена Yandex SmartCaptcha, и в вашем шаблоне подключен CommonJS, то **этот метод автоматически вызовется при загрузке страницы**. Метод инициализирует Yandex Captcha для UI-компонентов CommonJS ([формы обратной связи](/common.v2.js/10ui-feedback/), [комментарии](/common.v2.js/ui-comments/), [отзывы](/common.v2.js/ui-reviews/), [заказ в один клик](/common.v2.js/ui-quick-checkout/)).

```javascript
document.addEventListener('DOMContentLoaded', () => {
	window.yandexCaptchaCommon.initForUIBlocks();
})
```

**Что делает:**

- Находит все блоки капчи в UI-компонентах
- Загружает скрипт Yandex SmartCaptcha при необходимости
- Использует IntersectionObserver API для ленивого рендера капчи, когда блок появляется в видимой области экрана

## `loadCaptchaScript(callback)`

```js
/**
 * @param {Function} callback - функция, вызываемая после загрузки скрипта
 * @returns {void}
 */
```

Загружает скрипт Yandex SmartCaptcha. Если скрипт уже загружен, вызывает `callback` сразу.

```javascript
document.addEventListener('DOMContentLoaded', () => {
	window.yandexCaptchaCommon.loadCaptchaScript(() => {
		console.log('Yandex SmartCaptcha загружена');
	});
});
```

## `renderCaptchaWidget(options)`

```js
/**
 * @param {Object} options - параметры рендера
 * @param {HTMLElement} options.container - DOM-элемент для рендера капчи
 * @param {Object} options.renderParams - параметры рендера (sitekey, invisible, callback и т.д.)
 * @param {string} options.formType - тип формы для создания дополнительных полей (например, 'feedback', 'review', 'comment')
 * @returns {void}
 */
```

Рендерит виджет Yandex Captcha в указанном контейнере.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  window.yandexCaptchaCommon.renderCaptchaWidget({
    container: document.getElementById('captcha-container'),
    renderParams: {
      sitekey: 'site-key',
      invisible: false,
      callback: (response) => console.log('Captcha verified:', response)
    },
    formType: 'feedback'
  });
});
```

!!! info
    Со всеми возможными параметрами рендера можно ознакомиться на странице [официальной документации Yandex SmartCaptcha](https://yandex.cloud/ru/docs/smartcaptcha/concepts/widget-methods#render){target="_blank"}.

## `renderCaptchaWidgetOnVisible(options)`

```js
/**
 * @param {Object} options - параметры рендера
 * @param {HTMLElement} options.container - DOM-элемент для рендера капчи
 * @param {Object} options.renderParams - параметры рендера (sitekey, invisible, callback и т.д.)
 * @param {string} options.formType - тип формы для создания дополнительных полей (например, 'feedback', 'review', 'comment')
 * @returns {void}
 */
```

Рендерит капчу только когда блок становится видимым (использует IntersectionObserver API).

```javascript
document.addEventListener('DOMContentLoaded', () => {
  window.yandexCaptchaCommon.renderCaptchaWidgetOnVisible({
    captchaBlock: document.getElementById('captcha-block'),
    renderParams: {
      sitekey: 'site-key'
    },
    formType: 'feedback'
  });
});
```

!!! info
    Со всеми возможными параметрами рендера можно ознакомиться на странице [официальной документации Yandex SmartCaptcha](https://yandex.cloud/ru/docs/smartcaptcha/concepts/widget-methods#render){target="_blank"}.

## `getDefaultRenderParams(container)`

```js
/**
 * @param {HTMLElement} container - DOM-элемент, в котором будет рендериться капча и в котором могут быть data-атрибуты с параметрами рендера
 * @returns {Object} - объект с параметрами рендера
 */
```

Получает параметры рендера по умолчанию из data-атрибутов контейнера, или возвращает дефолтные параметры, если атрибуты не заданы.

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const params = window.yandexCaptchaCommon.getDefaultRenderParams(container);
});
```

Возможные атрибуты:

- `data-yandex-captcha-type` - если имеет значение `invisible`, то рендерит невидимую капчу
- `data-yandex-captcha-test` - если имеет значение `true`, рендерит капчу в тестовом режиме
- `data-yandex-captcha-webview` - если имеет значение `true`, рендерит капчу в режиме WebView (для мобильных приложений)
- `data-yandex-captcha-shield-position` - позиция бейджа с уведомлением об обработке данных для невидимой капчи (`top-left` | `center-left` | `bottom-left` | `top-right` | `center-right` | `bottom-right`)
- `data-yandex-captcha-hide-shield` - если имеет значение `true`, скрывает бейдж с уведомлением об обработке данных для невидимой капчи

## `executeCaptchaInvisible(form, callback)`

```js
/**
 * @param {HTMLElement} form - форма, для которой выполняется невидимая капча
 * @param {Function} callback - функция, которая будет вызвана после получения токена капчи
 * @returns {String|null} - токен капчи, если капча уже пройдена, или `null`, если капча запущена и нужно ждать выполнения
 */
```

Этот метод запускает проверку невидимой капчи для указанной формы. Если капча уже пройдена, возвращает токен. Если капча запущена, но токен ещё не получен, то возвращает `null` и ожидает выполнения. По окончании выполнения капчи вызывается `callback`, переданный в метод.

```javascript
const token = window.yandexCaptchaCommon.executeCaptchaInvisible(
  formElement,
  (form, token) => {
    // Повторная отправка формы с токеном
    submitForm(form, token);
  }
);

if (!token) {
  // Капча запущена, ожидаем выполнения
  return;
}
```

## События

Модуль публикует следующие события через [EventBus](/common.v2.js/7EventBus/):

### `yandex-captcha:insales:loaded`

Срабатывает после загрузки скрипта Yandex SmartCaptcha.

```javascript
window.EventBus.subscribe('yandex-captcha:insales:loaded', () => {
  console.log('Yandex SmartCaptcha готова к использованию');
});
```

### `yandex-captcha:insales:response`

Срабатывает после получения ответа от капчи.

```javascript
window.EventBus.subscribe('yandex-captcha:insales:response', (data) => {
  console.log('Капча пройдена:', data);
  // data: { container, response, formType }
});
```

## Примеры использования

### Простая видимая капча

```javascript
document.addEventListener('DOMContentLoaded', () => {
  window.yandexCaptchaCommon.renderCaptchaWidget({
    container: document.getElementById('captcha'),
    renderParams: {
      sitekey: 'site-key',
      callback: (response) => {
        console.log('Капча пройдена:', response);
      }
    }
  });
});
```

### Невидимая капча

#### Невидимая капча c ленивой загрузкой

```javascript
document.addEventListener('DOMContentLoaded', () => {
  window.yandexCaptchaCommon.renderCaptchaWidgetOnVisible({
    captchaBlock: captchaElement,
    renderParams: {
      sitekey: 'site-key',
      invisible: true
    },
    formType: 'feedback'
  });
});
```

#### Интеграция с формой

```javascript
function submitForm(form) {
  const token = window.yandexCaptchaCommon.executeCaptchaInvisible(
    form,
    submitForm, // Повторный вызов после получения токена
  );

  if (!token) {
    return; // Капча запущена, ждем
  }

  // Не забываем про CSRF-токен
  const csrfTokenElement = document.querySelector("meta[name='csrf-token']");
  const headers = {};

  if (csrfTokenElement) {
    headers['X-CSRF-Token'] = csrfTokenElement.content;
  } else {
    console.error('CSRF token meta tag not found. AJAX requests may fail.');
  }

  // Отправляем форму в которой присутствует поле `yandex-smart-token`.
  const formData = new FormData(form);

  fetch('/submit', {
    method: 'POST',
    headers,
    body: formData
  });
}
```

