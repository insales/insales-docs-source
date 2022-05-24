# messages.json

Переводы настроек, подсказок.
Ниже пример, где "youtube_link" используемый параметр в файлах типа *.liquid, *.settings_form.json, а далее идет перевод "Ссылка youtube, vimeo"
### Пример:
```
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

### Пример для названий внутри блоков:
Если вы используете шаблон типа BlockListWidgetType, то перевод доступен через данные ключ-значение, приведенные в примере ниже:
```
{
  "ru": {
    "block_list": "Список категорий",
    "block": "Категорию",
    "blocks": "Категории"
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

Где:
- "blocks" - заголовок. Из примера выше - "Категории"
- "block" - подставлятся в список блоков, в кнопку "добавить", например "Добавить категорию"
- "block_list" - "Список категорий"