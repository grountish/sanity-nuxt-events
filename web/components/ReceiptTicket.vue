<template>
  <div>
    <div class="receipt">
      <h1 class="logo">Museum of Missing Nurses</h1>
      <div class="address">666 Lincoln St. Santa Monica, CA</div>

      <div class="transactionDetails">
        <div class="detail">
          Time of Sale: {{ new Date().toLocaleDateString() }}
        </div>
      </div>

      <div class="centerItem bold">
        <div class="item">ExtraCare Card#:*******1875</div>
      </div>

      <div class="creditDetails">
        <p>Country:</p>
        <p>{{ country }}</p>
        <!-- <input v-model="country" type="text"> -->

        <p>Products:</p>
        <p class="quarter">{{ nurses }} Nurses</p>
      </div>

      <div class="transactionDetails">
        <div class="detail">1</div>
        <div class="detail">OB Glide 3CT</div>
        <div class="detail">{{ nurses }}</div>
      </div>

      <div class="survey bold">
        <p>Survey ID #</p>
        <p class="surveyID">6588 4755 3256 544 21</p>
      </div>

      <div class="paymentDetails bold">
        <div class="detail">TOTAL</div>
        <div class="detail">$ {{ nurses }}</div>
      </div>
      <div class="paymentDetails">
        <div class="detail">CHARGE</div>
        <div class="detail">$ {{ nurses }}</div>
      </div>
      <div class="paymentDetails">
        <div class="detail">************4023</div>
        <div class="detail">CH</div>
      </div>
      <div class="paymentDetails">
        <div class="detail">CHANGE</div>
        <div class="detail">.00</div>
      </div>
      <div class="paymentDetails">
        <h4>{{ comment }}</h4>
      </div>

      <div class="receiptBarcode">
        <div class="barcode">HelloCVSScript</div>
        2003 0998 9000 8730 21
      </div>

      <button v-if="showPrint" @click="printRecipt">Print Me!</button>
      <!--       start coupon -->
      <!--       end coupon -->
    </div>
    <div>
      <img :src="output" />
      <a v-if="showDownload" ref="download" :href="output" download
        >Download file</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReceiptTicket',
  props: {
    country: {
      type: String,
      required: false,
      default: ''
    },
    comment: {
      type: String,
      required: false,
      default: ''
    },
    nurses: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      output: null,
      showPrint: true,
      showDownload: false
    }
  },
  methods: {
    printRecipt() {
      this.showPrint = false
      this.$emit('onHide')
      // const el = this.$refs.printMe
      setTimeout(() => {
        this.$html2canvas(document.body, {
          type: 'dataURL'
        }).then(canvas => {
          console.log(canvas)
          this.output = canvas.toDataURL('image/jpeg', 0.1)
          this.showDownload = true
        })
      }, 500)
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap');

.wrap2 {
  background: #ffffff;
  color: black;
}

* {
  margin: 0;
  box-sizing: border-box;
  font-family: 'VT323', monospace;
  color: #1f1f1f;
}
img {
  max-width: 800px;
  margin-top: 3em;
}
.container {
  background: #f1f1f1;
  padding: 20px 10px;
}

.bold {
  font-weight: bold;
}

.center {
  text-align: center;
}

.receipt {
  width: 300px;
  /* background: #fff; */
  margin: 0 auto;
  box-shadow: 5px 5px 19px #ccc;
  padding: 10px;
}

.logo {
  text-align: center;
  padding: 20px;
}

.barcode {
  font-family: 'Libre Barcode 128', cursive;
  font-size: 42px;
  text-align: center;
}

.address {
  text-align: center;
  margin-bottom: 10px;
}

.transactionDetails {
  display: flex;
  justify-content: space-between;
  margin: 0 10px 10px;
}

.transactionDetails .detail {
  text-transform: uppercase;
}

.centerItem {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.survey {
  text-align: center;
  margin-bottom: 12px;
}

.survey .surveyID {
  font-size: 20px;
}

.paymentDetails {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 150px;
}

.creditDetails {
  margin: 10px auto;
  width: 289px;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.creditDetails * {
  width: 50%;
}

.quarter {
  width: 15%;
}

.receiptBarcode {
  margin: 10px 0;
  text-align: center;
}

.returnPolicy {
  margin: 10px 20px;
  width: 220px;
  display: flex;
  justify-content: space-between;
}

.coupons {
  margin-top: 20px;
}

.tripSummary {
  margin: auto;
  width: 255px;
}

.tripSummary .item {
  display: flex;
  justify-content: space-between;
  margin: auto;
  width: 220px;
}

.feedback {
  margin: 20px auto;
}

.feedback h3.clickBait {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
}

.feedback h4.web {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 10px 0;
}

.feedback .break {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
}

.couponContainer {
  border-top: 1px dashed #1f1f1f;
  margin-bottom: 20px;
}

.couponContainer .discount {
  font-size: 35px;
  text-align: center;
  margin-bottom: 10px;
}

.couponContainer .discountDetails {
  font-size: 20px;
  text-align: center;
  margin-bottom: 15px;
}

.couponContainer .barcode {
  margin: 10px 0 0;
}

.couponContainer .legal {
  font-size: 12px;
  margin-bottom: 12px;
}

.couponContainer .barcodeID {
  margin-bottom: 8px;
}

.couponContainer .expiration {
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

.couponContainer .couponBottom {
  font-size: 13px;
  text-align: center;
}
</style>
