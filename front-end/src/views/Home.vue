<template>
  <div class="home">
    <img alt="Home" src="../assets/dices.png">
    <h1>Welcome to the Custom Catalog!</h1>
    <div id="entertainment">
      <router-link to="/books"><div class="ent-object"><img alt="Books" src="../assets/open-book.png"><h3>Read a book</h3></div></router-link>
      <router-link to="/movies"><div class="ent-object"><img alt="Movies/TV" src="../assets/film-reel.png"><h3>Watch a movie</h3></div></router-link>
      <router-link to="/games"><div class="ent-object"><img alt="Games" src="../assets/board-game.png"><h3>Play a game</h3></div></router-link>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
  #entertainment {
    display: flex;
    justify-content: center;
  }

  #entertainment a {
    text-decoration: none;
    color: #faf5dc;
  }

  .ent-object {
    /* background-color: rgb(110, 87, 87); */
    padding: 20px;
    min-width: 200px;
  }

  .ent-object:hover {
    border: 1px solid #faf5dc;
    border-radius: 50px;
    background-color: #faf5dc73;
    color: #0d1116;
  }

  .ent-object img {
    width: 100px;
  }
</style>