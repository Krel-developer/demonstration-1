<template>
  <div class="container">
    <div class="krel_boocking" :class="{ staffFirst: isStaffFirst }">
      <stage-one></stage-one>

      <stage-two></stage-two>

      <stage-three></stage-three>
    </div>
  </div>
</template>

<script>
import '@/assets/style/main.sass'

import StageOne from './components/stage_1/StageOne.vue'
import StageTwo from './components/stage_2/StageTwo.vue'
import StageThree from './components/stage_3/StageThree.vue'

export default {
  name: 'App',
  data: () => ({}),
  components: {
    StageOne,
    StageTwo,
    StageThree,
  },
  async mounted() {
    const url = new URL(document.location.href)

    if (url.searchParams.has('service_id')) {
      if (url.searchParams.has('staff_id')) {
        this.$store.dispatch('switchStage', 3)
      } else {
        this.$store.dispatch('switchStage', 2)
      }
      this.$store.dispatch(
        'disCurrentServiceSet',
        +url.searchParams.get('service_id')
      )
      await this.$store.dispatch('servicesFetchList')

      this.$store.dispatch(
        'disCurrentStaffSet',
        +url.searchParams.get('staff_id')
      )

      await this.$store.dispatch('staffsFetchList')

      if (url.searchParams.has('staff_id')) {
        this.$store.dispatch(
          'disCurrentStaffSet',
          +url.searchParams.get('staff_id')
        )
        await this.$store.dispatch('daysFetchList')
      }
    } else if (url.searchParams.has('staff_id')) {
      // Если в переданых параметрах только врач, то запускаем отрисовку когда первым выбором идут врачи
      this.$store.dispatch('activateStaffFirst')

      this.$store.dispatch(
        'disCurrentStaffSet',
        +url.searchParams.get('staff_id')
      )

      // и запрашиваем список врачей
      await this.$store.dispatch('staffsFetchList')
      await this.$store.dispatch('servicesFetchList')

      this.$store.dispatch('switchStage', 2)
    } else {
      await this.$store.dispatch('servicesFetchList')
    }

    this.scroolToActiveCard()
  },

  methods: {
    scroolToActiveCard() {
      const staffActiveCard = document.querySelector(
        '.krel_staffs__item_active'
      )
      if (staffActiveCard) {
        staffActiveCard.scrollIntoView(false)
      }
      const serviceActiveCard = document.querySelector(
        '.krel_services__item_active'
      )
      if (serviceActiveCard) {
        serviceActiveCard.scrollIntoView(false)
      }
    },
  },

  computed: {
    isStaffFirst() {
      return this.$store.getters.isStaffFirst
    },
  },
}
</script>
<style lang="sass">

.staffFirst
  .boocking_stage_two
    order: -3
.section
  padding: 30px 0
  border: 1px solid red
.item
  padding: 10px
  border-radius: 10px
  border: 1px solid #000
  margin-bottom: 20px
  cursor: pointer

.section__date
  display: flex
  flex-wrap: wrap

  .item
    width: max-content
    margin-right: 10px
</style>
