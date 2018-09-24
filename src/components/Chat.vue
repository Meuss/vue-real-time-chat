<template>
  <div class="chat container">
    <div class="row">
      <div class="col s12">
        <div class="center">
          <div class="logos">
            <img src="../assets/vue.svg"><span>+</span>
            <img src="../assets/firebase.svg">
            <h2 class="center orange-text">Chat</h2>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <ul class="messages" v-chat-scroll>
              <li v-for="message in messages" :key="message.id">
                <span class="orange-text name">{{ message.name }}</span>
                <span class="grey-text text-darken-3">{{ message.content }}</span>
                <span class="grey-text time">{{ message.timestamp }}</span>
              </li>
            </ul>
          </div>
          <div class="card-action">
            <NewMessage :name="name" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s4 offset-s8">
        <div class="card orange-text">
          <p>Saves the messages directly into firebase, with real-time updates using snapshots (open it up in another browser to see the messages appear there right away!) </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage';
import db from '@/firebase/init';
import moment from 'moment';

export default {
  name: 'Chat',
  props: ['name'],
  components: {
    NewMessage,
  },
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const ref = db.collection('messages').orderBy('timestamp');
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll'),
          });
        }
      });
    });
  },
};
</script>

<style lang="scss">
.logos {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 40px;
    max-width: 100%;
  }
  span {
    margin-left: 5px;
    margin-right: 10px;
  }
}
.chat {
  h2 {
    margin-left: 20px;
    font-size: 2.6em;
    margin-bottom: 35px;
  }
  span {
    font-size: 1.4em;
  }
  .time {
    display: block;
    font-size: 0.8em;
  }
}
.messages {
  max-height: 300px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.messages::-webkit-scrollbar {
  width: 3px;
}

.messages::-webkit-scrollbar-track {
  background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
  background: #aaa;
}
p {
  font-size: 0.8em;
  padding: 24px;
}
</style>
