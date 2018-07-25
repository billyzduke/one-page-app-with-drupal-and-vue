<template>
  <section class="single-movie">
    <section v-if="loadError">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else>
      <div v-if="loading">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>

      <div v-else class="row">

        <div class="col-md-5">
          <a :href="movie.IMDb_page_URI" target="_blank"><img :src="movie.IMDb_poster_URI" width="350" :alt="movie.title+' on IMDb.com'" :title="movie.title+' on IMDb.com'" /></a>
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
      apiURL: 'http://drupal-8-5-4.dd:8683/api/movies/',
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
</style>
