<template>
    <svg
      class="progress-ring"
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

import { getScrollPercentage } from './progress'

interface IMarkers {
  startMarker: HTMLElement | null
  endMarker: HTMLElement | null
  progressCircle: SVGCircleElement | null
}

interface IData extends IMarkers {
  scrollEvent: ((this: Window, ev: Event) => void) | null
}

export default Vue.extend({
  name: 'Progress',
  created() {
    window.addEventListener('scroll', this.listener)
    this.scrollEvent = this.listener
  },

  destroyed() {
    if (!this.scrollEvent) {
      return
    }
    window.removeEventListener('scroll', this.scrollEvent)
  },

  data(): IData {
    return {
      scrollEvent: null,
      startMarker: null,
      endMarker: null,
      progressCircle: null,
    }
  },

  methods: {
    listener() {
      if (!this.startMarker || !this.endMarker || !this.progressCircle) {
        const markers = this.getMarkers()
        if (!markers) {
          return
        }
        this.startMarker = markers.startMarker
        this.endMarker = markers.endMarker
        this.progressCircle = markers.progressCircle
      }

      if (!this.startMarker || !this.endMarker || !this.progressCircle) {
        return
      }

      const radius = this.progressCircle.r.baseVal.value
      const circumference = radius * 2 * Math.PI
      this.progressCircle.style.strokeDasharray = `${circumference} ${circumference}`
      this.progressCircle.style.strokeDashoffset = `${circumference}`

      requestAnimationFrame(() => {
        getScrollPercentage(this.startMarker!, this.endMarker!, this.progressCircle!, circumference)
      })
    },

    getMarkers(): IMarkers | null {
      const endMarker = document.querySelector<HTMLElement>('#progress-marker')
      const startMarker = document.querySelector<HTMLElement>('#start-marker')
      const progressCircle = document.querySelector<SVGCircleElement>('circle')

      if (startMarker && endMarker && progressCircle) {
        return {
          startMarker,
          endMarker,
          progressCircle,
        }
      }

      return null
    },
  },
})
</script>

<style scoped>
#progress {
  position: fixed;
  right: 50px;
  top: 10px;
}

.progress-ring {
  position: fixed;
  right: 50px;
  transform: rotate(-90deg);
}
</style>