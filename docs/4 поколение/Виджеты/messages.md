# messages.json

Переводы настроек и подсказок в виджетах.
В примере ниже `"youtube_link"` - это используемое значение (ключ) в файлах a href="/4%20поколение/Виджеты/snippet.liquid/#translate_example">*snippet.liquid</a>, <a href="/4%20поколение/Виджеты/settings_form/#translate_example">*settings_form.json</a>

####Переводы для языков: 
* "ru" - Русский `"Ссылка youtube, vimeo"`
* "ua" - Украинский `"Посилання youtube, vimeo"`
* "en" - Английский `"Youtube, vimeo link"`
* "es" - Испанский `"Enlace de youtube, vimeo"`
<br><br>
В messages.json виджета можно добавлять не только переводы настроек, но ещё какие-то переводы для кастомных элементов, какие-то тексты внутри виджета. Обращаться к ним в <a href="/4%20поколение/Виджеты/snippet.liquid/">snippet.liquid</a> можно через `widget_messages`.

#### Пример json формата:
```json
{
  "ru": {
  	"youtube_link": "Ссылка youtube, vimeo",
    "youtube_link_help": "Ссылка из вкладки встроить",
    "video_image": "Заставка"
  },
  "ua": {
  	"youtube_link": "Посилання youtube, vimeo",
    "youtube_link_help": "Посилання з вкладки вбудувати",
    "video_image": "Заставка"
  },
  "en": {
    "youtube_link": "Youtube, vimeo link",
    "youtube_link_help": "Link from the embed tab",
    "video_image": "Screensaver"
  },
  "es": {
    "youtube_link": "Enlace de youtube, vimeo",
    "youtube_link_help": "Enlace desde la pestaña de inserción",
    "video_image": "Protector de pantalla"
  }
}
```

#### Пример для названий внутри блоков:
Если вы хотите создать виджет с блоками, то можно переименовать заголовки блоков с помощью зарезервированных ключей.
<br>
Зарезервированные ключи:

- `"blocks"` - заголовок, которы будет выводиться над списком блоков. Из примера ниже - `"Категории"`
- `"block"` - подставляться в список блоков, в кнопку "добавить", например - Добавить `"Категорию"`
- `"block_list"` - Список `"Категорий"`


Как названия блоков будут отображаться в редакторе: <br>
![](/img/categor_e.jpg)
<br>
Пример кода:
```json
{
  "ru": {
    "block_list": "Список категорий",
    "block": "Категорию",
    "blocks": "Категорий"
  },
  "ua": {
    "block_list": "Список категорій",
    "block": "Категорію",
    "blocks": "Категорії"
  },
  "en": {
    "block_list": "Category list",
    "block": "Category",
    "blocks": "Categories"
  },
  "es": {
    "block_list": "Lista de categoría",
    "block": "Categoría",
    "blocks": "Categorías"
  }
}

```
