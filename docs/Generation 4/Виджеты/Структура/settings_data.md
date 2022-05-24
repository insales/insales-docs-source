## settings_data.json

Настройки виджета по умолчанию

### Доступные значения полей

- true / false - булевые значения
- 2 - Число
- "left" - строка

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

### Текстовые поля

Мультиязычность реализуется через объект

```json
"title": {
  "ru":"Преимущества",
  "en":"Benefits",
  "ua":"Переваги",
  "es":"Beneficios"
}
```

### Поле файл
Чтобы подгрузить файл (изображение) по умолчанию, нужно <br>


- Перейти от имени администратора из <a target="_blank" href="https://admins.insales.ru/">https://admins.insales.ru/</a> в магазин <a target="_blank" href="http://file-store.myinsales.ru/">http://file-store.myinsales.ru/</a>
- Перейти в раздел Дизайн -> Файлы
- Добавить файл
- Получить ссылку файла <a target="_blank" href="https://static.insales-cdn.com/files/1/1816/20350744/original/MagnifyingGlassPlus.svg">https://static.insales-cdn.com/files/1/1816/20350744/original/MagnifyingGlassPlus.svg</a>, скопировать id - `20350744`
- Добавить в файл settings_data.json

```
{
  "banner-img": "20350744"
}
```
<a name="setting_data_name"></a>
### Пример:
```
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
