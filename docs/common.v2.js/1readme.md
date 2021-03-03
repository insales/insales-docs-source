# Вводная

Данный раздел посвящен библиотеке `common.v2.js`

Данная библиотека является набором готовых скриптов для упрощения и ускорения разработки тем на платформе InSales.

## Подключение

В шаблоны `layots.{layout,checkout2,client_account}.liquid` добавить тег `include_insales_scripts` с параметром `common-js@v2`

```
{% include_insales_scripts "common-js@v2" %}
```

Так же можно подключить через settings_data.json, прописав там поле - "common_js_version": "v2".

Файл settings_data.json не доступен через бэк-офис, поэтому новое свойство нужно добавлять вручную через скачивание темы и последующей установке с новыми параметрами. Так же файл можно поправить если для разработки вы используете — [InSales-uploader](https://insales.github.io/insales-uploader/).

Пример `settings_data.json`:
```json
{
  "common_js_version": "v2",
  "presets": {
    "custom": {
      "color_text_primary": "#222222",
      "font_size_primary": "16px"
    }
  },
  "theme_title": "Базовый шаблон"
}
```

> В шаблонах 4 поколения, common-js указывается в качестве зависимости

## Модули

Commonjs добавляет на сайт следущие модули:

- Шина событий (EventBus)
- Товар
- Корзина
- Сравнение
- Ajax поиск
- Шаблонизация
- Отправка форм обратной связи
- Шаблонизация (Шаблонизатор библиотеки lodash)
