<template>
  <div
    class="boocking__item__list__item krel_services__item"
    :class="activeClass"
    @click="chooseService(data.id)"
  >
    {{ data.title }}
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    currentService: Number,
  },
  methods: {
    async chooseService(id) {
      await this.$store.dispatch('serviceSubmit', id)
    },
  },
  computed: {
    activeClass() {
      if (this.currentService === this.data.id) {
        return 'krel_services__item_active'
      } else {
        return ''
      }
    },
  },
}
</script>
