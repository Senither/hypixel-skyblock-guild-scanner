<template>
  <div>
    <section class="pt-16 pb-6">
      <div class="max-w-screen-xl mx-auto text-center">
        <h1 class="text-5xl font-medium leading-tight">
          <span class="font-semibold text-indigo-400">[{{ guild.tag }}]</span>
          <span class="font-semibold text-indigo-300">{{ guild.name }}</span>
        </h1>
        <transition-element>
          <div class="inline-flex items-center text-gray-500 text-2xl" v-if="players.length < totalMembers">
            <loading-icon styles="w-5 h-5 mt-1 mr-2" />
            <span>
              Scanning <span class="font-semibold text-indigo-300">{{ players.length + 1 }}</span> out of
              <span class="font-semibold text-indigo-300">{{ totalMembers }}</span> members
            </span>
          </div>
          <div v-else>
            <p class="py-4 text-gray-500 text-3xl">Guild Stats</p>

            <div class="flex justify-center space-x-2 pb-2">
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Average Skills</div>
                <div class="px-2 py-1 bg-blue-600 rounded-r-md">{{ formatNumber(guildAverages.skills) }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Slayers</div>
                <div class="px-2 py-1 bg-red-500 rounded-r-md">{{ formatNumber(guildAverages.slayers) }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Catacombs</div>
                <div class="px-2 py-1 bg-green-500 rounded-r-md">{{ formatNumber(guildAverages.dungeons) }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Members</div>
                <div class="px-2 py-1 bg-yellow-500 rounded-r-md">{{ totalMembers }}</div>
              </div>
            </div>
            <div class="flex justify-center space-x-2">
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Total Weight</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ formatNumber(guildWeights.total) }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Skill Weight</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ formatNumber(guildWeights.skills) }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Slayer Weight</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ formatNumber(guildWeights.slayers) }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Catacomb Weight</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ formatNumber(guildWeights.dungeons) }}</div>
              </div>
              <div class="flex text-sm">
                <div class="px-2 py-1 bg-gray-800 rounded-l-md">Weight Multiplier</div>
                <div class="px-2 py-1 bg-indigo-600 rounded-r-md">{{ formatNumber(guildWeights.multiplier * 100) }}%</div>
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
            <div
              class="flex-1 py-3 lg:rounded-t-md hover:bg-gray-800 text-center cursor-pointer"
              :class="{
                'bg-gray-800': sortBy == 'weight',
                'bg-gray-700': sortBy != 'weight',
              }"
              @click="sortBy = 'weight'"
            >
              Sort by Weight
            </div>
            <div
              class="flex-1 py-3 lg:rounded-t-md hover:bg-gray-800 text-center cursor-pointer"
              :class="{
                'bg-gray-800': sortBy == 'skills',
                'bg-gray-700': sortBy != 'skills',
              }"
              @click="sortBy = 'skills'"
            >
              Sort by Skills
            </div>
            <div
              class="flex-1 py-3 lg:rounded-t-md hover:bg-gray-800 text-center cursor-pointer"
              :class="{
                'bg-gray-800': sortBy == 'dungeons',
                'bg-gray-700': sortBy != 'dungeons',
              }"
              @click="sortBy = 'dungeons'"
            >
              Sort by Catacombs
            </div>
            <div
              class="flex-1 py-3 lg:rounded-t-md hover:bg-gray-800 text-center cursor-pointer"
              :class="{
                'bg-gray-800': sortBy == 'slayers',
                'bg-gray-700': sortBy != 'slayers',
              }"
              @click="sortBy = 'slayers'"
            >
              Sort by Slayers
            </div>
          </div>
          <div class="bg-gray-800 p-2 lg:rounded-b-md text-base text-gray-200">
            <div class="bg-gray-700 px-6 py-4 rounded-md">
              <div class="flex w-min-full text-gray-300 tracking-wider font-medium">
                <div class="w-2/6 py-3 leading-4">Name</div>
                <div class="w-1/6 py-3 leading-4 hidden md:block">Profile</div>
                <div class="w-1/6 py-3 leading-4">Weight</div>
                <div class="w-1/6 py-3 leading-4">Skills</div>
                <div class="w-1/6 py-3 leading-4">Catacombs</div>
                <div class="w-1/6 py-3 leading-4">Slayers</div>
              </div>

              <div class="flex flex-col space-y-1">
                <div class="flex flex-col bg-gray-800 rounded-md" v-for="(player, index) of sortedPlayers" :key="player.uuid">
                  <div v-if="player.hasOwnProperty('error')" class="p-2 flex w-full bg-red-400 opacity-5 rounded-md">
                    <span class="py-1 px-2 mr-2 bg-indigo-600 rounded-md text-sm"> #{{ index + 1 }} </span>
                    Couldn't find any SkyBlock profiles for <span class="ml-2 font-semibold">{{ parseStringifiedUuid(player.member.uuid) }}</span>
                  </div>

                  <div v-else class="p-2 flex w-full cursor-pointer" @click="player.collapsed = !player.collapsed">
                    <div class="w-2/6">
                      <span class="py-1 px-2 mr-2 bg-indigo-600 rounded-md text-sm"> #{{ index + 1 }} </span>
                      {{ player.username }}
                    </div>
                    <div class="w-1/6 hidden md:block">{{ player.name }}</div>
                    <div class="w-1/6">{{ formatNumber(player.weight + player.weight_overflow) }}</div>
                    <div class="w-1/6">
                      <span v-if="player.skills == null" class="px-2 py-1 bg-red-400 text-gray-800 text-sm rounded-md">API Disabled</span>
                      <span v-else>{{ formatNumber(player.skills.average_skills) }}</span>
                    </div>
                    <div class="w-1/6">
                      <span v-if="player.dungeons == null" class="px-2 py-1 bg-red-400 text-gray-800 text-sm rounded-md">No Data</span>
                      <span v-else>{{ formatNumber(player.dungeons.types.catacombs.level) }}</span>
                    </div>
                    <div class="w-1/6">
                      <span v-if="player.slayers == null" class="px-2 py-1 bg-red-400 text-gray-800 text-sm rounded-md">No Data</span>
                      <span v-else>{{ formatNumber(player.slayers.total_experience) }}</span>
                    </div>
                  </div>

                  <transition-element>
                    <div v-if="!player.collapsed" class="p-2 w-full border-t-2 border-gray-700">
                      <player-skills :skills="player.skills" />
                      <player-slayers :slayers="player.slayers" />
                      <player-dungeons :dungeons="player.dungeons" />

                      <div class="p-2 grid grid-cols-3 gap-4 text-center text-gray-400">
                        <a
                          class="px-4 py-2 bg-gray-900 rounded-sm shadow-md hover:text-gray-300 hover:bg-gray-700"
                          :href="`https://sky.shiiyu.moe/stats/${player.username}/${player.name}`"
                          target="blank"
                          >View on sky.shiiyu.moe</a
                        >
                        <a
                          class="px-4 py-2 bg-gray-900 rounded-sm shadow-md hover:text-gray-300 hover:bg-gray-700"
                          :href="`https://namemc.com/profile/${player.username}`"
                          target="blank"
                          >View on NameMC</a
                        >
                        <a
                          class="px-4 py-2 bg-gray-900 rounded-sm shadow-md hover:text-gray-300 hover:bg-gray-700"
                          :href="`https://plancke.io/hypixel/player/stats/${player.username}`"
                          target="blank"
                          >View on Plancke</a
                        >
                      </div>
                    </div>
                  </transition-element>
                </div>
              </div>
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
import formatNumber from '../mixins/FormatNumber'

import TransitionElement from '@/components/TransitionElement'
import LoadingIcon from '@/components/LoadingIcon'
import PlayerSkills from './partials/PlayerSkills'
import PlayerSlayers from './partials/PlayerSlayers'
import PlayerDungeons from './partials/PlayerDungeons'

export default {
  mixins: [formatNumber],

  components: {
    TransitionElement,
    LoadingIcon,
    PlayerSkills,
    PlayerSlayers,
    PlayerDungeons,
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
      sortBy: 'weight',
      task: null,
    }
  },

  methods: {
    scanPlayer(member) {
      axios
        .get(`/v1/profiles/${this.parseStringifiedUuid(member.uuid)}/weight?key=${this.$store.getters.token}`)
        .then(response => {
          this.players.push({
            collapsed: true,
            ...response.data.data,
          })

          if (this.guild.members.length > 0) {
            this.task = setTimeout(() => this.scanPlayer(this.guild.members.shift()), 250)
          }
        })
        .catch(error => {
          // If the response is undefined we might have a Networking issue,
          // or a CORS issue, in this case we'll attempt to send
          // the request again a few times.
          if (error.response == undefined) {
            if (!member.hasOwnProperty('attempts')) {
              member.attempts = 0
            }

            if (++member.attempts < 5) {
              return (this.task = setTimeout(() => this.scanPlayer(member), 500 * member.attempts))
            }

            console.warn('Failed to load player data for ' + member.uuid)
            console.warn('An unknown error has caused this issue to occure, you can see the error below.')
            console.error(error)

            return
          }

          switch (error.response.status) {
            case 404:
              this.players.push({
                collapsed: true,
                error: 404,
                member: member,
              })

              if (this.guild.members.length > 0) {
                this.task = setTimeout(() => this.scanPlayer(this.guild.members.shift()), 250)
              }
              break

            case 429:
              return (this.task = setTimeout(() => this.scanPlayer(member), 10000))

            default:
              console.error(error)
          }
        })
    },

    parseStringifiedUuid(uuid) {
      return uuid.substr(0, 8) + '-' + uuid.substr(8, 4) + '-' + uuid.substr(12, 4) + '-' + uuid.substr(16, 4) + '-' + uuid.substr(20)
    },

    calculateAverageWeight(type, min = 5) {
      let countedPlayers = 0
      let value = 0

      this.players.forEach(player => {
        if (player[type] && player[type].weight > min) {
          countedPlayers++
          value += player[type].weight + player[type].weight_overflow
        }
      })

      return value / countedPlayers
    },
  },

  computed: {
    guildAverages() {
      let skills = 0
      let skillsMembers = 0

      let slayers = 0
      let slayersMembers = 0

      let dungeons = 0
      let dungeonsMembers = 0

      for (let player of this.players) {
        if (player.hasOwnProperty('error')) {
          continue
        }

        if (player.skills != null && player.skills.average_skills > 5) {
          skills += player.skills.average_skills
          skillsMembers++
        }

        if (player.slayers != null && player.slayers.total_experience > 500) {
          slayers += player.slayers.total_experience
          slayersMembers++
        }

        if (player.dungeons != null && player.dungeons.types.catacombs.level > 3) {
          dungeons += player.dungeons.types.catacombs.level
          dungeonsMembers++
        }
      }

      return {
        skills: (skills / skillsMembers).toFixed(2),
        slayers: (slayers / slayersMembers).toFixed(2),
        dungeons: (dungeons / dungeonsMembers).toFixed(2),
      }
    },

    guildWeights() {
      // Calculates the weights for skills, slayers, and dungeons
      // for all the players that have been loaded.
      let skills = this.calculateAverageWeight('skills')
      let slayers = this.calculateAverageWeight('slayers')
      let dungeons = this.calculateAverageWeight('dungeons')

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

    sortedPlayers() {
      const extractProperty = player => {
        if (player.hasOwnProperty('error')) {
          return -1
        }

        switch (this.sortBy) {
          case 'skills':
            return player.skills == null ? 0 : player.skills.average_skills

          case 'slayers':
            return player.slayers == null ? 0 : player.slayers.total_experience

          case 'dungeons':
            return player.dungeons == null ? 0 : player.dungeons.types.catacombs.level

          case 'weight':
            return player.weight + player.weight_overflow
        }
      }

      return this.players.sort((p1, p2) => {
        return extractProperty(p2) > extractProperty(p1) ? 1 : -1
      })
    },
  },
}
</script>
