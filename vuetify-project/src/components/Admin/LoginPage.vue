<template>

  <v-dialog
    v-model="dialog"
    activator="parent"
    persistent width="1000"
    v-if="!isAuthenticated"
  >
    <v-card>
      <v-card-text>
        <v-container>
          <form @submit.prevent="submit">
            <v-text-field
              v-model="storagePinia.adminValue.userName"
              :counter="10"
              label="Name"
            ></v-text-field>

            <v-text-field
              v-model="storagePinia.adminValue.userPassword"
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

</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useStoragePinia} from "@/pinia/storage";
import {db, auth} from "../../firebase/country";
import {signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence} from 'firebase/auth'
import swal from "sweetalert";


export default defineComponent({
  name: "LoginPage",

  setup() {
    const storagePinia = useStoragePinia();
    const dialog = ref(false);
    const isAuthenticated = ref(false);
    const submit = async () => {
      await signInWithEmailAndPassword(auth, storagePinia.adminValue.userName, storagePinia.adminValue.userPassword)
        .then((userCredential) => {
         console.log(userCredential)
          swal("Welcome!")
        })
        .catch(error => {
          console.log(error)
          swal("Incorrect Values")
        })


    };

    return {
      dialog,
      submit,
      storagePinia,
      isAuthenticated

    }
  }
})
</script>

<style scoped>

</style>
