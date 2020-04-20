<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row" v-for="row in eventobj.rows" v-bind:key="row">
              <div class="columns col-xl-3 col-lg-6" v-for="event in row.events" v-bind:key="event">
                    <stats-card :title="event.title"
                                type="gradient-red"
                                :sub-title="event.description"
                                class="mb-4 mb-xl-0"
                    >
 
                        <template slot="footer">
                            <span>{{event.date}}</span>
                            <span class="float-right">{{event.time}}</span>
                            <br>
                            <br>
                        <router-link :to="{path:'/dashboard/'+event.eventID}" :event="event" v-if="!event.register"><base-button type="primary">Register</base-button></router-link>
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
  
  export default { 
    data() {
      return {
        eventID:Number,
        eventobj:{},

      };
    }, 
    beforeMount(){
      // this.eventID = this.$route.params.eventID
      // console.log("stuff")
      
      // console.log(this.eventID)
      // console.log("stuff2");
      
        this.eventobj={
        "rows":[
          {
            "events":[
            {
              'eventID':1023,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            },
            {
              'eventID':1024,
              'title':"title2",
              'description':"title 2 ka description bhi me ni likh raha",
              'date':'22-12-2020',
              'time':'3:00 PM',
              'register':false              
            },
            {
              'eventID':1025,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            },
            {
              'eventID':1026,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            }
          
          ]
        },
        {
          "events":[
            {
              'eventID':1027,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            },
            {
              'eventID':1028,
              'title':"title2",
              'description':"title 2 ka description bhi me ni likh raha",
              'date':'22-12-2020',
              'time':'3:00 PM',
              'register':false              
            },
            {
              'eventID':1029,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            },
            {
              'eventID':1030,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            }
          ]
        },
        {
          "events":[
            {
              'eventID':1031,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            },
            {
              'eventID':1032,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            },
            {
              'eventID':1033,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            },
            {
              'eventID':1034,
              'title':"title1",
              'description':"title 1 ka description me ni likh raha",
              'date':'24-11-2020',
              'time':'2:00 PM',
              'register':false              
            }
          ]
        }
      ]
    }
  }
  }
</script>
<style></style>
