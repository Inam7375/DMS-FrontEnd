<template>
  <div>
     <b-alert v-if="message.length > 0" class="alert" show dismissible fade:variant="messageVariant" >{{message}}</b-alert>
    <!-- <vx-card> -->
    <vs-tabs>
      <vs-tab label="Profile">
        <div class="con-tab-ejemplo">
          <b-form @submit.stop.prevent>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <b-form-group
                  class="text-xl"
                  id="Username"
                  label="Username"
                  label-for="username"
                  description="Write a unique username here."
                >
                  <b-form-input
                    id="username"
                    disabled
                    v-model="Username"
                    type="text"
                    placeholder="John123"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="text-xl"
                  id="Email"
                  label="Email"
                  label-for="email"
                  description="Enter a valid email here."
                >
                  <b-form-input
                    id="email"
                    v-model="email"
                    type="email"
                    placeholder="someone@gmail.com"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="text-xl"
                  id="Password"
                  label="Password"
                  label-for="password"
                  description="Enter a 8-12 characters long password."
                >
                  <b-form-input
                    :state="validatePass"
                    id="password"
                    v-model="password"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="text-xl"
                  id="Department"
                  label="Department"
                  label-for="department"
                >
                  <b-form-select
                    id="departmet"
                    v-model="department"
                    :options="departments"
                    required
                  ></b-form-select>
                </b-form-group>
              </div>
              <div>
                <b-form-group
                  class="text-xl"
                  id="Name"
                  label="Name"
                  label-for="name"
                  description="Enter user's full name here."
                >
                  <b-form-input
                    id="name"
                    v-model="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="text-xl"
                  id="Designation"
                  label="Designation"
                  label-for="designation"
                  description="Enter a designation here."
                >
                  <b-form-input
                    id="designation"
                    v-model="designation"
                    type="text"
                    placeholder="Professor"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="text-xl"
                  id="Password2"
                  label="Re-Enter Password"
                  label-for="password2"
                  description="Cofirm password."
                >
                  <b-form-input
                    :state="confirmPass"
                    id="password2"
                    v-model="password2"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="text-xl"
                  id="Role"
                  label="Role"
                  label-for="role"
                >
                  <b-form-select
                    id="role"
                    v-model="role"
                    :options="roles"
                    required
                  ></b-form-select>
                </b-form-group>
              </div>
            </div>
          </b-form>

          <vs-button @click="updateUser" color="primary" type="flat"
            >Update</vs-button
          >
        </div>
      </vs-tab>
      <!-- <vs-tab label="Information">
                    <div class="con-tab-ejemplo">
                        Information
                    </div>
                </vs-tab>
                <vs-tab label="Social">
                    <div class="con-tab-ejemplo">
                        Social
                    </div>
                </vs-tab> -->
    </vs-tabs>
    <!-- </vx-card> -->
  </div>
</template>

<script>
import VxCard from "../../components/vx-card/VxCard.vue";
import axios from "axios";
export default {
  state: {
    user: {},
  },
  name: "userProfile",
  components: {
    VxCard,
  },
  data: () => ({
    selected: false,
    departments: ["BBA", "CS", "Applied Physics", "Electrical Engineering"],
    roles: ["Admin", "Super Admin", "DTO"],
    popupActivo: false,
    name: "",
    username: "",
    email: "",
    designation: "",
    password: "",
    password2: "",
    department: null,
    role: "",
    all_users: [],
    message:'',
    messageVariant:''
  }),
  methods: {
     showAlert:function(res){
     this.message=res.data.msg;
     if(res.status=='201'){
        this.messageVariant='success'
      }
      else if(res.status=='203'){
        this.messageVariant='danger'
      }
      setTimeout(()=>{
         this.message=''
      }, 3000)
    },
    updateUser: async function (e) {
      e.preventDefault();
      var updateUser = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password2,
        designation: this.designation,
        department: this.department,
        role: this.role,
      };
      const response = await axios.put(
        `http://localhost:5000/api/user/${this.$route.params.username}`,
        updateUser
      );
     this.showAlert(response)
    },
  },
  async created() {
    const res = await axios.get(
      `http://localhost:5000/api/user/${this.$route.params.username}`
    );
    const user = res.data;
    this.username = user._id;
    this.name = user.name;
    this.email = user.email;
    this.designation = user.designation;
    this.department = user.department;
    // this.password = user.password
    // this.password2 = user.password
    this.role = user.role;
  },
   computed : {
    validatePass() {
      return this.password.length > 7 && this.password.length < 13
    },
    confirmPass () {
      return this.password2 === this.password && this.password2.length > 0
    },
    },
};
</script>
<style lang="scss">
.alert{
 text-align: center;
 width: 750px;
 height: 40px;
 font-weight: bold;
}
</style>