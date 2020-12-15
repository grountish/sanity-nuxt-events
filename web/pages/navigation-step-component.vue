<template>
  <div ref="input" class="overflow-hidden" :style="{ height: duration }">
    <NuxtLink
      v-if="showNext"
      class="fixed top-3/4 left-3/4 text-2xl p-4 border border-black"
      to="/exhibits"
    >
      <h1>Next Chapter</h1>
    </NuxtLink>
    <video
      ref="video"
      :class="['fixed inset-0 w-full h-full -z-10', 'object-cover']"
      :src="vid"
      muted
      loop
      playsinline
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    duration: '',
    showNext: false,
    vid:
      'https://res.cloudinary.com/grountish/video/upload/v1607989129/acd_wj1h23.mp4',
    vid2: 'https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.webm'
  }),
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    this.$refs.video.addEventListener('loadedmetadata', () => {
      this.duration = this.$refs.video.duration * 400 + 'px'
    })
  },
  methods: {
    handleScroll(event) {
      window.requestAnimationFrame(() => {
        this.$refs.video.currentTime =
          event.target.scrollingElement.scrollTop / 400
        event.target.scrollingElement.scrollTop > 8400
          ? (this.showNext = true)
          : (this.showNext = false)
      })
    }
  }
}
</script>
