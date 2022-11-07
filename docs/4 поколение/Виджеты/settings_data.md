# settings_data.json

Значения по умолчанию для настроек, указанных в <a href="/4%20поколение/Виджеты/settings_form/">settings_form.json</a> 

#### Пример json формата:

- `true` или `false` - Boolean | булевый тип
- `2` - тип number | Число
- `"left"` - тип string | строка

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
  "banner-text-color": "#ffffff"
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
