<template>
  <div id="capture-image">
    <div class="header">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-2">
          <img
            src="@/assets/icons/Vector.png"
            class="img-fluid"
            alt="Instraction-2"
          />
        </div>
        <div class="col-10">
          <p class="title">Take Photo of Your Face</p>
        </div>
      </div>
    </div>
    <div class="camera-frame">
      <camera-component id="camera-component" ref="camera_component" />
      <button class="btn capture-btn">
        <img
          src="@/assets/capture.png"
          class="img"
          alt="Instraction-2"
          @click="takePhoto"
        />
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
          :src="images[index] ? images[index] : getImage('logo-icon.png')"
          class="img-fluid"
          alt="Instraction-2"
        />
        <img
          v-if="images[index]"
          class="delete-image"
          :src="getImage('icons/delete.png')"
          alt="image"
          @click="removeImage(index)"
        />
      </div>
    </div>
    <div class="buttons">
      <div class="row">
        <div class="col-6 text-md-end">
          <router-link to="/sign-up"
            ><button class="btn btn-back">Back</button></router-link
          >
        </div>
        <div class="col-6 text-md-start">
          <button class="btn btn-next" @click="register">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CameraComponent from "@/components/CameraComponent.vue";
export default {
  components: { CameraComponent },
  data() {
    return {
      minImgLength: 4,
      images: [],
    };
  },
  created() {
    if (
      this.$store.state.userStore.user &&
      this.$store.state.userStore.user.name
    ) {
      this.$router.push("/capture-image");
    } else {
      this.$router.push("/");
    }
  },
  mounted() {},
  methods: {
    takePhoto() {
      this.$refs.camera_component.takePhoto();
      if (this.$store.state.userStore.user.images.length > 0) {
        this.images = this.$store.state.userStore.user.images;
      }
    },
    getImage(image) {
      return new URL(`/src/assets/${image}`, import.meta.url).href;
    },
    removeImage(index) {
      this.$store.dispatch("userStore/removeUserImage", index);
    },
    async register() {
      let userData = {
        id: this.$store.state.userStore.user.id,
        name: this.$store.state.userStore.user.name,
      };
      if (userData.name) {
        await this.$store
          .dispatch("userStore/register", userData)
          .then((response) => {
            if (response.status === 200) {
              this.images.map(async (img) => {
                let upload = {
                  user: this.$store.state.userStore.user.name,
                  content: img,
                };
                await this.$store
                  .dispatch("userStore/uploadImage", upload)
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => {
                    console.log("err =>", err);
                  });
              });
            }
          })
          .catch((error) => {
            console.log("error =>", error);
          });
      }
    },
  },
};
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
  margin: 35px 0px;
  padding: 20px 0px;
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
