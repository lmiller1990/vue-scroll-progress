<template>
  <div id="app">

    <Progress />

    <div
      v-for="item in items.slice(0, 10)"
      :key="item"
      class="item"
    >
      {{ item }}
    </div>

    <div id="progress-marker-start"></div>

    <div
      v-for="item in items.slice(10, 80)"
      :key="item"
      class="item"
    >
      {{ item }}
    </div>

    <div id="progress-marker-end"></div>

    <div
      v-for="item in items.slice(80)"
      :key="item"
      class="item"
    >
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Progress from './components/Progress.vue'

interface IData {
  items: string[]
}

export default Vue.extend({
  name: 'app',

  components: {
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

#progress-marker-start, #progress-marker-end {
  border: 1px solid;
}

.item {
  margin: 5px;
  padding: 5px;
}
</style>
