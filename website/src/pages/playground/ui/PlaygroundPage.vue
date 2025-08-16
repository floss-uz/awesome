<template>
  <div class="playground">
    <h1>Header 1</h1>
    <h2>Header 2</h2>
    <h3>Header 3</h3>
    <h4>Header 4</h4>
    <h5>Header 5</h5>

    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eos sapiente, vitae maiores fuga officiis quis
      eveniet velit nulla non expedita perferendis quidem doloribus animi. Quisquam repellat perferendis aliquid modi!
    </p>
    <small>Hint text</small>

    <code>console.log("hello world")</code>
    <br />

    <h2>Buttons</h2>
    <div class="buttons">
      <AppButton v-for="btn in Object.values(Severity)" :key="btn" :severity="btn">
        {{ btn }}
      </AppButton>
    </div>

    <h3>Outlined</h3>
    <div class="buttons">
      <AppButton v-for="btn in Object.values(Severity)" :key="btn" :severity="btn" outlined>
        {{ btn }}
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from "@/shared/ui/button";
import { Severity } from "@/shared/model/ui";
</script>

<style scoped lang="scss">
.playground {
  padding: $spacing-lg;

  .buttons {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
  }
}
</style>
