<template>
  <div id="progress">
    {{ progress }}%
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { getScrollPercentage } from './progress'

interface IData {
  marker: HTMLElement | null
  progress: string
  scrollEvent: ((this: Window, ev: Event) => void) | null
}

export default Vue.extend({
  name: 'Progress',
  created() {
    window.addEventListener('scroll', this.listener)
    this.scrollEvent = this.listener
  },

  data(): IData {
    return {
      progress: '0',
      scrollEvent: null,
      marker: null,
    }
  },

  methods: {
    listener() {
      if (!this.marker) {
        const marker = this.getMarker()
        if (!marker) {
          return
        }
        this.marker = marker
      }

      this.progress = getScrollPercentage(this.marker)
    },

    getMarker(): HTMLElement | null {
      const marker = document.querySelector<HTMLElement>('#progress-marker')
      if (marker) {
        return marker
      }

      return null
    },
  },

  mounted() {
    const marker = this.getMarker()
    if (marker) {
      this.marker = marker
    }
  },

  destroyed() {
    if (!this.scrollEvent) {
      return
    }
    window.removeEventListener('scroll', this.scrollEvent)
  },
})
</script>

<style scoped>
#progress {
  position: fixed;
  right: 50px;
  top: 10px;
}
</style>