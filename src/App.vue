<script setup>
</script>

<template>
    <router-view></router-view>
</template>

<style>

</style>

<script>

export default {
    
    methods: {
    // ValidateRoutes(){
    //     await  axios.get('/api/user', {headers:{'Authorization': `Bearer ${this.token}`}}).then((response)=>{
    //         console.log(response)
    //         if(localStorage.getItem('token') ==''){
    //             this.$router.push({name: 'login'})
    //         }
    //   })
    // }
},
    created(){
        
        // let list= ['login','/']
        // if(!list.includes(localStorage.getItem('route'))){
        //     // this.ValidateRoutes()
        // }
    }

};
</script>