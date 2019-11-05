---
title: Примеры форматирования
---

## Code

Обычный

```
(function(){
  console.log()
})()
```

С подсветкой и нумерацией

```js linenums="1"
(function(){
  console.log('no code here')
})()
```

группировка

```bash tab=
echo "lorem"
```

```html tab=
<p class="content"></p>
```

```sass tab=
body
  color: red
```

в строке

Lorem ipsum dolor `#!js function() { console.log('inline'); }` sit emet

## Symbols

- `(tm)` (tm)
- `(c)` (c)
- `(r)` (r)
- `+/-` +/-
- `-->` -->
- `<--` <--
- `<-->` <-->
- `1/4` 1/4
- `1st 2nd` 1st 2nd

## Critics format

Lorem *ipsum* dolor **sit** amet...

Lorem ipsum dolor {++sit++} amet...

Lorem ~~ipsum~~ dolor sit amet...

Lorem {--ipsum--} dolor sit amet...

Lorem ==ipsum== dolor sit amet...

Lorem ipsum {>>some comment<<} dolor sit amet...

Lorem ipsum dolor^sit^ amet

`++ctrl+alt+delete++` ++ctrl+alt+delete++

## Emoji

:smile: :heart: :thumbup:

## Tasks

Разметка

```md
* [ ] one
* [x] two
* [ ] multi
    * [ ] multi-one
    * [x] multi-two
```

Результат

* [ ] one
* [x] two
* [ ] multi
    * [ ] multi-one
    * [x] multi-two


## Заметки

!!! note
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! tip
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! question
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! success
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! danger
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! warning
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! bug
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! failure
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! quote
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! example
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! note ""
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

    ```ruby
      class Demo {
        def say; end
      }
    ```

??? info
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

!!! abstract
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod
    nulla. Curabitur feugiat, tortor non consequat finibus, justo purus auctor
    massa, nec semper lorem quam in massa.

## Links

Полное описание всех возможностей

- https://www.mkdocs.org/
- https://squidfunk.github.io/mkdocs-material/
- http://criticmarkup.com/users-guide.php
- https://facelessuser.github.io/pymdown-extensions/
