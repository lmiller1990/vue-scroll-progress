<template>
  <div id="app">
    <Progress />
    <div
      v-for="item in items2"
      :key="item"
    >
      {{ item }}
    </div>
    <ProgressStart />

    <div
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </div>
    <ProgressMarker />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ProgressMarker from './components/ProgressMarker.vue'
import ProgressStart from './components/ProgressStart.vue'
import Progress from './components/Progress.vue'

interface IData {
  items: string[]
  items2: string[]
}

export default Vue.extend({
  name: 'app',

  components: {
    ProgressStart,
    ProgressMarker,
    Progress,
  },

  data(): IData {
    return {
      items: [],
      items2: [],
    }
  },

  created() {
    for (let i = 0; i < 100; i++) {
      this.items.push(`Item ${i}`)
    }

    for (let i = 0; i < 100; i++) {
      this.items2.push(`Item ${i+100}`)
    }
  },
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
