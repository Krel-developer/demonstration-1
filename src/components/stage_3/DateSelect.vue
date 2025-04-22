<template>
  <div class="boocking__select__cont">
    <select @change="choseDay" v-if="days.booking_dates?.length">
      <option disabled selected>Выберите дату приема</option>
      <option
        v-for="(day, index) in days.booking_dates"
        :key="index"
        :value="day"
      >
        {{ formatDate(day) }}
      </option>
    </select>
    <select class="select_disabled" v-else>
      <option disabled selected>Сначала выберите предыдущий пункт</option>
    </select>
  </div>
</template>

<script>
import { formatDay } from '@/utils/formatDate'

export default {
  async mounted() {},
  computed: {
    days() {
      return this.$store.getters.days
    },
  },
  methods: {
    async choseDay(e) {
      await this.$store.dispatch('timesFetchList', e.target.value)
    },
    // formatDate(day) {
    //   return formatDay(day)
    // },
    formatDate: formatDay,
  },
}
</script>
