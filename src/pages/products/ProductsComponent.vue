<template>
  <dashboardcomponent>
    <template v-slot:slot-content>
      <h1>Slides</h1>
      <formComponent/>
      <tablecomponent :slides="slides" />
    </template>
  </dashboardcomponent>
</template>


<script>
import dashboardcomponent from '../../components/Dashboard/DashBoardComponent.vue'
import tablecomponent from '../../components/Dashboard/components/TableComponent.vue'
import formComponent from '../../components/Dashboard/components/FormComponent.vue'
import axios from 'axios'

export default {
  name: 'ProductsComponent',
  data(){
    return{
      slides: [],
      token: localStorage.getItem('token')
    }
  },
  mounted(){
    this.getProducts()
  },
  methods:{
    async getProducts(){
        const response = await axios.get('/api/slides', {headers:{'Authorization': `Bearer ${this.token}` }});

      if(response.data.code == 200){
        console.log(response.data);
        this.slides = response.data.data
      }else{
        console.error("Ocurred any error "+ response.status)
      }
    }
  },
  created:function(){
    // this.getProducts()
  },
  components:{
    dashboardcomponent,
    tablecomponent,
    formComponent
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>