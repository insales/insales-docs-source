---
seo_title: "Объект Shop — методы common.v2.js InSales"
description: "Вспомогательные методы Shop в common.v2.js: форматирование цены, настройки страницы, данные покупателя и отправка сообщений и отзывов."
---

# Вспомогательные методы

Объект `Shop` даёт формат цены, настройки страницы, данные покупателя и отправку сообщений, отзывов и комментариев.

## Shop.money.format

Форматирование суммы по настройкам валюты магазина.

```js
/*
* @param {string|number} amount - сумма
* @param {boolean} [formatRouble] - если передан, копейки отбрасываются
*
* @return {string}
*/

Shop.money.format(1234.00);
// 1 234 руб.
```

`Shop.money.set()` больше не нужен: формат читается со страницы сам.

## Shop.units.getName

Название единицы измерения по её коду.

```js
Shop.units.getName('kgm');
```

## Shop.config

### get

Настройки магазина со страницы. Если передать имя поля или список имён, вернётся объект только с этими полями.

```js
Shop.config.get();
Shop.config.get('currency_code');
// { currency_code: "RUR" }
```

### getProductId

Id товара на карточке. На остальных страницах метод пишет предупреждение и возвращает `null`.

```js
Shop.config.getProductId();
// на странице товара вернет -> "70513124"
```

Прежнее имя `Shop.config.getProducId()` даёт тот же результат.

### getArticleId

Id статьи на странице блога. На остальных страницах метод пишет предупреждение и возвращает `null`.

```js
Shop.config.getArticleId();
```

### setParam

Записать значение в конфигурацию на время текущей страницы.

```js
Shop.config.setParam('my_flag', true);
```

## Shop.pageData.get

Данные текущей страницы. Аргумент такой же, как у `Shop.config.get`: ничего, одно поле или список полей.

```js
Shop.pageData.get();
```

## Shop.client

```js
Shop.client.get()
  .done(function (result) { console.log(result); });

Shop.client.login({
  email: 'user@mail.ru',
  password: 'secret'
})
  .done(function (client) { console.log(client); })
  .fail(function (errors) { console.log(errors); });

Shop.client.logout()
  .done(function (result) { console.log(result); });
```

## Сообщения, отзывы и комментарии

Методы возвращают Deferred.

```js
Shop.sendMessage({
  from: 'json@test.ru',
  name: 'Имя',
  subject: 'Тема',
  content: 'Текст',
  phone: '+70000000000'
})
  .done(function (response) { console.log(response); })
  .fail(function (error) { console.log(error); });

Shop.sendReview({
  author: 'Покупатель',
  email: 'user@mail.ru',
  content: 'Текст отзыва',
  rating: 5
}, {
  id: 70513124
});

Shop.sendComment({
  author: 'Читатель',
  email: 'user@mail.ru',
  content: 'Текст комментария'
}, {
  url: '/blogs/blog/aktsiya'
});

Shop.getProductReviews(70513124)
  .done(function (reviews) { console.log(reviews); });

Shop.getArticleComments()
  .done(function (comments) { console.log(comments); });
```

`getProductReviews` без аргумента берёт id с карточки товара. `getArticleComments` без аргумента берёт id со страницы статьи. Если в отзыве есть изображение, `sendReview` отправляет его вместе с текстом.
