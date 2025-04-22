<template>
  <div
    class="boocking__item__list__item krel_staffs__item"
    :class="activeClass"
    @click="choseStaff(data.id)"
  >
    <div class="krel_staffs__item__left">
      <img :src="data.avatar_big" alt="" />
    </div>
    <div class="krel_staffs__item__right">
      <h3>{{ data.name }}</h3>
      {{ data.specialization }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    currentStaff: Number,
  },
  methods: {
    async choseStaff(id) {
      await this.$store.dispatch('staffsSubmit', id)
    },
  },
  computed: {
    activeClass() {
      if (this.currentStaff === this.data.id) {
        return 'krel_staffs__item_active'
      } else {
        return ''
      }
    },
  },
}
</script>

<style></style>
