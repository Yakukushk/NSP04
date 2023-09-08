<template>

</template>

<script lang="ts">
import {defineComponent, onMounted} from "vue";
import {useRouter} from "vue-router";
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";

export default defineComponent({
  name: 'Home',
  setup(){
  const router = useRouter();


  return {

  }
  }
})

</script>
