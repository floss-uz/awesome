<template>
  <div class="app-card" :class="{ 'unstyled': unstyled }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: String,
    required: false,
    default: () => 'auto'
  },
  height: {
    type: String,
    required: false,
    default: () => 'auto'
  },
  unstyled: {
    type: Boolean,
    required: false,
    default: () => false
  }
})
</script>

<style scoped lang="scss">
.app-card {
  padding: $spacing-lg;
  // margin-bottom: $spacing-md;
  border: solid $border-width $color-border;
  border-radius: $border-radius-md;
  background-color: $color-surface;
  box-shadow: $shadow-md;
  color: $color-text;
  transition: box-shadow $transition-base, transform $transition-base;
  width: v-bind(width);
  height: v-bind(height);

  &.unstyled {
    padding: 0;
    box-shadow: none;
  }

  &:hover:not(.unstyled) {
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
