<template>
  <div>
      <b-alert v-if="message.length > 0" class="alert" show dismissible fade:variant="messageVariant" >{{message}}</b-alert>
      <div style="margin-bottom: 1em">
          <div class="grid grid-cols-2 gap-6">
              <div>
                <vs-button @click="addUpdate" style="border-radius:5px;" color="primary" type="filled">Add Update</vs-button>
              </div>
              <div v-show="this.$store.state.isCreator">
                <vs-checkbox style="float:right; margin-top: .5em" color="success" v-model="checkBox">Add document to completed</vs-checkbox>
              </div>
          </div>

      </div>
      <div class="grid grid-cols-12" style="margin-bottom: .5em" :key="index" v-for="(item, index) in logList">
      <div class="col-span-2" style="margin: auto">
          {{item.date}}
      </div>
      <div style="margin: auto 0px; vertical-align: text-top">
          <vs-avatar color="success" class="shadow-xl" :text="String(index+1)"/>
      </div>
      <div class="col-span-9">
          <vx-card class="custom">
                <div class="grid grid-cols-4">
                    <div class="textchange">
                        Forwarded To :
                    </div>
                    <div class="textcolor">
                        {{item.forwardedToUname}}
                    </div>
                    <div  class="textchange">
                        Forwarded To Dep :
                    </div>
                    <div class="textcolor">
                        {{item.forwardedDep}}
                    </div>
                    <div class="textchange">
                        Objection : 
                    </div>
                    <div class="textcolor">
                        {{item.objection}}
                    </div>
                    <div class="textchange">
                        Status : 
                    </div>
                    <div class="textcolor">
                        {{sequence[index][0]}}
                    </div>
                    <div class="textchange">
                        Comments : 
                    </div>
                    <div class="col-span-3 textcolor">
                        {{item.comments}}
                    </div>
                </div>      
            </vx-card>
        </div>
      </div>
      <div class="parentx">
      <vs-popup class="holamundo"  title="Add Update" :active.sync="popupActivo">
          <b-form @submit="onSubmit" @submit.stop.prevent>
            <div class="grid grid-cols-2 gap-4"  style="color:#101639">
              <div>
                 <b-form-group
                    class="text-xl"
                    id="ForwardTo"
                    label="Forward To Username"
                    label-for="forwardToUname"
                  >
                    <b-form-input
                      id="forwardedToUname"
                      v-model="forwardedToUname"
                      type="text"
                      placeholder="John123"
                      required
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    class="text-xl"
                    id="Objection"
                    label="Objection (if any)"
                    label-for="objection"
                  >
                    <b-form-input
                      id="objection"
                      v-model="objection"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>

              </div>
              <div>
                <b-form-group
                class="text-xl"
                id="ForwardedDep"
                label="Forward To Department"
                label-for="forwardedDep"
                >
                    <b-form-input
                        id="forwardedDep"
                        v-model="forwardedDep"
                        type="text"
                        placeholder="Computer Science"
                        required
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    class="text-xl"
                    id="Status"
                    label="Status"
                    label-for="status"
                  >
                    <b-form-input
                      disabled
                      id="status"
                      v-model="status"
                      type="text"
                      required
                    ></b-form-input>
                  </b-form-group>
                
              </div>
            </div>
                <b-form-group
                        class="text-xl"
                        id="Comments"
                        label="Comments"
                        label-for="comments"
                    >
                        <b-form-input
                        id="comments"
                        v-model="comments"
                        type="text"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-button style="border-radius:5px; margin: 1em auto; background-color:#7367F0" icon="add" color="primary" type="submit">Update</b-button>
            </b-form>

        
      </vs-popup>
    </div>
        <vs-popup class="holamundo"  title="Confirmation" :active.sync="popupActivo2">
            <p style="font-size:1.5em">Mark Document As Completed</p>
            <br><br>
            <div class="grid grid-cols-2 gap-4"  style="color:#101639">
                <div>
                    <vs-button style="width:100%" @click="popupActivo2=false" color="danger" type="border">Cancel</vs-button>
                </div>
                <div>
                    <vs-button style="width:100%" @click="confirmComplete" color="success" type="border">Confirm</vs-button>
                </div>
            </div>

        </vs-popup>
    </div>

</template>

<script>
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
export default{
    data: () => ({
        docID : "",
        popupActivo: false,
        popupActivo2: false,
        checkBox : false,
        forwardedToUname : "",
        forwardedDep: "",
        objection: "",
        comments: "",
        status: "Pending",
        sequence: [],
        logList : [],
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
onReset(){
        this.forwardedToUname ='',
        this.forwardedDep='',
        this.objection='',
        this.comments=''
},
        confirmComplete: async function() {
            if(this.checkBox){
                const response = await axios.put('http://localhost:5000/api/updatedocuments' , {'docID': this.$route.params.docID})
                 this.showAlert(response)
            }
            this.popupActivo2 = false
        },

        addUpdate : function() {
            
            if(this.checkBox != true){
                this.popupActivo=true
            } else {
                this.popupActivo2=true
            }
        },

        getLogs : async function(){
            const res = await axios.get(`http://localhost:5000/api/logs/${this.$route.params.docID}`)
            if (res.status == 200){
                this.docID = this.$route.params.docID
                this.logList = res.data.results.logList
                if (res.data.sequence){
                    this.sequence = res.data.sequence.sequence
                    this.sequence.push(['Pending'])
                }else{
                    this.sequence.push(['Pending'])
                }
            }
        },
        onSubmit : async function(){
            var objToday = new Date(),
                weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                dayOfWeek = weekday[objToday.getDay()],
                domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
                dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
                months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                curMonth = months[objToday.getMonth()],
                curYear = objToday.getFullYear()

            var today = String(dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear)

            const newLog = {
                docID: this.$route.params.docID,
                forwardedToUname : this.forwardedToUname,
                forwardedDep : this.forwardedDep,
                objection : this.objection,
                status : this.status,
                comments : this.comments,
                date: today
            }
            this.logList.push(newLog)
            this.popupActivo = false
            const payload = VueJwtDecode.decode(localStorage.getItem('access-token'))
            const username = payload['username']
            if (this.sequence.length > 0){
                this.sequence[this.sequence.length - 1] = ['Recieved']
            }
            this.sequence.push(['Pending']) 
            const log_api_resp = await axios.put(`http://localhost:5000/api/logs/${this.$route.params.docID}`, newLog)
            const approved_docs_api_resp = await axios.put(`http://localhost:5000/api/userapproveddocuments/${username}`, {'docID' : this.$route.params.docID})
            const notification_api_resp = await axios.put(`http://localhost:5000/api/usernotify/${username}`, {'docID' : this.$route.params.docID})
            this.showAlert(log_api_resp)
            this.Reset()
        }
    },
    created(){
        this.isCreator = this.$store.state.isCreator
        this.getLogs()
    },
}
</script>
<style lang="scss">
.alert{
 text-align: center;
 width: 750px;
 height: 40px;
 font-weight: bold;
}
.custom {
  background-color: #10163a;
}
.textchange {
  color: aliceblue;
}
.textcolor {
  color: rgba(234, 239, 243, 0.829);
}
</style>