<template>
  <div class="books">
    <h1>This is the books page</h1>
    <section class="book-gallery">
      <!-- <div class="book" v-for="book in books" :key="book.id">
        <h2>{{book.title}}</h2>
        <p>{{book.descr}}</p>
      </div> -->
      <div class="new book" id="new-book"><img alt="Add new book" src="../assets/add.png"></div>
    </section>
  </div>
</template>

<style scoped>
.book {
  background-color: #0a2859;
	height: 200px;
	width: 150px;
	margin: 20px;
	padding: 10px;
	text-align: center;
	border: #061b3d;
	border-style: solid;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.new:hover {
  background-color: #faf5dc;
}

.book img {
  width: 50%;
  height: auto;
}

</style>