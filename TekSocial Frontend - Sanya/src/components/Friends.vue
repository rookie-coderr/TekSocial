<template>
  <div class="Friend-conetnt" style="background-color: #1c1c1c">
    <div class="top">
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light rounded-pill"
        style="width: 70%"
      >
        <div class="container-fluid">
          <a class="navbar-brand" style="font-weight: bold" href="#">Friends</a>
          <div class="collapse navbar-collapse" id="navbarNav">
            <form class="d-flex ml-auto" style="padding-left: 50%">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="searchText"
              />
            </form>
          </div>
          <div class="hamburger">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </div>
    <div id="app">
      <ul class="data" v-if="filteredFriends.length > 0">
        <li class="list" v-for="content in filteredFriends" :key="content.id">
          <div class="friend-info">
            <img alt="Profile picture of friend" />
            <div class="friend-details">
              <h2>{{ content.name }}</h2>
              <p>{{ content.details }}</p>
            </div>
            <button class="btn">Send Message</button>
          </div>
        </li>
      </ul>
      <h2 v-else class="data" style="justiy-content: center; size:100px">No friends to show</h2>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      contents: [],
      searchText: "",
    };
  },
  mounted() {
    axios
      .get("http://localhost:8083/friend/findfriend")
      .then((response) => (this.contents = response.data))
      .catch((error) => {
        if (error.response.status === 404) {
          console.log("Resource not found");
        } else {
          console.log("An error occurred:", error.message);
        }
      });
  },
  computed: {
    filteredFriends() {
      return this.contents.filter((content) => {
        return content.name
          .toLowerCase()
          .includes(this.searchText.toLocaleLowerCase());
      });
    },
  },
};
</script>
<style scoped>

.Friend-conetnt{
  height: 100vh;
}
.page {
  height: 100vh;
  background-color: black;
}
.top {
  
  margin-bottom: 20px;
}
.rounded-pill {
  margin-left: 18%;
}
.hamburger {
  margin-left: 50px;
  color: orange;
  font-size: 25px;
}

/* Center the list and give it some padding */
.data {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 600px;
  font-size: xx-small;
}

/* Style each list item */
.list {
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  margin-left: -200px;
  padding: 20px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  width: 1000px;
}

/* Hover state for each list item */
li:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Style the friend details */
.friend-info {
  display: flex;
  align-items: center;
}

.friend-info img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px;
  font-size: 30px;
}

.friend-details h2 {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.friend-details p {
  color: #666;
}
.btn {
  position: absolute;
  color: aqua;
  border: none;
  margin-left: 800px;

  border-radius: 100.25rem;
  
  /* font-size: 1.2rem; */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: none;
  width: 150px;
}

.btn:hover {
  background-color: #0069d9;
}
</style>
