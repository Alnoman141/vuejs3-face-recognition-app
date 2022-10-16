<template>
  <div class="index">
    <div class="content">
      <img src="@/assets/logo.png" class="img-fluid logo" alt="image-1" />
      <h2 class="msg">Registration Successful</h2>
      <div class="buttons">
        <router-link to="/"
          ><button class="btn btn-next">Go To Home</button></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.index {
  position: relative;
  height: 100vh;
  text-align: center;
}
.content {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.logo {
  margin-bottom: 30px;
}
.msg {
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  line-height: 43px;
  background: linear-gradient(315deg, #01185e 0%, #264296 44.92%, #7190ef 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.buttons button {
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  border-radius: 8px;
  padding: 10px 60px;
  margin: 10px;
}
.btn-next {
  background: #7190ef;
  color: #ffffff;
}
</style>
>
