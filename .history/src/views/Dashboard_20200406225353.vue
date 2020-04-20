<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row" >
              <div class="columns col-xl-3 col-lg-6" v-for="quiz in quizList" v-bind:key="quiz.title">
                    <stats-card :title="quiz.title"
                                type="gradient-red"
                                :sub-title="quiz.description"
                                class="mb-4 mb-xl-0"
                    >
 
                        <template slot="footer">
                            <span>{{quiz.timings}}</span>-<span>{{quiz.timings}}</span>
                            <span class="float-right">{{quiz.timings.duration}}</span>
                            <br>
                            <br>
                        <router-link :to="{path:'/dashboard/'+quiz.uid}" v-if="!quiz.register"><base-button type="primary">Register</base-button></router-link>
                        <base-button type="primary" v-else disabled>Registered</base-button>

                        </template>
                    </stats-card>
                    <br>
              </div>
            </div>
        </base-header>

        

    </div>
</template>
<script>
  import firebaseApp from '../firebaseConfig';
  export default { 
    data() {
      return {
        quizList:[]
      };
    }, 
    beforeMount(){
      firebaseApp.db.collection('tests').onSnapshot(snapshot=>{
        snapshot.forEach(doc=>{
          this.quizList.push(doc)
        })
        console.log(this.quizList)
      })
    }
  }
</script>
<style></style>
