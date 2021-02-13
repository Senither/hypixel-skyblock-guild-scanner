<template>
  <div>
    <section class="py-6 sm:py-16">
      <div class="max-w-screen-xl mx-auto text-center">
        <h1 class="text-gray-100 text-6xl font-medium leading-tight sm:text-7xl">Guild Scanner</h1>
        <p class="text-gray-500 text-2xl sm:text-3xl">Making scanning Hypixel SkyBlock guilds quick and easy.</p>
      </div>
    </section>

    <section class="py-6">
      <div class="max-w-screen-lg mx-auto">
        <div class="bg-gray-800 px-8 py-6 lg:rounded-md text-base shadow-2xl">
          <p class="pb-2 font-medium">A super simple, and easy to use guild scanner!</p>
          <p class="pb-2">
            To get started you'll need to use your Hypixel API token, if you don't already have one you can get your own token by logging into the game at
            <code class="py-0.5 px-1 bg-gray-900 rounded-sm">mc.hypixel.net</code> and running <code class="py-0.5 px-1 bg-gray-900 rounded-sm">/api new</code>
          </p>
          <p>
            Once you have your API token you can click on the <span class="italic text-gray-400">"I'm ready to scan a guild"</span> button to start a guild
            scan.
          </p>

          <div class="py-4 grid grid-cols-1 gap-2">
            <question>
              <template #question> How do I select the guild I want to scan? </template>

              <template #answer>
                <p class="pb-2 pl-2">
                  You'll first need to press the <span class="italic text-gray-400">"I'm ready to scan a guild"</span> button below, doing this will prompt you
                  to enter your Hypixel API token, you can see how to get an API token above, after you have entered the token into the input field and verified
                  you'll be greeted with this page.
                </p>

                <img class="rounded-md shadow-md" src="/img/guild-select-example.png" alt="Guild select example" />

                <p class="px-2 pt-2">
                  From here you can enter the name of the guild you want to scan and press the <span class="italic text-gray-400">"Lookup"</span> button, if a
                  guild exists with the name you entered you can then select the guild to be scanned.
                </p>
              </template>
            </question>

            <question>
              <template #question> How does the guild scanner actually look like? </template>

              <template #answer>
                <p class="px-2 pb-2">After a guild scan has been completed you'll see this page.</p>

                <img class="rounded-md shadow-md" src="/img/guild-scan-example.png" alt="Guild scan example" />
              </template>
            </question>

            <question>
              <template #question> Does the guild scanner save my Hypixel API token? </template>

              <template #answer>
                <p class="px-2 pb-2">The short answer is no, but maybe yes?</p>

                <p class="px-2 pb-2">
                  The slightly longer answer is that the entire guild scanner app is a
                  <a class="text-indigo-400 hover:text-indigo-500 hover:underline" href="https://en.wikipedia.org/wiki/Stateless_protocol">stateless app</a>,
                  this means that no data about you or anyone else who visit the site is saved on any remote server, because of this it's impossible to store
                  your Hypixel token, however the app uses a smart trick called
                  <a class="text-indigo-400 hover:text-indigo-500 hover:underline" href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
                    >local storage</a
                  >, this allows the app to save your Hypixel token to your own device, and then ask your device for the token the next time you view the site,
                  this is only done to make it easier to use the site, however if you select that your Hypixel token should not be saved then nothing will be
                  saved to your local storage.
                </p>

                <p>If you still don't quite trust the app you can view the entire <a class="text-indigo-400 hover:text-indigo-500 hover:underline" href="https://github.com/Senither/hypixel-skyblock-guild-scanner">source code here</a>.</p>
              </template>
            </question>
          </div>
        </div>
      </div>
    </section>

    <section class="py-6 text-center">
      <a
        @click="openTokenModal"
        class="py-4 px-6 bg-indigo-800 hover:bg-indigo-700 focus:bg-indigo-700 text-xl font-semibold leading-loose rounded-md shadow-lg cursor-pointer"
      >
        I'm ready to scan a guild
      </a>
    </section>

    <transition-element>
      <modal :show="showModal" @close="showModal = false">
        <template #content>
          <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 sm:mx-0 sm:h-10 sm:w-10">
            <!-- Heroicon name: exclamation -->
            <svg class="h-6 w-6 text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-300" id="modal-headline">Enter your Hypixel API token to continue</h3>
            <div class="mt-2">
              <p class="text-sm text-gray-400">Your Hypixel API token is required for loading guild and player data from the Hypixels API.</p>
            </div>
            <div class="mt-2">
              <input
                type="text"
                v-model="hypixelToken"
                placeholder="Enter your Hypixel API token here..."
                class="p-2 w-full rounded-md bg-gray-900 text-gray-300 placeholder-gray-600 outline-none"
              />
            </div>
            <div class="mt-2" v-if="errors.length">
              <ul class="text-sm text-red-400">
                <li v-for="error of errors" :key="error">{{ error }}</li>
              </ul>
            </div>

            <div class="mt-2">
              <label class="inline-flex items-center mt-3">
                <input type="checkbox" v-model="saveToken" class="form-checkbox h-5 w-5 text-gray-900" />
                <span class="ml-2 text-sm text-gray-400">Save my API token for later usage.</span>
              </label>
              <p class="p-2 text-sm text-gray-400 bg-gray-600">
                Your API token will be stored locally on your device so you can easily scan guilds in the future.
              </p>
            </div>
          </div>
        </template>

        <template #footer>
          <button
            @click="verifyApiKey"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            <span class="flex" v-if="isLoading">
              <loading-icon />
              Verifying
            </span>
            <span v-else>Continue</span>
          </button>
          <button
            @click="showModal = false"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:text-gray-300 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </template>
      </modal>
    </transition-element>
  </div>
</template>

<script>
import TransitionElement from '@/components/TransitionElement'
import LoadingIcon from '@/components/LoadingIcon'
import Question from '@/components/Question'
import Modal from '@/components/Modal'

export default {
  components: {
    TransitionElement,
    LoadingIcon,
    Question,
    Modal,
  },

  data() {
    return {
      showModal: false,
      isLoading: false,
      saveToken: true,
      hypixelToken: '',
      errors: [],
    }
  },

  methods: {
    openTokenModal() {
      if (window.localStorage.getItem('token') == null) {
        return (this.showModal = true)
      }

      this.hypixelToken = window.localStorage.getItem('token').trim()

      this.validateHypixelToken()
      if (this.errors.length == 0) {
        this.$store.commit('SET_TOKEN', this.hypixelToken)

        return this.$router.push({
          name: 'select-guild',
        })
      }

      window.localStorage.removeItem('token')
      this.hypixelToken = ''

      this.showModal = true
    },

    verifyApiKey() {
      this.validateHypixelToken()

      if (this.errors.length || this.isLoading) {
        return
      }

      this.isLoading = true

      axios
        .get(`https://api.hypixel.net/key?key=${this.hypixelToken.trim()}`)
        .then(response => {
          this.$store.commit('SET_TOKEN', this.hypixelToken.trim())

          if (this.saveToken) {
            window.localStorage.setItem('token', this.hypixelToken.trim())
          }

          this.$router.push({
            name: 'select-guild',
          })
        })
        .catch(error => {
          this.errors = ['Invalid Hypixel API token provided, the token is not valid, or does not exists!']

          this.isLoading = false
        })
    },

    validateHypixelToken() {
      if (this.hypixelToken.trim().length == 0) {
        this.errors = ['Missing Hypixel API token, you must enter your Hypixel API token to continue.']
      } else if (this.hypixelToken.trim().length !== 36) {
        this.errors = ['Invalid Hypixel API token, the token must be 36 characters long!']
      } else if (this.hypixelToken.split('-').length !== 5) {
        this.errors = ['Invalid Hypixel API token, the token must contain four dashes(-)']
      } else {
        this.errors = []
      }
    },
  },
}
</script>
