<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    required: false,
    default: false
  },
  color: {
    type: String,
    required: false,
    default: 'blue'
  }
});
</script>

<template>
  <button :disabled="props.disabled" class="
    inline-flex items-center justify-center align-middle select-none font-sans
    font-medium text-center duration-300 ease-in disabled:opacity-50 disabled:shadow-none
    disabled:cursor-not-allowed focus:shadow-none text-sm py-2 px-4 shadow-sm hover:shadow-md
    rounded-full transition antialiased"
    :class="`bg-${props.color}-800 hover:bg-${props.color}-700 border-${props.color}-900 text-${props.color}-50`">
    <slot />
  </button>
</template>