<template>
  <div class="h-screen flex flex-col justify-between">
    <transition-element type="slide">
      <router-view></router-view>
    </transition-element>

    <footer class="relative mt-12 py-8 px-4 bg-gray-800 border-t-2 border-gray-700 text-center sm:py-10 sm:px-8">
      <p class="mt-2 text-gray-300 text-sm">
        Hypixel Guild Scanner, get the
        <a href="https://github.com/Senither/hypixel-skyblock-guild-scanner" class="text-indigo-400 hover:text-indigo-500">source code</a>
        on GitHub.
      </p>
      <p class="text-gray-300 text-xs">
        Created by
        <a href="https://senither.com/" class="text-indigo-400 hover:text-indigo-500">Alexis Tan</a>
        using
        <a href="https://vuejs.org/" class="text-indigo-400 hover:text-indigo-500">VueJS</a>
        and
        <a href="https://tailwindcss.com/" class="text-indigo-400 hover:text-indigo-500">Tailwind CSS</a>
      </p>
    </footer>
  </div>
</template>

<script>
import TransitionElement from '@/components/TransitionElement'

export default {
  components: {
    TransitionElement,
  },
}
</script>
