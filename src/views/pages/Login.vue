<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div
    class="h-screen flex w-full vx-row no-gutter items-center justify-center custom"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4 ">
      <vx-card>
        <!-- <div slot="no-body" class="full-page-bg-color"> -->

        <div class="vx-row no-gutter justify-center items-center ">
          <!-- <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div> -->

          <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg ">
            <div class="p-8 login-tabs-container ">
              <b-alert
                v-if="message && message.length > 0"
                class="alert"
                show
                dismissible
                fade
                :variant="messageVariant"
                >{{ message }}</b-alert
              >

              <div class="vx-card__title mb-6 ">
                <!-- <h4 class="mb-4  mr-4 justify-center items-center">Login</h4> -->
                <p class="customcolor text-2xl">Welcome To FUUAST DMS.</p>
              </div>

              <div>
                <vs-input
                  name="username"
                  icon-no-border
                  icon="icon icon-user"
                  icon-pack="feather"
                  label-placeholder="Username"
                  v-model="username"
                  class="w-full"
                />

                <vs-input
                  type="password"
                  name="password"
                  icon-no-border
                  icon="icon icon-lock"
                  icon-pack="feather"
                  label-placeholder="Password"
                  v-model="password"
                  class="w-full mt-6"
                />

                <div class="flex flex-wrap justify-between my-5">
                  <vs-checkbox v-model="checkbox_remember_me" class="mb-3"
                    >Remember Me</vs-checkbox
                  >
                  <router-link to="">Forgot Password?</router-link>
                </div>
                <vs-button @click="login" class="">Login</vs-button>
              </div>
              <br /><br />
            </div>
          </div>
        </div>
        <!-- </div> -->
      </vx-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      checkbox_remember_me: false,
      message: "",
      messageVariant: "",
      token: "",
    };
  },
  methods: {
    login: function () {
      this.$store.dispatch("retrieveToken", {
        username: this.username,
        password: this.password,
      });
      if (localStorage.getItem('access-token') == null){
       setTimeout(() => {
        this.message = "Invalid Crdentials!"
        this.messageVariant="danger"
      }, 1000);
      }
      setTimeout(() => {
        this.message=''
      }, 3000);
    },
  },
};
</script>
<style  lang="scss">
.custom {
  background-color: #10163a;
}
.customcolor {
  color: #10163a;
  font-weight: bold;
}
</style>

