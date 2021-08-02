import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/index.js'
// components
import Signin from "./views/Signin.vue"
import Signup from "./views/Signup.vue"
import Top from "./views/Top.vue"
import Howto from "./views/Howto.vue"
import UserPage from "./views/UserPage.vue"
import Contests from "./views/Contests.vue"
import Contest from "./views/contest/Contest.vue"
import ConDescription from "./views/contest/Description.vue"
import ConTutorial from "./views/contest/Tutorial.vue"
import ConSubmit from "./views/contest/Submit.vue"
import ConResults from "./views/contest/Results.vue"
import ConBattles from "./views/contest/Battles.vue"
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
      component: Top
  },
  {
    name:"howto",
    path:"/howto",
    component: Howto
  },
  {
      name:"contests",
      path:"/contests",
      component: Contests,
  },
  {
    name:"userpage",
    path:"/userpage",
    component: UserPage,
  },
  {
      name:"contest",
      path: "/contests/:id",
      component: Contest,
      children: [
        {
          name: "conHome",
          path: "",
          component: ConDescription,
        },
        {
          name: "conDescription",
          path: "description",
          component: ConDescription,
        },
        
        {
          name: "conTutorial",
          path: "tutorial",
          component: ConTutorial,
      },
        {
          name: "conSubmit",
          path: "submit",
          component: ConSubmit,
          meta: {requiresAuth: true}
        },
        {
          name: "conResults",
          path: "results",
          component: ConResults,
        },
        {
          name: "conBattles",
          path: "battles",
          component: ConBattles,
        },
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