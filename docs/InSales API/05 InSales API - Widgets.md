# InSales API - Widgets

## Суть виджета

![Пример виджета](/articles/Widget_screenshot.png)

Виджет - это [iframe](http://htmlbook.ru/html/iframe) выводимый на странице заказа в бэкофисе.

Являясь по сути html блоком на странице - позволяет использовать html для форматирования и javascript для реализации какой-то логики.

Для обмена данными с сервером приложения можно использовать [JSONP](http://ru.wikipedia.org/wiki/JSON#JSONP_.26_JSONPP)

**Описание полей:**

_id_ - id виджета

_created\_at_ - дата создания

_code_ - html содержимое виджета

_height_ - высота блока виджета

В теле виджета доступна глобальная javascript переменная **window.order\_info**, содержащая сведения о текущем заказе.

## Получение списка виджетов

Запрос: `GET /admin/application\_widgets.xml`

Ответ:

    HTTP/1.1 200 OK
    <?xml version="1.0" encoding="UTF-8"?>
    <application-widgets type="array">
      <application-widget>
        <created-at type="datetime">2012-08-09T00:36:54+04:00</created-at>
        <id type="integer">1</id>
        <code>&amp;lt;script&amp;gt;alert(order_info.referer);&amp;lt;/script&amp;gt;</code>
        <height type="integer">60</height>
      </application-widget>
      <application-widget>
        <created-at type="datetime">2012-08-09T00:36:54+04:00</created-at>
        <id type="integer">2</id>
        <code>some widget code here</code>
        <height type="integer">60</height>
      </application-widget>
    </application-widgets>

## Получение информации о виджете

Запрос: `GET /admin/application\_widgets/\#{id}.xml`

Ответ:

    HTTP/1.1 200 OK
    <?xml version="1.0" encoding="UTF-8"?>
    <application-widget>
      <created-at type="datetime">2012-08-09T00:36:54+04:00</created-at>
      <id type="integer">1</id>
      <code>some html or javascript code here</code>
      <height type="integer">60</height>
    </application-widget>

## Добавление виджета

Запрос: `POST /admin/application\_widgets.xml`

    <application-widget>
      <code>some html or javascript code</code>
      <height>60</height>
    </application-widget>

Ответ:

    HTTP/1.1 200 OK
    <?xml version="1.0" encoding="UTF-8"?>
    <application-widget>
      <created-at type="datetime">2012-08-09T17:26:48+04:00</created-at>
      <height type="integer">60</height>
      <id type="integer">6</id>
      <code>some html or javascript code</code>
    </application-widget>

## Редактирование виджета

Запрос: `PUT /admin/application\_widgets/\#{id}.xml`

    <application-widget>
      <code>code changed</code>
      <height>100</height>
    </application-widget>

Ответ:

    HTTP/1.1 200 OK

## Удаление виджета

Запрос: `DELETE /admin/application\_widgets/\#{id}.xml`

Ответ:

    HTTP/1.1 200 OK

## Пример реализации виджета
====================================================================================================================================================================================================

**Задача:** добавить виджет, запрашиваеющий данные о статусе заказа с сервера приложения и выводящий результат.

**1\. HTML код виджета**:

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <style>
        table#statuses {
          border-collapse: collapse;
          border-right: 1px solid black;
          border-left: 1px solid black;
        }
        table#statuses td, table#statuses th {
          border: 1px solid black;
        }
      </style>
    </head>
    <body>
      <p>Номер заказа: <b><span id='order_number'><span></b></p>
      <table id='statuses' style='border: 1px solid black;'>
        <tr>
          <th>Дата</th>
          <th>Статус</th>
        </tr>
      </table>
      <script>
        var data = {};
        // функция которая вызывается во внешнем js файле и устанавливает значение переменной data
        function set_data(input_object) {
          data = input_object;
        }
        var table = document.getElementById('statuses');
        // устанавливаем номер заказа, используя id из переменной window.order_info
        var order_number_field = document.getElementById('order_number');
        order_number_field.innerHTML = window.order_info.id;      
        // подключаем скрипт который передаёт нам данные через JSONP
        var script = document.createElement('script');
        script.src = 'http://www.insales.ru/assets/js/widget_example_jsonp_data.js';
        document.documentElement.appendChild(script);
        // после отработки внешнего скрипта, заполняем таблицу пришедшими данными
        script.onload = function() {
          for (var key in data) {
            var new_tr = document.createElement('tr');
            new_tr.innerHTML= '<td>'+ key +'</td><td>'+ data[key] +'</td>';
            table.appendChild(new_tr);
          }
        }
      </script>
    </body>
    </html>

**2\. Добавление виджета в платформу**

Перед тем как передать html код виджета через API в InSales, нужно предварительно заменить все символы `<` и `>` на соответствующие `&lt;` и `&gt;`. Для этого можно воспользоваться сервисом [http://www.htmlescape.net/htmlescape\_tool.html](http://www.htmlescape.net/htmlescape_tool.html)

После преобразования, добаляем наш виджет в InSales

Запрос: `POST /admin/application\_widgets.xml`

    <application-widget>
    <code>
      &lt;html xmlns=&quot;http://www.w3.org/1999/xhtml&quot;&gt;
      &lt;head&gt;
        &lt;meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html; charset=utf-8&quot;/&gt;
        &lt;style&gt;
          table#statuses {
            border-collapse: collapse;
            border-right: 1px solid black;
            border-left: 1px solid black;
          }
          table#statuses td, table#statuses th {
            border: 1px solid black;
          }
        &lt;/style&gt;
      &lt;/head&gt;
      &lt;body&gt;
        &lt;p&gt;Номер заказа: &lt;b&gt;&lt;span id='order_number'&gt;&lt;span&gt;&lt;/b&gt;&lt;/p&gt;
        &lt;table id='statuses' style='border: 1px solid black;'&gt;
          &lt;tr&gt;
            &lt;th&gt;Дата&lt;/th&gt;
            &lt;th&gt;Статус&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/table&gt;

        &lt;script&gt;
          var data = {};
          // функция которая вызывается во внешнем js файле и устанавливает значение переменной data
          function set_data(input_object) {
            data = input_object;
          }
          var table = document.getElementById('statuses');

          // устанавливаем номер заказа, используя id из переменной window.order_info
          var order_number_field = document.getElementById('order_number');
          order_number_field.innerHTML = window.order_info.id;      

          // подключаем скрипт который передаёт нам данные через JSONP
          var script = document.createElement('script');
          script.src = 'http://www.insales.ru/assets/js/widget_example_jsonp_data.js';
          document.documentElement.appendChild(script);

          // после отработки внешнего скрипта, заполняем таблицу пришедшими данными
          script.onload = function() {
            for (var key in data) {
              var new_tr = document.createElement('tr');
              new_tr.innerHTML= '&lt;td&gt;'+ key +'&lt;/td&gt;&lt;td&gt;'+ data[key] +'&lt;/td&gt;';
              table.appendChild(new_tr);
            }
          }
        &lt;/script&gt;
      &lt;/body&gt;
      &lt;/html&gt;
    </code>
    <height>60</height>
    </application-widget>

**3\. Результат**

![Пример реализации виджета](/articles/Widget_realization_example.png)
