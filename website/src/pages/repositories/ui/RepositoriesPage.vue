<template>
  <main>
    <div class="main-content">
      <!-- navigation -->
      <div class="main-content__header">
        <div class="main-content__header__wrapper">
          <h2>Awesome Floss</h2>
          <AppTextField v-model="query" placeholder="Search" :size="Size.BIG" class="search-field"
            @input="handleSearchInput" />
        </div>
      </div>

      <div v-if="isLoading" class="main-content__repos">
        <RepositoryCardSkeleton v-for="n in 10" :key="n"/>
      </div>

      <!-- main content -->
      <div v-else-if="items && items.length" class="main-content__repos">
        <RepositoryCard 
          v-for="item in items"
          :key="item.id"
          :id="item.id"
          :author="item.owner.login"
          :author-url="item.owner.html_url"
          :repo-url="item.html_url" 
          :name="item.name"
          :description="item.description"
          :stars="item.stargazers_count"
          :img="item.owner.avatar_url"
          :language="item.language"
          :updated-at="item.updated_at"
          :is-saved="bookmarkService.bookmarkedSet.value.has(item.id)"
          @bookmark="handleBookmark"
        />
      </div>

      <div class="main-content__footer">
        <AppPagination 
          v-if="shouldShowPagination"
          v-model="currentPage"
          :total-records="totalCount"
          :rows="PAGE_SIZE"
          @page-change="handlePageChange"
          @same-page-clicked="handleSamePageClick"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import RepositoryCard from '@/entities/repository/ui/RepositoryCard.vue';
import AppTextField from '@/shared/ui/text-field';
import { computed, onMounted, ref } from 'vue';
import { Size } from '@/shared/model/ui';
import { fetchRepositores } from '../api';
import type { GithubRepo } from '@/entities/repository/model/GithubRepo';
import { debounce, scrollToTop } from '@/shared/lib/utils';
import AppPagination from '@/shared/ui/pagination';
import { useBookmarkService } from '@/entities/repository/lib/useBookmarkService';
import RepositoryCardSkeleton from '@/entities/repository/ui/RepositoryCardSkeleton.vue';

const bookmarkService = useBookmarkService();
const items = ref<GithubRepo[]>([])

const PAGE_SIZE = 30;

const query = ref('uzbek')
const currentPage = ref(1);
const totalCount = ref(0);
const isLoading = ref(false);

const getRepositories = async () => {
  try {
    isLoading.value = true;

    if(!query.value) return;

    // await new Promise(r => setTimeout(r, 60000))
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
  if(!query.value) return;

  currentPage.value = 1;
  totalCount.value = 0;
  getRepositories();
}, 400)

const shouldShowPagination = computed(() => {
  return items.value.length && totalCount.value != items.value.length
})

const handleBookmark = (id: number) => {
  const repositoryIndex = items.value.findIndex((repo) => repo.id == id)
  if(repositoryIndex < 0) return;

  bookmarkService.toggleBookmark(items.value[repositoryIndex])
}

onMounted(() => {
  getRepositories();
})
</script>


<style scoped lang="scss">
@use 'sass:color';

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
        flex: 1;
        gap: $spacing-sm;
      }

      .search-field {
        box-shadow: $shadow-sm;
        min-width: 240px;
        max-width: 640px;
        aspect-ratio: 12/1;
      }
    }

    &__repos {
      box-sizing: border-box;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(270px, 4fr));
      gap: $spacing-xl;
      justify-content: center;

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
</style>
