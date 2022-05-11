<template>
  <dashboardcomponent>
    <template v-slot:slot-content>
      <h1>Artists</h1>
      <formartistcomponent/>
      <tableartistcomponent :artists="artists"/>
    </template>
  </dashboardcomponent>
</template>


<script>
import dashboardcomponent from '../../components/Dashboard/DashBoardComponent.vue'
import tableartistcomponent from '../../components/Dashboard/components/TableArtistComponent.vue'
import formartistcomponent from '../../components/Dashboard/components/FormArtistComponent.vue'
import axios from 'axios'

export default {
  name: 'ReportsComponent',

  data(){
    return{
      artists:[],
      slides: [],
      token: localStorage.getItem('token')
    }
  },
  mounted(){
    this.getArtists()
  },
  methods:{
    async getArtists(){
        const response = await axios.get('http://127.0.0.1:8000/api/artists', {headers:{'Authorization': `Bearer ${this.token}` }});

      if(response.data.code == 200){
        this.artists = response.data.data
      }else{
        console.error("Ocurred any error "+ response.status)
      }
    }
  },
  components:{
    dashboardcomponent,
    tableartistcomponent,
    formartistcomponent
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>