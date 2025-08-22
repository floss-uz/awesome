<template>
  <main>
    <!-- full screen loader -->
    <Transition>
      <div v-show="isLoading" class="loading">
        <div class="loader"></div>
      </div>
    </Transition>

    <div class="main-content">
      <!-- navigation -->
      <div class="main-content__header">
        <div class="main-content__header__wrapper">
          <h2>Awesome Floss</h2>
          <AppTextField v-model="query" placeholder="Search" :size="Size.BIG" class="search-field"
            @input="handleSearchInput" />
        </div>
      </div>

      <!-- main content -->
      <div v-if="items && items.length" class="main-content__repos">
        <RepositoryCard v-for="item in items" :key="item.id" :author="item.owner.login"
          :author-url="item.owner.html_url" :repo-url="item.html_url" :name="item.name" :description="item.description"
          :stars="item.stargazers_count" :img="item.owner.avatar_url" :language="item.language"
          :updated-at="item.updated_at" />
      </div>
      <!-- <Transition>
        <div v-if="!items || !items.length" class="main-content__repos--empty">
          No items :/
        </div>
      </Transition> -->

      <div class="main-content__footer">
        <AppPagination v-if="items.length" v-model="currentPage" :total-records="totalCount" :rows="PAGE_SIZE"
          @page-change="handlePageChange" @same-page-clicked="handleSamePageClick"/>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import RepositoryCard from '@/entities/repository/ui/RepositoryCard.vue';
import AppTextField from '@/shared/ui/text-field';
import { onMounted, ref } from 'vue';
import { Size } from '@/shared/model/ui';
import { fetchRepositores } from '../api';
import type { GithubRepo } from '@/entities/repository/model/GithubRepo';
import { debounce, scrollToTop } from '@/shared/lib/utils';
// import AppButton from '@/shared/ui/button/AppButton.vue';
import AppPagination from '@/shared/ui/pagination';


const items = ref<GithubRepo[]>([])

const PAGE_SIZE = 30;

const query = ref('uzbek')
const currentPage = ref(1);
const totalCount = ref(0);
const isLoading = ref(false);

const getRepositories = async () => {
  try {
    isLoading.value = true;
    const response = await fetchRepositores(query.value, currentPage.value);

    if (response) {
      items.value = response?.items;

      if (response.total_count) {
        totalCount.value = Math.min(response.total_count, 1000);
      }
    }
  } catch (error) {
    console.error(`[Repos/Fetch]: ${error}`)
  } finally {
    isLoading.value = false;
  }
}

const handlePageChange = debounce(() => {
  scrollToTop();
  getRepositories() 
}, 100);

const handleSamePageClick = () => {
  scrollToTop();
}

const handleSearchInput = debounce(() => {
  currentPage.value = 1;
  totalCount.value = 0;
  getRepositories();
}, 400)

onMounted(() => {
  getRepositories();
})
</script>


<style scoped lang="scss">
@use 'sass:color';
$card-width: 300px;

main {
  display: flex;
  justify-content: center;

  .main-content {
    margin-top: $spacing-2xl;
    margin-bottom: $spacing-2xl;
    width: 60%;
    position: relative;

    &__header {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: $spacing-md;
      margin-bottom: $spacing-2xl;

      h2 {
        margin-bottom: 0;
      }

      &__wrapper {
        display: flex;
        flex-direction: column;
        min-width: $card-width;
        max-width: calc($card-width * 2 + $spacing-xl);
        flex: 1;
        gap: $spacing-sm;
      }

      .search-field {
        box-shadow: $shadow-sm;
        width: 100%;
        aspect-ratio: 12/1;
      }
    }

    &__repos {
      display: grid;
      grid-template-columns: repeat(auto-fit, $card-width);
      gap: $spacing-xl;
      justify-content: center;
      flex-shrink: 1;

      &--empty {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
      }
    }

    &__footer {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: $spacing-lg;
      margin-bottom: $spacing-lg;
    }
  }
}

.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba($color-surface, 0.7);
  border-radius: $border-radius-lg;

  display: flex;
  justify-content: center;
  align-items: center;

  /* HTML: <div class="loader"></div> */
  .loader {
    height: 30px;
    aspect-ratio: 2.5;
    --_g: no-repeat radial-gradient(farthest-side, #000 90%, #0000);
    background: var(--_g), var(--_g), var(--_g), var(--_g);
    background-size: 20% 50%;
    animation: l43 1s infinite linear;
  }

  @keyframes l43 {
    0% {
      background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%
    }

    16.67% {
      background-position: calc(0*100%/3) 0, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%
    }

    33.33% {
      background-position: calc(0*100%/3) 100%, calc(1*100%/3) 0, calc(2*100%/3) 50%, calc(3*100%/3) 50%
    }

    50% {
      background-position: calc(0*100%/3) 50%, calc(1*100%/3) 100%, calc(2*100%/3) 0, calc(3*100%/3) 50%
    }

    66.67% {
      background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 100%, calc(3*100%/3) 0
    }

    83.33% {
      background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 100%
    }

    100% {
      background-position: calc(0*100%/3) 50%, calc(1*100%/3) 50%, calc(2*100%/3) 50%, calc(3*100%/3) 50%
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
