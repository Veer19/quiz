<template>
    <div v-if="questionLoaded">
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            {{quizObj}}<br>
            {{answers}}
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <stats-card :title="'Question ' + quizObj.questions[currentQuestionNumber-1].number"
                                type="gradient-red"
                                :sub-title="quizObj.questions[currentQuestionNumber-1].text"
                                class="mb-4 mb-xl-0"
                    >

                        
                    </stats-card>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-lg-6 col-md-6 col-sm-12"
                                     v-for="(option, index) in quizObj.questions[currentQuestionNumber-1].options" :key="index">
                                    <button type="button"
                                            v-b-tooltip.hover.top
                                            :title="option"
                                            class="btn-icon-clipboard" data-clipboard-text="air-baloon" @click="optionSelected(option)">
                                        <div>
                                          <!-- {{quizObj.questions[currentQuestionNumber-1]}} -->
                                            <div v-if="quizObj.questions[currentQuestionNumber-1].selected == option">Selected</div>
                                            <span class="optionAlpha" v-if="index==0">A</span>
                                            <span class="optionAlpha" v-if="index==1">B</span>
                                            <span class="optionAlpha" v-if="index==2">C</span>
                                            <span class="optionAlpha" v-if="index==3">D</span>
                                            <span>{{option}}</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div >
              
              <router-link :to="'/quiz/'+quizId+'/'+ (--currentQuestionNumber)">
                          <base-button type="primary" v-if="currentQuestionNumber==1" disabled style="margin-right: 16px">Previous</base-button>
                          <base-button type="primary" v-else style="margin-right: 16px">Previous</base-button>
              </router-link>
              <router-link :to="'/quiz/'+quizId+'/'+ (++currentQuestionNumber)">
                          <base-button type="success" v-if="currentQuestionNumber==quizObj.questions.length">Finish</base-button>
                          <base-button type="success" v-else @click="status2(currentQuestionNumber,onclk)">Next</base-button>
              </router-link>
              <router-link :to="'/quiz/'+quizId+'/'+ (++currentQuestionNumber)">
                          <base-button type="warning" class="float-right" @click="mark(currentQuestionNumber)">Mark for Review and Next</base-button>
              </router-link> 
                  <base-button type="warning" class="float-right" style="margin-right: 16px" @click="unmark(currentQuestionNumber)">Unmark</base-button>
            </div>
           
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
  Vue.use(VueClipboard)
  
  export default {
    directives: {
      'b-tooltip': BTooltipDirective
    },
    props:{
        quizObj:Object,
        answers:[],
        quizId:String
        
    },
    data() {
      return {
        questionLoaded:false,
        onclk:false,
      }
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      },
      mark(currentQuestionNumber){
          this.quizObj.questions[currentQuestionNumber-1].marked = true;
      },
      unmark(currentQuestionNumber){
          this.quizObj.questions[currentQuestionNumber-1].marked = false;
 
          
      },
      optionSelected(selected){
        // this.onclk = true;
        if(this.answers[this.currentQuestionNumber-1] == selected){
          this.answers[this.currentQuestionNumber-1] = ""
          return;
        }
        this.answers[this.currentQuestionNumber-1] = selected
        console.log(this.answers)
      }
    },
    // beforeMount(){
      
    //   this.quizObj.push({'marked':false,
    //   'selected':""})
    //   console.log(quizObj.data())
    // },
    computed:{
        currentQuestionNumber: function() {
           return this.$route.params.questionNumber
        }
        
    },
    mounted(){
        // this.currentQuestionNumber = this.$route.params.questionNumber
        this.questionLoaded = true
        // console.log(this.quizObj.questions)
        // this.quizObj.questions.forEach(q=>{
        //   this.answers.push("")
        // })
        // console.log(this.answers)
    }
  };
</script>
<style>
.optionAlpha{
    background: #2DCEC9;
    text-align: center;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    display: inline-block;
    vertical-align:middle;
    color: white;
    text-decoration: none
}
.optionAlpha:after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
}
</style>
