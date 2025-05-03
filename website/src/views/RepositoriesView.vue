<script setup>
import { getSome } from "@/api";
import { ref, onMounted } from 'vue';
import AppRepositoryCard from "@/components/AppRepositoryCard.vue";
import AppLoader from '@/components/AppLoader.vue';
import AppButton from "@/components/AppButton.vue";
import { extractLink } from '@/utils';

const data = ref();
const firstUrl = ref();
const prevUrl = ref();
const nextUrl = ref();
const lastUrl = ref();
const userUrl = ref();
const userKeyword = ref("uzbek");
const isLoading = ref(false);
let timeoutId;


const getPage = () => {
  if(userUrl.value == undefined){
    return 1;
  }

  const url = new URL(userUrl.value);
  return url.search.split("page=")[1];
}

const onInput = () => {
  clearTimeout(timeoutId);

  if(userKeyword.value.length < 3){
    return;
  }
  timeoutId = setTimeout(()=>{
    userUrl.value = undefined;
    refresh();
  }, 1000);
}

const refresh = async () => {
  isLoading.value = true;
  const response = await getSome(userUrl.value, userKeyword.value);

  if(response.link){
    const link = extractLink(response.link.split(" "));
  
    firstUrl.value = link.first;
    prevUrl.value = link.prev;
    nextUrl.value = link.next;
    lastUrl.value = link.last;
  }
  
  data.value = response.data.items;
  isLoading.value = false;
}

onMounted(()=>{
  refresh();
})
</script>

<template>
  <div class="flex flex-col gap-8 w-4/5 lg:3/5 xl:w-2/5 m-8">
    <h1 class="text-3xl">Repositories</h1>
    <!-- control panel -->
    <nav class="flex flex-col gap-3">
      <div class="flex gap-1 items-center">
        <AppButton @click="handleMove('first')" :disabled="!firstUrl" color="gray">First</AppButton>
        <AppButton @click="handleMove('prev')" :disabled="!prevUrl">Prev</AppButton>
        <p class="ml-3 mr-3 text-gray-400">{{ getPage() }}</p>
        <AppButton @click="handleMove('next')" :disabled="!nextUrl">Next</AppButton>
        <AppButton @click="handleMove('last')" :disabled="!lastUrl" color="gray">Last</AppButton>
      </div>
      <input 
        v-model="userKeyword"
        @input="onInput"
        type="text"
        placeholder="keyword"
        class="
        p-2 rounded-lg w-full md:w-2/4 border dark:bg-gray-800
        dark:border-blue-800 outline-none focus:outline-blue-700
        transition
        "
      />
    </nav>
    <!-- got data -->
    <div
      class="flex flex-col gap-3 relative rounded" 
      v-if="data"
    >
      <AppRepositoryCard 
        v-for="repo in data"
        :key="`${repo.owner.login}-${repo.name}`"
        :repo="repo"
      />
      <div
        v-if="isLoading" 
        class="w-full h-full absolute bg-gray-50 dark:bg-gray-900 opacity-35"
      />


    </div>
    <AppLoader v-if="isLoading" />
  </div>
</template>

<style scoped>
</style>
