<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-red"
                                sub-title="350,897"
                                icon="ni ni-active-40"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Total traffic"
                                type="gradient-orange"
                                sub-title="2,356"
                                icon="ni ni-chart-pie-35"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Sales"
                                type="gradient-green"
                                sub-title="924"
                                icon="ni ni-money-coins"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Performance"
                                type="gradient-info"
                                sub-title="49,65%"
                                icon="ni ni-chart-bar-32"
                                class="mb-4 mb-xl-0">

                        <template slot="footer">
                            <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
                            <span class="text-nowrap">Since last month</span>
                        </template>
                    </stats-card>
                </div>
            </div>
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
          if(this.user.admin){
            this.getQuizList()
          }
          else {
            this.$router.push("/ongoing/")
          }
      })
      
    },
    methods:{
      getQuizList(){
        firebaseApp.db.collection("tests").get().then(snapshot=>{
          this.testList = snapshot.docs.map(doc=>{return doc.data()})
          // let time = this.testList
          let date = new Date()
          this.testList.forEach(test=>{
            let endingDate=new Date(test.timings.to +": 00:00:00");
            let startingDate=new Date(test.timings.from+": 00:00:00");
            console.log("RIGHT NOW",date)
            console.log("Starts At",startingDate)
            console.log("Ends At",endingDate)
            if(date>endingDate)
            {
              console.log("Comp")
              test.status = "Past"
            }
            else if(date>=startingDate && date <=endingDate)
            {
              console.log("Ongoing")
              test.status = "Ongoing"
            }
            else if(date<startingDate && date <endingDate){
              // console.log("EVERY TIME")
              test.status = "Coming Up"
            }
          })
          console.log(this.testList)
        })

      },
      // greaterThanOrEqualToCurrentDate(date){
      //   let date = new Date()
      //   console.log(date.getDate())
      // }
    }
  }
</script>
<style></style>
