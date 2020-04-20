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
                            
                        <base-button @click="register(quiz.id)" type="primary">Register</base-button>

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
        user:{},
        quizList:[],
        uid:''
      };
    }, 
    beforeMount(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.uid = localStorage.getItem('uid')
      firebaseApp.db.collection('tests').onSnapshot(snapshot=>{
        this.quizList = []
        let quiz = {}
        snapshot.forEach(doc=>{
          console.log(doc.id) 
          quiz = doc.data()
          quiz['id']=doc.id
          this.quizList.push(quiz)
        })
        console.log(this.quizList)
      })
    },
    methods:{
      register(quizId){
        
        firebaseApp.db.doc('tests/'+quizId).get().then(snapshot=>{
          let quizObj = snapshot.data()
          quizObj.registeredUsers.push(this.uid)
          console.log(quizObj)
          firebaseApp.db.doc('tests/'+quizId).update({
            'registeredUsers':quizObj.registeredUsers
          }).then(s=>{
            this.user.registeredTests.push(quizId);
            firebaseApp.db.doc('users/'+this.uid).update({
              'registeredTests':this.user.registeredTests
            })
          }).then(s=>{
            localStorage.setItem('user',JSON.stringify(this.user))
          })
        })
      }
    }
  }
</script>
<style></style>
