<template>
  <Header/>
  <div>
    <input v-model="search" placeholder="Search by Percent...">
  </div>
  <v-list>
    <v-list-item v-for="phone in searchedPhone" :key="phone.id">
      <v-list><img :src="phone.img" :alt="phone.name" style="height: 50px; width: 50px"></v-list>
      <v-list-item-title>Company : {{ phone.company }}</v-list-item-title>
      <v-list-item-title>Model : {{ phone.model }}</v-list-item-title>
      <v-list-item-subtitle>
        {{ percentMap[phone.percentID] }} %
      </v-list-item-subtitle>
    </v-list-item>
  </v-list>
  <Footer class="mt-4"/>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, computed, reactive} from "vue";
import {createPhone} from "@/firebase/storage";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "@/firebase/storage";
import Header from "@/components/User/SiteComponent/Header.vue";
import Footer from "@/components/User/SiteComponent/Footer.vue";

let id = 0;
export default defineComponent({
  name: "FindPhone",
  components: {Footer, Header},
  setup() {


    const phones = reactive([]);

    const percentMap = ref([]);

    const search = ref('');


    const percentCollection = collection(db, 'percent');


    async function getPhones() {
      const q = await getDocs(query(collection(db, 'phones')));
      q.forEach((doc) => {
        phones.push(doc.data());
      });
    }


    onMounted(getPhones);


    async function getNewPercent() {
      const percentageDocs = await getDocs(percentCollection);
      percentageDocs.forEach((doc) => {
        const phoneID = doc.data().id;
        const percent = doc.data().percent;
        percentMap.value[phoneID] = percent;
      })
    }

    onMounted(getNewPercent)
    const searchedPhone = computed(() => {
      return phones.filter((product) => {
        return (
          product.model.toLowerCase().includes(search.value.toLowerCase()) || product.company.toLowerCase().includes(search.value.toLowerCase())
        );
      });
    });


    return {
      createPhone,
      percentCollection,
      searchedPhone,
      phones,
      percentMap,
      search
    };
  },
});
</script>

<style scoped>
</style>
