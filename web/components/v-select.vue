<template>
  <div>
    <v-select :options="options" @input="setSelected" />
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      selected: ''
    }
  },
  methods: {
    setSelected(value) {
      this.selected = value
      this.$emit('onSelection', value)
    }
  }
}
</script>
