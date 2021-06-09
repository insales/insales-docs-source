# Шаблоны с файлами z.InSales

## Для ui.js

Заменить:
```
  // улучшайзинг стандартной обратной связи
  if( Site.template == 'page' ){
    var
      $form = $( '#feedback_form');

    if( $form.is( 'form' ) ){
      var
        table     = $form.find( 'table' ),
        notice    = table.find( 'small' ),
        button    = table.find( '#feedback_commit' ),
        textarea  = table.find( 'textarea' ),
        email     = table.find( 'input[name="feedback[from]"]' );
```

Вставить: 
```
  // улучшайзинг стандартной обратной связи
  if( Site.template == 'page' ){
    var
      $form = $( '#feedback_form');

    if( $form.is( 'form' ) ){
      var
        table     = $form.find( 'table' ),
        notice    = table.find( 'small' ),
        button    = table.find( '#feedback_commit' ),
        textarea  = table.find( 'textarea' ),
        phone     = table.find( 'input[name="feedback[phone]"]' ),
        recaptcha = table.find( '[name="g-recaptcha-response"]' ),
        email     = table.find( 'input[name="feedback[from]"]' );
```


Заменить:
```
          $message[ 'feedback[content]' ] = textarea.val();
          $message[ 'feedback[from]' ] = email.val();
```

Вставить: 
```
          $message[ 'feedback[content]' ] = textarea.val();
          $message[ 'feedback[from]' ] = email.val();
          if (phone.length) {
            $message[ 'feedback[phone]' ] = phone.val();
          }
          if (recaptcha.length) {
            $message[ 'g-recaptcha-response' ] = recaptcha.val();
          }
```



