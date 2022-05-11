<template>
  <dashboardcomponent>
    <template v-slot:slot-content>
      <h1>Management</h1>
      <formUserComponent/>
    </template>
  </dashboardcomponent>
</template>


<script>
import dashboardcomponent from '../../components/Dashboard/DashBoardComponent.vue'
import formUserComponent from '../../components/Dashboard/components/FormUserComponent.vue'

export default {
  name: 'ManagementComponent',
  components:{
    dashboardcomponent,
    formUserComponent
  }
}
</script>

<style lang="scss" src="./style.scss" scoped/>