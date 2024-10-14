import { reactive, watch } from "vue";

export default function useReadOnlyFile() {
  const key = "_readOnlyFile";

  const storedValues = localStorage.getItem(key);

  const storage = reactive(JSON.parse(storedValues ?? '{"items": []}'));

  const appendItems = (items) => {
    for (const item of items) {
      // 如果条目超过了最大值，则删除第一个条目
      if (storage.items.length >= 1000) {
        storage.items.shift();
      }

      if (!hasItem(item.path)) {
        storage.items.push(item);
      } else {
        deleteItem(item.path);
      }
    }
  };

  const getByLocalStorage = () => {
    return JSON.parse(localStorage.getItem(key) || '{"items": []}');
  };

  const save = () => {
    localStorage.setItem(key, JSON.stringify(storage));
  };

  const deleteItem = (path) => {
    // index
    const index = storage.items.findIndex((i) => i.path === path);
    if (index !== -1) {
      storage.items.splice(index, 1);
    }
  };

  const getItems = () => {
    return storage.items;
  };

  const hasItem = (path) => {
    if (path.indexOf("自动下单") !== -1) {
      return true;
    }

    let findIndex = storage.items.findIndex((i) => {
      return path.indexOf(i.path) === 0;
    });
    return findIndex !== -1;
  };

  return {
    storedValues,
    appendItems,
    save,
    deleteItem,
    getByLocalStorage,
    getItems,
    hasItem,
  };
}
