<template>
  <div
    class="boocking__item boocking_stage_two"
    :class="{
      boocking__item__laoding: preloader.stageTwo,
      boocking__item_active: stage === stageNumber,
      boocking__item__thumb__complete: isRecordComlete,
    }"
  >
    <div class="boocking__item__title">
      <span>Шаг {{ stageNumber }}.</span>
      Выберите специалиста
    </div>

    <staffsList></staffsList>

    <myBtn @btnClick="prevStage" class="boocking__item__btn_back">
      Назад
    </myBtn>

    <myBtn :isDisable="!currentStaff" :withArrow="true" @btnClick="nextStage">
      Следующий шаг
    </myBtn>

    <div class="boocking__item__thumb" v-if="!currentService && !isStaffFirst">
      <div>
        Что бы перейти к выбору <br />
        специалиста выберите <strong>услугу</strong>
      </div>
    </div>
    <div
      class="boocking__item__thumb boocking__item__thumb_no_record"
      v-else-if="!staffs.length"
    >
      <div>Свободных записей пока нет <br /></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyBtn from '../MyBtn.vue'
import StaffsList from './StaffsList.vue'

export default {
  data: () => ({
    stageNumber: 2,
  }),

  methods: {
    nextStage() {
      this.$store.dispatch('switchStage', this.stageNumber + 1)
    },
    prevStage() {
      this.$store.dispatch('switchStage', this.stageNumber - 1)
    },
  },
  computed: {
    // isStaffFirst() {
    //   return this.$store.getters.isStaffFirst
    // },
    // staffs() {
    //   return this.$store.getters.staffs
    // },
    // currentStaff() {
    //   return this.$store.getters.currentStaff
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

    ...mapGetters([
      'isStaffFirst',
      'staffs',
      'currentStaff',
      'currentService',
      'preloader',
      'stage',
      'isRecordComlete',
    ]),
  },
  watch: {
    isStaffFirst: {
      handler() {
        // Если первым идет врачи, назачаем номер отображение 1
        if (this.isStaffFirst) {
          this.stageNumber = 1
        } else {
          this.stageNumber = 2
        }
      },
    },
  },
  components: {
    MyBtn,
    StaffsList,
  },
}
</script>
