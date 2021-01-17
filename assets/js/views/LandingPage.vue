<template>
  <div>
    <section class="py-6 sm:py-16">
      <div class="max-w-screen-xl mx-auto text-center">
        <h1 class="text-gray-100 text-6xl font-medium leading-tight sm:text-7xl">
          Guild Scanner
        </h1>
        <p class="text-gray-500 text-2xl sm:text-3xl">
          Making scanning Hypixel SkyBlock guilds quick and easy.
        </p>
      </div>
    </section>

    <section class="py-6">
      <div class="max-w-screen-lg mx-auto">
        <div class="bg-gray-800 px-8 py-6 lg:rounded-md text-base shadow-2xl">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet eius, modi nostrum a doloremque magnam
            officiis culpa accusamus sed praesentium asperiores! Molestiae quo voluptates aliquam natus qui quod ipsa
            cupiditate?
          </p>

          <div class="py-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
            <question v-for="_ of [1, 2, 3, 4, 5, 6]" :key="_">
              <template #question>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </template>

              <template #answer>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non animi rerum pariatur laudantium! Animi
                accusamus recusandae praesentium vel beatae voluptas aperiam esse voluptatum autem, quas dolores,
                laborum mollitia ex assumenda!
              </template>
            </question>
          </div>
        </div>
      </div>
    </section>

    <section class="py-6 text-center">
      <a
        @click="showModal = true"
        class="py-4 px-6 bg-indigo-800 hover:bg-indigo-700 focus:bg-indigo-700 text-xl font-semibold leading-loose rounded-md shadow-lg cursor-pointer"
      >
        I'm ready to scan a guild
      </a>
    </section>

    <transition-element>
      <modal :show="showModal" @close="showModal = false">
        <template #content>
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-800 sm:mx-0 sm:h-10 sm:w-10"
          >
            <!-- Heroicon name: exclamation -->
            <svg
              class="h-6 w-6 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-300" id="modal-headline">
              Enter your Hypixel API token to continue
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-400">
                Your Hypixel API token is required for loading guild and player data from the Hypixels API.
              </p>
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
                <li v-for="error of errors">{{ error }}</li>
              </ul>
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
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
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
import Question from '@/components/Question'
import Modal from '@/components/Modal'

export default {
  components: {
    TransitionElement,
    Question,
    Modal,
  },

  data() {
    return {
      showModal: false,
      isLoading: false,
      hypixelToken: '',
      errors: [],
    }
  },

  methods: {
    verifyApiKey() {
      this.validateHypixelToken()

      if (this.errors.length || this.isLoading) {
        return
      }

      this.isLoading = true

      axios
        .get(`/key?key=${this.hypixelToken.trim()}`)
        .then(response => {
          // TODO: Save token in VueX store and move to the next
          // page so people can start scanning a guild.
          console.log(response.data)
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
      }
    },
  },
}
</script>
