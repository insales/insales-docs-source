# Компонент вывода даты `ui-date`

Предназначен для вывода форматированной даты

## Пример использования
```
<ui-date
  class="date"
  :date="comment.created_at"
  date-comments
/>
```

### Параметры компонента
 - `date` - Дата для вывода
 - `date-comments` - формат для вывода даты. `https://www.npmjs.com/package/dateformat#mask-options` - доступные опции форматирования дат.
 - `icon` - иконка для вывода даты. По-умолчанию `common.date`
