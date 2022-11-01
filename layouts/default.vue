<template>
  <v-app dark>
    <v-content class="main-con vh-100">
      <v-container>
        <div v-if="loading" class="d-flex justify-content-center align-center loader">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    loading () {
      return this.$store.state.face.loading
    }
  },
  created () {
    this.$vuetify.theme.dark = false
  },
  async mounted () {
    await this.$store.dispatch('face/load')
  }
}
</script>
<style scoped>
.main-con {
  position: relative;
}
</style>
