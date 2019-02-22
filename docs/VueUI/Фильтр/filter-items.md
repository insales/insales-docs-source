# Компонент элементов фильтра `ui-filter-items`

Предназначен для вывода элементов фильтра

## Пример использования
```
<ui-filter-items
  :type="dataView"
  :data-type="dataType"
  :data-id="dataId"
  :options="options"
  :range-data="_rangeData"
  :selected="selected"
  :loaded="selectedFilterIsLoaded"
/>
```

### Параметры компонента
 - `type` - Тип секции (`range`,`checkbox`)
 - `dataType` - Тип данных (`characteristics`,`options`)
 - `dataId` - Id характеристики/опции
 - `options` - Массив данных для вывода (`value` и `name`)
 - `rangeData` - Обьект данных для вывода ползунка `ui-range`
 - `selected` - Массив или Обьект для вывода выбранных чекбоксов
 - `loaded` - флаг для старта вывода `ui-range`
