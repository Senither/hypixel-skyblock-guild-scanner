<template>
  <pre>
    {{ guild }}
  </pre>
</template>

<script>
export default {
  mounted() {
    if (this.$store.getters.token == null) {
      return this.$router.push({
        name: 'landing-page',
      })
    }
  },

  data() {
    return {
      guild: this.$store.getters.guild,
    }
  },
}
</script>
