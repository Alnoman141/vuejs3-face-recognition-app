<template>
  <div class="index vh-100 d-flex justify-content-center align-items-center">
    <div class="content w-100 text-center">
      <img src="@/assets/logo.png" class="img-fluid logo" alt="image-1">
      <div class="buttons">
        <div class="row">
          <div class="col-sm-6 text-sm-end">
            <router-link to="/sign-up">
              <button class="btn btn-back">
                Sign Up
              </button>
            </router-link>
          </div>
          <div class="col-sm-6 text-sm-start">
            <router-link to="/attendence">
              <button class="btn btn-next">
                Smart Attendence
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        id: '1',
        name: 'noman'
      },
      msg: ''
    }
  },
  mounted () {

  },
  methods: {
    async getUser () {
      await this.$store.dispatch('userStore/getUser', this.user).then((res) => {
        console.log('res =>', res)
      })
    }
  }
}
</script>

<style scoped>

.logo {
  margin-bottom: 30px;
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
.col-md-6 {
  padding: 10px;
}
</style>>
