<template>
    <div v-if="testObj">
      
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <stats-card :title="'Question ' + testObj.questions[currentQuestionNumber-1].number"
                                type="gradient-red"
                                :sub-title="testObj.questions[currentQuestionNumber-1].text"
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
                                     v-for="(option, key) in testObj.questions[currentQuestionNumber-1].options" :key="key">
                                    <button type="button"
                                            :style="selectedColor(testObj.questions[currentQuestionNumber-1].selected == key)"
                                            v-b-tooltip.hover.top
                                            :title="option"
                                            class="btn-icon-clipboard" data-clipboard-text="air-baloon" @click="optionSelected(key)">
                                        <div>
                                            <span class="optionAlpha">{{key}}</span>
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
              
              <router-link :to="'/test/'+testId+'/'+ (--currentQuestionNumber)">
                          <base-button type="primary" v-if="currentQuestionNumber==1" disabled style="margin-right: 16px">Previous</base-button>
                          <base-button type="primary" v-else style="margin-right: 16px">Previous</base-button>
              </router-link>
              <base-button type="success" v-if="currentQuestionNumber==testObj.questions.length" @click="finishPopup=true">Finish</base-button>
              <router-link v-else :to="'/test/'+testId+'/'+ (++currentQuestionNumber)">
                          <base-button type="success">Next</base-button>
              </router-link>
              <base-button v-if="testObj.questions[currentQuestionNumber-1].marked" type="warning" class="float-right" style="margin-right: 16px" @click="unmark(currentQuestionNumber)">Unmark</base-button>
              <base-button v-else type="warning" class="float-right" @click="mark(currentQuestionNumber)">Mark for Review</base-button> 
            </div>
            <div>
                <modal :show.sync="finishPopup">
                  <template slot="header">
                      <h3 class="modal-title" id="exampleModalLabel">Finish Quiz</h3>
                  </template>
                  <div>
                    Are you sure you want to submit your answers?
                  </div>
                  <template slot="footer">
                      <base-button type="secondary" @click="finishPopup = false">Close</base-button>
                      <base-button type="primary" @click="submitAnswers">Submit</base-button>
                  </template>
              </modal>

            </div>
           
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
  import firebaseApp from '../../firebaseConfig';
  Vue.use(VueClipboard)
  
  export default {
    directives: {
      'b-tooltip': BTooltipDirective
    },
    props:{
        testObj:Object,
        testId:String,
        uid:String
    },
    data() {
      return {
        questionLoaded:false,
        onclk:false,
        finishPopup:false
      }
    },
    methods: {
      submitAnswers(){
        console.log(this.testObj)
        let answers = this.testObj.questions.map(q=>{return q.selected})
        console.log(answers)
        firebaseApp.db.doc("tests/"+this.testObj.id+"/answers/" + this.uid).set({
          "answerArray":answers,
          "answeredBy":this.uid
        }).then(snapshot=>{
          this.$router.push("/registered/")
        })
        //PUSH ANSWERS
      },
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      },
      selectedColor(bool){
        if(bool){
          return {'background':'#2DCEBA'}
        }
      },
      mark(currentQuestionNumber){
          this.testObj.questions[currentQuestionNumber-1].marked = true;
          this.$forceUpdate()
      },
      unmark(currentQuestionNumber){
        
          this.testObj.questions[currentQuestionNumber-1].marked = false;
          this.$forceUpdate()
      },
      optionSelected(key){
        if(this.testObj.questions[this.currentQuestionNumber-1].selected == key){
          this.testObj.questions[this.currentQuestionNumber-1].selected = ""
        }
        else {
          this.testObj.questions[this.currentQuestionNumber-1].selected = key
        }
        
        this.$forceUpdate()
      }
    },
    // beforeMount(){
      
    //   this.testObj.push({'marked':false,
    //   'selected':""})
    //   console.log(testObj.data())
    // },
    computed:{
        currentQuestionNumber: {
          get(){
            return this.$route.params.questionNumber
          },
          set(){
            return this.$route.params.questionNumber
          }
        }
    },
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
