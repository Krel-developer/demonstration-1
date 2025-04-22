<template>
  <div
    class="boocking__item boocking_stage_three"
    :class="{
      boocking__item__laoding: preloader.stageThree,
      boocking__item_active: stage === 3,
    }"
  >
    <div class="boocking__item__title">
      <span>Шаг 3.</span>
      Заключительный шаг
    </div>
    <div class="boocking__item__text">
      <div>
        Вы выбрали услугу <strong>{{ servicefName }}</strong
        >,
      </div>
      <div>
        к врачу <strong>{{ staffName }}</strong>
      </div>
    </div>

    <div class="boocking__item__field">
      <div class="boocking__item__field__title">Выберите дату приема</div>
      <date-select></date-select>
    </div>
    <div class="boocking__item__field">
      <div class="boocking__item__field__title">Выберите доступное время</div>
      <time-select></time-select>
    </div>
    <div class="boocking__item__field">
      <div class="boocking__item__field__title">Укажите ваше имя</div>
      <input
        type="text"
        placeholder="Иван Иванович Иванов"
        v-model="fullname"
      />
    </div>
    <div class="boocking__item__field">
      <div class="boocking__item__field__title">Укажите номер телефона</div>
      <input type="text" placeholder="+7 (___) ___-__-__" id="phone_mask" />
    </div>

    <myBtn class="boocking__item__btn_back" @btnClick="prevStage">
      Назад
    </myBtn>

    <myBtn class="boocking__item__btn__record" @btnClick="startRecord">
      Записаться на прием онлайн
    </myBtn>

    <div class="boocking__item__thumb" v-if="!(currentStaff && currentService)">
      <div>
        Что бы записаться на прием <br />
        выберите <strong>услугу</strong> и <strong>специалиста</strong>
      </div>
    </div>

    <div
      class="boocking__item__thumb boocking__item__thumb_no_record"
      v-else-if="!(days.booking_dates && days.booking_dates.length)"
    >
      <div>Свободных записей пока нет <br /></div>
    </div>

    <success-view
      v-if="successOpen"
      :info="{
        servicefName: servicefName,
        staffName: staffName,
        day: currentDay,
        time: currentTime,
      }"
    ></success-view>

    <code-field
      v-if="codeOpen"
      v-model="code"
      @completeRecord="completeRecord"
    ></code-field>
  </div>
</template>

<script>
import { krelMaskInput } from '@/libs/krelMaskInput'
import DateSelect from './DateSelect.vue'
import TimeSelect from './TimeSelect.vue'

import message from '@/libs/krel_toast/krel_toast'
import SuccessView from './SuccessView.vue'
import CodeField from './CodeField.vue'
import MyBtn from '../MyBtn.vue'
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    phone: '',
    fullname: '',
    successOpen: false,
    codeOpen: false,
    code: '',
  }),
  mounted() {
    const phoneMask = document.getElementById('phone_mask')
    if (phoneMask) {
      krelMaskInput(phoneMask, '+7 (999) 999-99-99')
      phoneMask.addEventListener('input', (e) => {
        this.phone = e.target.value
      })
      phoneMask.addEventListener('blur', (e) => {
        this.phone = e.target.value
      })
    }
  },
  methods: {
    async startRecord() {
      if (this.validate()) {
        const code = await this.$store.dispatch('createBookCode', {
          phone: this.formatPhone,
          fullname: this.fullname,
        })
        console.log(code)

        this.codeOpen = true
      }
    },
    async completeRecord() {
      console.log(this.code)

      const data = {
        phone: this.phone,
        fullname: this.fullname,
        email: '',
        code: +this.code,
        appointments: [
          {
            id: 1,
            staff_id: this.currentStaff,
            services: [this.currentService],
            datetime: this.currentTime,
          },
        ],
        client_agreements: {
          is_personal_data_processing_allowed: true,
        },
      }
      const record = await this.$store.dispatch('boockRecord', data)
      if (record.body.success) {
        this.codeOpen = false
        this.successOpen = true
        this.$store.dispatch('completeRecord')
        message.success('Ваша запись успешно оформлена')
      } else {
        message.error(record.body.meta.message)
      }
    },
    prevStage() {
      this.$store.dispatch('switchStage', 2)
    },
    validate() {
      let isValid = true
      if (!this.currentDay) {
        message.error('Выберите дату приема')
        isValid = false
      }
      if (!this.currentTime) {
        message.error('Выберите доступное время')
        isValid = false
      }
      if (!this.fullname) {
        message.error('Укажите ваше имя')
        isValid = false
      }
      if (!this.phone) {
        message.error('Укажите номер телефона')
        isValid = false
      }

      return isValid
    },
  },
  computed: {
    formatPhone() {
      return this.phone.replace(/\(|\)|-| |\+/g, '')
    },

    staffName() {
      let staffName
      this.$store.getters.staffs.forEach((staff) => {
        if (staff.id === this.currentStaff) {
          staffName = staff.name
        }
      })
      return staffName
    },
    servicefName() {
      let serviceName
      this.$store.getters.services.forEach((service) => {
        if (service.id === this.$store.getters.currentService) {
          serviceName = service.title
        }
      })
      return serviceName
    },
    // currentStaff() {
    //   return this.$store.getters.currentStaff
    // },
    // currentService() {
    //   return this.$store.getters.currentService
    // },
    // currentTime() {
    //   return this.$store.getters.currentTime
    // },
    // currentDay() {
    //   return this.$store.getters.currentDay
    // },
    // record() {
    //   return this.$store.getters.record
    // },
    // preloader() {
    //   return this.$store.getters.preloader
    // },
    // stage() {
    //   return this.$store.getters.stage
    // },
    // days() {
    //   return this.$store.getters.days
    // },

    ...mapGetters([
      'currentStaff',
      'currentService',
      'currentTime',
      'currentDay',
      'record',
      'preloader',
      'stage',
      'days',
    ]),
  },
  components: { DateSelect, TimeSelect, SuccessView, CodeField, MyBtn },
}
</script>

<style></style>
