<template>
  <div id="app">
    <div id="header">
      <router-link to="/"><div class="header-object">Home</div></router-link>
      <router-link to="/books"><div class="header-object">Books</div></router-link>
      <router-link to="/movies"><div class="header-object">Movies/TV</div></router-link>
      <router-link to="/games"><div class="header-object">Games</div></router-link>
      <router-link to="/about"><div class="header-object">About</div></router-link>
    </div>
    <div id="content">
      <router-view/>
    </div>
    <div id="footer">
      <a href="https://github.com/Speakman610/creative-project4">https://github.com/Speakman610/creative-project4</a>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #5b8ee0;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}

#header {
  /* padding: 30px; */
  background-color: #0a2859;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  flex: initial;
}

.header-object {
  /* background-color: red; */
  padding: 30px 50px;
  font-size: 18px;
}

#header a {
  font-weight: bold;
  text-decoration: none;
  color: #6a7a96;
}

#header a:hover {
  color: rgb(211, 211, 211);
}

#header .header-object:hover {
  background-color: #275196;
}

#header a.router-link-exact-active {
  color: #ffffff;
}

#content {
  padding: 20px 100px;
  min-height: 500px;
}

#footer {
  height: 50px;
  padding: 10px 100px;
  background: #4f6777;
  font-size: 12px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: initial;
}

#footer a {
  color: #dce9fd;
  text-decoration: none;
}

#footer a:hover {
  color: #79aeff;
}

body {
	background-color: #061b3d;
	color: White;
}
</style>
