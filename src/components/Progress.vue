<template>
  <div id="progress">
    {{ progress }}%
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
  marker: HTMLElement | null
  progress: string
  scrollEvent: ((this: Window, ev: Event) => void) | null
}

export default Vue.extend({
  name: 'Progress',
  created() {
    window.addEventListener('scroll', this.listener)

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

      const { y } = this.marker.getBoundingClientRect() as DOMRect
      const progress =  100 - ((y - window.innerHeight) / (document.body.scrollHeight - window.innerHeight) * 100)

      if (progress < 0) {
        return this.progress = '0'
      }

      if (progress > 100) {
        return this.progress = '100'
      }

      this.progress = progress.toFixed(0)
    },

    getMarker(): HTMLElement | null {
      const marker = document.querySelector<HTMLElement>('#progress-marker')
      if (marker) {
        return marker
      }

      return null
    }
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