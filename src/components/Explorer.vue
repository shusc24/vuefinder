<template>
  <div class="vuefinder__explorer__container">
    <div v-if="app.view === 'list' || searchQuery.length" class="vuefinder__explorer__header">
      <div @click="sortBy('basename')"
        class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button">
        {{ t('Name') }}
        <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'basename'" />
      </div>
      <div v-if="!searchQuery.length" @click="sortBy('file_size')"
        class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button">
        {{ t('Size') }}
        <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'file_size'" />
      </div>
      <div v-if="!searchQuery.length && false" @click="sortBy('last_modified')"
        class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button">
        {{ t('Date') }}
        <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'last_modified'" />
      </div>
      <div v-if="searchQuery.length && false" @click="sortBy('path')"
        class="vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button">
        {{ t('Filepath') }}
        <SortIcon :direction="sort.order" v-show="sort.active && sort.column === 'path'" />
      </div>
    </div>

    <div class="vuefinder__explorer__drag-item">
      <DragItem ref="dragImage" :count="ds.getCount()" />
    </div>

    <div :ref="ds.scrollBarContainer" class="vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container"
      :class="[{ 'grid-view': app.view === 'grid' }, { 'search-active': searchQuery.length }]">
      <div :ref="ds.scrollBar" class="vuefinder__explorer__scrollbar"></div>
    </div>

    <div :ref="ds.area" class="vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area"
      @contextmenu.self.prevent="app.emitter.emit('vf-contextmenu-show', { event: $event, items: ds.getSelected() })">

      <!-- Search View -->
      <Item v-if="searchQuery.length" v-for="(item, index) in getItems()" :item="item" :index="index"
        :dragImage="dragImage" class="vf-item vf-item-list">
        <div class="vuefinder__explorer__item-list-content">
          <div class="vuefinder__explorer__item-list-name">
            <ItemIcon :type="item.type" :small="app.compactListView" />
            <span class="vuefinder__explorer__item-name">{{ item.basename }}</span>
          </div>
          <div class="vuefinder__explorer__item-path">{{ item.path }}</div>
        </div>
      </Item>
      <!-- List View -->
      <Item v-if="app.view === 'list' && !searchQuery.length" v-for="(item, index) in getItems()" :item="item"
        :index="index" :dragImage="dragImage" class="vf-item vf-item-list"
        :draggable="!item.onlyRead ? 'true' : 'false'" :key="item.path">
        <div class="vuefinder__explorer__item-list-content">
          <div class="vuefinder__explorer__item-list-name">
            <ItemIcon :type="item.type" :small="app.compactListView" />
            <span style="color: red;" v-if="item.type !== 'dir' && item.hasReader">[打开]</span>
            <span class="vuefinder__explorer__item-name" v-if="item.onlyRead"> [读]{{ item.basename }} </span>
            <span class="vuefinder__explorer__item-name" v-if="!item.onlyRead">{{ item.basename }}</span>
          </div>
          <div class="vuefinder__explorer__item-size">{{ item.file_size ? app.filesize(item.file_size) : '' }}</div>
          <!-- <div class="vuefinder__explorer__item-date">
            {{ datetimestring(item.last_modified) }}
          </div> -->
        </div>
      </Item>
      <!-- Grid View -->
      <Item v-if="app.view === 'grid' && !searchQuery.length" v-for="(item, index) in getItems(false)" :item="item"
        :index="index" :dragImage="dragImage" class="vf-item vf-item-grid" :disabled="!item.canopt"
        :draggable="(!item.onlyRead && item.canopt) ? 'true' : 'false'">
        <div>
          <div class="vuefinder__explorer__item-grid-content flex" style="justify-content: center;align-items: center;">
            <img src="data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
              class="vuefinder__explorer__item-thumbnail lazy"
              v-if="(item.mime_type ?? '').startsWith('image') && app.showThumbnails"
              :data-src="app.requester.getPreviewUrl(app.fs.adapter, item)" :alt="item.basename" :key="item.path">
            <ItemIcon :type="item.type" v-else />


            <span class="vuefinder__explorer__item-hasReader " v-if="item.type !== 'dir' && item.hasReader"
              style="position: absolute;font-size: 10px;top: 0px;right: 0;font-weight: bold;color: red">
              打开过
            </span>

            <div class="vuefinder__explorer__item-extension"
              style="position: relative;font-size: 16px;top: 10px;font-weight: bold;text-align: left;"
              v-if="item.type !== 'dir'">
              {{ ext(item.extension) }}
            </div>
          </div>

          <span class="vuefinder__explorer__item-title break-all" v-if="item.onlyRead">{{ title_shorten('【只读】' +
            item.basename) }} </span>
          <span class="vuefinder__explorer__item-title break-all" v-else>{{ title_shorten(item.basename) }}</span>
          <!-- 显示工艺图 需要被选中-->
          <div v-if="showProcess" @click.stop="handleAddProcessImageClick(item)"
            class="vuefinder__explorer__item-add-process-image vuefinder__btn mb-[5px]"
            style="margin-left: 10px;margin-right: 10px;">
            加工艺图
          </div>
        </div>
      </Item>
    </div>

    <Toast />
  </div>
</template>

<script setup>
import { inject, onBeforeUnmount, onMounted, onUpdated, reactive, ref } from 'vue';
import datetimestring from '../utils/datetimestring.js';
import title_shorten from "../utils/title_shorten.js";
import Toast from './Toast.vue';
import LazyLoad from 'vanilla-lazyload';
import SortIcon from "./SortIcon.vue";
import ItemIcon from "./ItemIcon.vue";
import DragItem from "./DragItem.vue";
import Item from "./Item.vue";

const emit = defineEmits(["onAddProcessImageClick"]);

const app = inject('ServiceContainer');
const { t } = app.i18n;

const ext = (item) => item?.substring(0, 4)
const dragImage = ref(null);

const searchQuery = ref('');
const ds = app.dragSelect;

const props = defineProps({
  showProcess: {
    type: Boolean,
    default: false,
  },
});


/** @type {import('vanilla-lazyload').ILazyLoadInstance} */
let vfLazyLoad

app.emitter.on('vf-fullscreen-toggle', () => {
  ds.area.value.style.height = null;
});

app.emitter.on('vf-search-query', ({ newQuery }) => {
  searchQuery.value = newQuery;

  if (newQuery) {
    app.emitter.emit('vf-fetch', {
      params: {
        q: 'search',
        adapter: app.fs.adapter,
        path: app.fs.data.dirname,
        filter: newQuery
      },
      onSuccess: (data) => {
        if (!data.files.length) {
          app.emitter.emit('vf-toast-push', { label: t('No search result found.') });
        }
      }
    });
  } else {
    app.emitter.emit('vf-fetch', { params: { q: 'index', adapter: app.fs.adapter, path: app.fs.data.dirname } });
  }
});

const sort = reactive({ active: false, column: '', order: '' });

const getItems = (sorted = true) => {
  let files = [...app.fs.data.files],
    column = sort.column,
    order = sort.order === 'asc' ? 1 : -1;

  if (!sorted) {
    return files;
  }

  const compare = (a, b) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  if (sort.active) {
    files = files.slice().sort((a, b) => compare(a[column], b[column]) * order);
  }

  return files
};

const sortBy = (column) => {
  if (sort.active && sort.column === column) {
    sort.active = sort.order === 'asc'
    sort.column = column
    sort.order = 'desc'
  } else {
    sort.active = true
    sort.column = column
    sort.order = 'asc'
  }
};

const handleAddProcessImageClick = (item) => {
  emit("onAddProcessImageClick", item);
};

onMounted(() => {
  vfLazyLoad = new LazyLoad(ds.area.value);
});

onUpdated(() => {
  vfLazyLoad.update();
});

onBeforeUnmount(() => {
  vfLazyLoad.destroy();
});

</script>
