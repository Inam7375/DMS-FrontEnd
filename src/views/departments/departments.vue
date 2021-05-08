<template>
    <div>
        <div style="margin-bottom: 1em">
            <vs-button @click="popupActivo=true" style="border-radius:5px" color="primary" type="filled">Add Document</vs-button>
        </div><br>
        <div class="grid grid-cols-3 gap-4">
            <vx-card :key="item._id" v-for="(item, index) in allDepartments">
                <div class="grid grid-cols-5">
                    <div>
                        Name : <br>
                        HOD :  <br>
                        About :
                    </div>
                    <div class="col-span-4">
                        {{item._id}} <br>
                        {{item.depHOD}} <br>
                        {{item.about}} 
                    </div>
                    <div class="col-start-5 grid grid-cols-2">
                        <div>
                            <vs-button  @click="event(item._id, index)" radius size="large" line-position="left" color="success" type="flat" icon="edit"></vs-button>
                        </div>
                        <div>
                            <vs-button radius size="large" color="danger" type="flat" icon="delete"></vs-button>
                        </div>
                    </div>
                </div>
            </vx-card>
        </div>
        <div class="parentx">
      <vs-popup class="holamundo"  title="Add Department" :active.sync="popupActivo">
          <b-form @submit.stop.prevent>
                <b-form-group
                class="text-xl"
                id="DepartmentName"
                label="Department Name"
                label-for="depName"
                description="Write department name here.."
                >
                <b-form-input
                    id="depName"
                    v-model="depName"
                    type="text"
                    placeholder="Computer Science"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-group
                class="text-xl"
                id="HOD"
                label="Department HOD"
                label-for="depHOD"
                description="Enter the name of HOD."
                >
                <b-form-input
                    id="depHOD"
                    v-model="depHOD"
                    type="text"
                    placeholder="John Doe"
                    required
                ></b-form-input>
                </b-form-group>

                <b-form-textarea
                id="textarea"
                v-model="about"
                placeholder="Enter description..."
                rows="1"
                max-rows="6"
                ></b-form-textarea>

                <pre class="mt-3 mb-0">{{ text }}</pre>

          </b-form>

        <vs-button @click="onSubmit" style="border-radius:5px; margin: 1em auto;" icon="add" color="warning" type="flat">Add</vs-button>
      </vs-popup>

        <vs-sidebar position-right  parent="body" default-index="1"  color="primary" class="sidebarx" spacer v-model="active">
            <div class="header-sidebar" slot="header">
                <h4>
                Update Department
                </h4>

            </div>
            <b-form @submit.stop.prevent>
                <vs-sidebar-item index="1">
                    <b-form-group
                    class="text-xl"
                    id="DepartmentName"
                    label="Department Name"
                    label-for="depName"
                    description="Write department name here.."
                    >
                    <b-form-input
                        id="depName"
                        disabled
                        v-model="depName"
                        type="text"
                        placeholder="Computer Science"
                        required
                    ></b-form-input>
                    </b-form-group>
                </vs-sidebar-item>

                <vs-sidebar-item index="2">

                    <b-form-group
                    class="text-xl"
                    id="HOD"
                    label="Department HOD"
                    label-for="depHOD"
                    description="Enter the name of HOD."
                    >
                    <b-form-input
                        id="depHOD"
                        v-model="depHOD"
                        type="text"
                        placeholder="John Doe"
                        required
                    ></b-form-input>
                    </b-form-group>
                </vs-sidebar-item>

                <vs-sidebar-item index="3" >

                    <b-form-textarea
                    id="textarea"
                    v-model="about"
                    placeholder="Enter description..."
                    rows="1"
                    max-rows="6"
                    ></b-form-textarea>

                    <pre class="mt-3 mb-0">{{ text }}</pre>
                </vs-sidebar-item>


            </b-form>
            <div class="footer-sidebar" slot="footer">
                <vs-button @click="onSubmitUpdate(index)" style="border-radius:5px; margin: 1em auto;" icon="add" color="warning" type="flat">Update</vs-button>
            </div>
        </vs-sidebar>
    </div>
    </div>
</template>

<script>
import VxCard from '../../components/vx-card/VxCard.vue';
import axios from 'axios';
export default {
    components: {
        VxCard
    },
    data: () => ({
        popupActivo:false,
        active: false,
        depName: "",
        depHOD: "",
        about: "",
        index: null,
        allDepartments: []
    }),
    methods: {
        event: function(department, index){
            this.active = !this.active
            this.depName = department
            this.index = index
        },
        getAllDepartments: async function(){
            const res = await axios.get("http://localhost:5000/api/departments")
            this.allDepartments = res.data.results
            console.log(this.allDepartments)
        },
        onSubmit : async function() {
            var newDepartment = {
                _id: this.depName,
                depHOD: this.depHOD,
                about: this.about
            }
            this.allDepartments.push(newDepartment)
            this.popupActivo = false
            const res = await axios.post("http://localhost:5000/api/departments", newDepartment)
            console.log(res.data.msg)
        },
        onSubmitUpdate : async function(index){
            var newDepartment = {
                _id: this.depName,
                depHOD: this.depHOD,
                about: this.about
            }
            console.log(index)
            this.allDepartments[index].depHOD = this.depHOD
            this.allDepartments[index].about = this.about
            this.active = false
            const res = await axios.put("http://localhost:5000/api/departments", newDepartment)
            console.log(res.data.msg)
        }
    },
    created() {
        this.getAllDepartments()
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