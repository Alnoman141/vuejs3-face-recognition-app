<template>
  <div id="image-registration-instraction">
    <div class="logo">
      <img src="@/assets/logo-icon.png" alt="Logo" />
    </div>
    <h2 class="title">Facial Verification</h2>
    <p class="text">
      Aliquet nulla sed consectetur in malesuada fermentum id. Non non lacus enim risus sit.
    </p>
    <div class="instraction">
        <div class="row">
            <div class="col-4">
                <img src="@/assets/left.png" class="img-fluid" alt="Instraction-1" />
            </div>
            <div class="col-4">
                <img src="@/assets/front.png" class="img-fluid" alt="Instraction-2" />
            </div>
            <div class="col-4">
                <img src="@/assets/right.png" class="img-fluid" alt="Instraction-3" />
            </div>
        </div>
        <p class="instraction-text">Take your selfie from three different angle for the verification step</p>
      <button type="button" class="btn btn-submit">Next</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#image-registration-instraction .logo {
  margin: 80px 0px;
}

#image-registration-instraction .title {
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 43px;
  /* identical to box height */
  /* Gradient */
  background: linear-gradient(315deg, #01185e 0%, #264296 44.92%, #7190ef 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding-bottom: 16px;
}

#image-registration-instraction .text {
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(34, 62, 75, 0.5);
  padding-bottom: 64px;
}
#image-registration-instraction .row {
    padding-bottom: 50px;
}
#image-registration-instraction .instraction-text{
    font-family: 'Segoe UI';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    color: #79869F;
}

#image-registration-instraction .btn-submit {
  background: #7190ef;
  border-radius: 8px;
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #ffffff;
  padding: 10px 60px;
  display: block;
  margin: 0 auto;
  margin: 80px auto;
}
</style>
