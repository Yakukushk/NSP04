<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {computed, defineComponent, onBeforeUnmount, onMounted, onUnmounted, ref} from "vue";
import {useStoragePinia} from "@/pinia/storage";


export default defineComponent({
  name: "App",
  setup() {
    const logoutTimer = ref(null);
    const storagePinia = useStoragePinia();

    function resetTimer() {
      clearTimeout(logoutTimer.value);
      logoutTimer.value = setTimeout(storagePinia.logOutFunction, 20 * 60 * 1000);


    }

    try {
      window.addEventListener("mouseover", resetTimer)
      window.addEventListener("keypress", resetTimer);
      window.addEventListener("scroll", resetTimer);
    } catch (error) {
      console.log(error)
    }
    onMounted(() => {
      logoutTimer.value = setTimeout(storagePinia.logOutFunction, 20 * 60 * 1000);
      console.log(logoutTimer.value, "Working")
    });
    onBeforeUnmount(() => {
      clearTimeout(logoutTimer.value);
    });
    onUnmounted(() => {
      window.removeEventListener("mouseover", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    });

  }
})

</script>
