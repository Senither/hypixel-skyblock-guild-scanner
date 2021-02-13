<template>
  <div>
    <section class="pt-16 pb-6">
      <div class="max-w-screen-xl mx-auto text-center">
        <h1 class="text-gray-100 text-5xl font-medium leading-tight">Select Guild</h1>
        <p class="text-gray-500 text-2xl">Enter the name of the guild you want to scan below.</p>
      </div>
    </section>

    <section class="pb-6">
      <div class="max-w-screen-lg mx-auto">
        <div class="bg-gray-800 px-8 py-6 lg:rounded-md text-base shadow-2xl">
          <div class="flex">
            <input
              ref="name"
              v-model="name"
              class="flex-1 mr-0 px-4 py-4 bg-white text-gray-800 border-t border-b border-l border-gray-200 rounded-l-lg outline-none"
              placeholder="Enter the name of the guild you want to scan here..."
            />
            <button
              @click="lookupGuild"
              class="px-8 text-white font-bold uppercase bg-gray-900 hover:bg-gray-800 border-gray-700 border-t border-b border-r rounded-r-lg focus:outline-none"
            >
              <span class="flex" v-if="isLoading">
                <loading-icon />
                Fetching data
              </span>
              <span v-else>Lookup Guild</span>
            </button>
          </div>
          <p v-if="error" class="mt-2 text-red-400">
            {{ error }}
          </p>
        </div>
      </div>
    </section>

    <transition-element>
      <section class="pb-8" v-if="guild">
        <div class="max-w-screen-lg mx-auto">
          <div class="py-6 text-base text-center">
            <p>
              Found a guild called
              <span class="font-semibold text-indigo-400">[{{ guild.tag }}]</span>
              <span class="font-semibold text-indigo-300">{{ guild.name }}</span>
              with
              <span class="font-semibold text-indigo-300">{{ guild.members.length }}</span>
              members.
            </p>

            <p class="text-gray-400" v-if="guild.description">"{{ guild.description }}"</p>

            <p class="pt-10">
              Do you want to
              <a @click="scan" class="py-2 px-3 bg-indigo-800 hover:bg-indigo-700 text-white rounded-md cursor-pointer">continue to scan the guild</a>
              or
              <a @click="reset" class="py-2 px-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md cursor-pointer">search for another guild to scan</a>
            </p>
          </div>
        </div>
      </section>

      <section class="pb-8" v-else-if="isTokenInStorage">
        <div class="max-w-screen-lg mx-auto">
          <div class="py-6 text-base text-center">
            <p class="text-gray-500">
              Your Hypixel token is currently saved in your local storage.
              <br />You can <a @click="clearStorage" class="text-indigo-500 cursor-pointer hover:underline">click here</a> to remove it from storage and return to the home page.
            </p>
          </div>
        </div>
      </section>
    </transition-element>
  </div>
</template>

<script>
import TransitionElement from '@/components/TransitionElement'
import LoadingIcon from '@/components/LoadingIcon'

export default {
  components: {
    TransitionElement,
    LoadingIcon,
  },

  mounted() {
    if (this.$store.getters.token == null) {
      return this.$router.push({
        name: 'landing-page',
      })
    }
  },

  data() {
    return {
      isLoading: false,
      name: '',
      guild: null,
      error: null,
    }
  },

  methods: {
    lookupGuild() {
      if (this.name.trim().length < 3) {
        return (this.error = 'The guild name must be at least 3 characters or longer!')
      }

      if (this.isLoading) {
        return
      }

      this.error = null
      this.guild = null
      this.isLoading = true

      axios
        .get(`https://api.hypixel.net/guild?key=${this.$store.getters.token}&name=${this.name}`)
        .then(response => {
          this.isLoading = false

          const { guild } = response.data
          if (guild == null) {
            return (this.error = `Found no guild matching your search query. Maybe you entered the name wrong?`)
          }

          this.guild = guild
        })
        .catch(error => {
          console.error('Unexpected error occurred: ', error)

          this.error = 'Unexpected error occurred: ' + error.message
        })
    },

    scan() {
      this.$store.commit('SET_GUILD', this.guild)

      return this.$router.push({
        name: 'guild',
      })
    },

    reset() {
      this.name = ''
      this.guild = null

      this.$refs.name.focus()
    },

    clearStorage() {
      window.localStorage.clear()

      return this.$router.push({
        name: 'landing-page',
      })
    },
  },

  computed: {
    isTokenInStorage() {
      return window.localStorage.getItem('token') != null
    },
  },
}
</script>
