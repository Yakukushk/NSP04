<template>
  <Header/>
  <v-label class="text-h5 mt-3 mb-2">Hello, Admin</v-label>
  <br/>
  <v-btn @click="cleanData">Clean Data</v-btn>

  <v-form class="mt-5" @submit.prevent="onSubmitForm">

    <span class="text-h6">Typing your Title</span>
    <v-text-field
      v-model="news.title"
      class="mt-2"

      required
      hide-details
    ></v-text-field>
    <span class="text-h6">Typing your Name</span>
    <v-text-field
      v-model="news.userName"
      class="mt-2"

      required
      hide-details
    ></v-text-field>
    <span class="text-h6">Typing your Surname</span>
    <v-text-field
      v-model="news.userSurname"
      class="mt-2"

      required
      hide-details
    ></v-text-field>
    <span class="text-h6">Typing your Text</span>
    <v-textarea
      v-model="news.txt"

      class="mt-2"
      hide-details
      required
    ></v-textarea>


    <span class="text-h6">Choice your Category</span>
    <v-select
      v-model="news.category"
      label="Select your Category"
      :items="['Digital News', 'IT News', 'Blogs', 'All Categories']"

    ></v-select>
    <v-spacer></v-spacer>
    <div class="mt-2">
      <span class="text-h6">Detail Text</span>
      <v-btn
        class="ma-2"
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </div>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <span class="text-h6">Typing your Extra Information</span>
        <v-textarea
          v-model="news.detailTxT"
          class="mt-2"
          hide-details
          required
        ></v-textarea>
      </div>
    </v-expand-transition>
    <v-spacer></v-spacer>

    <v-btn class="mt-4" type="submit">Add</v-btn>
  </v-form>
  <div>
    <span class="text-h6">Typing your Image</span>
    <br/>
    <v-file-input class="mb-4" type="file" ref="myfile" @change="fileChange"/>
    <v-btn @click="uploadImage">upload</v-btn>
  </div>
  <hr/>

  <div class="form-outline">
    <div class="col-5">
      <input type="search" v-model="search" id="form1" class="form-control" placeholder="Type query"
             aria-label="Search"/>
    </div>
  </div>

  <v-card>
    <v-list>


      <v-list-item v-for="note in searchMethod" :key="note.id">
        <v-list><img :src="note.img" :alt="note.title" style="width: 20%; height: 20%"/></v-list>
        <v-list-item-title>Posted in - {{ note.date }} {{ note.time }}</v-list-item-title>
        <v-list-item-action>
          <div class="col-4">
            <p class="text-left text-h6">{{ note.title }}</p>
          </div>
        </v-list-item-action>

        <v-list-item-action>
          <div class="col-lg-4">
            <p class="text-left">{{ note.txt }}</p>
          </div>
        </v-list-item-action>

        <v-list-item-subtitle>
         Category - {{ note.category }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>Publisher - {{ note.userName }} {{ note.userSurname }}</v-list-item-subtitle>
        <v-list-item-title v-if="note.detailTxT !== ''"><a class="link-underline" @click="routing(note.id)">More</a>
        </v-list-item-title>
        <div class="buttons mt-2">
          <v-btn @click="deleteNews(note.id) " color="red">Remove Item</v-btn>
          <br/>
          <v-btn @click="update(note.id)" class="mt-2" color="grey">Update Item</v-btn>
        </div>
      </v-list-item>


    </v-list>
  </v-card>
  <Footer class="mt-4"/>
</template>

<script lang="ts">
import {computed, defineComponent, reactive, ref} from "vue";
import {createNews, db, deleteNews, storageNews, updateNews} from "@/firebase/country";
import {uploadBytes, getDownloadURL, ref as storageRef} from "firebase/storage"
import {useRouter} from "vue-router";
import {useCollection} from "vuefire";
import {collection} from "firebase/firestore";
import Header from "@/components/User/SiteComponent/Header.vue";
import Footer from "@/components/User/SiteComponent/Footer.vue";


export default defineComponent({
  name: "AdminInterface",

  components: {Header, Footer},
  setup() {
    const newsList = useCollection(collection(db, 'news'));
    const router = useRouter()
    const selectedFile = ref(null);
    const imagePath = reactive({})
    let imageUrl;
    const time = new Date();
    const search = ref('');
    const show = ref(false);

    const news = reactive(
      {
        id: 0,
        title: '',
        img: '',
        txt: '',
        detailTxT: '',
        userName: '',
        userSurname: '',
        time: time.toLocaleTimeString(),
        date: time.toLocaleDateString(),
        category: '',
        like: 0,
        dislike: 0,
        shared: false,
        comments: []
      });


    const update = async (newsID: string) => {
      const updateNewsValues =
        {
          id: news.id,
          title: news.title,
          img: news.img,
          txt: news.txt,
          detailTxT: news.detailTxT,
          userName: news.userName,
          userSurname: news.userSurname,
          time: news.time,
          date: news.date,
          category: news.category,
        }
      await updateNews(newsID, updateNewsValues)
    }
    const fileChange = (e) => {
      selectedFile.value = e.target.files[0];
    }


    const uploadImage = async () => {
      if (!selectedFile.value) return;

      const file = selectedFile.value;
      const storageReference = storageRef(storageNews, `images/${file.name}`);

      try {
        const snapshot = await uploadBytes(storageReference, file);
        swal('File uploaded', snapshot)
        console.log('File uploaded:', snapshot);

        imageUrl = await getDownloadURL(storageReference);
        news.img = imageUrl;
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    };


    const searchMethod = computed(() => {
      return newsList.value.filter((doc) => {
        return doc.title.toLowerCase().includes(search.value)
      })
    })
    const onSubmitForm = async () => {


      await createNews(
        {
          id: news.id,
          title: news.title,
          img: news.img,
          txt: news.txt,
          detailTxT: news.detailTxT,
          userName: news.userName,
          userSurname: news.userSurname,
          time: news.time,
          date: news.date,
          category: news.category,
          like: news.like,
          dislike: news.dislike,
          comments: news.comments
        })
      await uploadImage();
      swal("Created");
      news.title = '';
      news.txt = '';
      news.img = '';


    }
    const cleanData = () => {
      news.txt = '';
      news.userName = '';
      news.userSurname = '';
      news.title = '';
      news.detailTxT = '';
    }

    // const login = () => {
    //
    //   const login = prompt("Login");
    //   if (login === "admin" || login === "Admin") {
    //     const password = prompt("Password");
    //     if (password === "1111") {
    //       router.push('/admin')
    //       swal("Welcome")
    //     } else {
    //       swal("Routing to user...")
    //       router.push('/home')
    //     }
    //   } else {
    //     swal("Routing to user...")
    //     router.push('/home')
    //
    //   }
    //
    // }
    // onMounted(login)

    const routing = (id) => {
      router.push(`/article/${id}`)
    }
    return {
      news,
      newsList,
      onSubmitForm,
      deleteNews,
      update,
      uploadImage,
      imagePath,
      fileChange,
      imageUrl,
      search,
      searchMethod,
      cleanData,
      show,
      routing
    }

  }
})
</script>

<style scoped>

</style>
