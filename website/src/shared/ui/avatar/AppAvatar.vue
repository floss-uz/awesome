<template>
  <div class="avatar-wrapper" :class="[
    { 'hide-border': hideBorder },
    size,
  ]">
    <img :src="src" :alt="alt">
  </div>
</template>

<script setup lang="ts">
import { Size } from '@/shared/model/ui';

interface Props {
  src: string;
  alt?: string;
  size?: Size;
  hideBorder?: boolean;
}

withDefaults(defineProps<Props>(), {
  alt: 'avatar image',
  size: Size.MEDIUM,
  hideBorder: false,
});
</script>

<style scoped lang="scss">
@use 'sass:color';

.avatar-wrapper {
  width: calc($spacing-md * 3);
  aspect-ratio: 1/1;
  overflow: hidden;
  border: solid $border-width $color-border;
  border-radius: 50%;
  position: relative;

  &:not(.hide-border):hover {
    border-color: color.adjust($color-border, $lightness: -10%);
    transition: border-color $transition-base;
  }

  &.hide-border {
    border: none;
  }

  &.small {
    width: calc($spacing-md * 2);
  }

  &.big {
    width: calc($spacing-md * 4);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>