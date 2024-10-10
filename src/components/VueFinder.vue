<template>
  <div class="vuefinder" ref="root" tabindex="0">
    <div :class="app.theme.actualValue">
      <div :class="app.fullScreen ? 'vuefinder__main__fixed' : 'vuefinder__main__relative'"
        :style="!app.fullScreen ? 'max-height: ' + maxHeight : ''" class="vuefinder__main__container"
        @mousedown="app.emitter.emit('vf-contextmenu-hide')" @touchstart="app.emitter.emit('vf-contextmenu-hide')">
        <template v-if="!simple">
          <Toolbar />
        </template>
        <template v-if="showPath">
          <Breadcrumb />
        </template>
        <div class="vuefinder__main__content">
          <TreeView />
          <Explorer />
        </div>
        <template v-if="!simple">
          <Statusbar />
        </template>
      </div>

      <Transition name="fade">
        <Component v-if="app.modal.visible" :is="app.modal.type" />
      </Transition>

      <ContextMenu />
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, provide, ref } from 'vue';
import ServiceContainer from "../ServiceContainer.js";
import { useHotkeyActions } from "../composables/useHotkeyActions.js";

import Toolbar from '../components/Toolbar.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Explorer from '../components/Explorer.vue';
import ContextMenu from '../components/ContextMenu.vue';
import Statusbar from '../components/Statusbar.vue';
import TreeView from '../components/TreeView.vue';


const emit = defineEmits(['select', 'openFile', 'fileDragEnd']);

const props = defineProps({
  id: {
    type: String,
    default: 'vf'
  },
  request: {
    type: [String, Object],
    required: true,
  },
  persist: {
    type: Boolean,
    default: false,
  },
  path: {
    type: String,
    default: '',
  },
  features: {
    type: [Array, Boolean],
    default: true,
  },
  debug: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'system',
  },
  locale: {
    type: String,
    default: null
  },
  maxHeight: {
    type: String,
    default: '600px'
  },
  minHeight: {
    type: String,
    default: '300px'
  },
  maxFileSize: {
    type: String,
    default: '10mb'
  },
  fullScreen: {
    type: Boolean,
    default: false
  },
  showTreeView: {
    type: Boolean,
    default: false
  },
  pinnedFolders: {
    type: Array,
    default: []
  },
  showThumbnails: {
    type: Boolean,
    default: true
  },
  simple: {
    type: Boolean,
    default: true,
  },
  showPath: {
    type: Boolean,
    default: true,
  },
  selectButton: {
    type: Object,
    default(rawProps) {
      return {
        active: false,
        multiple: false,
        click: (items) => {
          // items is an array of selected items
          // 
        },
        ...rawProps,
      }
    },
  },
});

// the object is passed to all components as props
const app = ServiceContainer(props, inject('VueFinderOptions'));
provide('ServiceContainer', app);
const { setStore } = app.storage;

//  Define root element
const root = ref(null);
app.root = root;

// Define dragSelect object
const ds = app.dragSelect;

useHotkeyActions(app);

const updateItems = (data) => {
  data.files = data.files.map(item => {
    item.onlyRead = app.onlyReadFileStore.hasItem(item.path);
    return item;
  });
  Object.assign(app.fs.data, data);
  ds.clearSelection();
  ds.refreshSelection();
};

/** @type {AbortController} */
let controller;
app.emitter.on('vf-fetch-abort', () => {
  controller.abort();
  app.fs.loading = false;
});

// Fetch data
app.emitter.on('vf-fetch', ({ params, body = null, onSuccess = null, onError = null, noCloseModal = false }) => {
  if (['index', 'search'].includes(params.q)) {
    if (controller) {
      controller.abort();
    }
    app.fs.loading = true;
  }

  controller = new AbortController();
  const signal = controller.signal;
  app.requester.send({
    url: '',
    method: params.m || 'get',
    params,
    body,
    abortSignal: signal,
  }).then(data => {
    app.fs.adapter = data.adapter;
    if (app.persist) {
      app.fs.path = data.dirname;
      setStore('path', app.fs.path);
    }

    if (['index', 'search'].includes(params.q)) {
      app.fs.loading = false;
    }
    if (!noCloseModal) {
      app.modal.close();
    }
    updateItems(data);
    if (onSuccess) {
      onSuccess(data);
    }
  }).catch((e) => {
    console.error(e)
    if (onError) {
      onError(e);
    }
  });
});

const initMinHeight = () => {
  if (props.minHeight == "0" || !root.value) {
    return;
  }
  root.value.querySelectorAll(".vuefinder__main__container")[0].style.height = props.minHeight;
};

const initGlobalEvents = () => {
  app.emitter.on("openfile", (item) => {
    emit('openFile', item);
  })

  app.emitter.on("file-drag-end", (e) => {
    emit('fileDragEnd', e);
  })
};

// fetch initial data
onMounted(() => {
  // app.fs.adapter can be null at first, until we get the adapter list it will be the first one from response
  // later we can set default adapter from a prop value

  // if there is a path coming from the prop, we should use it.
  let pathExists = {};

  if (app.fs.path.includes("://")) {
    pathExists = {
      adapter: app.fs.path.split("://")[0],
      path: app.fs.path
    };
  }

  app.emitter.emit('vf-fetch', { params: { q: 'index', adapter: app.fs.adapter, ...pathExists } });

  // Emit select event
  ds.onSelect((items) => {
    emit('select', items);
  });

  initMinHeight();

  initGlobalEvents();
});

defineExpose({
  app: app,
})

</script>
