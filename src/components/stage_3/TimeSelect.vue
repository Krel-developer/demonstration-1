<template>
  <div class="boocking__select__cont">
    <select v-if="times.length" @change="chooseTime">
      <option disabled selected>Выберите доступное время</option>
      <option
        class="item"
        v-for="(time, index) in times"
        :key="index"
        :value="time.datetime"
      >
        {{ time.time }}
      </option>
    </select>
    <select class="select_disabled" v-else>
      <option disabled selected>Сначала выберите дату</option>
    </select>
  </div>
</template>

<script>
export default {
  async mounted() {},
  methods: {
    async chooseTime(e) {
      await this.$store.dispatch('chooseTime', e.target.value)
    },
  },
  computed: {
    times() {
      return this.$store.getters.times
    },
  },
}
</script>
