<template>
    <base-button @click="submitted()">submit</base-button>
</template>
<script>
export default {
    props:{
        eventId:String,
        event:Object
    },
    methods:{
        submitted(){
            console.log(this.event)
            console.log("sksdj")
            console.log(this.event.register)
            console.log("skkl")
        }
    }
}
</script>