<template>
  <div class="movies">
    <img id="logo" alt="Movies" src="../assets/film-reel.png">
    <section id="movie-gallery">
      <div class="movie" v-for="movie in movies" :key="movie.id">
        <input v-if="movie.edit" v-model="movie.title" placeholder="Title" v-on:keyup.enter="movie.edit = false; editMovie(movie)">
        <h2 v-if="!movie.edit" v-on:click="$set(movie, 'edit', !movie.edit)">{{movie.title}}</h2>
        <input v-if="movie.edit" v-model="movie.rating" placeholder="Rating" v-on:keyup.enter="movie.edit = false; editMovie(movie)">
        <p v-if="!movie.edit" v-on:click="$set(movie, 'edit', !movie.edit)">Rating: {{movie.rating}}</p>
        <input v-if="movie.edit" v-model="movie.runtime" placeholder="Runtime" v-on:keyup.enter="movie.edit = false; editMovie(movie)">
        <p v-if="!movie.edit" v-on:click="$set(movie, 'edit', !movie.edit)">Runtime: {{movie.runtime}}</p>
        <textarea v-if="movie.edit" v-model="movie.descr" placeholder="Description" v-on:keyup.enter="movie.edit = false; editMovie(movie)"></textarea>
        <p v-if="!movie.edit" v-on:click="$set(movie, 'edit', !movie.edit)">{{movie.descr}}</p>

        <img alt="delete" v-if="movie.edit" src="../assets/delete.png" @click="deleteMovie(movie)">
        <!-- <img alt="Edit book" src="../assets/edit.png"> -->
      </div>
      <div class="new movie">
        <img alt="Add new movie" id="add" v-if="!addNew" @click="addNew = true" src="../assets/add.png">
        <input v-model="title" v-if="addNew" placeholder="Title">
        <input v-model="rating" v-if="addNew" placeholder="Rating">
        <input v-model="runtime" v-if="addNew" placeholder="Runtime">
        <textarea v-model="descr" v-if="addNew" placeholder="Description"></textarea>
        <button v-if="addNew" @click="addMovie">Add</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Movies',
  data() {
    return {
      title: "",
      rating: "",
      runtime: "",
      descr: "",
      movies: [],
      findMovie: null,
      addNew: false,
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    async addMovie() {
      try {
        if (this.title == "") {
          this.addNew = false;
          return false;
        }
        await axios.post('/api/movies', {
          title: this.title,
          rating: this.rating,
          runtime: this.runtime,
          descr: this.descr
        });
        this.title = null;
        this.rating = null;
        this.runtime = null;
        this.descr = null;
        this.addNew = false;
        this.getMovies();
      } catch (error) {
        console.log(error);
      }
    },
    async getMovies() {
      try {
        let response = await axios.get("/api/movies");
        this.movies = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteMovie(movie) {
      try {
        if (confirm("Are you sure you want to delete \"" + movie.title + "\"?")) {
          await axios.delete("/api/movies/" + movie._id);
          this.getMovies();
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editMovie(movie) {
      try {
        await axios.put("/api/movies/" + movie._id, {
          title: this.title,
          rating: this.rating,
          runtime: this.runtime,
          descr: this.descr
        });
        this.getMovies();
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

#movie-gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
}

.movie {
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

.movie img {
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