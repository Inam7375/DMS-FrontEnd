<template>
  <div>
      <div style="margin-bottom: 1em">
          <vs-button @click="popupActivo=true" style="border-radius:5px;" color="primary" type="filled">Add Update</vs-button>
      </div>
      <div class="grid grid-cols-12" style="margin-bottom: .5em" :key="index" v-for="(item, index) in logList">
      <div class="col-span-2" style="margin: auto">
          {{item.date}}
      </div>
      <div style="margin: auto 0px; vertical-align: text-top">
          <vs-avatar color="success" class="shadow-xl" :text="String(index+1)"/>
      </div>
      <div class="col-span-9">
          <vx-card>
                <div class="grid grid-cols-4">
                    <div>
                        Forwarded To :
                    </div>
                    <div>
                        {{item.forwardedToUname}}
                    </div>
                    <div>
                        Forwarded To Dep :
                    </div>
                    <div>
                        {{item.forwardedDep}}
                    </div>
                    <div>
                        Objection : 
                    </div>
                    <div>
                        {{item.objection}}
                    </div>
                    <div>
                        Status : 
                    </div>
                    <div>
                        {{sequence[index][0]}}
                    </div>
                    <div>
                        Comments : 
                    </div>
                    <div class="col-span-3">
                        {{item.comments}}
                    </div>
                </div>      
            </vx-card>
        </div>
      </div>
      <div class="parentx">
      <vs-popup class="holamundo"  title="Add User" :active.sync="popupActivo">
          <b-form @submit.stop.prevent>
            <div class="grid grid-cols-2 gap-4">
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
            </b-form>

        <vs-button @click="onSubmit" style="border-radius:5px; margin: 1em auto;" icon="add" color="info" type="flat">Update</vs-button>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default{
    data: () => ({
        docID : "",
        popupActivo: false,
        forwardedToUname : "",
        forwardedDep: "",
        objection: "",
        comments: "",
        status: "Pending",
        sequence: [],
        logList : []
    }),
    methods: {
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
                console.log(this.logList)
                console.log(this.sequence)
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
            if (this.sequence.length > 0){
                this.sequence[this.sequence.length - 1] = ['Recieved']
            }
            this.sequence.push(['Pending']) 
            const res = await axios.put(`http://localhost:5000/api/logs/${this.$route.params.docID}`, newLog)
            this.popupActivo = false

            console.log(res.msg)
        }
    },
    created(){
        this.getLogs()
    }
}
</script>