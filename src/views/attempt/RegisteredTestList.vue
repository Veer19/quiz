<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row" >
              <div class="columns col-xl-3 col-lg-6" v-for="test in testList" v-bind:key="test.title">
                    <stats-card type="gradient-red"
                                :sub-title="test.title"
                                class="mb-4 mb-xl-0"
                    >
 
                        <template slot="footer">
                            <span >Time slot : {{test.timings.from}}</span> to <span>{{test.timings.to}}</span><br>
                            <span >Duration : {{test.timings.duration}}  Hours</span>
                            <br>
                            <br>
                            <p>{{test.description}}</p>
                            
                        <router-link :to="{path:'/test/'+test.id}"><base-button type="primary">Attempt</base-button></router-link>

                        </template>
                    </stats-card>
                    <br>
              </div>
            </div>
        </base-header>

        

    </div>
</template>
<script>
  import firebaseApp from '../../firebaseConfig';
  export default { 
    data() {
      return {
        user:{},
        testList:[],
        uid:''
      };
    }, 
    beforeMount(){
      this.user = JSON.parse(localStorage.getItem('user'))
      this.uid = localStorage.getItem('uid')
      this.getQuizList()
    },
    methods:{
      getQuizList(){
        firebaseApp.db.collection('tests').onSnapshot(snapshot=>{
          this.testList = []
          let test = {}
          snapshot.forEach(doc=>{
            console.log(doc.id) 
            test = doc.data()
            test['id']=doc.id
            if(this.user.registeredTests.includes(test.id))
            this.testList.push(test)
          })
          console.log(this.testList)
        })
      },
      register(testId){
        
        firebaseApp.db.doc('tests/'+testId).get().then(snapshot=>{
          let testObj = snapshot.data()
          testObj.registeredUsers.push(this.uid)
          console.log(testObj)
          firebaseApp.db.doc('tests/'+testId).update({
            'registeredUsers':testObj.registeredUsers
          }).then(s=>{
            this.user.registeredTests.push(testId);
            firebaseApp.db.doc('users/'+this.uid).set(this.user)
          }).then(s=>{
            localStorage.setItem('user',JSON.stringify(this.user))
            this.getQuizList()
          })
        })
      }
    }
  }
</script>
<style></style>

