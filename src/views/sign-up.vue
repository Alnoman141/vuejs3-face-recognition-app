<template>
  <div id="sign-up">
    <div class="logo">
      <img src="@/assets/logo-icon.png" alt="Logo" />
    </div>
    <h2 class="title">Sign Up</h2>
    <p class="text">
      Welcome to Grypas Employee App. Please follow the steps to sign up to
      system
    </p>
    <div class="sign-up-form">
      <form>
        <div class="mb-3">
          <label for="name" class="form-label">Name</label>
          <input
            id="name"
            type="text"
            class="form-control"
            placeholder="Type your name"
          />
        </div>
        <div class="mb-3">
          <label for="id" class="form-label">ID No.</label>
          <input
            id="id"
            type="text"
            class="form-control"
            placeholder="Type your emplyment ID"
          />
        </div>

        <button type="button" class="btn btn-submit">Next</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#sign-up .logo {
  margin: 80px 0px;
}

#sign-up .title {
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

#sign-up .text {
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: rgba(34, 62, 75, 0.5);
  padding-bottom: 64px;
}

#sign-up .form-label {
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: #79869f;
  padding-bottom: 12px;
}

#sign-up .form-control {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px 18px;
  font-family: "Segoe UI";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 32px;
}

#sign-up .btn-submit {
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
  margin: 64px auto;
}
</style>
