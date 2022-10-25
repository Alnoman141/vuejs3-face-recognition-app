<template>
  <v-app dark>
    <v-content>
      <v-container>
        <!-- <v-progress-circular
          v-if="loading"
          :size="200"
          :width="20"
          color="red"
          indeterminate
        >
          Loading 7MB models.
          <br>
          Please be patient...
        </v-progress-circular> -->
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
