<template>
  <div class="games">
    <img id="logo" alt="Games" src="../assets/board-game.png">
    <section id="game-gallery">
      <div class="game" v-for="game in games" :key="game.id">
        <input v-if="game.edit" v-model="game.title" placeholder="Title" v-on:keyup.enter="game.edit = false; editGame(game)">
        <h2 v-if="!game.edit" v-on:click="$set(game, 'edit', !game.edit)">{{game.title}}</h2>
        <input v-if="game.edit" v-model="game.numPlayers" placeholder="Number of Players" v-on:keyup.enter="game.edit = false; editGame(game)">
        <p v-if="!game.edit" v-on:click="$set(game, 'edit', !game.edit)">Number of Players: {{game.numPlayers}}</p>
        <input v-if="game.edit" v-model="game.playTime" placeholder="Play Time" v-on:keyup.enter="game.edit = false; editGame(game)">
        <p v-if="!game.edit" v-on:click="$set(game, 'edit', !game.edit)">Play Time: {{game.playTime}}</p>
        <textarea v-if="game.edit" v-model="game.descr" placeholder="Description" v-on:keyup.enter="game.edit = false; editGame(game)"></textarea>
        <p v-if="!game.edit" v-on:click="$set(game, 'edit', !game.edit)">{{game.descr}}</p>

        <img alt="delete" v-if="game.edit" src="../assets/delete.png" @click="deleteGame(game)">
        <!-- <img alt="Edit book" src="../assets/edit.png"> -->
      </div>
      <div class="new game">
        <img alt="Add new game" id="add" v-if="!addNew" @click="addNew = true" src="../assets/add.png">
        <input v-model="title" v-if="addNew" placeholder="Title">
        <input v-model="numPlayers" v-if="addNew" placeholder="Number of Players">
        <input v-model="playTime" v-if="addNew" placeholder="Play Time">
        <textarea v-model="descr" v-if="addNew" placeholder="Description"></textarea>
        <button v-if="addNew" @click="addGame">Add</button>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Games',
  data() {
    return {
      title: "",
      numPlayers: "",
      playTime: "",
      descr: "",
      games: [],
      findGame: null,
      addNew: false,
    };
  },
  created() {
    this.getGames();
  },
  methods: {
    async addGame() {
      try {
        if (this.title == "") {
          this.addNew = false;
          return false;
        }
        await axios.post('/api/games', {
          title: this.title,
          numPlayers: this.numPlayers,
          playTime: this.playTime,
          descr: this.descr
        });
        this.title = null;
        this.numPlayers = null;
        this.playTime = null;
        this.descr = null;
        this.addNew = false;
        this.getGames();
      } catch (error) {
        console.log(error);
      }
    },
    async getGames() {
      try {
        let response = await axios.get("/api/games");
        this.games = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteGame(game) {
      try {
        if (confirm("Are you sure you want to delete \"" + game.title + "\"?")) {
          await axios.delete("/api/games/" + game._id);
          this.getGames();
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async editGame(game) {
      try {
        await axios.put("/api/games/" + game._id, {
          title: this.title,
          numPlayers: this.numPlayers,
          playTime: this.playTime,
          descr: this.descr
        });
        this.getGames();
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

#game-gallery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
}

.game {
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

.game img {
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