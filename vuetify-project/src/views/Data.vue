<template>
  <v-form @submit.prevent="onSubmitForm">

    <span class="text-h6">Typing your Note</span>
    <v-text-field
      v-model="notes.name"
      class="mt-2"
      label="Title Note"
      required
      hide-details
    ></v-text-field>

    <span class="text-h6">Typing your Description</span>
    <v-text-field
      v-model="notes.description"
      label="Description Note"
      class="mt-2"
      hide-details
      required
    ></v-text-field>


    <v-btn class="mt-4" type="submit">Add</v-btn>
  </v-form>
  <span class="text-h6">Choose your Country</span>
<!--  <select>-->
<!--    <option :value="country.countries" v-for="countries in country.countries">{{countries.country}}</option>-->
<!--  </select>-->


  <v-btn @click="OnSetSubmitForm">Sent</v-btn>
  <div>
    <v-list>
      <v-list-item v-for="note in notesList" :key="note.id">
        <v-list-item-title>{{ note.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ note.description }}</v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-btn class="text-none mt-2 mb-4" color="red" @click="deleteNote(note.id)">Remove</v-btn>

          <v-btn class="text-none mt-2 mb-4" color="grey" @click="update(note.id)">Update</v-btn>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>


  </div>
</template>

<script lang="ts">

import {defineComponent, reactive, ref, onMounted} from "vue";
import {useCollection} from 'vuefire'
import {collection} from 'firebase/firestore'
import {createNote, db, updateNote, deleteNote, createCountry} from '@/firebase/country'

let id = 0;

export default defineComponent({
  name: "Data",
  setup() {


    const notes = reactive({id: id++, name: '', description: ''});
    const countryInput = ref('');
    // const country = ref([
    //   {id: 0, country: 'Ukraine', city: 'Kiev'},
    //   {id: 1, country: 'USA', city: 'New York'},
    //   {id: 2, country: 'Poland', city: 'Slupsk'}
    // ]);
    const country = ref({
      countries: [{
        country: 'Ukraine',
        city: 'Kyiv'
      }, {
        country: 'Poland',
        city: 'Katowice'
      }, {
        country: 'USA',
        city: 'New York'
      },
        {country: 'Germany',
        city: 'Berlin'},]
    })
    const notesList = useCollection(collection(db, 'notes'));

    const onSubmitForm = async () => {
      await createNote({id: notes.id, name: notes.name, description: notes.description});
      swal("Created");
      notes.name = ''
      notes.description = ''
    }
    const OnSetSubmitForm = async () => {
for(const i of country.value.countries)
  await createCountry(i.country, i.city)
  console.log('Sent')


    }


    const update = async (noteId) => {
      const updatedNote = {id: notes.id, name: notes.name, description: notes.description};
      await updateNote(noteId, updatedNote);

      // notes.name =  ;
      // notes.description = ;
      swal(`Updated`);
    }

    return {
      notes, onSubmitForm, notesList, deleteNote, update, country,  OnSetSubmitForm
    }
  }
})
</script>

<style scoped>
.v-text-field {
  width: 50%;
}
</style>
