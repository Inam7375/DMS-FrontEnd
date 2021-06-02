<template lang="html">
  <div>
    <div>
      <vx-card style="margin-bottom: 2em;">
        <p class="text-3xl">Users List</p>
        <p>You can search registered users here.</p>
      </vx-card>
      
      <vs-table max-items="5" search pagination :data="all_users">
        <template slot="header">
          <vs-button @click="popupActivo=true" style="border-radius:5px;" color="primary" type="filled" icon="person_add">Add User</vs-button>
        </template>
        <div slot="thead" class="grid grid-cols-7 gap-4">
          <vs-th sort-key="name" style="flex-grow:1">
            Full Name
          </vs-th>
          <vs-th sort-key="username" style="flex-grow:1"> 
            User Name
          </vs-th>
          <vs-th  sort-key="username" style="flex-grow:1" 
            Avatar
          </vs-th>
          <vs-th sort-key="role" style="flex-grow:1">
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
          <vs-tr :state="tr.role == 'Super Admin'?'success':tr.role == 'Admin'?'primary':null" :key="tr._id" v-for="(tr, indextr) in data" class="grid grid-cols-7 gap-4">
            <vs-td >
              {{data[indextr].name}}
            </vs-td>

            <vs-td>
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
                <vs-avatar @click='toggleStatus(tr.status, indextr)'  icon="edit" />
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
                <div>
                  <vs-button radius size="large" color="danger" type="flat" icon="delete"></vs-button>
                </div>
              </div>
            </vs-td>
          </vs-tr>
        </div>
      </vs-table>
    </div>
    <div class="parentx">
      <vs-popup class="holamundo"  title="Add User" :active.sync="popupActivo">
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
                      v-model="username"
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

        <vs-button @click="onSubmit" style="border-radius:5px; margin: 1em auto;" icon="add" color="warning" type="flat">Add</vs-button>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import VxCard from '../../components/vx-card/VxCard.vue';
import {mapGetters, mapActions} from 'vuex';
import axios from 'axios';
export default {
components: {
  VxCard,
},
data:()=>({
    selected:false,
    departments : [
      "BBA", "CS", "Applied Physics", "Electrical Engineering"
    ],
    roles : [
      "Admin", "Super Admin", "DTO"
    ],
    popupActivo: false,
    name: '',
    username:'',
    email: '',
    designation:'',
    password: '',
    password2: '',
    department:null,
    role: '',
    all_users:[],
  }),
  methods: {
    onSubmit: async function(e) {
      e.preventDefault()
      var newUser = {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password2,
        designation: this.designation,
        department: this.department,
        role: this.role 
      }
      this.all_users.push(newUser) 
      this.popupActivo = false
      const response = await axios.post('http://localhost:5000/api/user/KT1', newUser)
      console.log(response.data.msg)
    },
    toggleStatus: function(status, index) {
      this.users[index].status = !status
    },
    get_all_users: async function() {
      const res = await axios.get('http://localhost:5000/api/users')
      this.all_users = res.data.results
    },
    ...mapActions(['fetchUsers']),
  },
  computed : {
    ...mapGetters(['allUsers']),

    validatePass() {
      return this.password.length > 7 && this.password.length < 13
    },
    confirmPass () {
      return this.password2 === this.password && this.password2.length > 0
    },
    },
  created() {
    this.fetchUsers()
    this.get_all_users()
  }
}
</script>

<style lang="scss">
b-form-input :focus {
  background-color: #101639;
}

.labelx, .vs-input
{  
  margin : 10px;
}
.vs-input{
  line-height: 1em;
  width: 100%;
  font-size: 2em;
}
.sidebarx{
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