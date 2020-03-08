<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <stats-card title="Enter Quiz Name and Description"
                                type="gradient-red"
                                sub-title="SUUP"
                                class="mb-4 mb-xl-0"
                    >

                        
                    </stats-card>
                </div>
            </div>
        </base-header>

        <!-- <div class="container-fluid mt--7">
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
                                            class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                        <div>
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
        </div> -->

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
        let i=1
        let question  = {
            'number':i,
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
