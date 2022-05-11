<template>
  <dashboardcomponent>
    <template v-slot:slot-content>
      <h1>Musica #{{this.$route.params.id}}</h1>
      <formmusiccomponent :formToUpdate="music"/>
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
      music:[],
      token: localStorage.getItem('token')
      
    }
  },
  mounted(){
    this.getSongbyId()
  },
  methods:{
      async getSongbyId(){
          await axios.get(`http://127.0.0.1:8000/api/songbyid/${this.$route.params.id}`, {headers:{'Authorization': `Bearer ${this.token}` }}).then((response)=>{
              this.music = response.data.data[0]
          }).catch((errors)=>{

          })
      },
    
  },
  components:{
    dashboardcomponent,
    tablemusiccomponent,
    formmusiccomponent
  },
}
</script>

<style lang="scss" src="./style.scss" scoped/>