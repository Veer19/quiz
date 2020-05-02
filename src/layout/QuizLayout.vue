<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Quiz"
      title="Quiz"
    >
      <template slot="links">
       <div  v-for="question in testObj.questions" v-bind:key="question.number">
        <sidebar-item v-if="question.selected != '' && !question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-check-bold', path: '/test/'+testId+'/'+question.number}"/>
        <sidebar-item v-if="question.selected == '' && !question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-planet text-blue', path: '/test/'+testId+'/'+question.number}"/>
        <sidebar-item v-if="question.selected == '' && question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-active-40', path: '/test/'+testId+'/'+question.number}"/>
        <sidebar-item v-if="question.selected != '' && question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-glasses-2', path: '/test/'+testId+'/'+question.number}"/>
       </div>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view v-if="testObj" :testId="testId" :testObj="testObj" ></router-view>
        </fade-transition>
      </div>
      
        
            
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';
  import firebaseApp from '../firebaseConfig';
  import firebase from 'firebase'

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
        testObj:{},
        testId:Number,
        // onclk:false
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      
    },
    mounted(){
      // console.log(this.$route.params.testId)
      //GET MATCH QUIZ
      this.testId = this.$route.params.testId
      console.log(this.testId)
      firebaseApp.db.doc("tests/"+this.testId).get().then(snapshot=>{
        this.testObj = snapshot.data()
        this.testObj.questions.forEach(q=>{
          q['marked']=false,
          q['selected']=false
        })
      })
      
    }

  };
</script>
<style lang="scss">
</style>
