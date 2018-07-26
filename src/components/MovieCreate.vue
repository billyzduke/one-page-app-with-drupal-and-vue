<template>
  <section id="movie-create">
    <h2>Create Movie</h2>
    <section v-if="createError">
      <p>We're sorry, we were unable to create your movie at this time.</p>
    </section>

    <section v-else-if="creating">
      <div>
        <loading-spinner />
      </div>
    </section>

    <section v-else>
      <div class="alert alert-success" v-show="success">You have added a movie.</div>
      <form v-on:submit="createMovie">
        <div class="form-group">
          <label>Movie title</label>
          <input type="text" v-model="title" name="title" class="form-control">
        </div>

        <div class="form-group">
          <label>Movie body</label>
          <textarea class="form-control" v-model="body"></textarea>
        </div>

        <button type="submit" class="btn btn-success">Add Movie</button>
      </form>
    </section>
  </section>
</template>

<script>
export default {
  name: 'MovieCreate',
  data () {
    return {
      apiURL: 'http://drupal-8-5-4.dd:8683/node',
      title: '',
      body: '',
      success: false,
      createError: false,
      creating: false
    }
  },
  http: {
    headers: {
      'Accept': 'application/hal+json',
      'Content-Type': 'application/hal+json',
      'X-CSRF-Token': 'vJS3py1LpjS6sQ4UPWrTiXJNzNy2LOm49DRp1YzjBkA',
      'Authorization': 'Basic YWRtaW46VGgxY2tuMzU1IQ=='
    }
  },
  mounted () {
//    this.createMovie()
  },
  methods: {
    createMovie (event) {
      event.preventDefault()
      var data = {
        '_links': {
          'type': {
            'href': 'http://drupal-8-5-4.dd:8683/rest/type/node/movie'
          }
        },
        'title': [
          {
            'value': this.title
          }
        ],
        'body': [
          {
            'value': this.body
          }
        ],
        'type': [
          {
            'target_id': 'movie'
          }
        ]
      }

      this.axios
        .post(this.apiURL, data)
        .then(response => {
          this.success = true
          this.title = ''
          this.body = ''
        })
        .catch(error => {
          console.log(error)
          this.createError = true
        })
        .finally(() => {
          this.creating = false
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
</style>
