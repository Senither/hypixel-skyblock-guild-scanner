<template>
  <div class="py-4 flex flex-col items-center" v-if="slayers != null">
    <p class="text-lg font-semibold">Slayers</p>
    <div class="my-2 flex text-sm">
      <span class="py-1 px-2 bg-gray-900 font-semibold rounded-l-md">Slayer Weight</span>
      <span class="py-1 px-2 bg-indigo-600 rounded-r-md">{{ formatNumber(slayers.weight + slayers.weight_overflow) }}</span>
    </div>

    <div class="w-full grid grid-cols-3 gap-4">
      <div class="flex flex-col" v-for="type of types" :key="type">
        <div class="flex flex-1 justify-between">
          <span class="font-semibold">{{ prettifyName(type) }} {{ Math.floor(slayers.bosses[type].level) }}</span>
          <span class="text-gray-400">{{ formatNumber(slayers.bosses[type].experience) }} XP</span>
        </div>

        <div class="h-4 relative max-w-xl rounded-full overflow-hidden">
          <div class="w-full h-full bg-gray-700 absolute"></div>
          <div
            class="h-full bg-gray-900 relative"
            :style="{
              width: (slayers.bosses[type].level - Math.floor(slayers.bosses[type].level)) * 100 + '%',
            }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatNumber from '../../mixins/FormatNumber'

export default {
  mixins: [formatNumber],

  props: {
    slayers: Object,
  },

  data() {
    return {
      types: ['revenant', 'tarantula', 'sven'],
    }
  },

  methods: {
    prettifyName(name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1, name.length)
    },
  },
}
</script>
