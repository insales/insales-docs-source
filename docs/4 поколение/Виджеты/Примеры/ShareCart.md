# Пример добавления функционала "Поделиться корзиной" в виджет корзины

В данном примере показан процес добавления функционала "Поделаться корзиной" в виджеты корзины, в котором такого функционала не было изначально.

#### Шаг 1 (snippet.js)
Необходимо добавить в файл snippet.js этот фрагмент кода:

```js
$(document).ready(function() {
  const currentWidget = document.querySelector(widget);
  const copyButtons = currentWidget.querySelectorAll('.js-copy-url');
  const cartItems = Array.from(currentWidget.querySelectorAll('.item-title'));
  const shopTitleNode = currentWidget.querySelector('[data-shop-title]');
  const shopHostNode = currentWidget.querySelector('[data-shop-host]');
  const itemsInCartNode = currentWidget.querySelector('[data-items-in-cart]');
  const dataShareItemsNode = currentWidget.querySelector('[data-share-items]');
  const shopTitle = shopTitleNode ? shopTitleNode.getAttribute('data-shop-title') : '';
  const shopHost = shopHostNode ? shopHostNode.getAttribute('data-shop-host') : '';
  const itemsInCart = itemsInCartNode ? itemsInCartNode.getAttribute('data-items-in-cart') : '';
  const dataShareItems = dataShareItemsNode ? dataShareItemsNode.getAttribute('data-share-items') : '';

  function isMobileDevice() {
    const mobileWidthThreshold = 768;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return screenWidth < mobileWidthThreshold;
  }

  function allProductName() {
    let allProductName = '';
    cartItems.forEach((cartItem) => {
      const productName = cartItem.text.trim();
      const productLink = cartItem.getAttribute('href');
      if (!productName) {
        return;
      }
      allProductName += `${productName} - ${shopHost}${productLink}\n`;
    })
    return `${itemsInCart} ${allProductName} \n`;
  }

  function copyLink(link) {
    let inputElement = document.querySelector('.shared-cart-link');
    inputElement.value = link;
    navigator.clipboard.writeText(inputElement.value);
  }
  copyButtons.forEach(function(button) {
    button.addEventListener('click', async() => {
      try {
        const data = await $.ajax({
          url: '/front_api/cart/share.json',
          method: 'POST'
        });
        const urlToCopy = data.shared_cart_link;
        const shareData = {
          text: `${dataShareItems} ${shopTitle}: \n`,
          url: urlToCopy
        };
        if (isMobileDevice()) {
          navigator.share(shareData).then(() => EventBus.publish('copy:link:insales'));
        } else {
          copyLink(urlToCopy);
          EventBus.publish('copy:link:insales');
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
});

```

#### Шаг 2. HTML (snippet.liquid)
Редактируем snippet.liquid.

В основной тег form, добавляем необходимые атрибуты:
```html
    data-shop-title="{{ account.title }}"
    data-shop-host="{{ account.main_host }}"
    data-items-in-cart="{{- widget_messages.items_in_cart -}}"
    data-share-items="{{- widget_messages.shared_cart -}}"
```

Сразу после тега form, добавляем эту строку:
```html
 <input
      type="text"
      name="shared-cart-link"
      class="shared-cart-link hidden" />
```

В любое необходимое вам место виджета нужно добавить кнопку для копирования ссылки на корзину:
```html
<button type="button" class="button button_size-l button_wide social-button js-copy-url button_second">
  <span class="text">{{ widget_messages.share }}</span>
</button>
```
Дизайн самой кнопки можно изменить с помощью редактирования файла стилей виджета snippet.scss.

#### Шаг 3. Файл переводов JSON (messages.json)
Добавляем необходимые переводы:

Текст переводов можно менять на любой нужный вам.

```json
{
  "ru": {
    "share": "Поделиться",
    "enable_shared_cart": "Включить 'Поделиться корзиной'",
    "items_in_cart": "Товаров в корзине:",
    "shared_cart": "С вами поделились корзиной в интернет-магазине"
  },
  "ua": {
    "share": "Поділитися",
    "enable_shared_cart": "Включити 'поділитися кошиком'",
    "items_in_cart": "Товарів у кошику:",
    "shared_cart": "З вами поділилися кошиком в інтернет-магазині"
  },
  "en": {
    "share": "Share",
    "enable_shared_cart": "Enable 'Share Shopping Cart'",
    "items_in_cart": "Items in cart:",
    "shared_cart": "A cart was shared with you in an online store"
  },
  "es": {
    "share": "Compartir",
    "enable_shared_cart": "Habilitar 'compartir carrito'",
    "items_in_cart": "Artículos en el carrito:",
    "shared_cart": "Se compartió un carrito contigo en una tienda en línea"
  }
}
```