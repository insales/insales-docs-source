$(function () {
  initApiExamples();

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

  if ($(".global-messages-table tbody").length > 0 && globalMessages) {
    const $tableBody = $('.global-messages-table tbody');

    $.each(globalMessages, function(key, value) {
      const $row = $('<tr>');
      
      const $cellPermalink = $('<td>').text(key);
      const $cellText = $('<td>').text(value);
  
      $row.append($cellPermalink);
      $row.append($cellText);
  
      $tableBody.append($row);
    });
  }

  if ($(".block-templates-table").length > 0 && blockTemplates) {
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

function initApiExamples() {
  $(".api-example").each(function () {
    var $example = $(this);
    var $bar = $example.children(".api-example__bar");
    var $grid = $example.children(".api-example__grid");
    if (!$bar.length || !$grid.length || $bar.find(".api-example__toggle").length) {
      return;
    }

    $example.find(".api-example__pane").each(function () {
      var $pane = $(this);
      if ($pane.children(".api-pane-head").length) {
        return;
      }

      var $head = $('<div class="api-pane-head"></div>');
      var $langs = $pane.children(".api-lang");
      if ($pane.hasClass("api-example__pane--request") && $langs.length > 1) {
        var $langBar = $('<div class="api-lang-bar"></div>');
        $langs.each(function (index) {
          var title = $(this).attr("data-lang") || "JavaScript";
          var $button = $("<button>", { type: "button", text: title });
          if (index === 0) {
            $button.addClass("is-active");
          } else {
            $(this).hide();
          }
          $button.on("click", function () {
            $langBar.find("button").removeClass("is-active");
            $button.addClass("is-active");
            $langs.hide().eq(index).show();
          });
          $langBar.append($button);
        });
        $head.append($langBar);
      } else if ($pane.hasClass("api-example__pane--request")) {
        $head.append($('<span class="api-pane-label">Запрос</span>'));
      } else {
        var $label = $pane.find(".api-pane-label").first();
        if ($label.length) {
          var $parent = $label.parent();
          $head.append($label);
          if ($parent.is("p") && !$.trim($parent.text())) {
            $parent.remove();
          }
        }
      }

      if ($pane.hasClass("api-example__pane--request")) {
        var $button = $('<button type="button" class="api-copy">Копировать</button>');
        $button.on("click", function () {
          var current = $pane.find(".api-lang").filter(function () {
            return $(this).css("display") !== "none";
          }).find("pre code").get(0) || $pane.find("pre code").get(0);
          if (!current) {
            return;
          }
          var text = current.innerText;
          var done = function () {
            $button.text("Скопировано");
            setTimeout(function () {
              $button.text("Копировать");
            }, 1200);
          };
          var fallback = function () {
            var area = document.createElement("textarea");
            area.value = text;
            document.body.appendChild(area);
            area.select();
            document.execCommand("copy");
            area.remove();
            done();
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(done).catch(fallback);
            return;
          }
          fallback();
        });
        $head.append($button);
      }
      $pane.prepend($head);
    });
  });
}

$(function () {
  var search = document.getElementById("fallback-search");
  if (!search) return;

  var cards = Array.prototype.slice.call(document.querySelectorAll(".fallback-card"));
  var sections = Array.prototype.slice.call(document.querySelectorAll(".fallback-section"));
  var count = document.getElementById("fallback-count");
  var orientation = document.getElementById("fallback-orientation");

  function filterCards() {
    var query = search.value.trim().toLocaleLowerCase();
    var idQuery = /^\d+$/.test(query);
    var visible = 0;
    cards.forEach(function (card) {
      var haystack = [card.dataset.id, card.dataset.name, card.dataset.series].join(" ").toLocaleLowerCase();
      var matches = (!query || (idQuery ? card.dataset.id === query : haystack.indexOf(query) !== -1)) &&
        (!orientation.value || card.dataset.orientation === orientation.value);
      card.hidden = !matches;
      if (matches) visible++;
    });
    sections.forEach(function (section) {
      section.hidden = !section.querySelector(".fallback-card:not([hidden])");
    });
    count.textContent = "Показано: " + visible + " из " + cards.length;
  }

  search.addEventListener("input", filterCards);
  orientation.addEventListener("change", filterCards);
  filterCards();

  document.addEventListener("click", function (event) {
    var button = event.target.closest(".fallback-copy");
    if (!button) return;
    var value = button.dataset.copyId;
    var fallback = function () {
      var input = document.createElement("textarea");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      var copied = document.execCommand("copy");
      input.remove();
      return copied;
    };
    var done = function () {
      button.textContent = "Скопировано";
      setTimeout(function () { button.textContent = "Скопировать ID"; }, 1500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(value).then(done).catch(function () {
        if (fallback()) done();
      });
    } else if (fallback()) {
      done();
    }
  });
});
