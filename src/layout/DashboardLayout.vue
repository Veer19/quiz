<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Ongoing Tests',
            icon: 'ni ni-tv-2 text-primary',
            path: '/ongoing'
          }"
        />
        <sidebar-item :link="{name: 'Registered Tests', icon: 'ni ni-pin-3 text-orange', path: '/registered'}"/>  
        <sidebar-item :link="{name: 'Create Test', icon: 'ni ni-planet text-blue', path: '/create'}"/>
        
        <!-- <sidebar-item :link="{name: 'User Profile', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>
        <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>
        <sidebar-item :link="{name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/> -->

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground" v-if="uid">
      <dashboard-navbar :key="uid" :uid="uid" ></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view :key="$route.fullPath" :uid="uid" ></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase'
  import firebaseApp from '../firebaseConfig';
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary,
        uid:null
      };
    },
    mounted(){
      let self = this
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // Return UID
          self.uid = user.uid
        }
        else {
          self.$router.push('login')
        }
      });
    },

    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
