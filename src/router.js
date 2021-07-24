import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/index.js'
// components
import Signin from "./views/Signin.vue"
import Signup from "./views/Signup.vue"
import Top from "./views/Top.vue"
import Contests from "./views/Contests.vue"
import Contest from "./views/Contest.vue"
import ContestHome from "./views/ContestHome.vue"
import ContestEntry from "./views/ContestEntry.vue"
import ContestRooms from "./views/ContestRooms.vue"
import ContestCodes from "./views/ContestCodes.vue"

Vue.use(Router)
const routes = [
  {
    name:"signin",
    path: "/signin",
    component: Signin
  }, 
  {
    name:"signup",
    path: "/signup",
    component: Signup
  },
  {
      name:"top",
      path:"/",
      component: Top,
      meta: { requiresAuth: true }
  },
  {
      name:"contests",
      path:"/contests",
      component: Contests,
  },
  {
      name:"contest",
      path: "/contests/:id",
      component: Contest,
      children: [
        {
          name: "contestHome",
          path: "",
          component: ContestHome,
        },
        {
            name: "contestCodes",
            path: "codes",
            component: ContestCodes,
        },
        {
          name: "contestEntry",
          path: "entry",
          component: ContestEntry,
          meta: {requiresAuth: true}
        },
        {
          name: "contestRooms",
          path: "rooms",
          component: ContestRooms,
        }
      ]
  }
]
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// すべてのルーティングでrequiresAuthならloginに飛ばされる
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !Store.state.userToken) {
    next({ path: '/signin', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router