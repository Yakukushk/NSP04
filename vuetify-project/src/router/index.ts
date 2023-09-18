import {createWebHashHistory, createRouter} from "vue-router";

// @ts-ignore
import Home from "@/views/Home.vue";
// @ts-ignore
import Data from "@/views/Data.vue"
// @ts-ignore
import FindPhone from "@/views/Finder/FindPhone.vue";
// @ts-ignore
import ArticleForm from "@/components/User/ArticleForm.vue";
import {defineComponent} from "vue";
// @ts-ignore
import AdminInterface from "@/components/Admin/AdminInterface.vue";
// @ts-ignore
import UserInterface from "@/components/User/UserInterface.vue";
// @ts-ignore
import LoginPage from "@/components/Admin/LoginPage.vue"



export default defineComponent(createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: '/home', name: 'Home', alias: '/', component: UserInterface},
    {path: '/login', name: 'Login', component: LoginPage},
    {path: '/data', component: Data},
    {path: '/phone', component: FindPhone},
    {path: '/admin', name: "Admin",  component: AdminInterface},
    {path: '/article/:id', name: 'Article', component: ArticleForm}

  ]
}))
