<template>
  <div class="w-full">
    <div
      @click="show = !show"
      class="py-2 px-4 text-gray-400 font-semibold bg-gray-900 rounded-t-sm cursor-pointer shadow-md"
      :class="show ? null : 'rounded-b-sm'"
    >
      <slot name="question" />
    </div>

    <transition-element type="slide">
      <div v-show="show" class="mb-4 p-4 border-r-2 border-l-2 border-b-2 border-gray-900 rounded-b-lg shadow-md">
        <slot name="answer" />
      </div>
    </transition-element>
  </div>
</template>

<script>
import TransitionElement from './TransitionElement'

export default {
  components: {
    TransitionElement,
  },

  data() {
    return {
      show: false,
    }
  },
}
</script>
