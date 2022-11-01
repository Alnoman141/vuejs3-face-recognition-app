<template>
  <div class="camera-comp">
    <video
      ref="video"
      :class="facingMode === 'user' ? 'front' : ''"
      class="video"
    />
    <canvas ref="canva" style="display: none" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      photos: [],
      mediaStream: null,
      videoDevices: [],
      facingMode: 'environment',
      counter: 0,
      switchingCamera: false,
      id: 1
    }
  },
  mounted () {
    this.openCamera()
  },
  beforeUnmount () {
    this.closeCamera()
  },
  methods: {
    // open camera
    async openCamera () {
      const devices = await navigator.mediaDevices.enumerateDevices()
      this.videoDevices = devices.filter(d => d.kind === 'videoinput')
      await this.StartRecording('environment')
    },
    // camera setting
    async StartRecording (facingMode) {
      this.facingMode = facingMode
      const video = this.$refs.video
      video.setAttribute('autoplay', '')
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false
      })
      video.srcObject = this.mediaStream
      return video.play()
    },
    closeCamera () {
      // // kill camrea after capture
      const video = this.$refs.video
      const mediaStream = video.srcObject
      if (mediaStream) {
        const tracks = mediaStream.getTracks()
        tracks[0].stop()
        tracks.forEach(track => track.stop())
      }
    },
    // capture images
    takePhoto () {
      const video = this.$refs.video
      const canva = this.$refs.canva
      const width = video.videoWidth
      const height = video.videoHeight
      canva.width = width
      canva.height = height
      const ctx = canva.getContext('2d')
      ctx.save()

      if (this.facingMode === 'user') {
        ctx.scale(-1, 1)
        ctx.drawImage(video, width * -1, 0, width, height)
      } else {
        ctx.drawImage(video, 0, 0)
      }
      ctx.restore()

      const photo = canva.toDataURL()
      this.$store.dispatch('user/setUserImage', photo)
    }
  }
}
</script>

<style scoped>
.camera-comp {
  width: 100%;
  height: 55vh;
  background: #fffefe;
}
video.video,
canvas {
  width: 100% !important;
  height: 55vh !important;
  object-fit: cover;
}
.canvas {
  height: 100% !important;
}
.video.front {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
.wrapper {
  background-color: black;
  display: grid;
  width: auto;
  height: auto;
  /* height: auto; */
  /* height: 100vh; */
  grid-template-columns: [left] 90vw [bs] 5vw [es] 5vw [right];
  grid-template-rows: [top] 5vh [bs] 5vh [es] 60vh [middle] 10vh [bottom] 20vh [end];
  justify-items: center;
  /* overflow: hidden; */
}

.video {
  /* grid-column: left/right;
  grid-row: top / bottom; */
  position: relative;
  user-select: none;
  max-width: unset;
  max-height: unset;
}

.switch-button {
  position: absolute;
  grid-column: bs / es;
  grid-row: bs / es;
  z-index: 5;
  border-radius: 100%;
  width: 6vh;
  height: 6vh;
  font-size: 3vh;
  right: 0;
  /* text-align: center; */
}

/* .bi-arrow-repeat {
    font
} */
</style>
