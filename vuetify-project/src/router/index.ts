import {createWebHashHistory, createRouter} from "vue-router";

import Home from "@/views/Home.vue";
import Data from "@/views/Data.vue"
import FindPhone from "@/views/Finder/FindPhone.vue";
import ArticleForm from "@/components/User/ArticleForm.vue";
import {defineComponent} from "vue";
import AdminInterface from "@/components/Admin/AdminInterface.vue";
import UserInterface from "@/components/User/UserInterface.vue";


export default defineComponent(createRouter({
  history: createWebHashHistory(),
  routes: [
    {path: '/home', alias: '/', component: UserInterface},
    {path: '/data', component: Data},
    {path: '/phone', component: FindPhone},
    {path: '/admin', name: "Admin",  component: AdminInterface},
    {path: '/article/:id', name: 'Article', component: ArticleForm}

  ]
}))
