<template>
  <div class="pagination">
    <div class="pagination-controls">
      <button
        class="pagination-btn"
        :disabled="currentPage === 1"
        @click="handlePageClick(currentPage - 1)"
      >
        <icon-left />
      </button>

      <div class="pagination-pages">
        <button
          v-for="(page, index) in displayedPages"
          :key="index"
          class="page-btn"
          :class="{
            active: currentPage === page,
            ellipsis: page === '...',
          }"
          @click="handlePageClick(page)"
        >
          {{ page }}
        </button>
      </div>

      <button
        class="pagination-btn"
        :disabled="currentPage === totalPages"
        @click="handlePageClick(currentPage + 1)"
      >
        <icon-right />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import IconLeft from "../icons/IconLeft.vue";
import IconRight from "../icons/IconRight.vue";

// -------- Component API ------------
const props = defineProps({
  totalRecords: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: false,
    default: 12,
  },
});

const emit = defineEmits(["pageChange", "samePageClicked"]);

// -------- Main states -------------
const currentPage = defineModel({ default: 1});

// -------- Computed -------------
const startIndex = computed(() => (currentPage.value - 1) * props.rows);
const endIndex = computed(() =>
  Math.min(startIndex.value + props.rows, props.totalRecords)
);

const totalPages = computed(() => Math.ceil(props.totalRecords / props.rows));

const displayedPages = computed(() => {
  const pages = [];
  const maxVisiblePages = 5;

  if (totalPages.value <= maxVisiblePages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage.value > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage.value - 1);
      i <= Math.min(totalPages.value - 1, currentPage.value + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage.value < totalPages.value - 2) {
      pages.push("...");
    }

    if (totalPages.value > 1) {
      pages.push(totalPages.value);
    }
  }

  return pages;
});

// -------- Methods ------------
const handlePageClick = (page: number | string) => {
  if(page == "..." || Number.isNaN(page)) {
    return;
  }

  if(page == currentPage.value) {
    emit('samePageClicked');
    return;
  }

  currentPage.value = page as number;
  emit("pageChange", page, startIndex.value, endIndex.value);
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-md;

  .pagination-info {
    color: $color-text-muted;
    font-size: $font-size-sm;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
  }

  .pagination-btn {
    width: 36px;
    height: 36px;
    border: $border-width solid $color-border;
    border-radius: $border-radius-sm;
    background: $color-surface;
    color: $color-text-muted;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all $transition-base;

    &:hover:not(:disabled) {
      background: $color-surface-alt;
      color: $color-text;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pagination-pages {
    display: flex;
    align-items: center;
    gap: $spacing-xxs;
  }

  .page-btn {
    min-width: 36px;
    height: 36px;
    border: $border-width solid $color-border;
    border-radius: $border-radius-md;
    background: $color-surface;
    color: $color-text-muted;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all $transition-base;

    &:hover:not(.active) {
      background: $color-surface-alt;
      color: $color-text;
    }

    &.active {
      background: $color-primary;
      color: $color-text-inverse;
      border-color: $color-primary;
    }

    &.ellipsis {
      background: transparent;
      border-color: transparent;
      cursor: default;
      pointer-events: none;
      padding: 0 $spacing-xxs;

      &:hover {
        background: transparent;
      }
    }
  }
}

</style>
