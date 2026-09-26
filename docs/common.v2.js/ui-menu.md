# Меню

Компонент отмечает пункт меню, который ведёт на текущую страницу.

## Атрибуты

| Атрибут | Назначение |
|---|---|
| data-navigation | Корень меню |
| data-navigation-item | Пункт меню |
| data-navigation-link | Ссылка. Значение сравнивается с pathname адреса страницы |
| data-navigation-submenu | Вложенный список |

Если pathname совпал со значением `data-navigation-link`, ссылка и родительские пункты с `data-navigation-item` получают класс `is-current`.

```html
<div data-navigation>
  <div data-navigation-item>
    <a href="{{ link.url }}" data-navigation-link="{{ link.url }}">{{ link.title }}</a>
    <div data-navigation-submenu>
      <div data-navigation-item>
        <a href="{{ child.url }}" data-navigation-link="{{ child.url }}">{{ child.title }}</a>
      </div>
    </div>
  </div>
</div>
```

После обновления виджета с `data-widget-id` отметка текущего пункта ставится заново.
