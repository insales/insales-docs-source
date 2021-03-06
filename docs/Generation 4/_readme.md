# Виджеты

> Все элементы шаблона - **виджеты**.

## Структура виджета

- Сниппет  `snippet.liquid`
- SCSS  `snippet.scss`
- JS  `snippet.js`
- Переводы  `messages.json`
- Форма настроек  `settings_form.json`
- Настройки по умолчанию  `settings_data.json`
- Блоки по умолчанию  `setup.json`
- Превью  `setup.json`
- Метаданные  `info.json`

## Создание

Создать виджет можно 2 способами:

1. Через бек-офис
2. Добавить папку с виджетом в архив шаблона

### Через бек-офис

Заходим в раздел `Настройки -> Виджеты`

Там доступно 2 варианта, создать с нуля или импортировать уже готовый виджет.

При создании нужно будет выбрать тему к которой привяжется виджет.

### При загрузке шаблона

В директории шаблона, виджеты находятся в папке `widget_types`.

Имя папки виджета должно совпадать с полем `handle` в файле `info.json`.

Запрещено указывать названия с префиксом `system_`.

---

## Добавление

Добавить виджет можно 2 способами:

1. Через setup.json
2. Через интерфейс визуального редактора сайта

### setup.json

Фрагмент в котором мы добавили виджет с пермалинком `system_widget_v4_promo_slider_4` к виджет-листу `index-list`.

```json
"theme_widgets":{
  "widget_lists":[
    {
      "name":"index",
      "handle":"index-list",
      "kind":"content",
      "widgets": [
        {
          "settings_data":{
            "hide-mobile":false,
            "hide-desktop":false,
            "img-ratio":"3",
            "autoplay":false,
            "autoplay-delay":"5"
          },
          "widget_type":"system_widget_v4_promo_slider_4",
          "data_handle":"block-list-slider"
        }
      ]
    }
  ]
}
```

> Виджет-листы требуются для разделения списков на области и страницы.

> Так как список виджетов главной страницы будет отличаться от списка виджетов каталога. И для виджеты основного контента необходимо отделить от виджетов подвала/сайдбара/хедера.

### Редактор сайта

В редакторе достаточно нажать на кнопку `+`. Будет предоставлен список доступных виджетов.

Разместив виджет на сайте, он автоматически запишется в setup.json при скачивании архива шаблона.

---

## Вывод на сайт

Виджет-листы доступны в переменной `widget_lists`.

Пример вывода виджетов из виджет-листа `index-list`:

```liquid
{% for widgetDrop in widget_lists.index-list.widgets %}
  {% widget widgetDrop %}
{% endfor %}
```

Стили и скрипты виджетов выводятся отдельным тегом `widgets_assets`, в качестве параметра указываются названия виджет-листов через запятую.

```liquid
{% widgets_assets "header-list, footer-list, index-list" %}
```
