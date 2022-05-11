<template>
  <dashboardcomponent>
    <template v-slot:slot-content>
      <h1>Musicas</h1>
      <formmusiccomponent/>
      <tablemusiccomponent :musics="musics"/>
    </template>
  </dashboardcomponent>
</template>


<script>
import dashboardcomponent from '../../components/Dashboard/DashBoardComponent.vue'
import tablemusiccomponent from '../../components/Dashboard/components/TableMusicComponent.vue'
import formmusiccomponent from '../../components/Dashboard/components/FormMusicComponent.vue'
import axios from 'axios'

export default {
  name: 'ClientsComponent',
  
  data(){
    return{
      musics:[],
      token: localStorage.getItem('token')
      
    }
  },
  mounted(){
    this.getMusics()
  },
  methods:{
    async getMusics(){
        const response = await axios.get('http://127.0.0.1:8000/api/songs', {headers:{'Authorization': `Bearer ${this.token}` }});

      if(response.data.code == 200){
        this.musics = response.data.data
      }else{
        console.error("Ocurred any error "+ response.status)
      }
    }
  },
  components:{
    dashboardcomponent,
    tablemusiccomponent,
    formmusiccomponent
  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>