<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark align-items-center">


    <a class="navbar-brand me-2 ma-2" style="color: white;" href="#"><img
      src="https://www.svgrepo.com/show/508413/decathlon-favicon-black.svg" alt="icon"
      style="width: 40px; height: 40px;"/></a>

    <nav aria-label="collapse navbar-collapse">

      <ol class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a
            class="font-monospace link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ma-2"
            style="color: white;" @click="router.push('/')">Home</a>
        </li>


        <li class="nav-item">
          <a v-if="!isAuthenticated"
             class="font-monospace link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ma-2">Admin
            <LoginPage/>
          </a>
          <a v-else
             @click="router.push('/admin')"
             class="font-monospace link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ma-2">Admin

          </a>
        </li>
        <li class="nav-item" aria-current="page">
          <a
            class="font-monospace link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ma-2"
            style="color: white;" @click="router.push('/phone')">Phone</a>
        </li>
        <li class="nav-item" aria-current="page">
          <a v-if="isAuthenticated"
             class="font-monospace link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ma-2"
             style="color: white;" @click="store.logOutFunction()">LogOut</a>
        </li>
      </ol>

    </nav>

  </nav>

</template>

<script lang="ts">

import {computed, defineComponent, onBeforeUnmount, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useCollection} from "vuefire";
import {collection} from "firebase/firestore";
import {useStoragePinia} from "@/pinia/storage";
import {auth, db} from "@/firebase/country";
import LoginPage from "@/components/Admin/LoginPage.vue";
import {signOut} from "firebase/auth";
import swal from "sweetalert";
import {storeToRefs} from "pinia";


export default defineComponent({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "HeaderComponent",
  components: {LoginPage},
  computed: {
    LoginPage() {
      return LoginPage
    }
  },
  setup() {
    // const storagePinia = useStoragePinia();
    const router = useRouter();
    const dialog = ref(false);
    const store =  useStoragePinia();
    const {isAuthenticated} =  storeToRefs(store);
    const newsList = useCollection(collection(db, 'news'))






    const colors = ref([
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4',
    ])
    const slides = ref([
      'First', 'Second', 'Third'
    ])

    return {
      router, dialog, colors, slides, newsList, isAuthenticated, store
    }
  }
})
</script>

<style scoped>
.nav-link:hover {
  color: #ff6600;

}
</style>
