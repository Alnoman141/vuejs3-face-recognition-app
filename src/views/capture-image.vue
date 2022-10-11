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
      <camera-component class="camera-component" />
      <button class="btn btn-primary">Capture</button>
    </div>
    <div class="captured-images">
        <div class="row">
            <div class="col-4">
                <img
                src="@/assets/logo-icon.png"
                class="img-fluid"
                alt="Instraction-2"
            />
            </div>
            <div class="col-4">
                <img
                src="@/assets/logo-icon.png"
                class="img-fluid"
                alt="Instraction-2"
            />
            </div>
            <div class="col-4">
                <img
                src="@/assets/logo-icon.png"
                class="img-fluid"
                alt="Instraction-2"
            />
            </div>
            <div class="col-4">
                <img
                src="@/assets/logo-icon.png"
                class="img-fluid"
                alt="Instraction-2"
            />
            </div>
            <div class="col-4">
                <img
                src="@/assets/logo-icon.png"
                class="img-fluid"
                alt="Instraction-2"
            />
            </div>
        </div>
    </div>
    <div class="buttons">
      <div class="row">
        <div class="col-6">
          <button class="btn btn-back">Back</button>
        </div>
        <div class="col-6">
          <button class="btn btn-next">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CameraComponent from "@/components/CameraComponent.vue";
export default {
  components: { CameraComponent },
};
</script>

<style scoped>
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
    border: 1px solid red;
}
.camera-component {
    border: 1px solid green;
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
</style>
