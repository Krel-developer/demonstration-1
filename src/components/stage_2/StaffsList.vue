<template>
  <search-block
    v-model="staffsFormated"
    :originalList="staffs"
    :placeholder="'Поиск специалиста'"
    :searchProp="'name'"
  ></search-block>

  <div class="boocking__item__list">
    <staff-card
      v-for="(staff, index) in staffsFormated"
      :key="index"
      :data="staff"
      :currentStaff="currentStaff"
    ></staff-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBlock from '../SearchBlock.vue'
import StaffCard from './StaffCard.vue'

export default {
  data: () => ({
    staffsFormated: [],
  }),
  computed: {
    // staffs() {
    //   return this.$store.getters.staffs
    // },
    // currentStaff() {
    //   return this.$store.getters.currentStaff
    // },

    ...mapGetters(['staffs', 'currentStaff']),
  },

  components: { StaffCard, SearchBlock },

  watch: {
    staffs: {
      handler() {
        this.staffsFormated = this.staffs
      },
      deep: true,
    },
  },
}
</script>

<style></style>
