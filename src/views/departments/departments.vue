<template>
  <div>
    <b-alert
      v-if="message.length > 0"
      class="alert"
      show
      dismissible
      fade:variant="messageVariant"
      >{{ message }}</b-alert
    >
    <div style="margin-bottom: 1em">
      <vs-button
        @click="popupActivo = true"
        style="border-radius: 5px"
        color="primary"
        type="filled"
        >Add Department</vs-button
      >
    </div>
    <br />
    <div class="grid grid-cols-3 gap-4">
      <vx-card
        class="custom"
        :key="item._id"
        v-for="(item, index) in allDepartments"
      >
        <div class="grid grid-cols-5">
          <div class="textchange">
            Name : <br />
            HOD : <br />
            About :
          </div>
          <div class="col-span-4 textchange">
            {{ item._id }} <br />
            {{ item.depHOD }} <br />
            {{ item.about }}
          </div>
          <div class="col-start-5 grid grid-cols-2">
            <div>
              <vs-button
                @click="event(item._id, index)"
                radius
                size="large"
                line-position="left"
                color="success"
                type="flat"
                icon="edit"
              ></vs-button>
            </div>
            <div>
              <vs-button
                @click="delDepartment(item._id)"
                radius
                size="large"
                color="danger"
                type="flat"
                icon="delete"
              ></vs-button>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="parentx">
      <vs-popup
        class="holamundo"
        title="Add Department"
        :active.sync="popupActivo"
        style="color: #101639"
      >
        <b-form @submit="onSubmit" @submit.stop.prevent>
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
          <b-button
            type="submit"
            style="
              border-radius: 5px;
              margin: 1em auto;
              background-color: #7367f0;
            "
            icon="add"
            color="primary"
            >Add</b-button
          >
          <!-- <pre class="mt-3 mb-0">{{ text }}</pre> -->
        </b-form>
      </vs-popup>

      <vs-sidebar
        position-right
        parent="body"
        default-index="1"
        color="primary"
        class="sidebarx"
        spacer
        v-model="active"
      >
        <div class="header-sidebar" slot="header">
          <h4>Update Department</h4>
        </div>
        <b-form @submit="onSubmitUpdate(index)" @submit.stop.prevent>
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

          <vs-sidebar-item index="3">
            <b-form-textarea
              id="textarea"
              v-model="about"
              placeholder="Enter description..."
              rows="1"
              max-rows="6"
            ></b-form-textarea>
          </vs-sidebar-item>
          <div class="footer-sidebar" slot="footer">
            <b-button
              style="
                border-radius: 5px;
                margin: 1em auto;
                background-color: #7367f0;
              "
              icon="add"
              type="submit"
              >Update</b-button
            >
          </div>
        </b-form>
      </vs-sidebar>
    </div>
  </div>
</template>

<script>
import VxCard from "../../components/vx-card/VxCard.vue";
import axios from "axios";
export default {
  components: {
    VxCard,
  },
  data: () => ({
    popupActivo: false,
    active: false,
    depName: "",
    depHOD: "",
    about: "",
    index: null,
    allDepartments: [],
    message: "",
    messageVariant: "",
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
    onReset() {
      // Reset our form values
      (this.depName = ""), (this.depHOD = "");
      this.about = "";
    },
    event: function (department, index) {
      this.active = !this.active;
      this.depName = department;
      this.index = index;
    },

    getAllDepartments: async function () {
      const res = await axios.get("http://localhost:5000/api/departments");
      this.allDepartments = res.data.results;
      console.log(this.allDepartments);
    },
    onSubmit: async function () {
      var newDepartment = {
        _id: this.depName.toUpperCase(),
        depHOD: this.depHOD,
        about: this.about,
      };
      const response = await axios.post(
        "http://localhost:5000/api/departments",
        newDepartment
      );
      this.showAlert(response);
      if (response.status == "201") {
        this.allDepartments.push(newDepartment);
        this.popupActivo = false;
        this.onReset();
      }
    },
    onSubmitUpdate: async function (index) {
      var newDepartment = {
        _id: this.depName,
        depHOD: this.depHOD,
        about: this.about,
      };
      console.log(index);
      this.allDepartments[index].depHOD = this.depHOD;
      this.allDepartments[index].about = this.about;
      this.active = false;
      const response = await axios.put(
        "http://localhost:5000/api/departments",
        newDepartment
      );
      this.showAlert(response);
    },
    delDepartment: async function (id) {
      this.allDepartments = this.allDepartments.filter((item) => {
        return item._id !== id;
      });
      const response = await axios.delete(
        `http://localhost:5000/api/department/${id}`
      );
      this.showAlert(response);
    },
  },
  created() {
    this.getAllDepartments();
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
.custom {
  background-color: #10163a;
}
.textchange {
  color: aliceblue;
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