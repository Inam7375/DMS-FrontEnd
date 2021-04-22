<template lang="html">
  <div>
    <div>
      <vx-card style="margin-bottom: 2em;">
        <p class="text-3xl">Documents List</p>
        <p>You can search all the documents here.</p>
      </vx-card>
      
      <vs-table max-items="5" search pagination :data="all_documents">
        <template slot="header">
          <vs-button @click="active=!active" style="border-radius:5px;" color="primary" type="filled" icon="event_note">Add Document</vs-button>
        </template>
        <div slot="thead" class="grid grid-cols-7 gap-4">
          <vs-th sort-key="name" style="flex-grow:1">
            Title
          </vs-th>
          <vs-th sort-key="username" style="flex-grow:1"> 
            Created By
          </vs-th>
          <vs-th  sort-key="username" style="flex-grow:1"> 
            From
          </vs-th>
          <vs-th sort-key="department" style="flex-grow:1">
            To
          </vs-th>
          <vs-th sort-key="role" style="flex-grow:1">
            Date Created  
          </vs-th>
          <vs-th sort-key="status" style="flex-grow:1">
            Forwarded To  
          </vs-th>
          <vs-th sort-key="role" style="flex-grow:1">
            Forwarded Dep  
          </vs-th>
        </div>

        <div slot-scope="{data}">
          <vs-tr :state="tr.role == 'Super Admin'?'success':tr.role == 'Admin'?'primary':null" :key="indextr" v-for="(tr, indextr) in data" class="grid grid-cols-7 gap-4">
            <vs-td :data="data[indextr].title">
              {{data[indextr].title}}
            </vs-td>

            <vs-td :data="tr.createdBy.user">
              {{tr.createdBy.user}}
            </vs-td>

            <vs-td :data="data[indextr].from">
              {{data[indextr].from}} 
            </vs-td>

            <vs-td :data="data[indextr].to">
              {{data[indextr].to}}
            </vs-td>

            <vs-td :data="data[indextr].date_created">
              {{data[indextr].date_created}}
            </vs-td>

            <vs-td :data="data[indextr].forwarded_to.user">
              {{data[indextr].forwarded_to.user}}
            </vs-td>

            <vs-td :data="data[indextr].forwarded_to.department">
              {{data[indextr].forwarded_to.department}}
            </vs-td>
          </vs-tr>
        </div>
      </vs-table>
    </div>
    <div class="parentx">
      <vs-sidebar position-right parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar" slot="header">
        <p class="text-2xl">Add User</p>

      </div>

      <vs-sidebar-item index="1">
          <b-form>
            <b-form-group
              class="text-xl"
              id="Name"
              label="Full Name"
              label-for="name"
              description="Please write your full name here."
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
              id="UName"
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
          </b-form>
      </vs-sidebar-item>

      

      <div class="footer-sidebar" slot="footer">
        <vs-button @click="onSubmit" style="border-radius:5px; margin:5em auto;" icon="add" color="warning" type="flat">Add</vs-button>
      </div>

    </vs-sidebar>
    </div>
  </div>
</template>

<script>
import VxCard from '../../components/vx-card/VxCard.vue';
// import {mapGetters, mapActions} from 'vuex';
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
    active: false,
    name: '',
    username:'',
    department:null,
    role: '',
    all_documents:[],
  }),
  methods: {
    onSubmit: function(e) {
      e.preventDefault()
      var newUser = {
        id: "10",
        name: this.name,
        username: this.username,
        department: this.department,
        role: this.role
      }
      this.users.push(newUser)

    },
    get_all_documents: async function() {
      const res = await axios.get('http://localhost:5000/api/documents')
      console.log(res.data.results)
      this.all_documents = res.data.results
    } ,
  },
  created() {
    this.get_all_documents()
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