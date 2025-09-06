<template>
  <AppCardBase height="400px">
    <div class="repository-card">
      <div class="repository-card__header">
        <a :href="authorUrl">
          <AppAvatar :src="img" :alt="`img-${author}`" />
        </a>
        <AppButton 
          :severity="isSaved ? Severity.SUCCESS : Severity.SECONDARY"
          :size="Size.SMALL"
          label="Save"
          small
          class="save-btn"
          icon-only
          :outlined="!isSaved"
          :title="isSaved ? 'Saved' : 'Save'"
          @click="emit('bookmark', id)"
        >
          <IconBookmarkChecked v-if="isSaved"></IconBookmarkChecked>
          <IconBookmark v-else />
        </AppButton>
      </div>

      <div class="repository-card__content">
        <div class="repository-card__subheader">
          <a :href="authorUrl" target="_blank">
            <b>{{ truncateText(author.toLocaleLowerCase(), 12) }}</b>
          </a>
          <small title="last updated">{{ timeAgo(updatedAt) }}</small>
        </div>
        <a :href="repoUrl" target="_blank">
          <h2>{{ truncateText(name, 20) }}</h2>
        </a>
        <small>{{ truncateText(description, 120) }}</small>
      </div>

      <div class="repository-card__footer">
        <div class="repository-card__bottom-info">
          <span>
            <b>{{ truncateStars(stars) }}</b>
            <small> stars</small>
          </span>
          <small v-if="language">{{ language }}</small>
          <small v-else>No language</small>
        </div>
        <a v-if="!hideActionButton" :href="repoUrl" target="_blank">
          <AppButton>Explore</AppButton>
        </a>
      </div>
    </div>
  </AppCardBase>
</template>

<script setup lang="ts">
import AppCardBase from '@/shared/ui/card/AppCardBase.vue';
import AppAvatar from '@/shared/ui/avatar';
import AppButton from '@/shared/ui/button';
import IconBookmark from '@/shared/ui/icons/IconBookmark.vue';
import IconBookmarkChecked from '@/shared/ui/icons/IconBookmarkChecked.vue';
import { Severity } from '@/shared/model/ui';
import { Size } from '@/shared/model/ui';

interface Props {
  id: number;
  author: string;
  authorUrl: string;
  repoUrl: string;
  name: string;
  description?: string | null;
  img: string;
  stars: number;
  language?: string | null;
  updatedAt: string;
  hideActionButton?: boolean;
  isSaved?: boolean;
}

withDefaults(defineProps<Props>(), {
  description: '',
  hideActionButton: false,
  isSaved: true
})

const emit = defineEmits(['bookmark'])


const timeAgo = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  if (days < 30) return `${days} day${days !== 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${years} year${years !== 1 ? "s" : ""} ago`;
}

const truncateText = (text: string | null, maxLength: number): string => {
  if(!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength).trimEnd() + '...';
}

const truncateStars = (stars: number): string => {
  if(stars < 1000) return stars.toString();
  if(stars < 1000000) return `${Math.round(stars / 100) / 10}k`
  return `${Math.round(stars / 100000) / 10}m`
}
</script>

<style scoped lang="scss">
.repository-card {
  height: 100%;

  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: $spacing-lg;

  &:hover .save-btn {
    opacity: 1;
    transition: opacity $transition-base;
  }

  h2 {
    margin-bottom: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .save-btn {
      opacity: 0;
      display: flex;
      align-items: center;
      gap: $spacing-xs;
    }
  }

  &__subheader {
    display: flex;
    align-items: center;
    gap: $spacing-xs;

    b {
      text-transform: capitalize;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-sm;
    flex-grow: 1;

    p {
      color: $color-text-muted;
    }
  }

  &__footer {
    border-top: solid $border-width $color-border;
    justify-self: flex-end;
    height: 20%;

    padding-top: $spacing-xs;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__bottom-info {
    display: flex;
    flex-direction: column;
  }

}
</style>