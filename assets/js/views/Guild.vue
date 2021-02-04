<template>
  <div>
    <section class="pt-16 pb-6">
      <div class="max-w-screen-xl mx-auto text-center">
        <h1 class="text-5xl font-medium leading-tight">
          <span class="font-semibold text-indigo-400">[{{ guild.tag }}]</span>
          <span class="font-semibold text-indigo-300">{{ guild.name }}</span>
        </h1>
        <transition-element>
          <p class="text-gray-500 text-2xl" v-if="players.length < totalMembers">
            Scanning <span class="font-semibold text-indigo-300">{{ players.length + 1 }}</span> out of
            <span class="font-semibold text-indigo-300">{{ totalMembers }}</span> members
          </p>
          <div v-else>
            <p class="py-4 text-gray-500 text-3xl">Guild Stats</p>

            <div class="flex justify-center space-x-2 pb-2">
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Average Skills</div>
                <div class="px-2 py-1 bg-blue-600 rounded-r-md">{{ guildAverages.skills }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Slayers</div>
                <div class="px-2 py-1 bg-red-500 rounded-r-md">{{ guildAverages.slayers }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Catacombs</div>
                <div class="px-2 py-1 bg-green-500 rounded-r-md">{{ guildAverages.dungeons }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Members</div>
                <div class="px-2 py-1 bg-yellow-500 rounded-r-md">{{ totalMembers }}</div>
              </div>
            </div>
            <div class="flex justify-center space-x-2">
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Total Weight</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ guildWeights.total }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Skill Weight</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ guildWeights.skills }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Slayer Weight</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ guildWeights.slayers }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Catacomb Weight</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ guildWeights.dungeons }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Weight Multiplier</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ guildWeights.multiplier }}%</div>
              </div>
            </div>
          </div>
        </transition-element>
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
                    <td class="py-1">{{ player.username }}</td>
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

  computed: {
    guildAverages() {
      let skills = 0
      let slayers = 0
      let dungeons = 0

      for (let player of this.players) {
        skills += player.skills == null ? 0 : player.skills.average_skills
        slayers += player.slayers == null ? 0 : player.slayers.total_experience
        dungeons += player.dungeons == null ? 0 : player.dungeons.types.catacombs.level
      }

      return {
        skills: (skills / this.totalMembers).toFixed(2),
        slayers: (slayers / this.totalMembers).toFixed(2),
        dungeons: (dungeons / this.totalMembers).toFixed(2),
      }
    },

    guildWeights() {
      // Maxes out a level 50 average guild at 500 skill points, and
      // setting the middle point in terms of points at level 41,
      // which is the middle point in terms of XP in the game
      let skills = Math.pow(this.guildAverages.skills * 10, 0.5 + this.guildAverages.skills / 100)

      // Calculates the catacomb weight by powering it by 2, and then
      // dividing the result by 8.333, this will end up rewarding
      // 300 points at max level on a soft exponential curve.
      let dungeons = Math.pow(this.guildAverages.dungeons, 2) / 8.3333333333333333

      // Calcualtes the slayer weight with a flat curve,
      // giving 1 point every 12,000 average slayer up
      // to 3,000,000 XP, the weight past the 3 million
      // limit is first divided by 18,000, and then
      // reducded by 10%
      let slayerOverflow = 3000000 - this.guildAverages.slayers
      let slayers = slayerOverflow > 0 ? this.guildAverages.slayers / 12000 : (this.guildAverages.slayers + slayerOverflow) / 12000

      if (slayerOverflow < 0) {
        slayers += Math.pow((slayerOverflow * -1) / 18000, 0.9)
      }

      // Creates the multiplier, where the max value is 1 at 125 members
      // which is the guild member limit on Hypixel, guilds with less
      // points will have points deducted from their total score
      // depending on the amount of missing players.
      let frequency = Math.sin(this.totalMembers / (125 / 0.927296)) + 0.2
      let multiplier = this.totalMembers / 125 + (1 - this.totalMembers / 125) * frequency

      // Calculates the total amount of points for the guild by summing
      // up our values and using our multiplier to deduct points
      // if the guild has a low member count.
      let total = (skills + dungeons + slayers) * multiplier

      return {
        total: parseFloat(total.toFixed(3)),
        skills: parseFloat(skills.toFixed(3)),
        slayers: parseFloat(slayers.toFixed(3)),
        dungeons: parseFloat(dungeons.toFixed(3)),
        multiplier: parseFloat(multiplier.toFixed(3)),
      }
    },
  },
}
</script>