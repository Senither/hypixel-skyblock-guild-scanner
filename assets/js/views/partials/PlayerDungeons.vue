<template>
  <div class="py-4 flex flex-col items-center" v-if="dungeons != null">
    <p class="text-lg font-semibold">Dungeons</p>
    <div class="my-2 flex text-sm">
      <span class="py-1 px-2 bg-gray-900 font-semibold rounded-l-md">Dungeon Weight</span>
      <span class="py-1 px-2 bg-indigo-600 rounded-r-md">{{ formatNumber(dungeons.weight + dungeons.weight_overflow) }}</span>
    </div>

    <div class="w-full grid grid-cols-3 gap-4">
      <div class="flex flex-col">
        <div class="flex flex-1 justify-between">
          <span class="font-semibold">Catacombs {{ Math.floor(dungeons.types.catacombs.level) }}</span>
          <span class="text-gray-400">{{ formatNumber(dungeons.types.catacombs.experience) }} XP</span>
        </div>

        <div class="h-4 relative max-w-xl rounded-full overflow-hidden">
          <div class="w-full h-full bg-gray-700 absolute"></div>
          <div
            class="h-full bg-gray-900 relative"
            :style="{
              width: (dungeons.types.catacombs.level - Math.floor(dungeons.types.catacombs.level)) * 100 + '%',
            }"
          ></div>
        </div>
      </div>

      <div class="flex flex-col" v-for="type of types" :key="type">
        <div class="flex flex-1 justify-between">
          <span class="font-semibold">{{ prettifyName(type) }} {{ Math.floor(dungeons.classes[type].level) }}</span>
          <span class="text-gray-400">{{ formatNumber(dungeons.classes[type].experience) }} XP</span>
        </div>

        <div class="h-4 relative max-w-xl rounded-full overflow-hidden">
          <div class="w-full h-full bg-gray-700 absolute"></div>
          <div
            class="h-full bg-gray-900 relative"
            :style="{
              width: (dungeons.classes[type].level - Math.floor(dungeons.classes[type].level)) * 100 + '%',
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
    dungeons: Object,
  },

  data() {
    return {
      types: ['healer', 'mage', 'berserker', 'archer', 'tank'],
    }
  },

  methods: {
    prettifyName(name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1, name.length)
    },
  },
}
</script>
