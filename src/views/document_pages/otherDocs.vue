<template lang="html">
  <div>
    <b-alert v-if="message.length > 0" class="alert" show dismissible fade:variant="messageVariant" >{{message}}</b-alert>
    <div>
      <vx-card style="margin-bottom: 2em;">
        <div class="grid grid-cols-2 gap-8">
          <div>
            <p class="text-3xl">Documents List</p>
            <p>You can search all the documents here.</p>
          </div>
          <div>
            <vs-button @click="popupActivo=true" style="border-radius:5px; margin-left:auto; margin-top:.5em" color="primary" type="filled" icon="event_note">Add Document</vs-button>
          </div>
        </div>
      </vx-card>
      <vs-tabs :color="colorx"  alignment="fixed" >
          <div class="con-tab-ejemplo">
            <vs-tab @click="colorx = 'rgb(16, 233, 179)'" label="Created Documents">
              <div class="con-tab-ejemplo">
                
                <vs-table max-items="5" search pagination :data="all_documents">
                  <div slot="thead" class="grid grid-cols-8 gap-4">
                    <vs-th sort-key="_id" style="flex-grow:1">
                      Document ID
                    </vs-th>
                    <vs-th sort-key="title" style="flex-grow:1">
                      Title
                    </vs-th>
                    <vs-th sort-key="created_by_user" style="flex-grow:1"> 
                      Created By
                    </vs-th>
                    <vs-th  sort-key="created_by_department" style="flex-grow:1"> 
                      From Dep
                    </vs-th>
                    <vs-th sort-key="target_user" style="flex-grow:1">
                      Forwarded To  
                    </vs-th>
                    <vs-th sort-key="target_department" style="flex-grow:1">
                      Forwarded Dep  
                    </vs-th>
                    <vs-th sort-key="target_department" style="flex-grow:1">
                      Date Created  
                    </vs-th>
                    <vs-th sort-key="role" style="flex-grow:1">
                      Actions  
                    </vs-th>
                  </div>

                  <div slot-scope="{data}">
                    <vs-tr :state="tr.role == 'Super Admin'?'success':tr.role == 'Admin'?'primary':null" :key="indextr" v-for="(tr, indextr) in data" class="grid grid-cols-8 gap-4">
                      <vs-td :data="data[indextr]._id">
                        {{data[indextr]._id}}
                      </vs-td>
                      <vs-td :data="data[indextr].title">
                        {{data[indextr].title}}
                      </vs-td>

                      <vs-td :data="tr.created_by_user">
                        {{tr.created_by_user}}
                      </vs-td>

                      <vs-td :data="tr.created_by_department">
                        {{tr.created_by_department}} 
                      </vs-td>

                      <vs-td :data="tr.target_user">
                        {{tr.target_user}}
                      </vs-td>

                      <vs-td :data="tr.target_department">
                        {{tr.target_department}}
                      </vs-td>

                      <vs-td :data="tr.date_created">
                        {{tr.date_created}}
                      </vs-td>
                      <vs-td>
                          <div>
                            <router-link :to="{name: 'document', params: {docID: tr._id}}">
                              <vs-button @click="toggleCreator" radius size="large" line-position="left" color="success" type="flat" icon="edit"></vs-button>
                            </router-link>
                          </div>
                      </vs-td>
                    </vs-tr>
                  </div>
                </vs-table>
              </div>
            </vs-tab>
            <vs-tab @click="colorx = 'success'" label="Completed Documents">
              <div class="con-tab-ejemplo">
                
                <vs-table max-items="5" search pagination :data="all_documents_completed">
                  <div slot="thead" class="grid grid-cols-8 gap-4">
                    <vs-th sort-key="_id" style="flex-grow:1">
                      Document ID
                    </vs-th>
                    <vs-th sort-key="title" style="flex-grow:1">
                      Title
                    </vs-th>
                    <vs-th sort-key="created_by_user" style="flex-grow:1"> 
                      Created By
                    </vs-th>
                    <vs-th  sort-key="created_by_department" style="flex-grow:1"> 
                      From Dep
                    </vs-th>
                    <vs-th sort-key="target_user" style="flex-grow:1">
                      Forwarded To  
                    </vs-th>
                    <vs-th sort-key="target_department" style="flex-grow:1">
                      Forwarded Dep  
                    </vs-th>
                    <vs-th sort-key="target_department" style="flex-grow:1">
                      Date Created  
                    </vs-th>
                    <vs-th sort-key="role" style="flex-grow:1">
                      Actions  
                    </vs-th>
                  </div>

                  <div slot-scope="{data}">
                    <vs-tr :state="tr.role == 'Super Admin'?'success':tr.role == 'Admin'?'primary':null" :key="indextr" v-for="(tr, indextr) in data" class="grid grid-cols-8 gap-4">
                      <vs-td :data="data[indextr]._id">
                        {{data[indextr]._id}}
                      </vs-td>
                      <vs-td :data="data[indextr].title">
                        {{data[indextr].title}}
                      </vs-td>

                      <vs-td :data="tr.created_by_user">
                        {{tr.created_by_user}}
                      </vs-td>

                      <vs-td :data="tr.created_by_department">
                        {{tr.created_by_department}} 
                      </vs-td>

                      <vs-td :data="tr.target_user">
                        {{tr.target_user}}
                      </vs-td>

                      <vs-td :data="tr.target_department">
                        {{tr.target_department}}
                      </vs-td>

                      <vs-td :data="tr.date_created">
                        {{tr.date_created}}
                      </vs-td>
                      <vs-td>
                          <div>
                            <router-link :to="{name: 'document', params: {docID: tr._id}}">
                              <vs-button radius size="large" line-position="left" color="success" type="flat" icon="edit"></vs-button>
                            </router-link>
                          </div>
                      </vs-td>
                    </vs-tr>
                  </div>
                </vs-table>
              </div>
            </vs-tab>
            <vs-tab @click="colorx = 'warning'" label="Pending">
              <div class="con-tab-ejemplo">
                
                <vs-table max-items="5" search pagination :data="all_documents_pending">
                  <div slot="thead" class="grid grid-cols-8 gap-4">
                    <vs-th sort-key="_id" style="flex-grow:1">
                      Document ID
                    </vs-th>
                    <vs-th sort-key="title" style="flex-grow:1">
                      Title
                    </vs-th>
                    <vs-th sort-key="created_by_user" style="flex-grow:1"> 
                      Created By
                    </vs-th>
                    <vs-th  sort-key="created_by_department" style="flex-grow:1"> 
                      From Dep
                    </vs-th>
                    <vs-th sort-key="target_user" style="flex-grow:1">
                      Forwarded To  
                    </vs-th>
                    <vs-th sort-key="target_department" style="flex-grow:1">
                      Forwarded Dep  
                    </vs-th>
                    <vs-th sort-key="target_department" style="flex-grow:1">
                      Date Created  
                    </vs-th>
                    <vs-th sort-key="role" style="flex-grow:1">
                      Actions  
                    </vs-th>
                  </div>

                  <div slot-scope="{data}">
                    <vs-tr :state="tr.role == 'Super Admin'?'success':tr.role == 'Admin'?'primary':null" :key="indextr" v-for="(tr, indextr) in data" class="grid grid-cols-8 gap-4">
                      <vs-td :data="data[indextr]._id">
                        {{data[indextr]._id}}
                      </vs-td>
                      <vs-td :data="data[indextr].title">
                        {{data[indextr].title}}
                      </vs-td>

                      <vs-td :data="tr.created_by_user">
                        {{tr.created_by_user}}
                      </vs-td>

                      <vs-td :data="tr.created_by_department">
                        {{tr.created_by_department}} 
                      </vs-td>

                      <vs-td :data="tr.target_user">
                        {{tr.target_user}}
                      </vs-td>

                      <vs-td :data="tr.target_department">
                        {{tr.target_department}}
                      </vs-td>

                      <vs-td :data="tr.date_created">
                        {{tr.date_created}}
                      </vs-td>
                      <vs-td>
                          <div>
                            <router-link :to="{name: 'document', params: {docID: tr._id}}">
                              <vs-button radius size="large" line-position="left" color="success" type="flat" icon="edit"></vs-button>
                            </router-link>
                          </div>
                      </vs-td>
                    </vs-tr>
                  </div>
                </vs-table>
              </div>
            </vs-tab>
          </div>

            
        </vs-tabs>
    </div>
    <div class="parentx">
      <vs-popup class="holamundo"  style="color:#101639" title="Add User" :active.sync="popupActivo">
          <b-form @submit.stop.prevent>
            <b-form-group
              class="text-xl"
              id="Title"
              label="Title"
              label-for="title"
            >
              <b-form-input
                id="title"
                v-model="title"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <div class="grid grid-cols-2 gap-4">
              <div>

                 <b-form-group
                    class="text-xl"
                    id="CreatedBy"
                    label="Created By"
                    label-for="frmUser"
                    description="Name of person creating the document."
                  >
                    <b-form-input
                      disabled
                      id="frmUser"
                      v-model="frmUser"
                      type="text"
                      placeholder="John123"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="text-xl"
                    id="ForwardedTo"
                    label="Forwarded To"
                    label-for="targetUser"
                    description="Name of the final destination person."
                  >
                    <b-form-input
                      id="targetUser"
                      v-model="targetUser"
                      type="text"
                      placeholder="Steven Smith"
                      required
                    ></b-form-input>
                  </b-form-group>

              </div>
              <div>
                <b-form-group
                  class="text-xl"
                  id="FromDep"
                  label="From Department"
                  label-for="frmDep"
                  description="Name of the department document created from."
                >
                  <b-form-input
                    id="frmDep"
                    v-model="frmDep"
                    type="text"
                    placeholder="Computer Science"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  class="text-xl"
                  id="ForwardDep"
                  label="Target Department"
                  label-for="targetDep"
                  description="Name of the target department."
                >
                  <b-form-input
                    id="targetDep"
                    v-model="targetDep"
                    type="text"
                    required
                  ></b-form-input>
                </b-form-group>

              </div>
            </div>
            <div>
            <b-form-textarea
              id="textarea"
              v-model="dsc"
              placeholder="Enter description..."
              rows="1"
              max-rows="6"
            ></b-form-textarea>

            <pre class="mt-3 mb-0">{{ text }}</pre>
          </div>
          </b-form>

        <vs-button @click="onSubmit" style="border-radius:5px; margin: 1em auto;" icon="add" color="warning" type="flat">Add</vs-button>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import VxCard from '../../components/vx-card/VxCard.vue';
import VueJwtDecode from 'vue-jwt-decode';
// import {mapGetters, mapActions} from 'vuex';
import axios from 'axios';
export default {
components: {
  VxCard,
},
data:()=>({
    selected:false,
    popupActivo: false,
    colorx: 'rgb(16, 233, 179)',
    colorx2: 'rgb(16, 233, 179)',
    payloadUname: "",
    docID : "",
    title: "",
    frmUser: "",
    frmDep: "",
    targetUser: "",
    targetDep: "",
    dsc: "",
    all_documents:[],
    all_documents_created:[],
    all_documents_completed:[],
    all_documents_pending:[],
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
    toggleCreator : function() {
      localStorage.setItem('isCreator', true)
      this.$store.state.isCreator = true
      // this.$store.dispatch('toggleCreator')
    },
    genRandNum: function() {
      var lenX = 2;
      while (lenX < 5){
          var x = Math.floor((Math.random() * 100000) + 1);
          var lenX = x.toString().length;
      }
      document.getElementById("docID").value = x;
    },
    onSubmit: async function(e) {
      e.preventDefault()
      var newDocument = {
        _id: this.docID,
        title: this.title,
        created_by_user: this.frmUser,
        created_by_uname: this.payloadUname,
        created_by_department: this.frmDep,
        target_user: this.targetUser,
        target_department: this.targetDep,
        description: this.dsc,
      }
      this.all_documents.push(newDocument)
      console.log(newDocument['_id'])
      this.popupActivo = false
      const response = await axios.post('http://localhost:5000/api/documents', newDocument)
       this.showAlert(response)
      console.log(response.data.msg)
    },

    get_all_documents: async function() {
      const payload = VueJwtDecode.decode(localStorage.getItem('access-token'))
      this.payloadUname = payload['username']
      this.frmUser = payload['username']
      const res = await axios.get(`http://localhost:5000/api/userdocuments/${this.payloadUname}`)
      console.log(res.data.results)
      this.all_documents = res.data.results
    } ,

    get_all_documents_completed: async function() {
      const payload = VueJwtDecode.decode(localStorage.getItem('access-token'))
      this.payloadUname = payload['username']
      const res = await axios.get(`http://localhost:5000/api/usercompleteddocuments/${this.payloadUname}`)
      console.log(res.data.results)
      this.all_documents_completed = res.data.results
    } ,

    get_all_pending_documents: async function() {
      const payload = VueJwtDecode.decode(localStorage.getItem('access-token'))
      this.payloadUname = payload['username']
      const res = await axios.get(`http://localhost:5000/api/userpendingdocuments/${this.payloadUname}`)
      console.log(res.data.results)
      this.all_documents_pending = res.data.results
    } ,
  },
  created() {
    this.get_all_documents()
    this.get_all_documents_completed()
    this.get_all_pending_documents()
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
.alert{
 text-align: center;
 width: 750px;
 height: 40px;
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