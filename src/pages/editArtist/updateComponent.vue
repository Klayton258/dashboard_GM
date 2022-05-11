<template>
  <dashboardcomponent>
    <template v-slot:slot-content>
      <h1>Artist #{{this.$route.params.id}}</h1>
      <formartistcomponent :artistToUpdate="artist"/>
    </template>
  </dashboardcomponent>
</template>


<script>
import dashboardcomponent from '../../components/Dashboard/DashBoardComponent.vue'
import formartistcomponent from '../../components/Dashboard/components/FormArtistComponent.vue'
import axios from 'axios'

export default{
  name: 'ArtistComponent',
  
  components:{
    dashboardcomponent,
    formartistcomponent
  },

  data(){
    return{
      artist:[],
      token: localStorage.getItem('token')
      
    }
  },
  
  mounted(){
    this.getArtistbyId()
  },
  methods:{
      async getArtistbyId(){
          await axios.get(`http://127.0.0.1:8000/api/artistbyid/${this.$route.params.id}`, {headers:{'Authorization': `Bearer ${this.token}` }}).then((response)=>{
              this.artist = response.data.data[0]
          }).catch((errors)=>{

          })
      },
    
  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>