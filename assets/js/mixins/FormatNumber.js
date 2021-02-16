export default {
  methods: {
    formatNumber(number) {
      const decimalsFormated = number.toLocaleString(undefined, { maximumFractionDigits: 2 })

      return String(decimalsFormated).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
