<template>
  <div>
    <div v-for="tab in tabs" :key="tab.name">
      <span @click="emitName">{{tab.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  props: {
    tabs: Array
  },
  methods: {
    emitName(event) {
      const components = this.tabs.filter(
          elem => elem.name === event.target.innerHTML
      ).map(
          elem => elem.component
      )

      console.log(components[0]);

      if (components.length === 1) {
        this.$emit('set-tab', components[0])
      } else {
        throw "You added more than 1 components with the same name in the Header"
      }
    }
  }
}
</script>

<style scoped>

</style>
