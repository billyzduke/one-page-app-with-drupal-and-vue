import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import MovieList from '@/components/MovieList'
import MovieDetail from '@/components/MovieDetail'
import MovieCreate from '@/components/MovieCreate'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/hw',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/create',
      name: 'create',
      component: MovieCreate
    },
    {
      path: '/movie/:mid',
      name: 'movie',
      component: MovieDetail
    },
    {
      path: '/',
      name: 'home',
      component: MovieList
    },
    // catch all returns any unmatched route to home page
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ]
})
