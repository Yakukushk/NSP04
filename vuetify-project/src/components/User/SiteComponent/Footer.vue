<template>

  <footer class="bg-dark text-center text-white">

    <div class="container p-4">

      <section class="mb-4">

        <a class="btn btn-outline-light btn-floating m-1" @click="router.push('/home')" role="button"
        ><img src="https://www.svgrepo.com/show/501871/home-house.svg" alt="home" style="height: 40px; width: 40px"/>
        </a>


        <a v-if="!isAuthenticated" class="btn btn-outline-light btn-floating m-1" role="button"
        ><img src="https://www.svgrepo.com/show/178093/user-social.svg" alt="admin" style="height: 40px; width: 40px"/>
         <LoginPage/>
        </a>
        <a v-else class="btn btn-outline-light btn-floating m-1" role="button" @click="router.push('/admin')"
        ><img src="https://www.svgrepo.com/show/178093/user-social.svg" alt="admin" style="height: 40px; width: 40px"/>

        </a>
        <a class="btn btn-outline-light btn-floating m-1" @click="router.push('/phone')" role="button"
        ><img src="https://www.svgrepo.com/show/474992/smartphone-tablet.svg" alt="phone"
              style="height: 40px; width: 40px"/>
        </a>

      </section>


      <section class="">


        <div class="row d-flex justify-content-center">

          <div class="col-auto">
            <p class="pt-2 font-monospace ">
              <strong>Sign up for our newsletter</strong>
            </p>
          </div>

        </div>


      </section>

      <section class="mb-4">
        <p class="font-monospace">

          <h5 class="text-uppercase font-monospace">Contact with us</h5>

          <ul class="list-unstyled mb-0">
            <li>
              <a href="mailto:example2@hotmail.com?subject=Повідомлення&body=Доброго дня!" class="text-white font-monospace">example1@hotmail.com</a>
            </li>
            <li>
              <a href="mailto:example2@hotmail.com?subject=Повідомлення&body=Доброго дня!" class="text-white font-monospace">example2@hotmail.com</a>
            </li>

          </ul>

        </p>
      </section>

    </div>
    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <a href="https://github.com/Yakukushk"><strong>Daniil Liubko</strong></a>
    </div>

  </footer>

</template>

<script lang="ts">
import {defineComponent, ref, reactive} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useStoragePinia} from "@/pinia/storage";
import LoginPage from "@/components/Admin/LoginPage.vue";

export default defineComponent({
  name: "FooterComponent",
  components: {LoginPage},
  setup() {
    const links = ref(['Home', 'Admin', 'Phone'])
    const router = useRouter();
    const dialog = ref(false);
    const store = useStoragePinia();
    const {isAuthenticated} = storeToRefs(store);
    const adminValue = reactive({
      userName: '',
      userPassword: ''

    })
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
      links,
      router,
      adminValue,
      dialog,
      submit,
      isAuthenticated
    }
  }
})
</script>

<style scoped>

</style>
