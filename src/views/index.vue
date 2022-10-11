<template>
  <h1>Hello World</h1>
  <small class="text-muted">With faded secondary text</small>
</template>

<script>
export default {
  data(){
    return {
      user: {
        id: '1',
        name: 'noman'
      },
      msg: ''
    }
  },
  mounted(){
    this.getUser();
  },
  methods: {
    async getUser(){
      await this.$store.dispatch('userStore/getUser', this.user).then(res => {
        console.log('res =>', res);
      })
    }
  }
}
</script>

<style>

</style>