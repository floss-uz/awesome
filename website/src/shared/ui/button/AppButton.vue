<template>
  <button :disabled="disabled" :class="[
    'btn',
    `btn-${severity}`,
    { outlined },
    `btn-${size}`,
    { 'icon-only': iconOnly }
  ]">
    <slot>
      {{ label }}
    </slot>
  </button>
</template>

<script setup lang="ts">
import { Severity } from '@/shared/model/ui';
import { Size } from '@/shared/model/ui';

interface Props {
  label?: string;
  disabled?: boolean;
  severity?: Severity;
  outlined?: boolean;
  size?: Size;
  iconOnly?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  severity: Severity.PRIMARY,
  size: Size.MEDIUM,
  iconOnly: false,
})
</script>

<style scoped lang="scss">
@use "sass:color";
@use 'sass:map';

button {
  padding: $spacing-xs $spacing-lg;
  border: solid $border-width $color-border;
  border-radius: $border-radius-md;
  cursor: pointer;
  transition: background-color $transition-base;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  // normal
  &.icon-only {
    border-radius: $border-radius-full;
    padding: $spacing-xs;
  }

  &.btn-small {
    font-size: $font-size-sm;
    padding: $spacing-xxs $spacing-md;

    &.icon-only {
      padding: $spacing-xxs;
    }
  }

  &.btn-big {
    font-size: $font-size-lg;
    padding: $spacing-sm $spacing-xl;

    &.icon-only {
      padding: $spacing-sm;
    }
  }
}

@each $name, $colors in $severity-colors {
  .btn-#{$name} {
    $base: map.get($colors, base);
    $light: map.get($colors, light);
    $dark: map.get($colors, dark);

    background-color: $base;
    color: $color-text-inverse;
    border-color: $base;

    &:not(:disabled):hover {
      background-color: $dark;
    }

    &:not(:disabled):active {
      background-color: $light;
    }

    &.outlined {
      background-color: transparent;
      color: $base;
      border-color: $base;

      &:not(:disabled):hover {
        background-color: rgba($base, 0.1);
      }

      &:not(:disabled):active {
        background-color: rgba($base, 0.3);
      }
    }
  }
}
</style>
