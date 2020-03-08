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
                    <br>
                
                </div>
                
                
                <div class="container-col-lg-12 col-md-12">
                    <div class="row">
                        <div class="col">
                            <div class="card shadow">
                                <div class="card-body">
                                    <div class="row icon-examples">
                                        <div class="col-lg-4 col-md-4 col-sm-12">
                                            <button type="button"
                                                    v-b-tooltip.hover.top
                                                    :title="option"
                                                    class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                                <flat-pickr
                                                        v-model="quizObj.timings.from"                                               
                                                        class="date-picker" 
                                                        placeholder="Select Quiz Starting Date"               
                                                        name="fromdate">
                                                </flat-pickr>
                                            </button>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12">
                                            <button type="button"
                                                    v-b-tooltip.hover.top
                                                    :title="option"
                                                    class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                                <flat-pickr
                                                        v-model="quizObj.timings.to"                                               
                                                        class="date-picker" 
                                                        placeholder="Select Quiz Ending Date"               
                                                        name="todate">
                                                </flat-pickr>
                                            </button>
                                        </div>
                                        <div class="col-lg-4 col-md-4 col-sm-12">
                                            <button type="button"
                                                    v-b-tooltip.hover.top
                                                    :title="option"
                                                    class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                                    <base-dropdown >
                                                        <base-button slot="title" type="default" class="duration-picker dropdown-toggle">
                                                            Duration
                                                        </base-button>
                                                        <li v-for="i in [1,2,3,4,5]" :key="i">
                                                            <a class="dropdown-item" @click="quizObj.timings.duration = i">
                                                                {{i}} Hours
                                                            </a>
                                                        </li>
                                                    </base-dropdown>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row"
            v-for="(question, questionNumber) in quizObj.questions" :key="questionNumber">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header border-0">
                            <div class="row align-items-center">
                                <div class="col">
                                <h3 class="mb-0">{{'Question '+(questionNumber+1)}}</h3>
                                </div>
                                <div class="col text-right">
                                    <div v-if="questionNumber!=0" @click="moveUp(questionNumber)" class="rightButtons btn btn-sm btn-primary">Move Up</div>
                                    <div v-if="questionNumber!=quizObj.questions.length-1" @click="moveDown(questionNumber)" class="rightButtons btn btn-sm btn-primary">Move Down</div>
                                    <div @click="deleteQuestion(questionNumber)" class="rightButtons btn btn-sm btn-primary">Delete</div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-lg-12 col-md-12 col-sm-12">
                                    
                                     <base-input class="input-group-alternative mb-3"
                                                :placeholder="'Question '+(questionNumber+1)"
                                                v-validate="'required'"
                                                :name="'Question '+(questionNumber+1)"
                                                v-model="quizObj.questions[questionNumber].text">
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
                                    <base-dropdown>
                                        <base-button slot="title" type="default" class="dropdown-toggle">
                                             Correct Option : {{answers[questionNumber]}}
                                        </base-button>
                                        <li>
                                            <a class="dropdown-item" @click="answers[questionNumber]='A'">
                                                A
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" @click="answers[questionNumber]='B'">
                                                B
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" @click="answers[questionNumber]='C'">
                                                C
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" @click="answers[questionNumber]='D'">
                                                D
                                            </a>
                                        </li>
                                    </base-dropdown>
                                </div>
                            </div>
                        </div>    
                        <div v-if="questionNumber == quizObj.questions.length-1" class="addButton" @click="add">
                            <i class="ni ni-fat-add"></i>
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
            'registeredUsers':[],
            'timings':{
                'from':0,
                'to':0,
                'duration':0
            }
        },
        answers:[]
      }
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      },
      add(){
          let question  = {
            'text':"",
            'options':[
              '','','',''
            ]
            }
            let answer = ''
          this.quizObj.questions.push(question)
          this.answers.push(answer)
      },
      moveDown(no){
        //   console.log(no)
        //   let q = {...this.quizObj.questions[no]}
        // //   let a = this.answers[no]
        //   this.quizObj.questions[no] = {...this.quizObj.questions[no+1]}
        //   this.quizObj.questions[no+1] = {...q}
        //   this.answers[no] = this.answers[no+1]
        //   this.answers[no+1] = a
        Array.prototype.move = function (old_index, new_index) {
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            return this; // for testing purposes
        };
        this.quizObj.questions.move(no,no+1)
        this.answers.move(no,no+1)
      },
      moveUp(no){
          
            Array.prototype.move = function (old_index, new_index) {
            if (new_index >= this.length) {
                var k = new_index - this.length;
                while ((k--) + 1) {
                    this.push(undefined);
                }
            }
            this.splice(new_index, 0, this.splice(old_index, 1)[0]);
            return this; // for testing purposes
        };
        this.quizObj.questions.move(no,no-1)
        this.answers.move(no,no-1)
      },
      deleteQuestion(no){
          this.quizObj.questions.splice(no,1)
          this.answers.splice(no,1)
      }
    },
    computed:{
    },
    mounted(){
        
        this.add()
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
.date-picker{
    padding: 10px;
    width: 100%;
    border:none;
}
.duration-picker{
    width: 100%;
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
.rightButtons{
    color: white !important;
}
.addButton{
    padding: 10px;
    background:#2DCE95;
    text-align: center;
    color: white;
    cursor: pointer;
}
</style>
