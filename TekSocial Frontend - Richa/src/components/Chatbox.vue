<!-- <template>

    <h1>Hello</h1>
    <input type="text" v-model="messageText"/>
    <button @click="sendMessage">Submit</button>
    <div style="margin-left: 400px">
      <div v-for="(message, index) in messages" :key="index">
        {{message.messageContent}} was sent by {{ message.senderId }} and received by {{ message.recipientId}}
      </div>
    </div>



</template> -->

<template>
  <div class="" style="margin-left : 100px">
      <div class="row no-gutters">
        <div class="col-md-3 border-right">
          <div class="settings-tray">
            <img class="profile-image" src="https://www.clarity-enhanced.net/wp-content/uploads/2020/06/filip.jpg" alt="Profile img">
            <span class="settings-tray--right">
              <i class="material-icons">cached</i>
              <i class="material-icons">message</i>
              <i class="material-icons">menu</i>
            </span>
          </div>
          <div class="search-box">
            <div class="input-wrapper">
              <i class="material-icons">search</i>
              <input placeholder="Search here" type="text">
            </div>
          </div>
          <div class="Friend-list">
            <ul class="friend-drawer " v-if="filteredFriends.length > 0">
              <li class="friend-drawer list-content--onhover" v-for="content in filteredFriends" :key="content.profileId" @click="setRecipientId(content.profileId)">
                <div class="list-content">               
                   <img src="@/assets/sampleProfileImage.png" class="profile-image mx-4">
                    <div class="text">
                      <h6>{{ content.profileName }}</h6>
                      <p class="text-muted" style="color: white;">Chat with your friend</p>
                    </div>
                </div>
                <hr>
              </li>
            </ul>
          </div>
          <hr>
        </div>
        <div class="col-md-9" style="position: relative;">
          <div class="settings-tray">
            <div class="friend-drawer no-gutters friend-drawer--grey">
              <img class="profile-image" src="@/assets/sampleProfileImage.png" alt="">
              <div class="text">
                <h6>ritik@1245</h6>
                <p class="text-muted">Can't Stay Still !!</p>
              </div>
              <span class="settings-tray--right">
                <i class="material-icons">cached</i>
                <i class="material-icons">message</i>
                <i class="material-icons">menu</i>
              </span>
            </div>
          </div>
          <div class="chat-panel">
            <!-- <div class="row no-gutters">
              <ul class="friend-drawer " v-if="messages.length > 0">
                <li class="friend-drawer list-content--onhover" v-for="message in ChatMessages" :key="message.chatId">
                  <div class="list-content">               
                     <img src="@/assets/Profile_photo.png" class="profile-image mx-4">
                      <div class="text">
                        <h6>{{ message.messageContent}}</h6>
                        <p class="text-muted" style="color: white;">I'm a girl with passion</p>
                      </div>
                  </div>
                  <hr>
                </li>
                
              </ul>
            </div> -->
            <div class="row no-gutters md-12">
              <div class="md-9">
                <!-- <div class="chat-bubble chat-bubble--left"  v-for="message in messages" :key="message.chatId">
                  <h6>{{ message.messageContent}}</h6>

                </div> -->
                <div class=" row no-gutters md-12" v-for="(message, index) in messages" :key="index">
                  <div :class="[message.senderId === userId ? 'chat-bubble chat-bubble--right md-9' : ' col-md-3 offset-md-9 chat-bubble chat-bubble--right']">
                    {{ message.messageContent }}
                  </div>
                  <!-- <div>
                    <div :class="{ 'chat-bubble-right' : message.senderId !=  userId}">
                      {{message.messageContent}}
                      </div>
                  </div> -->
              </div>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col-md-3 offset-md-9">
                <div class="chat-bubble chat-bubble--right">
                  Hello dude!
                </div>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col-md-3 offset-md-9">
                <div class="chat-bubble chat-bubble--right">
                  Hello dude!
                </div>
              </div>
            </div>
          
              <div>
                <div class="chat-box-tray col-md-9" style="position:fixed ; bottom:0px;">
                  <i class="material-icons">sentiment_very_satisfied</i>
                  <input type="text" v-model="messageText"/>
  
                  <i class="material-icons">mic</i>
                  <button @click="sendMessage">Submit</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
  import {ref, onMounted, computed,watch} from "vue"
  import {findChatMessages , findChatMessage, getAllFriends} from "../services/APIServices";
  let userId = ref(JSON.parse(localStorage.getItem("user")).id);
  // let userId = ref(4);
  let recipientId = ref(-1);
  let stompClient = null;
  let messageText = ref("");
  const contents = ref([]);
  const messages = ref([]);
  onMounted(()=> {
    getAllFriendsAndSetRecipient(); 
      console.log("RICHA");       
      connectToSocket();
      // getAllFriends()
  })

  // onMounted(async () => {
  //     try {
  //       // const response = await getAllFriends(JSON.parse(localStorage.getItem("userObject")).id);
  //       const response = await getAllFriends(JSON.parse(localStorage.getItem("user")).id);
  //       // console.log("get message calling");
  //       contents.value = response.profileList;
        
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   });
    const getAllFriendsAndSetRecipient = async ()=> {
      console.log("HIIIIIII")
      try {
        const response = await getAllFriends(JSON.parse(localStorage.getItem("user")).id);
        // console.log("get message calling");
        contents.value = response.profileList;
        recipientId.value = contents.value[0].profileId
        console.log(recipientId.value)
      }catch(error){
        console.log(error)
      }
    }
    const filteredFriends = computed(() => {
      return contents.value.filter((content) => {
        return content.profileName
          // .toLowerCase()
          // .includes(searchText.value.toLocaleLowerCase());
      });
    });
  const setRecipientId = (id)=> {
    console.log(id)
    recipientId.value = id;
    getAllMessages();
  }
  
//   watch(recipientId, (val) => {
//   if (!recipientId = recipientId.val) {
//     userNameError.value = 'Username is required';
//   } else {
//     userNameError.value = null;
//   }
// });

// watch(recipientId, (val) => {
//   if (recipientId.value != val) {
//     getAllMessages();
//   } else {
//     console.log(recipientId);
//   }
// });

  const connectToSocket = ()=> {
    // console.log("socket function");
  const Stomp = require("stompjs");
  var SockJS = require("sockjs-client");
  SockJS = new SockJS("http://localhost:8083/ws");
  stompClient = Stomp.over(SockJS);
  stompClient.connect({}, onConnected, onError);
  console.log("Connected successfully")
  }


  const onConnected = () => {
  console.log(userId);
  stompClient.subscribe(
    "/user/" + userId.value + "/queue/messages",
    (message)=> {
      const notification = JSON.parse(message.body);
      console.log(notification);
      console.log(userId.value)
      console.log(notification.senderId == userId.value);
      if(notification.senderId === userId.value){
        findChatMessage(notification.id).then((response)=> {
          console.log(response);
          let newMessages = [...messages.value];
          newMessages.push(response.chatModel)
          messages.value = newMessages;
        })
      }

    }
  );
};

const onError = (err) => {
  console.log(err);
};

const getAllMessages = async () => {
  console.log("get msg start");
  console.log(recipientId.value, userId.value);

  if (recipientId.value != null && userId.value != null) {
    console.log("Getting all messages");

    try {
      const response = await findChatMessages(userId.value,recipientId.value );
      messages.value = response.chatModelList;
      console.log(response.chatModelList);
      console.log(messages.value); // log the updated messages value here
    } catch (error) {
      console.error(error);
    }
  }
}

// const getAllMessages = async () => {
//   if (getAllMessages.isRunning) return;
//   getAllMessages.isRunning = true;

//   console.log("get msg start");
//   console.log(recipientId.value, userId.value);

//   if (recipientId.value != null && userId.value != null) {
//     console.log("Getting all messages");

//     try {
//       const response = await findChatMessage(1, 4);
//       messages.value = response.chatModelList;
//       console.log(messages.value); // log the updated messages value here
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   getAllMessages.isRunning = false;
// }
// getAllMessages.isRunning = false;


const ChatMessages = computed(() => {
      return messages.value.filter((message) => {
        return message.messageContent
          // .toLowerCase()
          // .includes(searchText.value.toLocaleLowerCase());
      });
    });


const sendMessage = () => {
  if (messageText.value.trim() !== "") {
    const message = {
      senderId: userId.value,
      recipientId: recipientId.value,
      // senderId : "1",
      // recipientId : "4",
      messageContent: messageText.value,
    };
    stompClient.send("/app/chat", {}, JSON.stringify(message));
    const newMessages = [...messages.value];
    newMessages.push(message);
    messages.value = newMessages;
  }
};
</script>

<script>
  export default {
      name: "ChatView",
  }
</script>

<style lang="scss" scoped>
// Video tutorial/codealong here: https://youtu.be/fCpw5i_2IYU
$blue: #74b9ff;

body {
  //background-image: url('https://images.unsplash.com/photo-1560568082-c15188aa6510?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80');
  background-color: #3498db;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.container {
  
  background: #fff;
  padding: 0;
  border-radius: 7px;
}

footer {
  font-size: medium;
  width: 100%;
  padding: 0.5em;
  margin-top: 5em;
  position: fixed;
  bottom: 0px;

}

.list-content{
  
  margin-top: 2%;
  margin-bottom: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;

  &--onhover:hover {
    background: dimgray;
    cursor: pointer;

    p,
    h6,
    .time {
      color: white !important;
    }
  }
}



.Friend-list{
  height:100vh;
  background-color: whitesmoke;
}

.data {
  background-color: #212529;
  list-style: none;
  padding: 0;
  max-width: 100%;
  font-size: xx-small;
  width: 100%;
  height: 100vh;
}

.profile-image {
  width: 30px;
  height: 30px;
  border-radius: 40px;
}

.settings-tray {
  background: #eee;
  padding: 10px 15px;
  border-radius: 7px;

  .no-gutters {
    padding: 0;
  }

  &--right {
    float: right;

    i {
      margin-top: 10px;
      font-size: 25px;
      color: grey;
      margin-left: 14px;
      transition: 0.3s;

      &:hover {
        color: $blue;
        cursor: pointer;
      }
    }
  }
}

.search-box {
  background: #fafafa;
  padding: 10px 13px;

  .input-wrapper {
    background: #fff;
    border-radius: 40px;

    i {
      color: grey;
      margin-left: 7px;
      vertical-align: middle;
    }
  }
}

input {
  border: none;
  border-radius: 30px;
  width: 80%;

  &::placeholder {
    color: #e3e3e3;
    font-weight: 300;
    margin-left: 20px;
  }

  &:focus {
    outline: none;
  }
}

.friend-drawer {
  padding-left: 0px;
  display: flex;
  vertical-align: baseline;
  transition: 0.3s ease;
  flex-direction: column;

  
  
  .text {
    color: black;
    width: 70%;

    h6 {
      margin-top: 6px;
      margin-bottom: 0;
    }

    p {
      margin: 0;
    }
  }

  .time {
    color: grey;
  }

 
}

hr {
  margin: 5px auto;
  width: 100%;
  color: white !important;
}

.chat-bubble {
  padding: 10px 14px;
  background: #eee;
  margin: 10px 30px;
  border-radius: 9px;
  position: relative;
  animation: fadeIn 1s ease-in;

  &:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-bottom: 0;
    margin-top: -10px;
  }

  &--left {
    &:after {
      left: 0;
      border-right-color: #eee;
      border-left: 0;
      margin-left: -20px;
    }
  }

  &--right {
    &:after {
      right: 0;
      border-left-color: $blue;
      border-right: 0;
      margin-right: -20px;
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.offset-md-9 {
  .chat-bubble {
    background: $blue;
    color: #fff;
  }
}

.chat-box-tray {
  background: #eee;
  display: flex;
  align-items: baseline;
  padding: 10px 15px;
  align-items: center;
  margin-top: 19px;
  bottom: 0;

  input {
    margin: 0 10px;
    padding: 6px 2px;
  }

  i {
    color: grey;
    font-size: 30px;
    vertical-align: middle;

    &:last-of-type {
      margin-left: 25px;
    }
  }
}

.text-muted{
  color: darkgray !important;
}

</style>