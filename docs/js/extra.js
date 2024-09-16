$(function () {
  $(".icons-wrapper li").click(function () {
    var $textIcon = $(this).find("p");
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($($textIcon).text()).select();
    document.execCommand("copy");
    $temp.remove();
    event.preventDefault();

    $textIcon.html();
    $(this).append('<span class="hint">Тест скопирован!<span>');
    if (document.execCommand("copy")) {
      $(this).find(".hint").fadeOut(600);
    }
  });

  if ($(".block-templates-table").length > 0) {
    function formatFields(fields) {
      return fields
        .map(
          (field) =>
            `<div>
              <strong>${field.name}</strong> (${field.kind}) <code>${field.handle}</code>
            </div>`
        )
        .join("");
    }
    const tableData = blockTemplates.map((template) => ({
      handle: template.handle,
      name: template.name,
      fields: formatFields(template.block_fields),
    }));

    tableData.forEach((row) => {
      $(".block-templates-table tbody").append(`
            <tr>
                <td>${row.name}</td>
                <td>${row.handle}</td>
                <td>${row.fields}</td>
            </tr>
          `);
    });

    $("#block-templates-search-input").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $(".block-templates-table tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });

      if ($(".block-templates-table tbody tr:visible").length === 0) {
        $(".block-templates-table tbody").append(`
          <tr>
            <td colspan="3" style="text-align: center;">Ничего не найдено</td>
          </tr>
        `);
      }
    });
  }
});
