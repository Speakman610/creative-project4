<template>
  <div class="books">
    <h1>This is the books page</h1>
    <section class="book-gallery">
      <div class="book" v-for="book in books" :key="book.id">
        <h2>{{book.title}}</h2>
        <h4>{{book.author}}</h4>
        <p>{{book.descr}}</p>
      </div>
      <div class="new book" id="new-book">
        <!-- <img alt="Add new book" src="../assets/add.png"> -->
        <input v-model="title" placeholder="Title">
        <input v-model="author" placeholder="Author">
        <textarea v-model="descr" placeholder="Description"></textarea>
        <button @click="add">Add</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Books',
  data() {
    return {
      title: "",
      author: "",
      descr: "",
      books: [],
    }
  },
  created() {
    this.getBooks();
  },
  methods: {
    async add() {
      try {
        await axios.post('/api/books', {
          title: this.title,
          author: this.author,
          descr: this.descr
        });
      } catch (error) {
        console.log(error);
      }
    },
    async getBooks() {
      try {
        let response = await axios.get("/api/books");
        this.books = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>


<style scoped>
.book {
  background-color: #0a2859;
	height: 210px;
	width: 100%;
  margin-bottom: 20px;
	padding: 10px;
	text-align: left;
	border: #061b3d;
	border-style: solid;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.new button {
  align-self: flex-end;
}

.book img {
  width: 50%;
  height: auto;
}

input,
textarea,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 0.75em;
}

textarea {
  height: 100%;
  max-width: 100%;
}

</style>