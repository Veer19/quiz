<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Quiz"
      title="Quiz"
    >
      <template slot="links">
       <div  v-for="question in quizObj.questions" v-bind:key="question.number">
        <sidebar-item v-if="question.selected != '' && !question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-check-bold', path: '/quiz/'+quizId+'/'+question.number}"/>
        <sidebar-item v-if="question.selected == '' && !question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-planet text-blue', path: '/quiz/'+quizId+'/'+question.number}"/>
        <sidebar-item v-if="question.selected == '' && question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-active-40', path: '/quiz/'+quizId+'/'+question.number}"/>
        <sidebar-item v-if="question.selected != '' && question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-glasses-2', path: '/quiz/'+quizId+'/'+question.number}"/>
       </div>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view v-if="quizObj" :quizId="quizId" :quizObj="quizObj" ></router-view>
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
        quizObj:{},
        quizId:Number,
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
      // console.log(this.$route.params.quizId)
      //GET MATCH QUIZ
      this.quizId = this.$route.params.quizId
      console.log(this.quizId)
      firebaseApp.db.doc("tests/"+this.quizId).get().then(snapshot=>{
        this.quizObj = snapshot.data()
        this.quizObj.questions.forEach(q=>{
          q['marked']=false,
          q['selected']=false
        })
      })
      
    }

  };
</script>
<style lang="scss">
</style>
