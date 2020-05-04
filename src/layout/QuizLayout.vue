<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }" v-if="testObj && uid">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Quiz"
      title="Quiz"
    >
      <template slot="links" >
       <div  v-for="question in testObj.questions" v-bind:key="question.number">
        <sidebar-item :style="getColor(question.selected,question.marked)" :link="{name: 'Question '+question.number, path: '/test/'+testId+'/'+question.number}"/>
        <!-- <sidebar-item v-if="question.selected == '' && !question.marked" :link="{name: 'Question '+question.number, path: '/test/'+testId+'/'+question.number}"/>
        <sidebar-item v-if="question.selected == '' && question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-active-40', path: '/test/'+testId+'/'+question.number}"/>
        <sidebar-item v-if="question.selected != '' && question.marked" :link="{name: 'Question '+question.number, icon: 'ni ni-glasses-2', path: '/test/'+testId+'/'+question.number}"/> -->
       </div>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view  :uid="uid" :testId="testId" :testObj="testObj" ></router-view>
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
        testObj:null,
        testId:String,
        uid:String
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      getColor(sel,mark){
        if(sel != '' && !mark){
          return {'background':'#2DCEBA',"color":"white"}
        }
        else if(sel == "" && mark){
          return {'background':'blue'}
        } 
        else if(sel == "" && !mark){
          // return {'background':'red'}
        } 
        else if(sel != "" && mark){
          return {'background':'green'}
        } 
      },
      
    },
    beforeMount(){
      // console.log(this.$route.params.testId)
      //GET MATCH QUIZ
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
      this.testId = this.$route.params.testId
      console.log(this.testId)
      firebaseApp.db.doc("tests/"+this.testId).get().then(snapshot=>{
        this.testObj = snapshot.data()
        console.log(this.testObj)
        this.testObj.questions.forEach(q=>{
          q['marked']=false,
          q['selected']=false
        })
      })
      
    }

  };
</script>
<style lang="scss">
.navbar-vertical.navbar-expand-md .navbar-nav .nav-link.active:before {
  border-left: 20px solid #5e72e4 !important;
  border-radius: 0 50% 50% 0 ;
}
</style>
