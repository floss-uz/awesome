import { useStorage } from "@/shared/lib/useStorage";
import { REPOSITORY_BOOKMARK_KEY } from "../config";
import type { GithubRepo } from "../model/GithubRepo";
import { Result } from "@/shared/model/flow";
import { ref } from "vue";

export function useBookmarkService() {
  const storage = useStorage(REPOSITORY_BOOKMARK_KEY);
  
  // performance purpose set
  const initSet = (): Set<number> => {
    const currentValue = storage.read()
    if(!currentValue) return new Set();
    return new Set(currentValue.map((item: GithubRepo) => item.id))
  }

  const bookmarkedSet = ref(initSet());

  // public
  function isBookmarked(id: number) {
    return bookmarkedSet.value.has(id);
  }

  function toggleBookmark(repository: GithubRepo) {
    if(isBookmarked(repository.id)) {
      removeRepository(repository);
      return;
    }
    addRepository(repository);
  }

  function addRepository(repository: GithubRepo) {
    const result = storage.append(repository);

    if(result == Result.OK) {
      bookmarkedSet.value.add(repository.id);
    }
  }

  function removeRepository(repository: GithubRepo) {
    const result = storage.removeBy('id', repository.id);

    if(result == Result.OK) {
      bookmarkedSet.value.delete(repository.id);
    }
  }

  return { 
    bookmarkedSet,
    isBookmarked,
    addRepository,
    removeRepository,
    toggleBookmark
  }
}