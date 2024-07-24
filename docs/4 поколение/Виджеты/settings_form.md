# settings_form.json

Настройки виджета в json формате, которые отображаются в редакторе. Дефолтные значения прописываются в файле <a href="/4%20поколение/Виджеты/settings_data/">settings_data.json</a>

#### Группы настроек

Имеется возможность группировки настроек, которые будут отображаться в виде подменю с заголовком.
В случае если в настройках будет всего одна группа, то заголовок группы отображаться не будет и дроп будет всегда раскрыт. При добавлении параметра `general` эти настройки виджета выводятся в первую очередь. Остальные настройки можно будет посмотреть включив `Расширенный режим настроек`.

Пример:
````json
    {
      "Группа 1":[],
      "Группа 2":[],
      "Группа 3":[]
    }
````

#### Подгруппы настроек

Каждую группу можно разделить на подгруппы, которые будут визуально разделять настройки для более удобного их использования.

Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[]
        },
        {
          "group_name":"Подгруппа 2",
          "items":[]
        },
        {
          "group_name":"Подгруппа 3",
          "items":[]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````

Если вы не хотите разделять настройки на подгруппы, то можно использовать такой формат.

Пример:
````json
    {
      "Группа 1":[
        {
          "items":[

          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````

#### Варианты полей настроек

В настройках можно использовать несколько видов полей настроек: 

- [Текст](#текст-text) (`text`, `rich-text`)
- [Число](#число-number) (`number`)
- [Чекбокс](#чекбокс-checkbox) (`checkbox`)
- [Селект](#селект-select) (`select`)
- [Ползунок](#ползунок-range-slider) (`range`)
- [Кнопки](#кнопки-button-group) (`button-group`)
- [Файл](#файл-пример-из-настроек-шаблона) (`file`)
- [Цвет](#цвет) (`color`)
- [Блог](#блог) (`blog`)
- Меню (`navigation`)
- Категория (`collection`)
- Иконки (`icon_group`)

<a name="setting_form_text"></a>
#### Текст (text)
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным)
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `text`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 


Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[
            {
              "name":"main_text",
              "label":"Текст",
              "help":"",
              "type":"text"
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````
<a name="setting_form_rich_texts"></a>
#### Основной текст (rich-text)
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным)
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `rich-text`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 


Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[
            {
              "name":"main_text",
              "label":"Текст",
              "help":"",
              "type":"rich-text"
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````

#### Число (number)
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным) 
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `number`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основвных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 
* `with_btns` - Изменение отображения Range slider на поле с кнопками '+' и '-'
* `min` - Значение `2` - тип number | Число. Минимальное значение настройки
* `max` - Значение `2` - тип number | Число. Максимальное значение настройки
* `step` - Значение `2` - тип number | Число. Шаг(интервал) на которое увеличиться число 

Пример<a id="translate_example"></a>:
````json
{
  "class":"range",
  "name":"img-ratio",
  "label":"{{ messages.image_ratio }}",
  "min":0.5,
  "max":2.5,
  "step":0.1,
  "type":"number",
  "with_btns": true
}
````


#### Чекбокс (checkbox)
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным)
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `checkbox`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 

Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[
            {
              "name":"hide_caption",
              "label":"Скрыть заголовок",
              "value":null,
              "help":"",
              "type":"checkbox"
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````


#### Селект (select)
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным)
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `select`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 



Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[
            {
              "name":"font_family",
              "options":[
                [
                  "OpenSans",
                  "google:Open+Sans"
                ],
                [
                  "Roboto",
                  "google:Roboto"
                ]
              ],
              "value":null,
              "label":"Шрифт",
              "type":"select"
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````


#### Ползунок (Range slider)
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным)
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `range`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 
* `min` - Значение `2` - тип number | Число. Минимальное значение
* `max` - Значение `2` - тип number | Число. Максимальное значение
* `step` - Значение `2` - тип number | Число. Шаг значений
* `unit` Значение `"vw"` - тип string | Строка. Единица измерения (vw, px и т.п)
* `with_btns` - Значение `true` или `false` - Boolean | булевый тип. Изменение отображения Range slider на поле с кнопками '+' и '-'


Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[
            {
              "class":"range",
              "name":"layout-pt",
              "min":0,
              "max":10,
              "step":0.5,
              "label":"{{ messages.indentation_height }}",
              "type":"range",
              "unit":"vw"
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````

#### Кнопки (button-group)
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным). 
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `button-group`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 
* `min` - Значение `2` - тип number | Число. Минимальное значение
* `max` - Значение `2` - тип number | Число. Максимальное значение
* `step` - Значение `2` - тип number | Число. Шаг значений
* `unit` - Значение `"vw"` - тип string | Строка. Единица измерения (vw, px и т.п)

* `with_btns` - Значение `true` или `false` - Boolean | булевый тип. Изменение отображения Range slider на поле с кнопками '+' и '-'
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 
* `title` - Значение - {{ messages.align_left }}. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе 
* `icon`Значение `"vw"` - тип string | Строка. Пример: mdi-text-align-left


Пример:
````json
{
  "name":"widget-align",
  "options":[
    {
      "value": "left",
      "title": "{{ messages.align_left }}",
      "icon": "mdi-text-align-left"
    },
    {
      "value": "center",
      "title": "{{ messages.align_center }}",
      "icon": "mdi-text-align-center"
    },
    {
      "value": "right",
      "title": "{{ messages.align_right }}",
      "icon": "mdi-text-align-right"
    }
  ],
  "value":null,
  "label":"{{ messages.alignment }}",
  "type":"button-group"
}
````

#### Файл (Пример из настроек шаблона)
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным). 
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `file`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 
* `min` - Значение `2` - тип number | Число. Минимальное значение
* `max` - Значение `2` - тип number | Число. Максимальное значение
* `step` - Значение `2` - тип number | Число. Шаг значений
* `unit` - Значение `"vw"` - тип string | Строка. Единица измерения (vw, px и т.п)
* `with-generate-logo` - Значение `true` или `false` - Boolean | булевый тип. Добавить генератор логотипов в редакторе 


Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[
            {
              "name":"logotype",
              "label":"Логотип",
              "value":null,
              "type":"file"
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````


#### Цвет
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным). 
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `color`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 
* `clearable` - Значение `true` или `false` - Boolean | булевый тип. Возможность очистить цвет фона в редакторе. 
* `fallback` - Значение - `color-btn-bg` или `bg`. Переменные можно посмотреть  <a href="https://insales.github.io/my-layout/#">здесь</a>. Возвращает заданный цвет если он не указан пользователем.



Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[
            {
              "name":"color_text",
              "label":"Цвет текста",
              "value":"#ffffff",
              "help":"",
              "type":"color"
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````
#### Блог
Данный вид имеет следующие параметры:

* `name` - <a name="setting_form_name"></a>Идентификатор настройки (должен быть уникальным). 
* `label` - Заголовок настройки
* `value` - Значение по умолчанию
* `help` - Подсказка (будет отображаться рядом с полем)
* `type` - Тип `blog`
* `general` - Значение `true` или `false` - Boolean | булевый тип. Вывод настройки в основные в редакторе 
* `general_position` - Значение `2` - тип number | Число. Порядок вывода настройки в основные в редакторе
* `general_label` - Значение - `"{{ messages.title }}"`. Добавляет заголовок с переводом из messages в основных настройках виджета в редакторе
* `enable_server_reload` - Значение `true` или `false` - Boolean | булевый тип. Перезагрузка шаблона при изменении значения настройки
* `hide_mobile` - Значение `true` или `false` - Boolean | булевый тип. Скрыть настройку в мобильной версии редактора 
* `edit_admin_link` - Значение - `product_options`. Ссылка на товар в панели администратора 

Пример:
````json
    {
      "Группа 1":[
        {
          "group_name":"Подгруппа 1",
          "items":[
            {
              "class": "text",
              "name": "permalink_blog",
              "label": "{{ messages.blog_choice }}",
              "value": null,
              "type": "blog",
              "general": true
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````

#### Использование настроек

Пример файла `settings.json`:
````json
    {
      "Группа 1":[
        {
          "group_name":"Цвета",
          "items":[
            {
              "name":"color-background",
              "label":"Цвет фона",
              "value":"#ffffff",
              "help":"",
              "type":"color"
            },
            {
              "name":"color-text",
              "label":"Цвет текста",
              "value":"#ffffff",
              "help":"",
              "type":"color"
            },
            {
              "name":"color-link",
              "label":"Цвет ссылок",
              "value":"#ffffff",
              "help":"",
              "type":"color"
            }
          ]
        },
        {
          "group_name":"Шрифт",
          "items":[
            {
              "name":"font_family",
              "options":[
                [
                  "OpenSans",
                  "google:Open+Sans"
                ],
                [
                  "Roboto",
                  "google:Roboto"
                ]
              ],
              "value":null,
              "label":"Шрифт",
              "type":"select"
            },
            {
              "name":"font_weight",
              "label":"Начертание шрифта",
              "value":null,
              "min": 100,
              "max": 600,
              "step": 100,
              "type":"range"
            }
          ]
        },
        {
          "group_name":"Логотип",
          "items":[
            {
              "name":"logotype.png",
              "label":"Логотип",
              "value":null,
              "help":"",
              "type":"file"
            }
          ]
        }
      ],
      "Группа 2":[],
      "Группа 3":[]
    }
````


Пример получения значений настроек:

Вызов значения какого-либо параметра задается переменной  `{{ widget_settings.необходимый_метод }}`

Пример liquid:
```twig
Шрифт: {{ widget_settings:font_family }}
Цвет текста: {{ widget_settings:color_text }}

```

Пример JSON

```JSON
{
  "{{ messages.content_settings }}": [
    {
      "items": [
        {
          "class": "text",
          "name": "title",
          "label": "{{ messages.title }}",
          "value": null,
          "type": "text"
        },
        {
          "class": "range",
          "name": "benefit_row_gap",
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "{{ messages.benefit_row_gap }}",
          "type": "range"
        },
        {
          "class": "range",
          "name": "benefit_img_ratio",
          "label": "{{ messages.benefit_img_ratio }}",
          "min": 0.5,
          "max" : 2,
          "step": 0.1,
          "type": "range"
        },
        {
          "class": "range",
          "name": "benefit_img_border_radius",
          "label": "{{ messages.benefit_img_border_radius }}",
          "min": 0,
          "max" : 50,
          "step": 1,
          "type": "range"
        }
      ]
    }
  ]
}
```

#### Группа иконок (icon_group)

```JSON
{
 "design": [
    {
      "type": "group",
      "name": "{{ messages.stylization }}",
      "items": [
        {
          "class": "text",
          "name": "btn-align",
          "label": "{{ messages.align }}",
          "options": [
            {
              "value": "left",
              "title": "{{ messages.align_left }}",
              "icon": "mdi-text-align-left"
            },
            {
              "value": "center",
              "title": "{{ messages.align_center }}",
              "icon": "mdi-text-align-center"
            },
            {
              "value": "right",
              "title": "{{ messages.align_right }}",
              "icon": "mdi-text-align-right"
            }
          ],
          "value": null,
          "type": "icon_group"
        }
      ]
    }
]
}
```
