<template lang="html">

  <div>
    <b-alert v-if="message.length > 0" class="alert" show dismissible fade:variant="messageVariant">{{message}}
    </b-alert>
    <div>
      <vx-card  style="margin-bottom: 2em;">
        <p class="text-3xl customStyle">Users List</p>
        <p>You can search registered users here.</p>
      </vx-card>
      <div class="grid grid-cols-6" style="margin-left:30%;">
        <div>
          <p style="font-size:15px; font-weight:bold; padding-top:.5em; padding-left:2em;">Filter Entries : </p>
        </div>
        <div class="col-span-5">
          <b-form-select style="width:20%; font-size:20px; border-radius:10px;" v-model="selectedEntry" :options="entryOptions"></b-form-select>
        </div>
      </div>
      <vs-table :max-items="selectedEntry" search pagination :data="all_users">
        <template slot="header">
          <vs-button @click="popupActivo=true" style="border-radius:5px;" color="primary" type="filled" icon="person_add">Add User</vs-button>
        </template>
        <div slot="thead" class="grid grid-cols-7 gap-4 custom text-3xl">
          <vs-th sort-key="name" style="flex-grow:1">
            Full Name
          </vs-th>
          <vs-th sort-key="username" style="flex-grow:1"> 
            User Name
          </vs-th>
          <vs-th  sort-key="avatar" style="flex-grow:1">
            Avatar
          </vs-th>
          <vs-th sort-key="department" style="flex-grow:2">
            Department
          </vs-th>
          <vs-th sort-key="role" style="flex-grow:1">
            Role  
          </vs-th>
          <vs-th sort-key="status" style="flex-grow:1">
            Status  
          </vs-th>
          <vs-th sort-key="role" style="flex-grow:1">
            Actions  
          </vs-th>
        </div>
        <div slot-scope="{data}">
          <vs-tr :state="tr.role == 'Super Admin'?'success':null" :key="tr._id" v-for="(tr, indextr) in data" class="grid grid-cols-7 gap-4 custom-color">
            <vs-td >
              {{data[indextr].name}}
            </vs-td>
         
            <vs-td :data="data[indextr]._id">
              {{data[indextr]._id}} 
            </vs-td>

            <vs-td>
              <vs-avatar/> 
            </vs-td>

            <vs-td >
              {{data[indextr].department}}
            </vs-td>

            <vs-td >
              {{data[indextr].role}}
            </vs-td>
            <vs-td >
              <vs-chip :color="tr.status ? 'primary' : 'danger'">
                <vs-avatar @click='toggleStatus(tr._id)'  icon="edit" />
                {{data[indextr].status ? "active" : "not active" }}
              </vs-chip>
            </vs-td>
            <vs-td >
              <div class="grid grid-cols-2">
                <div>
                  <router-link :to="{name: 'user', params: {username: tr._id}}">
                    <vs-button radius size="large" line-position="left" color="success" type="flat" icon="edit"></vs-button>
                  </router-link>
                </div>
              </div>
            </vs-td>
          </vs-tr>
        </div>
      </vs-table>
    </div>
    <div class="parentx">
      <vs-popup class="holamundo"  title="Add User"  :active.sync="popupActivo">
          <b-form @submit="onSubmit" @submit.stop.prevent>
            <div class="grid grid-cols-2 gap-4">
              <div class="custom-colors">
                 <b-form-group
                    class="text-xl custom-col"
                    id="Username"
                    label="Username"
                    label-for="username"
                    description="Write a unique username here."
                  >
                    <b-form-input
                      id="username"
                      v-model="un"
                      type="text"
                      placeholder="John123"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="text-xl custom-col"
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
                    class="text-xl custom-col"
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
                    class="text-xl custom-col"
                    id="Department"
                    label="Department"
                    label-for="department"
                  >
                    <b-form-select
                      id="department"
                      v-model="department"
                      :options="departments"
                      required
                    ></b-form-select>
                  </b-form-group>

              </div>
              <div>
                <b-form-group
                  class="text-xl custom-col"
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
                  class="text-xl custom-col"
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
                  class="text-xl custom-col"
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
                  class="text-xl custom-col"
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
                  <b-button style="border-radius:5px; margin: 1em auto; font-weight:bold ;background-color:#7367F0" icon="add" color="primary" type="submit">Add</b-button>
                </b-form-group>

              </div>
            </div>
          </b-form>

        
      </vs-popup>
    </div>
  </div>
</template>

<script>
import VxCard from "../../components/vx-card/VxCard.vue";
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    VxCard,
  },
  data: () => ({
    selected: false,
    selectedEntry:5,
    departments: [],
    roles: ["Admin", "Super Admin", "DTO","User"],
    popupActivo: false,
    name: "",
    un: "",
    email: "",
    designation: "",
    password: "",
    password2: "",
    department: null,
    role: "",
    all_users: [],
    message: "",
    messageVariant: "",
    entryOptions: [
      { value: 5, text: '5'},
      { value: 10, text: '10'},
      { value: 20, text: '20'},
      { value: 30, text: '30'},
      { value: 40, text: '40'},
      { value: 50, text: '50'},
      { value: 70, text: '70'},
      { value: 100, text: '100'}
    ]
  }),
  methods: {
    showAlert: function (res) {
      this.message = res.data.msg;
      if (res.status == "201") {
        this.messageVariant = "success";
      } else if (res.status == "203") {
        this.messageVariant = "danger";
      }
      setTimeout(() => {
        this.message = "";
      }, 3000);
    },
    onReset(){
    this.name='',
    this.un='',
    this.email='',
    this.designation='',
    this.password='',
    this.password2='',
    this.department=null,
    this.role=''
    },
    onSubmit: async function () {
      // e.preventDefault()
      var newUser = {
        name: this.name,
        _id: this.un,
        email: this.email,
        password: this.password,
        designation: this.designation,
        department: this.department,
        role: this.role,
      };
      this.all_users.push(newUser);
        this.popupActivo = false;
      const response = await axios.post(
        "http://localhost:5000/api/user/KT1",
        newUser
      );
      this.showAlert(response);
      this.onReset()
      // response.status == "201" ? this.get_all_users() : null
    },
    toggleStatus: async function (uname) {
      const response = await axios.put("http://localhost:5000/api/updateuser", {'_id':uname})
      this.showAlert(response)
      response.status == "201" ? this.get_all_users() : null
    },
    get_all_users: async function () {
      const res = await axios.get("http://localhost:5000/api/users");
      this.all_users = res.data.results;
      const response = await axios.get("http://localhost:5000/api/departments")
      const deps = response.data.results
      for (var x in deps){
        this.departments.push(deps[x]['_id']) 
      }
    },
    ...mapActions(["fetchUsers"]),
  },
  computed: {
    ...mapGetters(["allUsers"]),
    validatePass() {
      return this.password.length > 7 && this.password.length < 13;
    },
    confirmPass() {
      return this.password2 === this.password && this.password2.length > 0;
    },
  },
  created() {
    this.fetchUsers();
    this.get_all_users();
  },
};
</script>

<style lang="scss">
b-form-input :focus {
  background-color: #101639;
}
.labelx,
.vs-input {
  margin: 10px;
}
.vs-input {
  line-height: 1em;
  width: 100%;
  font-size: 2em;
}
.sidebarx {
  position: fixed;
  z-index: 50000;
}
.header-sidebar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    > button {
      margin-left: 10px;
    }
  }
}
.alert {
  text-align: center;
  width: 750px;
  height: 40px;
  font-weight: bold;
}
.customStyle{
  color: #7367F0;
}
.custom{
	font-weight: bold;
	color: #fff;
	background-color: #10163a;
}
.custom-color{
color: black;
}
.custom-color:nth-child(even){
	background-color:#f2f2f2;
}
.custom-col{
  color: #10163a;
  font-weight: bold;
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  > button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
}
</style>