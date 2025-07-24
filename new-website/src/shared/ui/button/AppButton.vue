<template>
  <button class="primary">
    <slot />
  </button>
</template>

<style scoped>
button {
  padding: 8px 24px;
  border: solid 1px transparent;
  border-radius: 24px;
}

.primary {
  background-color: royalblue;
  color: white;

  &:hover {
    opacity: 0.8;
  }
}
</style>
