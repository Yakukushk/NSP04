<template>

  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">Recent Posts</h5>
      <ul class="list-group" v-for="news in showPost" :key="news.id">
        <li class="list-group-item list-group-item-action ">
          <a class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
             :href="sharedLink(news)">{{ news.title }} -{{news.time}} {{news.date}}</a></li>
      </ul>
    </div>

    </div>


</template>

<script lang="ts">
import {computed, defineComponent} from "vue";

export default defineComponent({
  name: "RecentPosts",
  props: ['news'],
  setup(props){
    // eslint-disable-next-line vue/return-in-computed-property
    const showPost = computed(() => {
      const sortedNews = props.news.slice().sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      return sortedNews.slice(0, 3);
    })
    const sharedLink = (news) => {
      return `#/article/${news.id}`
    }
    return {
      showPost, sharedLink
    }
  }
})
</script>

<style scoped>
.card{
  position: absolute;
}
</style>
