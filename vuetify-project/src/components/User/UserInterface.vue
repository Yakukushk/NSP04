<template>
  <Header/>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows="hover"
  >
    <v-carousel-item
      v-for="slide in limitedNewsList"

    >
      <v-sheet
        color="white"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h5 ma-2 fw-lighter">
            <a class="text-decoration-none " :href="sharedLink(slide)">
              {{ slide.title }}
            </a>
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  <v-label class="text-h5 mt-5">Hello User</v-label>

  <v-select

    label="Select your Category"
    :items="items"
    v-model="selectedCategory"
    class="mt-4"

  ></v-select>

  <v-card
    class="mx-auto mt-4"
    max-width="400"
    v-for="news in filteredCategory" :key="news.id"
  >
    <v-img
      class="align-end text-white"
      height="300"
      :src="news.img"
      :alt="news.title"
      cover
      style="width: 100%; height: 100%"
    >

    </v-img>
    <v-card-subtitle>#{{ news.category }}</v-card-subtitle>
    <v-card-title>{{ news.title }}</v-card-title>
    <v-card-subtitle>Posted in - {{ news.date }} {{ news.time }}</v-card-subtitle>
    <v-card-text>{{ news.txt }}</v-card-text>
    <v-card-text v-if="news.detailTxT !== ''"><a class="link-underline" @click="routing(news.id)">More</a></v-card-text>
    <v-card-text>Publisher - {{ news.userName }} {{ news.userSurname }}</v-card-text>

    <i class="pa-3" @click.once="likePost(news)">
      <img class="mb-2" src="https://www.svgrepo.com/show/522577/like.svg" alt="likes"
           style="width: 30px; height: 30px;"/>

    </i>
    {{ news.like }}
    <i class="pa-3" @click.once="dislikePost(news)">

      <img class="mb-2" src="https://www.svgrepo.com/show/522518/dislike.svg" alt="dislikes"
           style="width: 30px; height: 30px;"/></i>
    {{ news.dislike }}
    <i class="pa-3" @click="sharedPost(news)">
      <img class="mb-2" src="https://www.svgrepo.com/show/521832/share-1.svg" alt="share"
           style="width: 30px; height: 30px;">
      <div v-if="news.shared"><a :href='sharedLink(news)'>{{ sharedLink(news) }}</a></div>
    </i>

  </v-card>


  <Footer class="mt-4"/>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {createNews, db, newsCollection} from "@/firebase/country";
import {useCollection} from "vuefire";
import {collection, doc, getDocs, query, setDoc, updateDoc} from "firebase/firestore";
import {useRouter} from "vue-router";
import Header from "@/components/User/SiteComponent/Header.vue";
import Footer from "@/components/User/SiteComponent/Footer.vue";

export default defineComponent({
  name: "UserInterface",
  components: {
    Footer,
    Header
  },
  setup() {
    const newsList = useCollection(collection(db, 'news'));
    const router = useRouter();

    const likePost = async(news) => {
      news.like += 1;
      const newRef = doc(db, 'news', news.id);
      await updateDoc(newRef, {like: news.like})
    }
    const dislikePost = async(news) => {
      news.dislike += 1;
      const newRef = doc(db, 'news', news.id);
      await updateDoc(newRef, {
        dislike: news.dislike
      })
    }
    const sharedPost = (news) => {
      news.shared = !news.shared
    }
    const limitedNewsList = computed(() => {
      return newsList.value.slice(0,4);
    })
    const sharedLink = (news) => {
      return `#/article/${news.id}`
    }
    const items = ref([
      'Digital News', 'IT News', 'Blogs', 'All Categories'
    ])
    const selectedCategory = ref("All Categories")

    const filteredCategory = computed(() => {
      if (selectedCategory.value === 'All Categories') {
        return newsList.value
      } else {
        return newsList.value.filter((category) => category.category === selectedCategory.value)
      }
    })




    const routing = (id) => {
      router.push(`/article/${id}`)
    }
    return {
      newsList,
      router,
      items,
      selectedCategory,
      filteredCategory,
      likePost,
      dislikePost,
      routing,
      sharedPost,
      sharedLink,
      limitedNewsList
    }
  }
})
</script>

<style scoped>

</style>
