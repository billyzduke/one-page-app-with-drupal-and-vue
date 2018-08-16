<template>
  <section class="single-movie">
    <section v-if="loadError">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else-if="loading">
      <div>
        <loading-spinner />
      </div>
    </section>

    <section v-else>
      <div class="row">
        <div class="col-md-5 movie-detail">
          <a :href="movie.IMDb_page_URI" target="_blank"><img :src="movie.IMDb_poster_URI" width="" height="" :alt="movie.title+' on IMDb.com'" :title="movie.title+' on IMDb.com'" /></a>
        </div>
        <div class="col-md-7">
          <h2>
            <a :href="movie.IMDb_page_URI" :title="movie.title+' on IMDb.com'" target="_blank">{{ movie.title }}</a>
          </h2>
          <div v-html="movie.synopsis"></div>
          <hr />
          <router-link :to="{name: 'home'}"><button class="btn btn-danger float-right align-bottom">Back to Movie List</button></router-link>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'MovieDetail',
  data () {
    return {
      apiURL: 'http://moviesapi.dev:8683/api/movies/',
      movie: false,
      loading: true,
      loadError: false
    }
  },
  mounted () {
    this.getMovie()
  },
  methods: {
    getMovie () {
      this.axios
        .get(this.apiURL + this.$route.params.mid)
        .then(response => {
          this.movie = response.data[0]
        })
        .catch(error => {
          console.log(error)
          this.loadError = true
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  .movie-detail img {
    max-width: 100%;
    max-height: 600px;
  }
</style>
