<script setup>
import StarIcon from '@/components/icons/StarIcon.vue';
import CopyIcon from '@/components/icons/CopyIcon.vue';
import CheckIcon from '@/components/icons/CheckIcon.vue';

import { ref, computed } from 'vue';

const props = defineProps({
  repo: {
    type: Object,
    required: true
  }
});

const isExpaded = ref(false);
const el = ref();

const ownerToolTip = ref(false);
const repoToolTip = ref(false);

const isExpandable = computed(() => {
  if (isExpaded.value) {
    return false;
  }

  return el.value.scrollHeight > el.value.clientHeight;
});

const toggleExpand = () => {
  isExpaded.value = !isExpaded.value;
  el.value.style.maxHeight = isExpaded.value ? 'none' : '2.5rem';
}

const copyRepo = () => {
  repoToolTip.value = true;
  const stringToCopy = `[${props.repo.name}](${props.repo.html_url}) - smth`;
  navigator.clipboard.writeText(stringToCopy);

  setTimeout(() => {
    repoToolTip.value = false;
  }, 3000);
}

const copyOwner = () => {
  ownerToolTip.value = true;
  const start = props.repo.owner.type == "User" ? '[@' : '[';
  const stringToCopy = `${start}${props.repo.owner.login}](${props.repo.owner.html_url})`;

  navigator.clipboard.writeText(stringToCopy);

  setTimeout(() => {
    ownerToolTip.value = false;
  }, 3000);
}
</script>

<template>
  <div class="
    flex gap-3 items-start border rounded-lg px-5 relative dark:hover:border-gray-700
    dark:border-gray-800 light:hover:border-gray-500 py-8
    break-all
    " @click="toggleExpand">
    <!-- avatar -->
    <a :href="props.repo.owner.html_url" target="_blank" class="
        rounded-full ring-2 ring-white dark:ring-gray-800 hover:ring-blue-500
        transition overflow-hidden shrink-0 size-12 z-10
        ">
      <img :src="props.repo.owner.avatar_url" :alt="`${props.repo.owner.login}'s avatar'`"
        class="w-full h-full object-cover">
    </a>

    <!-- Stars -->
    <span class="
      absolute rounded-lg bg-blue-100 z-30 flex items-center gap-1 px-2 top-5 left-4
      dark:text-gray-800 dark:bg-blue-400 hover:cursor-default h-5
      ">
      <StarIcon class="size-4" />
      <small>{{ props.repo.stargazers_count }}</small>
    </span>

    <div class="flex flex-col gap-1 w-4/5 text-wrap break-words">
      <!-- Name of repo -->
      <a :href="props.repo.html_url" target="_blank" class="md:text-xl text-md hover:underline text-wrap">
        {{ props.repo.name }}
      </a>
      <!-- Description -->
      <small class="text-gray-800 dark:text-gray-400 text-wrap relative" :class="{
        'max-h-10 overflow-hidden': !isExpaded
      }" ref="el">
        {{ props.repo.description }}
        <div v-if="el && isExpandable" class="w-full h-2/4 absolute bottom-0 bg-gradient-to-t
          from-white via-gray-50/50 to-transparent
          dark:from-gray-900 dark:via-gray-850/50
          "></div>
      </small>
    </div>

    <div 
      class="copy aspect-square w-14 md:w-10 rounded-lg flex items-center justify-center"
      @click.stop="copyRepo"
      title="Copy repository"
    >
      <CheckIcon v-if="repoToolTip" />
      <CopyIcon v-else />
    </div>

    <div 
      class="copy-red bg-red-500 aspect-square w-14 md:w-10 rounded-lg flex items-center justify-center"
      @click.stop="copyOwner"
      title="Copy owner"
    >
      <CheckIcon v-if="ownerToolTip" />
      <CopyIcon v-else />
    </div>

  </div>
</template>

<style scoped>
.copy,
.copy-red {
  align-self: center;
}

.copy {
  background-color: rgba(59, 130, 246, 0.5);
  color: rgb(59, 130, 246);
}

.copy:hover {
  color: rgb(101, 160, 253);
}

.copy-red {
  background-color: rgba(239, 68, 68, 0.5);
  color: rgb(239, 68, 68);
}

.copy-red:hover {
  color: rgb(242, 130, 130);
}
</style>