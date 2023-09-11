<template>

  <footer class="bg-dark text-center text-white">

    <div class="container p-4">

      <section class="mb-4">

        <a class="btn btn-outline-light btn-floating m-1" @click="router.push('/home')" role="button"
        ><img src="https://www.svgrepo.com/show/501871/home-house.svg" alt="home" style="height: 40px; width: 40px"/>
        </a>


        <a class="btn btn-outline-light btn-floating m-1" role="button"
        ><img src="https://www.svgrepo.com/show/178093/user-social.svg" alt="admin" style="height: 40px; width: 40px"/>
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


export default defineComponent({
  name: "Footer",
  setup() {
    const links = ref(['Home', 'Admin', 'Phone'])
    const router = useRouter();
    const dialog = ref(false);
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
      submit
    }
  }
})
</script>

<style scoped>

</style>
