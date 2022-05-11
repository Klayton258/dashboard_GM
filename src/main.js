import * as Vue from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import LoginComponent from './pages/login/LoginComponent.vue'
import HomeComponent from './pages/home/HomeComponent.vue'
import ProductsComponent from './pages/products/ProductsComponent.vue'
import ClientsComponent from './pages/clients/ClientsComponent.vue'
import UpdateMusic from './pages/editMusic/updateComponent.vue'
import UpdateSlide from './pages/editSlide/updateComponent.vue'
import UpdateArtist from './pages/editArtist/updateComponent.vue'
import ReportsComponent from './pages/management/ReportsComponent.vue'
import ManagementComponent from './pages/management/ManagementComponent.vue'
import axios from 'axios'

const routes = [
  { path: '/', name: 'login', component: LoginComponent},
  { path: '/home', name: 'home', component: HomeComponent},
  { path: '/slides', name: 'products', component: ProductsComponent},
  { path: '/musics', name: 'clients', component: ClientsComponent},
  { path: '/music/:id', name: 'editMusic', component: UpdateMusic},
  { path: '/slide/:id', name: 'editSlide', component: UpdateSlide},
  { path: '/artist/:id', name: 'editArtist', component: UpdateArtist},
  { path: '/artist', name: 'reports', component: ReportsComponent},
  { path: '/manage', name: 'management', component: ManagementComponent},
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

router.beforeEach((to,from,next)=>{
  localStorage.setItem('route',to.name)
  next()
})

axios.defaults.baseURL = 'http://localhost:8000'

/**eslint-disable-vue */
Vue.createApp(App).use(router,axios).mount('#app');
