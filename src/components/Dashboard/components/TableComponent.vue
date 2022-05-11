<template>

<div class="main-table">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Link</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="slide in slides" :key="slide.id">
      <th scope="row">{{slide.id}}</th>
      <td>{{slide.slide_title}}</td>
      <td >{{slide.description}}</td>
      <td>{{slide.link_direct}}</td>
      <td>
        <router-link :to="{name:'editSlide', params:{id:slide.id}}">
          <a class="btn btn-outline-primary" role="button">Edit</a>
        </router-link>
      </td>
    </tr>
  </tbody>
</table>
</div>

</template>

<script>
name: "TableComponent"

export default {

props:{
    slides: Array
}

}
</script>

<style lang="scss" scoped>

</style>