<template>

<div class="main-table">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Artist</th>
      <th scope="col">image</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="artist in artists" :key="artist.id">
      <th scope="row">{{artist.id}}</th>
      <td>{{artist.artist_name}}</td>
      <td>{{artist.artist_image}}</td>
      <td>
        <router-link :to="{name:'editArtist', params:{id:artist.id}}">
          <a class="btn btn-outline-primary" role="button">Edit</a>
        </router-link>
      </td>
    </tr>
  </tbody>
</table>
</div>

</template>

<script>
name: "TableArtistComponent"

export default {

props:{
    artists: Array
}

}
</script>

<style lang="scss" scoped>

</style>