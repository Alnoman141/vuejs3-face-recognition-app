<template>
  <div id="attendence">
    <camera-component class="camera-component" />
  </div>
</template>

<script>
import CameraComponent from '@/components/CameraComponent.vue'
export default {
    components: { CameraComponent }
}
</script>

<style scoped>
#attendence .camera-component {
    height: 100vh;
    overflow: hidden;
}
</style>