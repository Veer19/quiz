<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <stats-card type="gradient-red"
                                sub-title="Enter Quiz Name and Description"
                                class="mb-4 mb-xl-0"
                    >

                        
                    </stats-card>
                    <br>
                    <br>
                    <base-input class="input-group-alternative mb-3"
                                placeholder="Title"
                                v-validate="'required'"
                                name="quizTitle"
                                v-model="quizObj.title">
                    </base-input>
                    <div class="error">{{ errors.first('quizTitle') }}</div>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" 
                                v-validate="'required'"
                                name="description"
                                v-model="quizObj.description" placeholder="Description">
                    </textarea>
                    <div class="error">{{ errors.first('description') }}</div>
                </div>
                <flat-pickr
                        v-model="quizObj.timings.from"                                               
                        class="form-control" 
                        placeholder="Select Quiz Starting Date"               
                        name="date">
                </flat-pickr>
                <flat-pickr
                        v-model="quizObj.timings.to"                                               
                        class="form-control" 
                        placeholder="Select Quiz Ending Date"               
                        name="date">
                </flat-pickr>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row"
            v-for="(question, questionNumber) in quizObj.questions" :key="questionNumber">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                     <base-input class="input-group-alternative mb-3"
                                                :placeholder="'Question '+(questionNumber+1)"
                                                v-validate="'required'"
                                                :name="'Question '+(questionNumber+1)"
                                                v-model="quizObj.questions[0].text">
                                    </base-input>
                                    <div class="error">{{ errors.first('Question '+(questionNumber+1)) }}</div>
                                    <br>
                                    <div class="row icon-examples">
                                        <div class="col-lg-6 col-md-6 col-sm-12"
                                            v-for="(option, optionNumber) in quizObj.questions[questionNumber].options" :key="optionNumber">
                                            <base-input class="input-group-alternative mb-3 optionInput"
                                                        :placeholder="'Option '+(optionNumber+1)"
                                                        v-validate="'required'"
                                                        :name="'Option '+(optionNumber+1)"
                                                        v-model="quizObj.questions[questionNumber].options[optionNumber]">
                                            </base-input>
                                        </div>
                                    </div>
                                    Correct Answer
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  Vue.use(VueClipboard)
  export default {
    directives: {
      'b-tooltip': BTooltipDirective
    },
    components:{
        flatPickr
    },
    data() {
      return {
        quizObj:{
            'title':'',
            'description':'',
            'questions':[],
            'answers':[],
            'registeredUsers':[],
            'timings':{
                'from':0,
                'to':0
            }
        }
      }
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      }
    },
    computed:{
    },
    mounted(){
        let question  = {
            'text':"",
            'options':[
              '','','',''
            ]
        }
        let answer = ''
        this.quizObj['questions'].push(question)
        this.quizObj['answers'].push(answer)
    }
  };
</script>
<style>
.row{
    margin-bottom: 20px;
}
/* .optionInput{
    height: 100%;
    width: 100%;
    margin: 10px 0 0 20px;
} */
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
