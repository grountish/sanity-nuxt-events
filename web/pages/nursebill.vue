<template>
  <div>
    <div v-if="show">
      <p>
        Welcome to the Gift Shop: the only part of any Museum worth visiting. We
        hope you've enjoyed your experience. Before you leave, please collect
        your receipt. -
      </p>
      <h1>Select your country</h1>
      <v-select :options="options" @onSelection="onSelection"></v-select>
      <p>
        Your experience with the world of offshore tax dodging comes to a total
        of
      </p>
      <h1>${{ totalLoss }}</h1>
      <button disabled>**Pay by Card**</button>
      <p>
        we sold our card machine so we could pay a bonus to our Museum CEO.
        Choose another payment type)
      </p>
      <button disabled>**Pay by Cash**</button>
      <p>
        Cash is so 20th century. Plus it spreads germs. Choose another payment
        type
      </p>
      <button>**Pay by Nurses**</button>
      <p>
        Your special receipt is printing. Want to add a comment to it?
        <textarea
          id=""
          v-model="comment"
          name=""
          cols="30"
          rows="10"
        ></textarea>
      </p>
      <button>Download</button>

      <p>your receipt now and share to Socasdial Media with the Hashtag #MoMN</p>
    </div>

    <div>
      <div>
        <ReceiptTicket
          :nurses="nurses"
          :country="country"
          :comment="comment"
          @onHide="onHide"
        />
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from '../components/v-select.vue'
import ReceiptTicket from '../components/ReceiptTicket'
import data from './../static/csvjson.json'
const countries = data.map(x => x.Country_name)
export default {
  components: { vSelect, ReceiptTicket },
  data() {
    return {
      options: countries,
      totalLoss: '',
      data: data,
      nurses: 0,
      country: '',
      comment: '',
      output: null,
      show: true
    }
  },
  methods: {
    onSelection(value) {
      const country = this.data.find(x => x.Country_name == value)
      this.country = value
      this.nurses = Number(country.Total_loss_Nurses)
      this.totalLoss = country.Total_tax_loss
    },
    onHide() {
      this.show = false
      setInterval(() => {
        this.show = true
      }, 2000)
    }
  }
}
</script>

<style scoped>
* {
  padding: 2%;
  margin: 2%;
}
img {
  max-width: 400px;
}
</style>
