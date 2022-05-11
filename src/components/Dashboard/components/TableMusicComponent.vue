<template>

<div class="main-table">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Artist</th>
      <th scope="col">Cover</th>
      <th scope="col">Album</th>
      <th scope="col">Youtube</th>
      <th scope="col">Audiomack</th>
      <th scope="col">Spotify</th>
      <th scope="col">SoundCloud</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="music in musics" :key="music.id">
      <th scope="row">{{music.id}}</th>
      <td>{{music.m_title}}</td>
      <td>{{music.m_artist}}</td>
      <td>{{music.m_cover}}</td>
      <td>{{music.m_album}}</td>
      <td>{{music.youtube}}</td>
      <td>{{music.audiomack}}</td>
      <td>{{music.spotify}}</td>
      <td>{{music.soundcloud}}</td>
      <td>
        <router-link :to="{name:'editMusic', params:{id:music.id}}">
          <a class="btn btn-outline-primary" role="button">edit</a>
        </router-link>
      </td>
    </tr>
  </tbody>
</table>
</div>

</template>

<script>
name: "TableMusicComponent"

export default {

props:{
    musics: Array
}

}
</script>

<style lang="scss" scoped>

</style>