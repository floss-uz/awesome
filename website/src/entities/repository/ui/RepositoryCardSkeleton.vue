<template>
  <AppCardBase height="400px" unstyled>
    <div class="repository-card--skeleton" />
  </AppCardBase>
</template>

<script setup lang="ts">
import AppCardBase from '@/shared/ui/card/AppCardBase.vue';
</script>

<style lang="scss" scoped>
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@mixin shimmer(
  $bg: $color-surface,
  $shine: $color-background,
  $radius: $border-radius-md,
  $speed: 3s
) {
  position: relative;
  overflow: hidden;
  background: $bg;
  border-radius: $radius;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      $shine 40%,
      transparent 80%
    );
    background-size: 200% 100%;
    animation: shimmer $speed linear infinite;
    will-change: background-position;
  }
}

.repository-card--skeleton {
  @include shimmer;
  height: 100%;
  width: 100%;
  width: inherit;
  box-sizing: border-box;
}

@media (prefers-reduced-motion: reduce) {
  .repository-card--skeleton::after {
    animation: none !important;
    background-image: none;
  }
}
</style>