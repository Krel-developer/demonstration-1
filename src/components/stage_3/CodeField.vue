<template>
  <div class="boocking__item__thumb boocking__item__thumb_success">
    <div>
      <div class="boocking__item__field boocking__item__field_code">
        <div class="boocking__item__field__title">Введите код из смс</div>
        <input
          style="text-align: center"
          type="text"
          placeholder=" _-_-_-_"
          id="phone_code"
        />
      </div>
    </div>
    <div
      class="boocking__item__btn boocking__item__btn_code"
      @click="checkCode"
    >
      Подвердить
    </div>
  </div>
</template>

<script>
import message from '@/libs/krel_toast/krel_toast'

import { krelMaskInput } from '@/libs/krelMaskInput'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue', 'completeRecord'],
  mounted() {
    const codeMask = document.getElementById('phone_code')
    if (codeMask) {
      krelMaskInput(codeMask, ' 9-9-9-9')
      codeMask.addEventListener('input', (e) => {
        this.$emit('update:modelValue', e.target.value)
      })
      codeMask.addEventListener('blur', (e) => {
        this.$emit('update:modelValue', e.target.value.replace(/-/g, '').trim())
      })
    }
  },
  methods: {
    checkCode() {
      if (this.modelValue) {
        this.$emit('completeRecord')
      } else {
        message.error('Вы указали неверный код')
      }
    },
  },
}
</script>

<style></style>
