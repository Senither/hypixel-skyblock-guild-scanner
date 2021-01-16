<template>
  <transition
    :mode="'out-in'"
    :name="transitionName"
    :enter-active-class="transitionEnterActiveClass"
    @beforeLeave="beforeLeave"
    @enter="enter"
    @afterEnter="afterEnter"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  props: {
    type: String,
  },

  mounted() {
    this.transitionName = this.type ?? 'fade-from-bottom'
    this.transitionEnterActiveClass = `${this.transitionName}-enter-active`
  },

  data() {
    return {
      prevHeight: 0,
      transitionName: 'fade-from-bottom',
      transitionEnterActiveClass: '',
    }
  },

  methods: {
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height
    },

    enter(element) {
      const { height } = getComputedStyle(element)

      element.style.height = this.prevHeight

      setTimeout(() => {
        element.style.height = height
      })
    },

    afterEnter(element) {
      element.style.height = 'auto'
    },
  },
}
</script>

<style lang="scss" scoped>
// Fade animation
.fade-from-bottom-enter-active,
.fade-from-bottom-leave-active {
  transition-duration: 0.3s;
  transition-property: height, opacity, transform;
  transition-timing-function: ease-out-in;
  overflow: hidden;
}

.fade-from-bottom-enter,
.fade-from-bottom-leave-active {
  opacity: 0;
  transform: translate3d(0, -60px, 0);
}

// Slide aniatmion
.slide-enter-active,
.slide-leave-active {
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: ease-out-in;
  overflow: hidden;
}

.slide-enter {
  opacity: 1;
}
.slide-leave-active {
  opacity: 0;
  height: 0px;
}
</style>
