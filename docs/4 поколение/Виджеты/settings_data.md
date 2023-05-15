# settings_data.json

Значения по умолчанию для настроек, указанных в <a href="/4%20поколение/Виджеты/settings_form/">settings_form.json</a> 


В settings_data.json мы прописываем настройки виджета по умолчанию. Уникальное имя настройки прописывается в поле `"name"` в файле <a href="/4%20поколение/Виджеты/settings_form/">settings_form.json</a>. У настройки есть параметр `"type"`, какие бывают типы настроек можно прочитать <a href="/4%20поколение/Виджеты/settings_form/">здесь</a>. В зависимости от типа настройки существует допустимые значения.


|Тип настройки|Допустимый тип данных|Пример|
|-|-|-|
|"type":"text"|тип string (строка)|`"left"`|
|"type":"number"|тип number (число)|`2`|
|"type":"checkbox"|Boolean (булевый тип)|`true` или `false`|
|"type":"color"|тип string (строка), формат значения RGB|`"#FFFFFF"`|
|"type":"text"|тип object (объект)|`"button-text": {"ru": "Текст кнопки","en": "Button text"}`|

#### Пример json формата:

```json
{
  "layout-wide-bg": true,
  "layout-wide-content": false,
  "layout-edge": false,
  "layout-pt": 2,
  "layout-pb": 2,
  "banner-pt": 3,
  "banner-pb": 3,
  "hide-mobile": false,
  "hide-desktop": false,
  "img-size": 50,
  "img-ratio": 2,
  "img-position": "left",
  "img-fit": "cover",
  "align-content": "start",
  "banner-text-color": "#ffffff",
  "button-text": {
    "ru": "Текст кнопки",
    "ua": "Текст кнопки",
    "en": "Button text",
    "es": "Texto del button"
  }
}
```

#### Текстовые поля

Мультиязычность реализуется через объект

```json
"title": {
  "ru":"Преимущества",
  "en":"Benefits",
  "ua":"Переваги",
  "es":"Beneficios"
}
```

<!-- #### Поле файл
Чтобы подгрузить файл (изображение) по умолчанию, нужно:

- Добавить в файл <a href="/4%20поколение/Виджеты/settings_data/">settings_data.json</a> -->

<!-- ```json
{
  "banner-img": "20350744"
}
``` -->
<a name="setting_data_name"></a>
#### Пример:
```json
{
  "layout-wide-bg": true,
  "layout-wide-content": false,
  "layout-edge": true,
  "layout-pt": 2,
  "layout-pb": 2,
  "hide-mobile": false,
  "hide-desktop": false,
  "banner-img": "14935942",
  "banner-img-m": "14935938",
  "banner_link": "#"
  "title": {
    "ru":"Преимущества",
    "en":"Benefits",
    "ua":"Переваги",
    "es":"Beneficios"
  }
}


```
