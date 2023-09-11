<template>
  <Header/>


  <div class="mt-4" v-for="news in newNewsArticle" :key="news.id">
    <v-img class="rounded mx-auto d-block" :src="news.img" style="width: 30%; height: 30%;"></v-img>
    <h3 class="mt-5 text-justify">{{ news.title }}</h3>
    <p class="fs-5 text-justify mt-2">{{ news.txt }}</p>
    <p class="fs-5 text-justify mt-2">{{ news.detailTxT }}</p>
    <p class="fs-5 text-justify mt-5">Publisher - {{ news.userName}} {{news.userSurname}}</p>
    <p class="fs-5 text-justify">Posted - {{ news.date}} {{news.time}}</p>
    <div class="card mt-2">
      <div class="card-body">
        <form @submit.prevent="submitForm(news)">
          <h5 class="card-title">Comments</h5>
          <span class="text-h6">Typing your Comments</span>

          <v-text-field
            v-model="commentsValues.comments"
            class="mt-2"
            hide-details
            required
          ></v-text-field>
          <button type="submit">Submit</button>
        </form>
        <ul class="list-group-flush mt-2" v-for="comment in news.comments">
          <li class="list-group">{{comment.comment}}</li>
          <li class="list-group">{{comment.date}}</li>
          <li class="list-group">{{comment.time}}</li>
        </ul>


      </div>
    </div>

  </div>

<Footer class="mt-5"/>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref} from "vue";
import {db} from "@/firebase/country";
import {useCollection} from "vuefire";
import {collection, doc, updateDoc} from "firebase/firestore";
import {useRoute} from "vue-router";
import Header from "@/components/User/SiteComponent/Header.vue";
import Footer from "@/components/User/SiteComponent/Footer.vue";

export default defineComponent({
  name: "CommentsForm",
  components: {
    Footer,
    Header
  },
  setup() {
    const newsList = useCollection(collection(db, 'news'));
    const route = useRoute();
    const newsId = route.params.id;
    const newNewsArticle = computed(() => {
      return newsList.value.filter((doc) => doc.id === newsId)
    })
    const dateTime = new Date();
    const commentsValues = reactive({
      comments: '',
      date: dateTime.toLocaleDateString(),
      time: dateTime.toTimeString()
    })
    const submitForm = async(news) => {

        news.comments.push({comment: commentsValues.comments, date: commentsValues.date, time: commentsValues.time})
        const newRef = doc(db, 'news', news.id);
        await updateDoc(newRef, {
          comments: news.comments
        })

    }

    return {
      newsList, newNewsArticle, submitForm, commentsValues
    }
  }
})
</script>

<style scoped>

</style>
