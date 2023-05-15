# Layout страниц

Для каждого типа страниц есть свой файл (layout) в котором прописано отображение нужных виджет листов для конкретной страницы.

#### Список:

- Для всех типов (layout)	layout.liquid
- Главная	index.liquid
- Категория	collection.liquid
- Товар	product.liquid
- Корзина	cart.iquid
- Страница	page.liquid
- Поиск	search.liquid
- Блог	blog.liquid
- Статья	article.liquid 
- Сравнение	compare.liquid 
- Избранное	favorite.liquid 

#### Пример файла

В данном примере показан выводи содержимого виджет листа страницы `Корзина`

```
{% for widgetDrop in widget_lists.cart-list.widgets %}
  {% widget widgetDrop %}
{% endfor %}
```