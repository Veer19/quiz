<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <projects-table :testList="testList" title="Light Table"></projects-table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import firebaseApp from '../../firebaseConfig';
  import ProjectsTable from './Table'
  export default { 
    data() {
      return {
        testList:null,
        message:'',
        user:null,
        pageName:""
      };
    }, 
    props: {
      uid:String
    },
    components: {
      ProjectsTable
    },
    mounted(){
      console.log(this.uid)
      this.pageName = this.$route.name
      console.log(this.uid)
      firebaseApp.db.doc('users/'+this.uid).onSnapshot(snapshot=>{
          this.user = snapshot.data()
          console.log(this.user)
          this.getQuizList()
      })
    },
    methods:{
      getQuizList(){
        let testsPromiseArray = []
        console.log("GONNA GET ONGOING")
        if(this.pageName == "Ongoing"){
          console.log("ONGOING GETTING")
          let registeredTests = this.user.registeredTests.map(test=>{return test.id})
          firebaseApp.db.collection("tests").get().then(snapshot=>{
            this.testList = snapshot.docs.map(test=>{return test.data()}).filter(test=>{return !registeredTests.includes(test.id)})
            console.log(this.testList)
          })
        }
        else {
          this.user.registeredTests.forEach(test=>{
            console.log(test.completed)
            // if(test.completed){
            //   testsPromiseArray.push(firebaseApp.db.doc("tests/"+test.id).get())
            // }
            // if(!test.completed){
              testsPromiseArray.push(firebaseApp.db.doc("tests/"+test.id).get())
          // }
          })
          Promise.all(testsPromiseArray).then(response=>{
            this.testList = response.map(test=>{
              let t = test.data()
              console.log(this.user.registeredTests.filter(t => t.id == test.id)[0].completed)
              if(this.user.registeredTests.filter(t => t.id == test.id)[0].completed){
                t.status = "Completed"
                t.statusType = 'success'
              }
              else {
                console.log("ELSE")
                t.statusType = 'warning'
                t.status = "Registered"
              }
              console.log(t)
              return t
            })
          })
        }

      },
      register(testId){
        this.$router.push('details/'+testId)
      },
      view(testId){
        this.$router.push('view/'+testId)
      }
    }
  }
</script>
<style></style>
