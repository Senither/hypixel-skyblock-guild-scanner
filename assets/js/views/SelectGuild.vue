<template>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum fugiat, id minima optio perferendis hic dicta iste consequatur tempora harum, asperiores, aperiam, accusantium possimus fuga eum nulla deserunt rerum repellendus.</p>
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
}
</script>
