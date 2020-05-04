<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h1 class="mb-0">Rules</h1>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-lg-12 col-md-12"
                                     v-for="(rule, index) in rules" :key="index">
                                    {{rule}}
                                    
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   
                </div>
                 
            </div>
            <br>
            <router-link :to="'/test/'+testId+'/1'">
              <base-button type="success">Start</base-button>
            </router-link>
        </div>

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
        rules: [
          "Rule 1","Rule 2","Rule 3","Rule 4","Rule 5","Rule 6","Rule 7","Rule 8",
        ]
      }
    },
    props: {
      testId:String
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      }
    }
  };
</script>
<style></style>
