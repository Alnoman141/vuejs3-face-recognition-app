<template>
  <div id="capture-image">
    <div v-if="loading" class="d-flex justify-content-center align-center loader">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="header">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-2">
          <img
            src="~/assets/icons/Vector.png"
            class="img-fluid"
            alt="Instraction-2"
          >
        </div>
        <div class="col-10">
          <p class="title">
            Take Photo of Your Face
          </p>
        </div>
      </div>
    </div>
    <div class="camera-frame">
      <camera-component id="camera-component" ref="camera_component" />
      <button class="btn capture-btn">
        <img
          @click="takePhoto"
          src="~/assets/capture.png"
          class="img"
          alt="Instraction-2"
        >
      </button>
    </div>
    <div class="captured-images row">
      <div
        v-for="(image, index) in images.length > minImgLength
          ? images
          : minImgLength"
        :key="index"
        class="col-sm-3 col-4"
      >
        <img
          :src="images[index] ? images[index] : require('~/assets/logo-icon.png')"
          :id="`${$store.state.user.user.name}${index}`"
          class="img-fluid"
          alt="Instraction-2"
        >
        <img
          v-if="images[index]"
          :src="require('~/assets/icons/delete.png')"
          @click="removeImage(index)"
          class="delete-image"
          alt="image"
        >
      </div>
    </div>
    <div class="buttons">
      <div class="row">
        <div class="col-6 text-md-end">
          <router-link to="/sign-up">
            <button class="btn btn-back">
              Back
            </button>
          </router-link>
        </div>
        <div class="col-6 text-md-start">
          <button :disabled="images.length === 0" @click="register" class="btn btn-next">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CameraComponent from '~/components/CameraComponent.vue'
export default {
  components: { CameraComponent },
  data () {
    return {
      minImgLength: 4,
      loading: false,
      images: []
    }
  },
  created () {
    if (
      this.$store.state.user.user &&
      this.$store.state.user.user.name
    ) {
      this.$router.push('/capture-image')
    } else {
      this.$router.push('/')
    }
  },
  mounted () {},
  methods: {
    takePhoto () {
      this.$refs.camera_component.takePhoto()
      if (this.$store.state.user.user.images.length > 0) {
        this.images = this.$store.state.user.user.images
      }
    },
    removeImage (index) {
      this.$store.dispatch('user/removeUserImage', index)
    },
    async register () {
      this.loading = true
      const userData = {
        id: this.$store.state.user.user.id,
        name: this.$store.state.user.user.name
      }
      if (userData.name) {
        await this.$store
          .dispatch('user/register', userData)
          .then((response) => {
            if (response.status === 200) {
              this.images.map(async (img) => {
                const upload = {
                  user: this.$store.state.user.user.name,
                  content: img
                }
                await this.uploadImage(upload)
              })
            }
          })
          .catch((error) => {
            console.log('error =>', error)
            this.loading = false
          })
      }
      setTimeout(() => {
        this.train(userData)
      }, 1000)
    },
    async uploadImage (upload) {
      await this.$store
        .dispatch('user/uploadImage', upload)
        .then((res) => {
          this.imageSaved = true
        })
        .catch((err) => {
          this.imageSaved = false
          console.log('err =>', err)
        })
    },
    async train (user) {
      const faces = []
      const descriptors = []
      await Promise.all(this.$store.state.user.user.images.map(async (photo, index) => {
        const photoId = `${user.name}${index}`
        const img = document.getElementById(photoId)
        const options = {
          detectionsEnabled: true,
          landmarksEnabled: true,
          descriptorsEnabled: true,
          expressionsEnabled: false
        }
        const detections = await this.$store.dispatch('face/getFaceDetections', { canvas: img, options })
        detections.forEach((d) => {
          descriptors.push({
            path: photo,
            descriptor: d.descriptor
          })
        })
      }))
      faces.push({
        id: user.id,
        user: user.name,
        descriptors
      })
      if (faces.length > 0) {
        await this.$store.dispatch('face/save', faces)
          .then(() => {
            this.$router.push('/attendence')
            this.loading = false
            console.log('trained successfully')
          })
          .catch((e) => {
            console.error(e)
          })
      } else {
        console.log('no face found')
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
#capture-image {
  text-align: center;
}
#capture-image .header {
  padding: 30px 0px;
}
#capture-image .title {
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #7190ef;
  margin: 0;
}
.camera-frame {
  position: relative;
}
.buttons button {
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  border-radius: 8px;
  padding: 10px 60px;
}
.btn-next {
  background: #7190ef;
  color: #ffffff;
}
.btn-back {
  background: transparent;
  border: 1px solid #7190ef;
}
.captured-images.row {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  align-self: center;
  width: 100%;
  overflow-x: scroll;
  margin: 40px 0px 0px;
  padding: 25px 0px 0px;
}
.col-sm-3,
.col-4 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#capture-image .captured-images .col-sm-3 .img {
  width: 100%;
  height: 100%;
}

button.btn.capture-btn {
  position: absolute;
  bottom: -12%;
  left: 50%;
  transform: translate(-50%);
}
img.delete-image {
  position: absolute;
  top: -10%;
  right: 0;
}
</style>
