<template>
  <div class="cht">
  <h1>Hello</h1>
  <input type="text" v-model="messageText"/>
  <button @click="sendMessage">Submit</button>
  <div style="margin-left: 400px">
    <div v-for="(message, index) in messages" :key="index">
      {{message.messageContent}} was sent by {{ message.senderId }} and received by {{ message.recipientId}}
    </div>
  </div>
</div>
</template>

<script setup>
  import {ref, onMounted} from "vue"
  import {findChatMessages , findChatMessage} from "../services/APIServices";
  // let userId = ref(JSON.parse(localStorage.getItem("user")).id);
  let userId = ref(1)
  let recipientId = ref(4);
  let stompClient = null;
  let messages = ref([]);
  let messageText = ref("");
  onMounted(()=> {
      getAllMessages();        
      connectToSocket();
  })
  const connectToSocket = ()=> {
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
const getAllMessages = ()=> {
if(recipientId.value != null && userId.value != null){
  console.log("Getting all messages");
  findChatMessages(userId.value, recipientId.value).then((response)=> {
    messages.value = response.chatModelList;
  })
}
}
const sendMessage = () => {
  if (messageText.value.trim() !== "") {
    const message = {
      senderId: userId.value,
      recipientId: recipientId.value,
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

<style>

.cht{
  margin: 100px;
}

</style>