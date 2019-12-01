<template>
  <div id="progress">
    {{ progress }}%
    <div>Inner Height: {{ innerHeight }}</div>
    <div>ScrollY: {{ scrollY }}</div>
    <div>rectY: {{ rectY }}</div>
    <div>document.scrollHeight: {{ documentHeight }}</div>
    <div>document.scrollHeight - innerHeight: {{ documentHeight - innerHeight }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

// function listener(this: Window, evt: Event): void {
//   console.log('Scrolling!', window.scrollY + window.innerHeight)
// }

interface IData {
  percent: string
  marker: HTMLElement | null
  scrollY: number
  innerHeight: number
  documentHeight: number
  rectY: number
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
      percent: '0',
      scrollY: 0,
      documentHeight: 0,
      innerHeight: 0,
      rectY: 0
    }
  },

  methods: {
    listener(): void {
      if (!this.marker) {
        return
      }

      const { y } = this.marker.getBoundingClientRect() as DOMRect

      this.rectY = y
      this.scrollY = window.scrollY
      this.innerHeight = window.innerHeight
      this.documentHeight = document.body.scrollHeight

      const progress =  100 - ((this.rectY - this.innerHeight) / (this.documentHeight - this.innerHeight) * 100)

      console.log(progress.toFixed(0))
      if (progress < 0) {
        this.progress = '0'
        // console.log(0)
        return
      }

      if (progress > 100) {
        this.progress = '100'
        // console.log(1)
        return
      }

      this.progress = progress.toFixed(0)

      const currentScroll = window.scrollY
      const distUntilMarkerOnScreen = window.scrollY - y
      // console.log(distUntilMarkerOnScreen)
      // this.percent = ((currentScroll / markerPosition) * 100).toFixed(0)
    }
  },

  mounted() {
    const marker = document.querySelector<HTMLElement>('#progress-marker')
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

  computed: {
    // percent(): string {
    //   console.log('Checking')
    //   if (!this.marker) {
    //     return '?'
    //   }

    //   const { y } = this.marker.getBoundingClientRect() as DOMRect

    //   return ((y + window.scrollY) / y + window.scrollY).toFixed(0)
    // },
  },
})
</script>

<style scoped>
#progress {
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>