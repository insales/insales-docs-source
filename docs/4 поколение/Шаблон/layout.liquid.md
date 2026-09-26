# Layout страниц

Файлы лежат в папке `templates/`. `layout.liquid` — общая оболочка всех страниц. В редакторе кода и в скачанном архиве тот же файл называется `layouts.layout.liquid`. Внутрь оболочки подставляется шаблон текущей страницы.

```liquid
<!DOCTYPE html>
<html>
  <body>
    {{ content_for_layout }}
  </body>
</html>
```

Шаблон страницы выводит нужные виджет-листы. Список появляется на странице там, где его вызывает Liquid. Поле `kind` задаёт зону этого списка в редакторе.

```liquid
{% for widgetDrop in widget_lists.header-list.widgets %}
  {% widget widgetDrop %}
{% endfor %}

{% for widgetDrop in widget_lists.index-list.widgets %}
  {% widget widgetDrop %}
{% endfor %}
```

Зоны `kind`:

| `kind` | Зона в редакторе |
| --- | --- |
| `top_panel` | Верхняя панель |
| `header` | Шапка |
| `before_content` | Перед контентом |
| `content` | Контент |
| `sidebar` | Сайдбар |
| `after_content` | После контента |
| `footer` | Подвал |
| `bottom_panel` | Нижняя панель |
| `outside` | Вне основного потока |

Состав виджет-листов задаётся в <a href="/4%20поколение/Шаблон/setup.json/">setup.json</a>.

#### Файлы страниц

Обязательные при загрузке архива:

| Страница | Файл |
| --- | --- |
| Общая оболочка | `layout.liquid` |
| Главная | `index.liquid` |
| Категория | `collection.liquid` |
| Товар | `product.liquid` |
| Корзина | `cart.liquid` |
| Страница | `page.liquid` |

Дополнительные:

| Страница | Файл |
| --- | --- |
| Поиск | `search.liquid` |
| Блог | `blog.liquid` |
| Статья | `article.liquid` |
| Страница 404 | `page_404.liquid` |
| Сравнение | `compare.liquid` |
| Избранное | `favorite.liquid` |

Страница избранного появляется в редакторе, если в шаблоне есть `favorite.liquid`. Страница сравнения — если есть `compare.liquid`.

#### Свои шаблоны

Для категории, товара, страницы, блога и статьи можно добавить отдельный liquid. Имя файла: `collection.sale.liquid`, `product.lookbook.liquid`, `page.landing.liquid`, `blog.news.liquid`, `article.promo.liquid`. Шаблон выбирают у конкретной категории, товара или другой сущности.

Виджет-листы такого шаблона в <a href="/4%20поколение/Шаблон/setup.json/">setup.json</a> привязывают полем `custom_template`. Для файла `collection.sale.liquid` значение — `collection.sale`.

```json
{
  "handle": "collection-sale-list",
  "kind": "content",
  "custom_template": "collection.sale",
  "name": {
    "ru": "Распродажа"
  },
  "widgets": []
}
```
