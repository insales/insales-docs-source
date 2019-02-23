# Системные уведомления. ui-notice-list

Компонент содержит все системные уведомление, такие как добаление товара в корзину, отправка формы и тд.

## Пример использования

```html
<ui-notice-list
	add-cart="{{messages.s_alertify-addcart}}"
	add-compare="{{messages.product_added_to_comparison}}"
	remove-compare="{{messages.product_removed_from_comparison}}"
	notice-send="{{ messages.backcall_text_content }}"
	fade-time="5000"
	{% unless widget_settings.hide_modal %}
		modal-notice
	{% endunless %}
	modal-buy-caption="{{ widget_messages.add_cart }}"
	modal-compare-caption="{{ widget_messages.add_compare }}"
	:preorder-form='{
		caption: "{{ messages.preorder }}",
		fromEmail: "{{ account.email }}",
		subject: "{{ messages.preorder_subject }}",
		fieldName: "{{ messages.field_name }}",
		fieldPhone: "{{ messages.field_phone }}",
		fieldProduct: "{{ messages.field_product }}",
		bttnSubmit: "{{ messages.button_submit }}",
		success: {
			message: "{{ messages.preorder_completed }}",
		}
	}'
>
	<div slot="modal_cart">
		<ui-last-added
			unit-title ="{{ widget_messages.unit_title }} "
			total-items-caption= "{{ widget_messages.total_item_cart }}"
			sku-text ="{{ messages.label_article }}"
			in-cart
		>
		</ui-last-added>
		<div class="modal-buy-control"
			<ui-button
				href="/cart_items"
			>{{ widget_messages.go_to_cart }}
			</ui-button>
		</div>
	</div>
</ui-notice-list>
```

## Параметры

* `fadeTime` - Продолжительность анимации появления/исчезновения.
* `addCart` - Текст для уведомления добавления в корзину.
* `addCompare` - Текст для уведомления добавления в сравнение.
* `removeCompare` - Текст для уведомления удаления из сравнения.
* `noticeSend` - Текст для уведомления отправки формы.
* `modalNotice` - Параметр для показа модальных окон вместо уведомлений. По-умолчанию `false`.
* `modalCompareCaption` - Текст для заголовка модального окна добавления в сравнение.
* `modalBuyCaption` - Текст для заголовка модального окна добавления в корзину.
* `preorderForm` - Объект для создания формы предзаказа. Поля по умолчанию:
```javascript
{
	caption: "Предзаказ",
	subject: "Оформлен предзаказ",
	fromEmail: "",
	fieldName: "Имя",
	fieldPhone: "Телефон",
	fieldProduct: "Товар",
	bttnSubmit: "Отправить",
	success: {
		name: "Предзаказ",
		message: "Предзаказ успешно оформлен",
		header: "Предзаказ",
	}
}
```

	* `caption` - Заголовок модального окна.
	* `subject` - Тема письма.
	* `fieldName` - Текст заголовка полей ввода.
	* `fieldPhone` - Текст заголовка полей ввода.
	* `fieldProduct` - Текст заголовка полей ввода.
	* `success` - объект для показа уведомления успешной отправки.
		* `message` - Текст для уведомления успешной отправки.

## Слоты

* `modal_cart` - Содержимое модального окна добавления товара в корзину.
* `modal_compare` - Содержимое модального окна добавления товара в сравнение.
