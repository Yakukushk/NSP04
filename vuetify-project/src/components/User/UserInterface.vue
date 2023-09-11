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
  <RecentPosts :news="newsList"/>
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
    <v-card-text v-if="news.detailTxT !== ''"><a class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" @click="routing(news.id)">More</a></v-card-text>
    <v-card-text>Publisher - {{ news.userName }} {{ news.userSurname }}</v-card-text>

    <button @click="likePost(news)" class="btn mb-2" id="like"><i
      class="fa fa-thumbs-up fa-lg" aria-hidden="true"></i></button>
    {{ news.like }}
    <button @click="dislikePost(news)" class="btn mb-2" id="dislike"><i
      class="fa fa-thumbs-down fa-lg" aria-hidden="true"></i></button>
    {{ news.dislike }}

    <i class="pa-3" @click="sharedPost(news)">
      <img class="mb-2" src="https://www.svgrepo.com/show/521832/share-1.svg" alt="share"
           style="width: 25px; height: 25px;">
     <a v-if="news.shared" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
         :href='sharedLink(news)'>{{ sharedLink(news) }}</a>
    </i>

  </v-card>

<ScrollTop/>
  <Footer class="mt-4"/>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from "vue";
import { db } from "@/firebase/country";
import {useCollection} from "vuefire";
import {collection, doc, updateDoc} from "firebase/firestore";
import {useRouter} from "vue-router";
import Header from "@/components/User/SiteComponent/Header.vue";
import Footer from "@/components/User/SiteComponent/Footer.vue";
import ScrollTop from "@/components/User/SiteComponent/ScrollTop.vue";
import RecentPosts from "@/components/User/SiteComponent/RecentPosts.vue";

export default defineComponent({
  name: "UserInterface",
  components: {
    RecentPosts,
    ScrollTop,
    Footer,
    Header
  },
  setup() {
    const newsList = useCollection(collection(db, 'news'));
    const router = useRouter();
    const disliked = ref(false);
    const liked = ref(false);


    const toggleReaction = async (news, reaction) => {
      const newRef = doc(db, 'news', news.id);
      if (reaction === 'like') {
        if (!liked.value) {
          news.like++;
          liked.value = true;
          await updateDoc(newRef, {like: news.like})
        }
        if (disliked.value) {
          news.dislike -= 1;
          disliked.value = false;
          await updateDoc(newRef, {dislike: news.dislike})
        }

      }
      if (reaction === 'dislike') {
        if (!disliked.value) {
          news.dislike++;
          disliked.value = true;
          await updateDoc(newRef, {dislike: news.dislike})
        }
        if (liked.value) {
          news.like -= 1;
          liked.value = false;
          await updateDoc(newRef, {like: news.like})
        }
      }
    }
    const likePost = async(news) => {
      toggleReaction(news, 'like')
    }

    const dislikePost = async (news) => {
      toggleReaction(news, 'dislike')
    }

    const sharedPost = (news) => {
      news.shared = !news.shared
    }
    // eslint-disable-next-line vue/return-in-computed-property
    const limitedNewsList = computed(() => {
      const sortedNews = newsList.value.slice().sort((a,b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      return sortedNews.slice(0,4)
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
button {
  cursor: pointer;
  outline: 0;
  color: #AAA;

}

.btn:focus {
  outline: none;
}

</style>
