<template>
  <div
    class="boocking__item"
    :class="{
      boocking__item__laoding: preloader.stageOne,
      boocking__item__thumb__complete: isRecordComlete,
      boocking__item_active: stage === stageNumber,
    }"
  >
    <div class="boocking__item__title">
      <span>Шаг {{ stageNumber }}.</span>
      Выберите услугу
    </div>

    <servicesList></servicesList>

    <myBtn :isDisable="!currentService" :withArrow="true" @btnClick="nextStage">
      Следующий шаг
    </myBtn>
    <div
      class="boocking__item__thumb boocking__item__thumb_no_record"
      v-if="!services.length"
    >
      <div>Свободных записей пока нет <br /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyBtn from '../MyBtn.vue'
import ServicesList from './ServicesList.vue'

export default {
  data: () => ({
    stageNumber: 1,
  }),

  methods: {
    nextStage() {
      this.$store.dispatch('switchStage', this.stageNumber + 1)
    },
  },
  computed: {
    // isStaffFirst() {
    //   return this.$store.getters.isStaffFirst
    // },

    // currentService() {
    //   return this.$store.getters.currentService
    // },
    // preloader() {
    //   return this.$store.getters.preloader
    // },
    // stage() {
    //   return this.$store.getters.stage
    // },
    // isRecordComlete() {
    //   return this.$store.getters.isRecordComlete
    // },
    // services() {
    //   return this.$store.getters.services
    // },
    ...mapGetters([
      'isStaffFirst',
      'currentService',
      'preloader',
      'stage',
      'services',
      'isRecordComlete',
    ]),
  },

  mounted() {
    console.log(this)
  },
  watch: {
    isStaffFirst: {
      handler() {
        // Если первым идет врачи, назачаем номер отображение 2
        if (this.isStaffFirst) {
          this.stageNumber = 2
        } else {
          this.stageNumber = 1
        }
      },
    },
  },
  components: {
    MyBtn,
    ServicesList,
  },
}
</script>
