$(function() {
  $('.icons-wrapper li').click(function() {
    var $textIcon = $(this).find("p");
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($($textIcon).text()).select();
    document.execCommand("copy");
    $temp.remove();
    event.preventDefault();
    
    $textIcon.html();    
    $(this).append('<span class="hint">Тест скопирован!<span>');  
    if (document.execCommand('copy')) {
      $(this).find('.hint').fadeOut(600);
    }  
  });
});