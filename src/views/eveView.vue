<template>
    <base-button @click="submitted()">submit</base-button>
</template>
<script>
export default {
    props:{
        quizId:String,
        event:Object
    },
    methods:{
        submitted(){
            // console.log(this.event)
            // console.log("sksdj")
            // console.log(this.eventobj.rows[0].events[0].register)
            // console.log("skkl")
        }
    }
}
</script>