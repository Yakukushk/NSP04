<template>
  <button @click="scrollTop" class="scroll-to-top-button">
    {{ scrollText }}
  </button>
</template>

<script>
import {ref} from "vue";

export default {
  name: "ScrollTop",
  setup(){
    let scrollText = ref("Scroll to Top")

    const scrollTop = () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

    }
    return {
      scrollText, scrollTop
    }
  }
}
</script>

<style scoped>
.scroll-to-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: black;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

.scroll-to-top-button:hover {
  background-color: #a7acb1;
}
</style>
