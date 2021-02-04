<template>
  <div>
    <section class="pt-16 pb-6">
      <div class="max-w-screen-xl mx-auto text-center">
        <h1 class="text-5xl font-medium leading-tight">
          <span class="font-semibold text-indigo-400">[{{ guild.tag }}]</span>
          <span class="font-semibold text-indigo-300">{{ guild.name }}</span>
        </h1>
        <p class="text-gray-500 text-2xl">
          Scanning <span class="font-semibold text-indigo-300">{{ this.players.length + 1 }}</span> out of
          <span class="font-semibold text-indigo-300">{{ totalMembers }}</span> members
        </p>
      </div>
    </section>

    <transition-element>
      <section class="pb-6" v-if="players.length">
        <div class="max-w-screen-lg mx-auto shadow-2xl">
          <div class="min-w-full flex space-x-2">
            <div class="flex-1 py-3 lg:rounded-t-md bg-gray-800 hover:bg-gray-800 text-center cursor-pointer">Sort by Skills</div>
            <div class="flex-1 py-3 lg:rounded-t-md bg-gray-700 hover:bg-gray-800 text-center cursor-pointer">Sort by Catacombs</div>
            <div class="flex-1 py-3 lg:rounded-t-md bg-gray-700 hover:bg-gray-800 text-center cursor-pointer">Sort by Slayers</div>
            <div class="flex-1 py-3 lg:rounded-t-md bg-gray-700 hover:bg-gray-800 text-center cursor-pointer">Sort by Weight</div>
          </div>
          <div class="bg-gray-800 p-2 lg:rounded-b-md text-base text-gray-200">
            <div class="bg-gray-700 px-6 py-4 rounded-md">
              <table class="min-w-full">
                <thead class="border-b border-gray-500">
                  <tr>
                    <th class="py-3 text-left leading-4 text-gray-300 tracking-wider">Name</th>
                    <th class="py-3 text-left leading-4 text-gray-300 tracking-wider">Profile</th>
                    <th class="py-3 text-left leading-4 text-gray-300 tracking-wider">Skills</th>
                    <th class="py-3 text-left leading-4 text-gray-300 tracking-wider">Catacombs</th>
                    <th class="py-3 text-left leading-4 text-gray-300 tracking-wider">Slayer XP</th>
                    <th class="py-3 text-left leading-4 text-gray-300 tracking-wider">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player of players" :key="player.id">
                    <td class="py-1">Senither</td>
                    <td>{{ player.name }}</td>
                    <td>
                      <span v-if="player.skills == null" class="px-2 py-1 bg-red-400 text-gray-800 text-sm rounded-md">API Disabled</span>
                      <span v-else>{{ player.skills.average_skills.toFixed(2) }}</span>
                    </td>
                    <td>
                      <span v-if="player.dungeons == null" class="px-2 py-1 bg-red-400 text-gray-800 text-sm rounded-md">No Catacombs Data</span>
                      <span v-else>{{ player.dungeons.types.catacombs.level.toFixed(2) }}</span>
                    </td>
                    <td>
                      <span v-if="player.slayers == null" class="px-2 py-1 bg-red-400 text-gray-800 text-sm rounded-md">No Slayer Data</span>
                      <span v-else>{{ player.slayers.total_experience.toFixed(2) }}</span>
                    </td>
                    <td>
                      <span>{{ (player.weight + player.weight_overflow).toFixed(2) }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-6" v-else>
        <div class="max-w-screen-lg mx-auto py-12">
          <loading-icon styles="w-32 h-32 mx-auto" />
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

    setTimeout(() => this.scanPlayer(this.guild.members.shift()), 500)
  },

  beforeDestroy() {
    if (this.task != null) {
      clearInterval(this.task)
    }
  },

  data() {
    return {
      guild: this.$store.getters.guild,
      totalMembers: this.$store.getters.guild.members.length,
      players: [],
      task: null,
    }
  },

  methods: {
    scanPlayer(member) {
      axios
        .get(`https://hypixel-api.senither.com/v1/profiles/${this.parseStringifiedUuid(member.uuid)}/weight`, {
          headers: {
            Authorization: this.$store.getters.token,
          },
        })
        .then(response => {
          this.players.push(response.data.data)

          if (this.guild.members.length > 0) {
            this.task = setTimeout(() => this.scanPlayer(this.guild.members.shift()), 1000)
          }
        })
        .catch(error => {
          console.error(error)
        })
    },

    parseStringifiedUuid(uuid) {
      return uuid.substr(0, 8) + '-' + uuid.substr(8, 4) + '-' + uuid.substr(12, 4) + '-' + uuid.substr(16, 4) + '-' + uuid.substr(20)
    },
  },
}
</script>
