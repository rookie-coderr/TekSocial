<template>
<div id="frame">
    <div id="sidepanel">
      <div id="profile">
        <div class="wrap">
          <img
            id="profile-img"
            src={currentUser.profilePicture}
            class="online"
            alt=""
          />
          <p>{currentUser.name}</p>
          <div id="status-options">
            <ul>
              <li id="status-online" class="active">
                <span class="status-circle"></span> <p>Online</p>
              </li>
              <li id="status-away">
                <span class="status-circle"></span> <p>Away</p>
              </li>
              <li id="status-busy">
                <span class="status-circle"></span> <p>Busy</p>
              </li>
              <li id="status-offline">
                <span class="status-circle"></span> <p>Offline</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div id="search" />
      <div>
        <div class="sidebar">
          <div id="contacts">
            <ul>
              <li v-for="contact in contacts" :key="contact.id"
                :class="{ 'contact': true, 'active': activeContact && contact.id === activeContact.id }"
                @click="setActiveContact(contact)"
              >
                <div class="wrap">
                  <span class="contact-status online"></span>
                  <img :id="contact.id" :src="contact.profilePicture" alt="" />
                  <div class="meta">
                    <p class="name">{{ contact.name }}</p>
                    <p v-if="contact.newMessages !== undefined && contact.newMessages > 0" class="preview">
                      {{ contact.newMessages }} new messages
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div id="bottom-bar">
            <button id="addcontact">
              <i class="fa fa-user fa-fw" aria-hidden="true"></i>
              <span>Profile</span>
            </button>
            <button id="settings">
              <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
              <span>Settings</span>
            </button>
          </div>
        </div>
        <div class="content">
          <div class="contact-profile">
            <img :src="activeContact && activeContact.profilePicture" alt="" />
            <p>{{ activeContact && activeContact.name }}</p>
          </div>
          <ScrollToBottom class="messages">
            <ul>
              <li v-for="msg in messages" :key="msg.id" :class="msg.senderId === currentUser.id ? 'sent' : 'replies'">
                <img v-if="msg.senderId !== currentUser.id" :src="activeContact.profilePicture" alt="" />
                <p>{{ msg.content }}</p>
              </li>
            </ul>
          </ScrollToBottom>
          <div class="message-input">
            <div class="wrap">
              <input
                name="user_input"
                size="large"
                placeholder="Write your message..."
                v-model="text"
                @keypress.enter="sendMessage(text)"
              />
    
              <Button icon="<i class='fa fa-paper-plane' aria-hidden='true'></i>" @click="sendMessage(text)" />
            </div>
          </div>
        </div>
      </div>
  </div>
</div>

</template>