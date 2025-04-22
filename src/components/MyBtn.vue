<template>
  <div
    class="boocking__item__btn"
    :class="{
      boocking__item__btn_disable: isDisable,
    }"
    @click="$emit('btnClick')"
  >
    <slot></slot>
    <svg
      v-if="withArrow"
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.46484 6.5H11.5359"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.50038 1.46447L11.5359 6.5L6.50038 11.5355"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    isDisable: {
      type: Boolean,
      default: false,
    },
    withArrow: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['btnClick'],
}
</script>
