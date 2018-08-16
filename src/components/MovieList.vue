<template>
  <section class="movie-list">

    <section v-if="loadError">
      <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
    </section>

    <section v-else-if="loading">
      <div>
        <loading-spinner />
      </div>
    </section>

    <section v-else>
      <div>
        <div class="filter">
          <input type="text" class="form-control" v-model="liveFilter" placeholder="Search">
          <h5>Filter by Genre:</h5>
          <div class="row">
            <div class="col-md-6">
              <select name="" id="" class="form-control" v-model="genreFilter">
                <option value="">All</option>
                <option v-for="genre in genres" :key="genre">{{ genre }}</option>
              </select>
            </div>
          </div>
        </div>

        <div v-for="movie in moviesFiltered" :key="movie.nid" class="row movie-item">
          <div class="col-md-3 pull">
            <!-- <a :href="movie.IMDb_page_URI" target="_blank"><img :src="movie.IMDb_poster_URI" width="100" :alt="movie.title" :title="movie.title" /></a> -->
            <!-- <a @click="viewMovie(i)"><img :src="movie.IMDb_poster_URI" width="100" :alt="movie.title" :title="movie.title" /></a> -->
            <router-link :to="{name: 'movie', params: {mid: movie.nid}}"><img :src="movie.IMDb_poster_URI" width="" height="" :alt="movie.title" :title="movie.title" /></router-link>
          </div>
          <div class="col-md-9">
            <!-- <h4><a :href="movie.IMDb_page_URI" target="_blank">{{ movie.title }}</h4> -->
            <!-- <h4><a @click="viewMovie(i)">{{ movie.title }}</a></h4> -->
            <h4><router-link :to="{name: 'movie', params: {mid: movie.nid}}">{{ movie.title }}</router-link></h4>
            <p>
              <strong>Director:</strong>
              <ul>
                <li v-for="person in movie.directors" :key="person.nid">
                  <a :href="person.IMDb_page_URI" target="_blank">{{ person.name_full }}</a>
                </li>
              </ul>
            </p>
            <p>
              <strong>Cast:</strong>
              <ul>
                <li v-for="person in movie.cast" :key="person.nid">
                  <a :href="person.IMDb_page_URI" target="_blank">{{ person.name_full }}</a>
                </li>
              </ul>
            </p>
            <p>
              <strong>Genres:</strong>
              <span>{{ movie.genres }}</span>
            </p>
          </div>
        </div>
      </div>
    </section>

  </section>
</template>

<script>
export default {
  name: 'MovieList',
  data () {
    return {
      apiURL: 'http://moviesapi.dev:8683/api/movies/',
      movies: [],
      genres: [],
      genreFilter: '',
      loading: true,
      loadError: false,
      liveFilter: '',
      filterBy: {
        'title': true,
        'directors': {
          'name_full': true
        },
        'cast': {
          'name_full': true
        }
      }
    }
  },
  mounted () {
    this.getMovies()
  },
  methods: {
    getMovies () {
      this.axios
        .get(this.apiURL)
        .then(response => {
          this.movies = response.data
        })
        .catch(error => {
          console.log(error)
          this.loadError = true
        })
        .finally(() => {
          var genres = []
          var genresArr = []

          this.movies.forEach((movie) => {
            genres = movie.genres.split(', ')
            genres.forEach((genre) => {
              if (genresArr.indexOf(genre) === -1) {
                genresArr.push(genre)
              }
            })
          })

          this.genres = genresArr
          this.genres.sort()
//          console.log(this.genres)

          this.loading = false
        })
    },
    matchFilter (filterObj, movieNode, field) {
      if (filterObj.hasOwnProperty(field)) {
//          console.log('field: '+field);
//          console.log('movie: '+movieNode[field].toLowerCase()+' title contains '+this.loweredFilter+' '+(movieNode[field].toLowerCase().indexOf(this.loweredFilter) !== -1))
        return movieNode[field].toLowerCase().indexOf(this.loweredFilter) !== -1
      }
      return false
    }
  },

  computed: {
    loweredFilter () {
      return this.liveFilter.toLowerCase()
    },
    moviesFiltered () {
      var filteredMovies = this.movies
      if (this.genreFilter.length) {
        filteredMovies = filteredMovies.filter((movie) => {
          return movie.genres.indexOf(this.genreFilter) !== -1
        })
      }
      if (this.liveFilter.length) {
        return filteredMovies.filter((movie) => {
          var matchFound = false
          for (var k in this.filterBy) {
            if (!matchFound) {
              if (typeof this.filterBy[k] === 'object') {
                for (var kk in this.filterBy[k]) {
                  if (!matchFound) {
                    for (var f in movie[k]) {
                      if (!matchFound) {
                        matchFound = this.matchFilter(this.filterBy[k], movie[k][f], kk)
                      }
                    }
                  }
                }
              } else {
                matchFound = this.matchFilter(this.filterBy, movie, k)
              }
            }
          }
          return matchFound
        })
      }
      return filteredMovies
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  .movie-item {
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 10px;

    img {
      max-width: 100%;
      max-height: 300px;
      height: auto
    }

    h4 {
      margin-top: 0
    }
  }
  .filter {
    padding: 40px;
    background: #efefef;
    margin-bottom: 40px;

    h5 {
      margin-top: 0.8rem
    }
  }
</style>
