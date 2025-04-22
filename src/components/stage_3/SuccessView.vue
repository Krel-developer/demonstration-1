<template>
  <div class="boocking__item__thumb boocking__item__thumb_success">
    <div>
      <div class="boocking__item__field__title">
        Вы успешно записаны на прием.
      </div>
      Специалист: <strong>{{ info.staffName }}</strong> <br />
      Услуга: <strong>{{ info.servicefName }}</strong> <br />
      День:
      <strong>{{ formatDate(info.day) }}</strong> <br />
      Время: <strong>{{ formatTime(info.time) }}</strong>
    </div>
  </div>
</template>

<script>
import { formatDay, formatTime } from '@/utils/formatDate'

export default {
  props: {
    info: Object,
  },
  methods: {
    formatDate: formatDay,
    formatTime: formatTime,
  },
}
</script>

<style></style>
