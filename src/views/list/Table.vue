<template>
  <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white': ''">
            {{pageName}} Tests
          </h3>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table class="table align-items-center table-flush"
                  tbody-classes="list"
                  :data="testList">
        <template slot="columns">
          <th>Title</th>
          <th v-if="pageName != 'Ongoing'">Status</th>
          <th>Price</th>
          <th>Dates</th>
          <th>Duration</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">
            <div class="media align-items-center">
              
              <div class="media-body">
                <span class="name mb-0 text-md">{{row.title}}</span>
              </div>
            </div>
          </th>
          
          <td v-if="pageName != 'Ongoing'">
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </td>
          <td>
            {{row.price}} INR
          </td>
          <td>
            {{convertDate(row.timings.from)}} to {{convertDate(row.timings.to)}}
          </td>
          
          <td>
            {{row.timings.duration}} Hours
          </td>
          <td v-if="pageName=='Ongoing'">
            <router-link  :to="'/details/'+row.id"><base-button   type="warning">Register</base-button></router-link>
          </td>
          <td v-else>
            <router-link v-if="row.status == 'Registered'" :to="'/details/'+row.id"><base-button type="primary">Attempt</base-button></router-link>
          </td>
        </template>

      </base-table>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'projects-table',
    props: {
      type: {
        type: String
      },
      testList:Array,
      title: String
    },
    data(){
      return {
        pageName:""
      }
    },
    beforeMount(){
      this.pageName = this.$route.name
    },
    methods:{
      convertDate(date){
        var arr_date = date.split('-'),
            months   = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return(parseInt(arr_date[2]) + ' ' + months[parseInt(arr_date[1])] + ', ' + arr_date[0]);

      }
    }
  }
</script>
<style>
</style>
