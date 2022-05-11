<template>
  <div class="main">
    <div class="sidebar">
      <sideBarComponent />
    </div>
    <div class="content-right">
      <div class="navbar">
        <navBarComponent />
      </div>
      <div class="content">
        <slot name="slot-content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import sideBarComponent from "./components/SideBarComponent.vue"
import navBarComponent from "./components/NavBarComponent .vue"

export default {
  name: 'DashBoardComponent',
  
  components:{
  sideBarComponent,
  navBarComponent
  }
}

</script>


<style lang="scss" src="./style.scss" scoped />

