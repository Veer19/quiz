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
                    <base-input class="input-group-alternative mb-3"
                                placeholder="Description"
                                v-validate="'required'"
                                name="description"
                                v-model="quizObj.description">
                    </base-input>
                    <div class="error">{{ errors.first('description') }}</div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-lg-12 col-md-12 col-sm-12"
                                     v-for="(question, questionNumber) in quizObj.questions" :key="questionNumber">
                                     <base-input class="input-group-alternative mb-3"
                                                :placeholder="'Question '+(questionNumber+1)"
                                                v-validate="'required'"
                                                :name="'Question '+(questionNumber+1)"
                                                v-model="quizObj.questions[0].text">
                                    </base-input>
                                    <div class="error">{{ errors.first('Question '+(questionNumber+1)) }}</div>
                                    <br>
                                    <div class="col-lg-6 col-md-6 col-sm-12"
                                        v-for="(option, optionNumber) in quizObj.questions[questionNumber].options" :key="optionNumber">
                                        <button type="button"
                                                v-b-tooltip.hover.top
                                                :title="option"
                                                class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                            <div>
                                                <span class="optionAlpha" v-if="optionNumber==0">A</span>
                                                <span class="optionAlpha" v-if="optionNumber==1">B</span>
                                                <span class="optionAlpha" v-if="optionNumber==2">C</span>
                                                <span class="optionAlpha" v-if="optionNumber==3">D</span>
                                                <base-input class="input-group-alternative mb-3 optionInput"
                                                            :placeholder="'Option '+(optionNumber+1)"
                                                            v-validate="'required'"
                                                            :name="'Option '+(optionNumber+1)"
                                                            v-model="quizObj.questions[questionNumber].options[optionNumber]">
                                                </base-input>
                                            </div>
                                        </button>
                                    </div>
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
  Vue.use(VueClipboard)
  export default {
    directives: {
      'b-tooltip': BTooltipDirective
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
.optionInput{
    height: 100%;
    width: 100%;
    margin: 5px 0 0 5px;
}
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
