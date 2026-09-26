# block_settings_presets.json

Необязательный файл для виджета типа <a href="/4%20поколение/Виджеты/info/#BlockListWidgetType">BlockListWidgetType</a>. В нём задают, можно ли менять состав блоков в редакторе, и ограничения для генерации содержимого блоков.

```json
{
  "fixed_blocks": true,
  "default_preset": {
    "fields": {
      "name": {
        "ai_text_max_symbols": 35
      },
      "content": {
        "ai_text_max_symbols": 260
      },
      "image": {
        "ai_image_orientation": "landscape"
      }
    }
  }
}
```

- `fixed_blocks: true` — блоки нельзя добавлять и удалять в редакторе. Это работает, когда число блоков совпадает с блоками из <a href="/4%20поколение/Виджеты/setup/">setup.json</a>.
- `ai_text_max_symbols` — максимальная длина текста, который генерируется для поля блока.
- `ai_image_orientation` — ориентация генерируемого изображения: `landscape` или `portrait`.

Ключи внутри `fields` — это идентификаторы полей шаблона блока, например `name`, `content`, `image`.
