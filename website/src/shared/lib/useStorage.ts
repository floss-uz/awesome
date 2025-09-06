import { Result } from "../model/flow";

// Used to safely write and read data to local storage 
export function useStorage(storageKey: string) {
  function write<T>(data: T) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  function read() {
    const storageValue = localStorage.getItem(storageKey);

    if(typeof storageValue == 'string') {
      try {
        return JSON.parse(storageValue);
      } catch (error: unknown) {
        console.error('[Storage]: Could not read a value from storage. It is gonna be cleared out', error);
        localStorage.removeItem(storageKey);
        return null;
      }
    }

    return null;
  }

  function append<T>(item: T): Result {
    const currentValue = read();

    // no value
    if(!currentValue) {
      write([item]);
      return Result.OK
    };

    // value but not array
    if (!Array.isArray(currentValue)) {
      console.error('[Storage]: Appending is only allowed for arrays!');
      return Result.Error;
    }

    // normal value
    currentValue.push(item);
    write(currentValue);
    return Result.OK;
  }

  function removeBy<T>(by: string, whenValue: T): Result {
    const currentValue = read();

    // no value
    if(!currentValue || !currentValue?.length) {
      console.error('[Storage]: Nothing to remove from')
      return Result.Error;
    }

    // value but not an array
    if(!Array.isArray(currentValue)) {
      console.error('[Storage]: Removing is only allowed for arrays!');
      return Result.Error;
    }
    
    const indexToRemove = currentValue.findIndex(<E>(item: E) => {
      if (typeof item != 'object' || item === null) {
        console.warn('[Storage]: RemoveBy query works on object based arrays, got', item);
        return false;
      }

      return (item as Record<string, unknown>)[by] == whenValue;
    })

    if(indexToRemove < 0) {
      console.error('Could not find an item to remove');
      return Result.Error
    };

    currentValue.splice(indexToRemove, 1);
    write(currentValue);
    return Result.OK;
  }


  return { write, read, append, removeBy }
}