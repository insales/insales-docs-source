# Мультивалютность

Валюта изменяется на всех страницах кроме личного кабинета и чекаута, по этой причине стоит использовать проверку на доступность смены валюты (`allow_change_site_currency`).

```liquid
{% if allow_change_site_currency %}
<form action="/site_currencies/update_current" method="post">
  <select name="site_currency_code" onchange="this.parentNode.submit()">
    {% for currency in account.site_currencies %}
      {% assign selected = "" %}
      {% if currency.current %}
        {% assign selected = "selected" %}
      {% endif %}
    
      <option {{ selected }} value="{{ currency.code }}">{{ currency.unit }}&nbsp;{{ currency.code }}</option>
    {% endfor %}
  </select>
</form>
{% endif %}
```

## liquid переменные

`allow_change_site_currency` - доступно переключение валюты на странице?

`account.site_currencies` - массив валют на сайте

`currency.code` - код валюты. Например **USD**

`currency.unit` - символ валюты. Например **$**

## Пример ajax смены валюты

```js
$.ajax({
  method: "POST",
  url: "/site_currencies/update_current",
  data: {
    site_currency_code: "RUR"
  },
  dataType: "dataType",
  success: function (response) {
    window.location.reload()
  },
  error: function (response) {
    window.location.reload()
  }
});
```


