<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item v-for="question in quizObj.questions" v-bind:key="question.number" :link="{name: 'Question '+question.number, icon: 'ni ni-planet text-blue', path: '/quiz/'+quizId+'/'+question.number}"/>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view :quizObj="quizObj" ></router-view>
        </fade-transition>
      </div>
    </div>
  </div>
</template>
<script>
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
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
        quizObj:{},
        quizId:Number
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
      this.quizObj = {
        'name':"First Quiz",
        'questions':[
          {
            'number':1,
            'text':"Text Goes Here",
            'options':[
              'ans11','ans22','ans3','ans4'
            ],
            'correct':0
          },
          {
            'number':2,
            'text':"Text Goes Here",
            'options':[
              'ans1','ans2','ans3','ans4'
            ],
            'correct':0
          },
          {
            'number':3,
            'text':"Text Goes Here",
            'options':[
              'ans1','ans2','ans3','ans4'
            ],
            'correct':0
          },
          {
            'number':4,
            'text':"Text Goes Here",
            'options':[
              'ans1','ans2','ans3','ans4'
            ],
            'correct':0
          },
          
        ]
      }
    }

  };
</script>
<style lang="scss">
</style>
