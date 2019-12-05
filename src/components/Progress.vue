<template>
  <svg
    class="progress"
    width="120"
    height="120"
  >
    <circle
      stroke-width="0"
      stroke="red"
      r="50"
      cx="60"
      cy="60"
      fill="transparent"
    />
  </svg>
</template>

<script lang="ts">
import Vue from 'vue'

import { getScrollPercentage, updateCircle } from './progress'

interface IData {
  percent: number
  scrollEvent: ((this: Window, ev: Event) => void) | null
}

export default Vue.extend({
  name: 'Progress',  
  
  data(): IData {
    return {
      percent: 0,
      scrollEvent: null,
    }
  },

  mounted() {
    const circle = this.$el.querySelector<SVGCircleElement>("circle")
    const progressStartMarker = document.querySelector<HTMLElement>('#progress-marker-start')
    const progressEndMarker = document.querySelector<HTMLElement>('#progress-marker-end')

    if (!progressStartMarker || !progressEndMarker || !circle) {
      throw Error('Progress markers not found')
    }

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const percent = getScrollPercentage(progressStartMarker, progressEndMarker)
        updateCircle(circle, percent)
      })
    })
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
svg {
  position: fixed;
  right: 25px;
}
</style>