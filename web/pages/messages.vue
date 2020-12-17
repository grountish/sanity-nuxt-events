<template>
  <div>
    <div class="form">
      <input v-model="msg" type="text" />
      <button @click="writeToFirestore">Write Messages</button>
      <button @click="readFromFirestore">Read Messages</button>
    </div>

    <div class="container">
      <div v-for="message in messages" :key="message.id" class="card">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      messages: []
    }
  },
  mounted() {
    this.readFromFirestore()
  },
  methods: {
    async writeToFirestore() {
      const messageRef = this.$fire.firestore.collection('message')
      try {
        await messageRef.add({
          message: this.msg
        })
        this.readFromFirestore()
      } catch (e) {
        alert(e)
        return
      }
    },
    async readFromFirestore() {
      try {
        const snapshot = await this.$fire.firestore.collection('message').get()
        const newArr = []
        snapshot.forEach(doc => {
          let nd = doc.data()
          newArr.push(nd.message)
        })
        this.messages = newArr
      } catch (e) {
        alert(e)
      }
    }
  }
}
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 1%;
  padding: 4%;
  background-color: hsl(47, 79%, 87%);
  font-size: 1.2em;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 700;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
