# InSales API - Счета приложения

## Зачем это нужно

Однократно выставляемые счета нужны для получения денег от пользователя приложения через систему InSales. Это позволяет владельцу приложения взаимодействовать с одним контрагентом, а не с целой толпой. InSales в свою очередь за это берет комиссию, которая согласуется и устанавливается при публикации приложения.

## Как это использовать

Когда пользователь собирается выполнить действие, в приложении ему говорят что это будет стоить столько-то. Пользователь соглашается, приложение ему выставляет счет и перенаправляет его на страницу оплаты. Там пользователь видит, что такое-то приложение выставило ему счет за такое-то действие. Ему предлагается этот счет оплатить или отклонить. После того как пользователь выполнить одно из этих действий, InSales уведомляет приложение, отправляя запрос на URL указанный при выставлении счета. Приложение после получения уведомления проверяет состояние счета, оплачен он или отклонен, и в зависимости от этого делает что-то или нет.

Надо отметить, что уведомление на данный момент шлется только один раз, не зависимо от ответа приложения или каких либо других ошибок. Поэтому мы рекомендуем раз в день поверять состояние выставленных счетов от которых не поступило уведомлений.

## Описание полей

*   _name_ - назначение платежа

*   _price_ - сумма счета.

*   _return-url_ - URL по которому будут уведомлять об оплате.

*   _confirmation-url_ - URL страницы оплаты / отклонения счета (генерируется автоматически при создании).

*   _test_ - флаг для отладки, если установлен, то для подтверждения платежа не надо его оплачивать. По умолчанию не установлен.

*   _status_ - статус счета. Возможные значения:

    1.  pending - пользователь еще ничего сделал
    2.  accepted - оплатил счет
    3.  declined - отклонил счет

## Пример по шагам

1.  Создаем счет

`POST /admin/application\_charges.xml`

     <?xml version="1.0" encoding="UTF-8"?>
     <application-charge>
       <name>Купи слона</name>
       <price type="decimal">180.0</price>
       <return-url>http://applicaiton.my/check_payment_url/%id_in_my_application%</return-url>
     </application-charge>

Получаем:

     <?xml version="1.0" encoding="UTF-8"?>
     <application-charge>
       <id type="integer">2</id>
       <name>Купи слона</name>
       <price type="decimal">180.0</price>
       <return-url>http://applicaiton.my/check_payment_url/%id_in_my_application%</return-url>
       <status>pending</status>
       <test type="boolean">false</test>
       <confirmation-url>http://some-shop.myinsales.ru/admin/invoices/6539</confirmation-url>
       <created-at type="datetime">2013-12-02T22:34:59+04:00</created-at>
       <updated-at type="datetime">2013-12-02T22:34:59+04:00</updated-at>
     </application-charge>

Запоминаем соответствие между id\_in\_my\_application и id (2 в данном случае)

2.  Перенаправляем клиента на confirmation-url, в данном случае: [http://some-shop.myinsales.ru/admin/invoices/6539](http://some-shop.myinsales.ru/admin/invoices/6539)

3.  Получаем уведомление на [http://applicaiton.my/check\_payment\_url/id\_in\_my\_application](http://applicaiton.my/check_payment_url/id_in_my_application)

    по id\_in\_my\_application определяем id и проверяем статус application\_charge


`GET /admin/application\_charges/2.xml`

Получаем:

     <application-charge>
       <id type="integer">2</id>
       <name>Купи слона</name>
       <price type="decimal">180.0</price>
       <return-url>http://applicaiton.my/check_payment_url/%id_in_my_application%</return-url>
       <status>accepted</status>
       <test type="boolean">false</test>
       <confirmation-url>http://some-shop.myinsales.ru/admin/invoices/6539</confirmation-url>
       <created-at type="datetime">2013-12-02T22:34:59+04:00</created-at>
       <updated-at type="datetime">2013-12-02T22:40:59+04:00</updated-at>
     </application-charge>

Ура! Слона купили! Оформляем его доставку))

## Выставление

Создать счёт можно, отправив POST-запрос по адресу `/admin/application_charges.xml`.

Пример запроса:

     <?xml version="1.0" encoding="UTF-8"?>
     <application-charge>
       <name>Sms 200</name>
       <price type="decimal">180.0</price>
       <return-url>http://host/url</return-url>
     </application-charge>

Пример ответа:

     <?xml version="1.0" encoding="UTF-8"?>
     <application-charge>
       <id type="integer">1</id>
       <name>Sms 200</name>
       <price type="decimal">180.0</price>
       <status>pending</status>
       <return-url>http://host/url</return-url>
       <confirmation-url>http://host.myinsales.ru/admin/invoices/6539</confirmation-url>
       <test type="boolean">false</test>
       <created-at type="datetime">2013-07-18T22:34:59+04:00</created-at>
       <updated-at type="datetime">2013-07-18T22:34:59+04:00</updated-at>
     </application-charge>

## Проверка состояния

GET запрос по адресу `/admin/application_charges/%id%.xml`

Пример ответа:

     <?xml version="1.0" encoding="UTF-8"?>
     <application-charge>
       <created-at type="datetime">2013-07-18T22:34:59+04:00</created-at>
       <id type="integer">1</id>
       <name>Sms 200</name>
       <price type="decimal">180.0</price>
       <return-url>http://host/url</return-url>
       <status>pending</status>
       <test type="boolean">false</test>
       <updated-at type="datetime">2013-07-18T22:34:59+04:00</updated-at>
       <confirmation-url>http://host.myinsales.ru/admin/invoices/2</confirmation-url>
     </application-charge>

## Отклонение

Для отклонения счёта нужно отправить POST-запрос по адресу `/admin/application_charges/%id%/decline.xml`.

В ответ возвращается информация о состоянии счета. Отклонить можно только еще не оплаченный счет.

## Получение списка счетов

Отправиа GET-запрос по адресу `/admin/application_charges.xml`, можно получить информацию о счетах, выставленных приложением. Поддерживаемые форматы: xml, json.

Пример xml документа:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<application-charges type="array">
  <application-charge>
    <created-at type="datetime">2013-07-18T22:34:59+04:00</created-at>
    <id type="integer">1</id>
    <name>Sms 200</name>
    <price type="decimal">180.0</price>
    <return-url>http://host/url</return-url>
    <status>pending</status>
    <test type="boolean">false</test>
    <updated-at type="datetime">2013-07-18T22:34:59+04:00</updated-at>
    <confirmation-url>http://host.myinsales.ru/admin/invoices/2</confirmation-url>
  </application-charge>
  <application-charge>
    <created-at type="datetime">2013-05-23T18:46:51+04:00</created-at>
    <id type="integer">3</id>
    <name>Sms 200</name>
    <price type="decimal">180.0</price>
    <return-url>http://host/url</return-url>
    <status>accepted</status>
    <test type="boolean">false</test>
    <updated-at type="datetime">2013-05-27T11:27:37+04:00</updated-at>
    <confirmation-url>http://host.myinsales.ru/admin/invoices/4</confirmation-url>
  </application-charge>
</application-charges>
```
