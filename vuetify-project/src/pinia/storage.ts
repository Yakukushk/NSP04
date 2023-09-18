import {defineStore} from "pinia";
import {reactive, ref} from "vue";
import {signOut} from "firebase/auth";
// @ts-ignore
import {auth} from "@/firebase/country";
import {useRouter} from "vue-router";
import swal from "sweetalert";

export const useStoragePinia = defineStore('storage', () => {
  const adminValue = reactive({
    userName: '',
    userPassword: ''

  });
  const router = useRouter();
  const isAuthenticated =  ref(false);
  async function logOutFunction() {
    await signOut(auth)
      .then(() => {
        router.push('/home')
        swal("Logged out")
      })
      .catch(error => {
        console.error('Error signing out:', error);
        swal('Error signing out ')
      });

  }

  return {
    adminValue,
    isAuthenticated,
    logOutFunction
  }
});
