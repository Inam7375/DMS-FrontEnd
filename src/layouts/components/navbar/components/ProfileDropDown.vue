<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.displayName">

    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ payloadName }}</p>
      <small>Available</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">

      <div class="con-img ml-3">
        <img  key="onlineImg" src="./useravatar.png" alt="user-img" width="50" height="50" class="rounded-full shadow-md cursor-pointer block" />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
            <router-link :to="{name: 'user', params: {username: payloadUname}}">
              <span class="ml-2">Profile</span>
            </router-link>
          </li>

          <!-- <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MailIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Inbox</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="CheckSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Tasks</span>
          </li>

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="MessageSquareIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">Chat</span>
          </li> -->


          <vs-divider class="m-1" />

          <li
            class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <router-link to="/pages/logout"><span class="ml-2">Logout</span></router-link>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
export default {
  data () {
    return {
      payloadUname : "",
      payloadName: ""
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    logout () {

      // Change role on logout. Same value as initialRole of acj.js
      this.$acl.change('admin')
      localStorage.removeItem('userInfo')

      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/pages/login').catch(() => {})
    }
  },
  created() {
    const payload = VueJwtDecode.decode(localStorage.getItem('access-token'))
    console.log(payload)
    this.payloadUname = payload['username']
    this.payloadName = payload['fullName']
    console.log(this.payloadName)
  }
}
</script>
