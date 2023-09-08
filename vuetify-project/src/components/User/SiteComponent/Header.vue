<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark align-items-center">


    <a class="navbar-brand me-2 ma-2" style="color: white;" href="#"><img
      src="https://www.svgrepo.com/show/508413/decathlon-favicon-black.svg" alt="icon"
      style="width: 40px; height: 40px;"/></a>

    <nav aria-label="collapse navbar-collapse">

      <ol class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="font-monospace link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ma-2" style="color: white;" @click="router.push('/')">Home</a>
        </li>


        <li class="nav-item">
          <a class="font-monospace link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ma-2">Admin
            <v-dialog
              v-model="dialog"
              activator="parent"
              persistent width="1000"
            >
              <v-card>
                <v-card-text>
                  <v-container>
                    <form @submit.prevent="submit">
                      <v-text-field
                        v-model="adminValue.userName"
                        :counter="10"
                        label="Name"
                      ></v-text-field>

                      <v-text-field
                        v-model="adminValue.userPassword"
                        :counter="7"
                        label="Password"
                      ></v-text-field>
                      <v-btn class="me-4" type="submit"> submit</v-btn>

                    </form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="dark" block @click="dialog = false"
                  >Close Dialog
                  </v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </a>
        </li>
        <li class="nav-item" aria-current="page">
          <a class="font-monospace link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover ma-2" style="color: white;" @click="router.push('/phone')">Phone</a>
        </li>
      </ol>

    </nav>

  </nav>

</template>

<script lang="ts">

import {defineComponent, reactive, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useCollection} from "vuefire";
import {collection} from "firebase/firestore";
import {db} from "@/firebase/country";


export default defineComponent({
  name: "Header",
  setup() {
    const router = useRouter();
    const dialog = ref(false);
    const newsList = useCollection(collection(db, 'news'))
    const adminValue = reactive({
      userName: '',
      userPassword: ''

    })
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
    const submit = () => {

      if (adminValue.userName === "admin" || adminValue.userName === "Admin") {

        if (adminValue.userPassword === "1111") {
          router.push('/admin')
          swal("Welcome")
        } else {
          swal("Routing to user...")
          router.push('/home')
        }
      } else {
        swal("Routing to user...")
        router.push('/home')

      }

    }

    return {
      router, dialog, adminValue, submit, colors, slides, newsList
    }
  }
})
</script>

<style scoped>
.nav-link:hover {
  color: #ff6600;

}
</style>
