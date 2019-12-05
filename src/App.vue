<template>
  <div id="app">
    <Progress />

    <div
      v-for="item in items.slice(0, 1)"
      :key="item"
      class="item"
    >
      {{ item }}
    </div>
    <div style="margin-top: 100px; padding: 0px; margin: 0px;">Ok!!</div>
    <div
      v-for="item in items.slice(1, 32)"
      :key="item"
      class="item"
    >
      {{ item }}
    </div>

    <ProgressStartMarker />

    <div
      v-for="item in items.slice(33, 67)"
      :key="item"
      class="item"
    >
      {{ item }}
    </div>

    <ProgressEndMarker />

    <div
      v-for="item in items.slice(67)"
      :key="item"
      class="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ProgressStartMarker from './components/ProgressStartMarker.vue'
import ProgressEndMarker from './components/ProgressEndMarker.vue'
import Progress from './components/Progress.vue'

interface IData {
  items: string[]
}

export default Vue.extend({
  name: 'app',

  components: {
    ProgressStartMarker,
    ProgressEndMarker,
    Progress,
  },

  data(): IData {
    return {
      items: [],
    }
  },

  created() {
    for (let i = 0; i < 100; i++) {
      this.items.push(`Item ${i}`)
    }
  },
})
</script>

<style>
#app {
  margin: 25px;
}

body {
  margin: 0 !important;
}

.item {
  margin: 25px;
  padding: 10px;
}
</style>
