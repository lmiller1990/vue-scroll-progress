<template>
  <div id="app">
    <Progress />
    <div
      v-for="item in items2"
      :key="item"
    >
      {{ item }}
    </div>
    <ProgressStartMarker />

    <div
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </div>
    <ProgressEndMarker />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ProgressStartMarker from './components/ProgressStartMarker.vue'
import ProgressEndMarker from './components/ProgressEndMarker.vue'
import Progress from './components/Progress.vue'

interface IData {
  items: string[]
  items2: string[]
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
      items2: [],
    }
  },

  created() {
    for (let i = 0; i < 100; i++) {
      this.items.push(`Item ${i}`)
    }

    for (let i = 0; i < 100; i++) {
      this.items2.push(`Item ${i + 100}`)
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
