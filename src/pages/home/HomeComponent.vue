<template>
  <dashboardcomponent>
    <template v-slot:slot-content>
      <div class="home-content">
        <cardComponent :title="'CLIENTS'" :iconBind="'fa-users'" :qtd="'20'" :description="'The number of clients is growing'" :lastupdate="'20222-04-21 09:45'"/>
        <cardComponent :title="'PRODUCTS'" :iconBind="'fa-box'" :qtd="'60'" :description="'Number of products'" :lastupdate="'20222-04-21 10:45'"/>
      </div>
    </template>
  </dashboardcomponent>
</template>


<script>
import dashboardcomponent from '../../components/Dashboard/DashBoardComponent.vue'
import cardComponent from '../../components/Dashboard/components/CardComponent.vue'

export default {
  name: 'HomeComponent',
  components:{
    dashboardcomponent,
    cardComponent
  }
}
</script>

<style>

</style>