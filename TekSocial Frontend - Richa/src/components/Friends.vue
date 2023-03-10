<template>
  <div class="friend-content" style="background-color: #1c1c1c">
    <nav
    class="navbar navbar-expand-lg navbar-light  rounded-pill"
    style="width: 55%; margin:0 auto;"
  >
  <div class="container-fluid">
    <a class="navbar-brand" style="font-weight: bold ; color:white" href="#">Friends</a>
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
  </div></nav>

    <ul class="data" v-if="filteredFriends.length > 0">
      <!-- <div v-for="profile in contents" :key="profile.id">
        <h3>{{ profile.userName }}</h3>
        <img :src="profile.userProfilePic" alt="profile picture">
      </div> -->
      <!-- <li v-for="profile in filteredFriends" :key="profile.id">
        <img :src="profile.userProfilePic" alt="Profile picture">
        <span>{{ profile.userName }}</span>
      </li> -->
      <li class="list" v-for="content in filteredFriends" :key="content.profileId">
        <div class="profile-section">
          <img src="@/assets/Profile_photo.png" class="rounded-circle">
          <h2>{{ content.profileName }}</h2>
        </div>
        <div class="btn" @click="deleteFriend(content.profileId)">Delete</div>
      </li>
    </ul>
    <h2 v-else class="data" style="justiy-content: center; size:100px">No friends to show</h2>

  </div>
</template>

<!-- <script setup>

import {getAllFriends} from "../services/APIServices";
import {ref, onMounted} from "vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const contents = ref([]);

    onMounted(()=> {
      onLoad();
    })

    const onLoad = (async () => {
      try {
        const response = await getAllFriends(route.params.id);
        contents.value = response.data;
      } catch (error) {
        if (error.response.status === 404) {
          console.log("Resource not found");
        } else {
          console.log("An error occurred:", error.message);
        }
      }
    });
  // getAllFriendRequests(userId.value).then((response)=> {
  //       console.log(response.profileList);
  //       friendRequest.value = response.profileList;
  //     }).catch((error)=>{
        
  //     })

  const filteredFriends = () => {
      return this.contents.filter((content) => {
        return content.name
          .toLowerCase()
          .includes(this.searchText.toLocaleLowerCase());
      });
    }
    
  
</script> -->

<script>
import { getAllFriends, deleteFriend  } from "../services/APIServices";
import { ref, onMounted, computed } from "vue";
import { createToaster } from "@meforma/vue-toaster";
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const contents = ref([]);
    const searchText = ref('');
    const toaster = createToaster({});

    onMounted(async () => {
      try {
        // const response = await getAllFriends(JSON.parse(localStorage.getItem("userObject")).id);
        const response = await getAllFriends(2);
        contents.value = response.profileList;
        
      } catch (error) {
        console.error(error);
      }
    });

    const filteredFriends = computed(() => {
      return contents.value.filter((content) => {
        return content.profileName
          // .toLowerCase()
          .includes(searchText.value.toLocaleLowerCase());
      });
    });

  // function deleteFriend (userId) {
  //     try {
  //       // console.log(this.content);
  //       const response = deleteFriend(1, userId);
  //       console.log(response);
  //       toaster.success(`Connection deleted successfully !!`);
  //     } catch (error) {
  //       // console.log(this.content);
  //       // console.log(userId);
  //       toaster.error(`Error deleting connection !!`);
  //     }
      
  //   }

    return { contents, searchText, filteredFriends , deleteFriend };
  },
};
</script>


<style scoped>

.friend-content{
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 100px;
  width: calc(100vw - 100px);
  padding-top: 18px;

}

.full-content{
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(0 , 50%);
}

.top {
  
  margin-bottom: 20px;
}
.rounded-pill {
  background-color: dimgray;
  margin-left: 18%;
}
.hamburger {
  margin-left: 50px;
  color: orange;
  font-size: 25px;
}
.profile-section {
  display: flex;
  align-items: center;
}
.profile-section h2 {
  font-size: 18px;
  line-height: 24px;
  margin-left: 13px;
}
/* Center the list and give it some padding */
.data {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 100%;
  font-size: xx-small;
  width: 100%;
}.rounded-circle {
  width: 64px;
  height: 64px;
}

/* Style each list item */
.list {
  background-color: #d5af2f;
  border-radius: 50px 0px 50px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-top: 20px;
  font-size: 1.2rem;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
  transition: all 0.2s ease-in-out;
  width: 65%;
  margin: auto;
  margin-top: 20px;
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
  width: 100%;

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
  background-color: #F24E1E !important;
  color: aqua;
  border: none;
  justify-self: flex-end;
  display: flex;
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

.form-control {
  border-radius: 50px;
}
</style>
