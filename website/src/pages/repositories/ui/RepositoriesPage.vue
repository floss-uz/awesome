<template>
  <main>
    <div class="main-content">
      <!-- navigation -->
      <div class="main-content__header">
        <h1>Awesome Floss</h1>
        <AppTextField v-model="query" placeholder="Search" :size="Size.BIG"/>
      </div>
      
      <!-- main content -->
      <div v-if="items && items.length" class="repos">
        <RepositoryCard
          v-for="item in items"
          :key="item.id"
          :author="item.owner.login"
          :author-url="item.owner.html_url"
          :repo-url="item.html_url"
          :name="item.name"
          :description="item.description"
          :stars="item.stargazers_count"
          :img="item.owner.avatar_url"
          :language="item.language"
          :updated-at="item.updated_at"
        />
      </div>
      <div v-else class="repos--empty">
        No items :/
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

const items = ref<GithubRepo[]>([])

const query = ref('uzbek')

const getRepositories = async () => {
  try {
    const response = await fetchRepositores(query.value);

    if(response){
      items.value = response?.items;
    }
  } catch(error) {
    console.error(`[Repos/Fetch]: ${error}`)
  }
}

onMounted(() => {
  getRepositories();
})
</script>


<style scoped lang="scss">
main {
  display: flex;
  justify-content: center;
  
  .main-content {
    margin-top: $spacing-xl;
    width: 70%;

    &__header {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: $spacing-md;
      margin-bottom: calc($spacing-md * 3);

      h1 {
        margin-bottom: 0;
      }
    }
  }

  .repos {
    display: flex;
    flex-wrap: wrap;
    // display: grid;
    // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: $spacing-md;
    margin-top: $spacing-md;
  }
}
</style>
