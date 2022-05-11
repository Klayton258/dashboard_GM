<template>

<div class="main-table">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Artist</th>
      <th scope="col">image</th>
      <th scope="col">Facebook</th>
      <th scope="col">Instagram</th>
      <th scope="col">Twitter</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="artist in artists" :key="artist.id">
      <th scope="row">{{artist.id}}</th>
      <td>{{artist.artist_name}}</td>
      <td>{{artist.artist_image}}</td>
      <td>{{artist.artist_facebook}}</td>
      <td>{{artist.artist_instagram}}</td>
      <td>{{artist.artist_twitter}}</td>
      <td><a class="btn btn-primary " href="#" role="button"> edit</a></td>
      <td><div class="btn btn-warning " role="button"> delete</div></td>
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