<template>
  <div class="books">
    <img id="logo" alt="Books" src="../assets/open-book.png">
    <section id="book-gallery">
      <div class="book" v-for="book in books" :key="book.id">
        <input v-if="book.edit" v-model="book.title" placeholder="Title" v-on:keyup.enter="book.edit = false; editBook(book)">
        <h2 v-if="!book.edit" v-on:click="$set(book, 'edit', !book.edit)">{{book.title}}</h2>
        <input v-if="book.edit" v-model="book.author" placeholder="Author" v-on:keyup.enter="book.edit = false; editBook(book)">
        <h4 v-if="!book.edit" v-on:click="$set(book, 'edit', !book.edit)">by {{book.author}}</h4>
        <textarea v-if="book.edit" v-model="book.descr" placeholder="Description" v-on:keyup.enter="book.edit = false; editBook(book)"></textarea>
        <p v-if="!book.edit" v-on:click="$set(book, 'edit', !book.edit)">{{book.descr}}</p>

        <img alt="delete" v-if="book.edit" src="../assets/delete.png" @click="deleteBook(book)">
        <!-- <img alt="Edit book" src="../assets/edit.png"> -->
      </div>
      <div class="new book">
        <img alt="Add new book" id="add" v-if="!addNew" @click="addNew = true" src="../assets/add.png">
        <input v-model="title" v-if="addNew" placeholder="Title">
        <input v-model="author" v-if="addNew" placeholder="Author">
        <textarea v-model="descr" v-if="addNew" placeholder="Description"></textarea>
        <button v-if="addNew" @click="addBook">Add</button>
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
      findBook: null,
      addNew: false,
    }
  },
  created() {
    this.getBooks();
  },
  methods: {
    async addBook() {
      try {
        if (this.title == "") {
          this.addNew = false;
          return false;
        }
        await axios.post('/api/books', {
          title: this.title,
          author: this.author,
          descr: this.descr
        });
        this.title = null;
        this.author = null;
        this.descr = null;
        this.addNew = false;
        this.getBooks();
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
    },
    async deleteBook(book) {
      try {
        if (confirm("Are you sure you want to delete \"" + book.title + "\"?")) {
          await axios.delete("/api/books/" + book._id);
          this.getBooks();
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editBook(book) {
      try {
        await axios.put("/api/books/" + book._id, {
          title: book.title,
          author: book.author,
          descr: book.descr,
        });
        this.getBooks();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>


<style scoped>
#logo {
  width: 100px;
  padding: 0 0 20px;
}

#book-gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
}

.book {
  background-color: #0a2859;
	height: auto;
  min-height: 275px;
	width: 275px;
  margin: 5px;
	padding: 20px;
	text-align: left;
	border: 1px solid #061b3d;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
}

.book img {
  width: 20px;
  justify-self: flex-end;
  align-self: flex-end;
}

#add {
  width: 100px;
  padding-top: 30%;
  justify-self: center;
  align-self: center;
  cursor: pointer;
}

.new button {
  align-self: flex-end;
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