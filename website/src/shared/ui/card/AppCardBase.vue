<template>
  <div class="app-card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.app-card {
  padding: $spacing-lg;
  margin-bottom: $spacing-md;
  border: solid $border-width $color-border;
  border-radius: $border-radius-md;
  background-color: $color-surface;
  box-shadow: $shadow-sm;
  color: $color-text;
  transition: box-shadow $transition-base, transform $transition-base;
  width: min-content;

  &:hover {
    box-shadow: $shadow-md;
    transform: translateY(-2px);
  }

  // &:focus-within {
  //   border: solid $border-width-md $color-primary;
  //   box-shadow: $shadow-md;
  // }

  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
