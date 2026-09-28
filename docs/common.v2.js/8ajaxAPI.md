---
seo_title: "AJAX API магазина — common.v2.js InSales"
description: "JavaScript-модуль для работы с API магазина InSales в common.v2.js: методы корзины и примеры вызовов из скриптов шаблона."
---

# Модуль для работы с API магазина

## Корзина

### add

Добавление товаров в корзину


```js
ajaxAPI.cart.add({
    123456: 1,
    123457: 3,
    123450: 100
  }, {
    comments: { 123456: 'Ваш комментарий' },
    coupon: 'test'
  })
  .done(function (onDone) { console.log ('onDone: ', onDone) })
  .fail(function (onFail) { console.log ('onFail:', onFail) });
```

### get

Получение состава корзины

```js
ajaxAPI.cart.get()
  .done(function (onDone) { console.log ('onDone: ', onDone) })
  .fail(function (onFail) { console.log ('onFail:', onFail) });
```

### remove

Удаление товара из корзины

```js
/**
 * @param {Number} variant_id - id модификации
 */
ajaxAPI.cart.remove(123123)
  .done(function (onDone) { console.log ('onDone: ', onDone) })
  .fail(function (onFail) { console.log ('onFail:', onFail) });
```

### update

Обновление состава корзины.

Позволяет:

 * обновить состав корзины

 * удалить несколько позиций

 * добавить несколько позиций

 * изменить количество товаров позиции

 * установить комментарии к позициям


```js
/*
  * @param {Object} items - набор пар {variant_id: quantity, ...}. Если quantity = 0, то позиция удаляется из корзины, в противном случае устанавливается указанное кол-во
  * @param {Object} options - дополнительные поля: comments, coupon
  * @param {Object} options.comments - объект с комментариями вида {variant_id: comment, ...}
  * @param {String} options.coupon - название купона
*/

var items = {
  123456: 1,
  123457: 3,
  123450: 100
};

var options = {
  comments: { 123456: 'Ваш комментарий' },
  coupon: 'test'
}

ajaxAPI.cart.update(items, options)
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
```


## Клиент

### get

Получение информации о посетителе сайта

```js
/*
* Если пользователь залогинен, получим json с акутальной информацией о покупателе
* { status: "ok", client: { // информация о покупателе }}
*
* В случае, если пользователь не залогинен, получим
* { status: "error", message: "Not authorized", url: "/client_account/session/new" }
*/

ajaxAPI.shop.client.get()
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) })

```

### login

Вход покупателя. В случае ошибки в `fail` приходит объект ошибок.

```js
ajaxAPI.shop.client.login({
  email: 'user@mail.ru',
  password: 'secret'
})
  .done(function (client) { console.log(client) })
  .fail(function (errors) { console.log(errors) });
```

### logout

Выход покупателя.

```js
ajaxAPI.shop.client.logout()
  .done(function (result) { console.log(result) });
```


## Отзывы

Отправка отзыва к товару

```js
/*
* @param {Object} review - объект с отзывом. ОБЯЗАТЕЛЬНО
* @param {String} review.author - автор отзыва. ОБЯЗАТЕЛЬНО
* @param {String} review.email - e-mail посетителя. ОБЯЗАТЕЛЬНО
* @param {String} review.content - тело отзыва.ОБЯЗАТЕЛЬНО
* @param {String} review.captcha_solution - капча. ОБЯЗАТЕЛЬНО
* @param {String} productUrl - url товара, к которому хотим оставить отзыв
*/

var reviewOption = {
  author: 'Пользователь',
  email: 'user@mail.ru',
  content: 'Текст отзыва',
  rating: 5
}
if ($('#recaptcha-token').length) {
    reviewOption['g-recaptcha-response'] = $('#recaptcha-token').val();
}else{
  reviewOption['captcha_solution'] = $('[name="review[captcha_solution]"]').val();
}

ajaxAPI.shop.review(reviewOption, '/collection/shop/product/main')
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
```


## Комментарии к статье

Отправка комментария к статье

```js
/*
* @param {Object} comment - объект с комментарием. ОБЯЗАТЕЛЬНО
* @param {String} comment.author - автор комментария. ОБЯЗАТЕЛЬНО
* @param {String} comment.email - e-mail посетителя. ОБЯЗАТЕЛЬНО
* @param {String} comment.content - тело комментария.ОБЯЗАТЕЛЬНО
* @param {String} comment.captcha_solution - капча. ОБЯЗАТЕЛЬНО
* @param {String} articleUrl - url статьи, к которому хотим оставить отзыв
*/

var commentOption = {
  author: 'Пользователь',
  email: 'user@mail.ru',
  content: 'Текст'
}
if ($('#recaptcha-token').length) {
    commentOption['g-recaptcha-response'] = $('#recaptcha-token').val();
}else{
  commentOption['captcha_solution'] = $('[name="comment[captcha_solution]"]').val();
}

ajaxAPI.shop.comment(commentOption, '/blogs/blog/aktsiya')
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
```

### Комментарии статьи через shop.article

Получить список комментариев и отправить новый комментарий по адресу статьи.

```js
ajaxAPI.shop.article.getComments(123456)
  .done(function (comments) { console.log(comments) });

ajaxAPI.shop.article.sendComment(commentOption, '/blogs/blog/aktsiya')
  .done(function (onDone) { console.log(onDone) })
  .fail(function (onFail) { console.log(onFail) });
```

### Отзывы товара

```js
ajaxAPI.shop.product.getReviews(123456)
  .done(function (reviews) { console.log(reviews) });
```

Отзыв с изображением отправляется объектом `FormData` через `ajaxAPI.shop.reviewImage`. Адрес товара передаётся вторым аргументом, как у `ajaxAPI.shop.review`.

```js
var formData = new FormData();
formData.append('review[author]', 'Пользователь');
formData.append('review[email]', 'user@mail.ru');
formData.append('review[content]', 'Текст отзыва');
formData.append('review[image_attributes][image]', fileInput.files[0]);

ajaxAPI.shop.reviewImage(formData, '/collection/shop/product/main')
  .done(function (onDone) { console.log(onDone) })
  .fail(function (onFail) { console.log(onFail) });
```


## Обратная связь

Отправка сообщений обратной связи

```js
/*
* @param {Object} message - объект с полями
* @param {string} message.content - тело сообщения. Обязательно
* @param {string} message.from - e-mail, с которого "отправлено" сообщение. Обязательно
* @param {string} message.phone - телефон, указывается в теле письма. По-умолчанию - пустое
* @param {string} message.name - имя, указывается в теле письма. По-умолчанию - пустое.
* @param {string} message['g-recaptcha-response'] - ключ Google reCaptcha
* @param {string} options.subject - тема письма.
*/

$('#myCustomForm').on('submit', (e) => {
  e.preventDefault();

  let feedback = {
    "feedback[name]": 'Test',
    "feedback[from]": 'test@insales.ru',
    "feedback[phone]": '00000000000',
    "feedback[subject]": 'Обратная связь',
    "feedback[content]": 'Без сообщения',
  }

  // При отправке формы получаем элемент, в котором хранится ключ Google reCaptcha, где #myCustomForm это ID элемента вашей формы
  let recaptchaElement = $('#myCustomForm [name="feedback[g-recaptcha-response]"]');

  // Если посетитель поставил галочку "Я не робот", то достаём ключ и добавляем поле для отправки формы
  if (recaptchaElement) {
    feedback['g-recaptcha-response'] = recaptchaElement.val();
  }

  ajaxAPI.shop.message(feedback)
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
})
```

О методах подключения Google reCaptcha в различных шаблонах говорится [в разделе о капче](../Примеры%20работы%20с%20данными%20магазина/Captcha/README.md).

## Товары

### getList

Получение информации о списке товаров

```js
ajaxAPI.product.getList([123456,123457,123458,123459])
  .done(function (onDone) {console.log('onDone: ', onDone) })
  .fail(function (onFail) {console.log('onFail: ', onFail) });
```

!!! info
    Все полученные товары кэшируются в local storage. Это означает, что при отправке новых запросов товары, которые уже были получены с сервера в предыдущих запросах, будут доставаться из кэша. Это работает только в рамках одной сессии. То есть, если перезагрузить страницу, то товары снова будут получены запросом. Если по каким-то причинам вам нужно, чтобы этого не происходило, то необходимо вторым аргументом передать объект со свойством `no_cache` и значением `true`.

!!! warning
    В одном запросе можно получить не более 700 товаров. Если превысить этот лимит, то перед отправкой запроса на сервер массив будет обрезан.

### get

Получение информации о товаре

```js
ajaxAPI.product.get(123456)
  .done(function (onDone) {console.log('onDone: ', onDone) })
  .fail(function (onFail) {console.log('onFail: ', onFail) });
```


## Категория

### get

Получение информации о коллекции

```js
/*
* @param {string} handle - пермалинк коллекции, объязателен.
* @param {Object} filter - объект с выбранными параметрами для фильтрации
* @param {Object} pager - объект с настройками пагинации
* @param {number} pager.page_size - размер разбивки на страницы
* @param {number} pager.page - номер страницы, по которой получаем информацию
*/

var filter = {
  price_min: 4000,
  price_max: 10000,
  characteristics: [ 18775928, 18775929 ]
};

var pager = {
  page_size: 25,
  page: 2
}

ajaxAPI.collection.get('collection_handle', filter, pager)
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
```

### selectedFilter

Текущий фильтр коллекции: значения из адреса страницы, дополненные SEO-фильтром, если он есть.

```js
ajaxAPI.collection.selectedFilter()
  .then(function (filter) { console.log(filter) });
```

## Оформление заказа

Оформление заказа с указанием способа оплаты и доставки.

!!! warning
    Все поля обязательны для заполнения!

```js
/*
* @param {Object} client - объект с полями {email: почта, name: имя, phone: телефон}
* @param {string} client.email - почта
* @param {string} client.name - ФИО
* @param {string} client.phone - телефон
* @param {Object} order - объект с обязательными полями
* @param {number} order.delivery - id способа доставки
* @param {number} order.payment - id способа оплаты
*/

ajaxAPI.checkout.order({
  email: 'user@mail.ru',
  name: 'user',
  phone: '79879991122'
  }, {
  delivery: 1111111,
  payment: 2222222
})
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
```

### quick

Быстрый заказ. Аргумент — объект параметров ajax-запроса, который получается из формы заказа в один клик.

```js
ajaxAPI.checkout.quick(formData)
  .done(function (onDone) { console.log(onDone) })
  .fail(function (onFail) { console.log(onFail) });
```

Перед переходом на страницу успешного заказа публикуется `before_submit:insales:quick_checkout`.


## Сравнение

### add

Добавление товара в сравнение

```js
ajaxAPI.compare.add(123456)
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
```

### remove

Удаление товара из сравнения

```js
ajaxAPI.compare.remove(123456)
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
```

### get

Получение списка сравнения

```js
ajaxAPI.compare.get()
  .done(function (onDone) { console.log('onDone: ', onDone) })
  .fail(function (onFail) { console.log('onFail: ', onFail) });
```

### clear

Очистить список сравнения.

```js
ajaxAPI.compare.clear()
  .done(function (onDone) { console.log(onDone) });
```

## Избранное

Методы принимают id товара и возвращают jQuery Deferred.

```js
ajaxAPI.favorites.add(123456);
ajaxAPI.favorites.remove(123456);
ajaxAPI.favorites.get();
ajaxAPI.favorites.clear();
```

## Восстановление пароля

```js
ajaxAPI.shop.password.reset({ email: 'user@mail.ru' })
  .done(function (response) { console.log(response) })
  .fail(function (response) { console.log(response.errors) });
```
