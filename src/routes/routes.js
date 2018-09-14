import Vue from 'vue';
import VueRouter from 'vue-router'
import store from '@/store/store'


import Store from '../components/Store.vue';
import ShoppingCart from '../components/ShoppingCart.vue';
import ProductDetails from '../components/ProductDetails.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import Foto from '../components/VTOG/FotoTry.vue';
import Foto2 from '../components/VTOG/FotoTry2.vue';
import Mirror from '../components/VTOG/MirrorTry.vue';
import Mirror2 from '../components/VTOG/MirrorTry2.vue';
import NewP from '../components/admin/NewProducts.vue';
import Ordens from '../components/admin/Ordens.vue';
import ProfileUser from '../components/users/ProfileUser.vue';
import Test from '../components/pagetest/Test.vue';
import Test1 from '../components/pagetest/Test1.vue';
import Test2 from '../components/pagetest/Test2.vue';
import Test3 from '../components/pagetest/Test3.vue';
Vue.use(VueRouter)
 const routes = [
	{path: '/', component: Store, name: 'mainpage'},
	{path: '/product/:id', component: ProductDetails, name: 'product'},
	{path: '/cart', component: ShoppingCart, name: 'shoppingcart', meta: {requiresAuth: true}},
	{path: '/foto', component: Foto, name: 'foto'},
	{path: '/foto2', component: Foto2, name: 'foto2'},
	{path: '/user-profile', component: ProfileUser, name: 'user-profile', meta: {
        requiresAuth: true
      }},
	{path: '/mirror/:user', component: Mirror, name: 'mirror', /*props: true */},
	{path: '/mirror2/:user', component: Mirror2, name: 'mirror2', /*props: true */},
	{path: '/ordens', component: Ordens, name: 'ordens', meta: {requiresAuth: true}},
	{path: '/newp', component: NewP, name: 'newp', meta: {
        requiresAuth: true
      }},
	{path: '/login', component: Login, name: 'login' },
	{path: '/test', component: Test, name: 'test' },
	{path: '/test1', component: Test1, name: 'test1' },
	{path: '/test2', component: Test2, name: 'test2' },
	{path: '/test3', component: Test3, name: 'test3' },
	{path: '/register', component: Register, name: 'register'},
	{path: '*', redirect: '/' }
];

const router = new VueRouter({
	mode: 'history',
	routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({
        path: '/',
        //query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router