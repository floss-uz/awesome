<template>
  <AppCardBase>
    <div class="repository-card">
      <div class="repository-card__header">
        <a :href="authorUrl">
          <AppAvatar :src="img" :alt="`img-${author}`" />
        </a>
        <!-- <AppButton :severity="Severity.SECONDARY" label="Save" outlined small class="save-btn">
          <IconBookmark />
          Save
        </AppButton> -->
      </div>

      <div class="repository-card__content">
        <div class="repository-card__subheader">
          <a :href="authorUrl" target="_blank">
            <b>{{ truncateText(author.toLocaleLowerCase(), 20) }}</b>
          </a>
          <small title="last updated">{{ timeAgo(updatedAt) }}</small>
        </div>
        <h2>{{ name }}</h2>
        <small>{{ truncateText(description, 180) }}</small>
      </div>

      <div class="repository-card__footer">
        <div class="repository-card__bottom-info">
          <b>{{ stars }} stars</b>
          <small v-if="language">{{ language }}</small>
        </div>
        <a :href="repoUrl" target="_blank">
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
// import IconBookmark from '@/shared/ui/icons/IconBookmark.vue';
// import { Severity } from '@/shared/model/ui';

interface Props {
  author: string;
  authorUrl: string;
  repoUrl: string;
  name: string;
  description?: string | null;
  img: string;
  stars: number;
  language?: string | null;
  updatedAt: string;
}

withDefaults(defineProps<Props>(), {
  description: ''
})

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
</script>

<style scoped lang="scss">
.repository-card {
  width: 280px;
  aspect-ratio: 4/5;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: $spacing-lg;

  h2 {
    margin-bottom: 0;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .save-btn {
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