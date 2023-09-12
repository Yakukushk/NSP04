<template>

  <v-dialog
    v-model="dialog"
    activator="parent"
    persistent width="1000"
    v-if="isAuthenticated"
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

</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useCollection} from "vuefire";
import {collection} from "firebase/firestore";
import {db} from "../../firebase/country";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence  } from 'firebase/auth'





export default defineComponent({
  name: "LoginPage",

  setup(){
    const router = useRouter();

    const dialog = ref(false);
    const newsList = useCollection(collection(db, 'news'))
    const isAuthenticated = computed(() => {
      return computed(() => getAuth().currentUser !== null);
    })



const adminValue = reactive({
      userName: '',
      userPassword: ''

    })

    const submit = () => {
      const auth = getAuth();
      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, adminValue.userName, adminValue.userPassword)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log('Successfully logged in!', user);
              isAuthenticated.value
              router.push('/admin');

            })
            .catch(error => {
              !isAuthenticated.value
              swal(error.message);


            })
        })
        .catch((error) => {

          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    };

    return {
      dialog,
      newsList,
      submit,
      isAuthenticated,
      adminValue
    }
  }
})
</script>

<style scoped>

</style>
