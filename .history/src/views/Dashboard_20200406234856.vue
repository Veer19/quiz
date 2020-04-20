<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row" >
              <div class="columns col-xl-3 col-lg-6" v-for="quiz in quizList" v-bind:key="quiz.title">
                    <stats-card type="gradient-red"
                                :sub-title="quiz.title"
                                class="mb-4 mb-xl-0"
                    >
 
                        <template slot="footer">
                            <span >Time slot : {{quiz.timings.from}}</span> to <span>{{quiz.timings.to}}</span><br>
                            <span >Duration : {{quiz.timings.duration}}  Hours</span>
                            <br>
                            <br>
                            <p>{{quiz.description}}</p>
                            
                        <router-link :to="{path:'/quiz/'+quiz.uid}"><base-button type="primary">Attempt</base-button></router-link>

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
        this.quizList = []
        snapshot.forEach(doc=>{
          console.log(doc)
          this.quizList.push(doc.data())
        })
        console.log(this.quizList)
      })
    }
  }
</script>
<style></style>
