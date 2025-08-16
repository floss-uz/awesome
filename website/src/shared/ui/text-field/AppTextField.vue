<template>
  <div class="textfield-wrapper" :class="[{ outlined }, `field-${size}`]">
    <input v-model="model" :type="type" :placeholder="placeholder" :disabled="disabled" class="textfield-input" />
  </div>
</template>

<script setup lang="ts">
import { Size } from '@/shared/model/ui'

interface Props {
  placeholder?: string
  disabled?: boolean
  outlined?: boolean
  size?: Size
  type?: string
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  outlined: false,
  small: Size.MEDIUM,
  type: 'text'
})

const model = defineModel()
</script>

<style scoped lang="scss">
.textfield-wrapper {
  display: inline-flex;
  align-items: center;
  border: solid $border-width $color-border;
  border-radius: $border-radius-md;
  background-color: $color-surface;
  transition: border-color $transition-base, box-shadow $transition-base;

  &.field-small {
    font-size: $font-size-sm;

    .textfield-input {
      padding: $spacing-xxs $spacing-sm;
    }
  }

  &.field-big {
    font-size: $font-size-lg;

    .textfield-input {
      padding: $spacing-sm $spacing-lg;
    }
  }

  &.outlined {
    background-color: transparent;
  }

  .textfield-input {
    width: 100%;
    padding: $spacing-xs $spacing-md;
    border: none;
    outline: none;
    background: transparent;
    font-size: $font-size-md;
    color: $color-text;

    &:disabled {
      color: $color-text-muted;
      cursor: not-allowed;
    }
  }
}
</style>
