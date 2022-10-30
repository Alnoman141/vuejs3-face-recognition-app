<template>
  <div id="attendence">
    <video id="live-video" class="d-none" width="320" height="247" autoplay />
    <canvas id="live-canvas" width="320" height="247" />
    <client-only>
      <textToSpeatch ref="Speatch" :welcomeMsg="welcomeMsg" />
    </client-only>
  </div>
</template>

<script>
import textToSpeatch from '../components/TextToSpeatch.vue'
export default {
  components: { textToSpeatch },
  data () {
    return {
      welcomeMsg: '',
      interval: null,
      fps: 15,
      realFps: 0,
      step: 2,
      counter: 0,
      progress: 0,
      duration: 0,
      isProgressActive: false,
      recognition: '',
      withOptions: [0, 1, 2, 3],
      attendenceProcessing: false
    }
  },
  watch: {
    fps (newFps) {
      const videoDiv = document.getElementById('live-video')
      const canvasDiv = document.getElementById('live-canvas')
      const canvasCtx = canvasDiv.getContext('2d')
      this.start(videoDiv, canvasDiv, canvasCtx, newFps)
    }
  },
  async beforeMount () {
    const self = this
    await self.$store.dispatch('face/getAll')
      .then(() => self.$store.dispatch('face/getFaceMatcher'))
  },

  async mounted () {
    await this.recognize()
  },

  beforeDestroy () {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.$store.dispatch('camera/stopCamera')
  },
  methods: {
    sendWelcome () {
      if (this.$refs.Speatch && this.$refs.Speatch.speak) {
        this.$refs.Speatch.speak()
      }
    },
    async giveAttendence (user) {
      await this.$store.dispatch('attendence/save', user).then((res) => {
        if (res.status === 200 && res.data.name) {
          this.welcomeMsg = `Welcome, ${res.data.name}`
          this.sendWelcome()
          this.isProgressActive = false
        }
      }).catch((error) => {
        this.welcomeMsg = `${error.response.data.message}`
        this.sendWelcome()
        this.isProgressActive = false
      })
    },
    start (videoDiv, canvasDiv, canvasCtx, fps) {
      const self = this
      if (self.interval) {
        clearInterval(self.interval)
      }
      self.interval = setInterval(async () => {
        const t0 = performance.now()
        if (!self.isProgressActive) {
          canvasCtx.drawImage(videoDiv, 0, 0, 320, 247)
          const options = {
            detectionsEnabled: self.withOptions.find(o => o === 0) === 0,
            landmarksEnabled: self.withOptions.find(o => o === 1) === 1,
            descriptorsEnabled: self.withOptions.find(o => o === 2) === 2,
            expressionsEnabled: self.withOptions.find(o => o === 3) === 3
          }
          const detections = await self.$store.dispatch('face/getFaceDetections', { canvas: canvasDiv, options })
          if (detections.length) {
            detections.forEach(async (detection) => {
              detection.recognition = await self.$store.dispatch('face/recognize', {
                descriptor: detection.descriptor,
                options
              })
              const userId = detection.recognition.label.split('|')[1]
              detection.recognition._label = detection.recognition.label.split('|')[0]
              if (userId && detection.recognition.label !== 'unknown') {
                self.isProgressActive = true
                if (self.isProgressActive) {
                  const user = {
                    user_id: userId,
                    name: detection.recognition.label
                  }
                  self.giveAttendence(user)
                }
              }
              self.$store.dispatch('face/draw',
                {
                  canvasDiv,
                  canvasCtx,
                  detection,
                  options
                })
            })
          }
        }
        const t1 = performance.now()
        self.duration = (t1 - t0).toFixed(2)
        self.realFps = (1000 / (t1 - t0)).toFixed(2)
      }, 1000 / fps)
    },
    async recognize () {
      const videoDiv = document.getElementById('live-video')
      const canvasDiv = document.getElementById('live-canvas')
      const canvasCtx = canvasDiv.getContext('2d')
      await this.$store.dispatch('camera/startCamera')
        .then((stream) => {
          videoDiv.srcObject = stream
          this.start(videoDiv, canvasDiv, canvasCtx, self.fps)
        })
    },

    increaseProgress () {
      const self = this
      self.progress = (100 / self.step) * ++self.counter
    }
  }
  // computed: {
  //   models () {
  //     console.log(this.$store.state.model)
  //     return 1
  //   }
  // }
}
</script>

<style scoped>
#attendence .camera-component {
  height: 100vh;
  overflow: hidden;
  position: relative;
}
#live-canvas {
  width: 100%;
  height: 100%;
}
</style>
