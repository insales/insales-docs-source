# snippet.scss

Доступные миксины:

```scss
@mixin background-color($color) {
  $dark_selector: '[style*="#{$color}-is-dark:true"]';
  $light_selector: '[style*="#{$color}-is-light:true"]';
  background-color: var(#{$color});
  @at-root #{selector-append($dark_selector, &)} {
    color: var(--color-text-light);
    --color-text: var(--color-text-light);
    --color-text-minor-shade: var(--color-text-light-minor-shade);
    --color-text-major-shade: var(--color-text-light-major-shade);
    --color-text-half-shade: var(--color-text-light-half-shade);
  }
  @at-root #{selector-append($light_selector, &)} {
    color: var(--color-text-dark);
    --color-text: var(--color-text-dark);
    --color-text-minor-shade: var(--color-text-dark-minor-shade);
    --color-text-major-shade: var(--color-text-dark-major-shade);
    --color-text-half-shade: var(--color-text-dark-half-shade);
  }
}
```
