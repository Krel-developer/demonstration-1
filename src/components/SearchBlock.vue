<template>
  <div class="boocking__item__serch__cont">
    <div class="boocking__item__serch">
      <input type="text" :placeholder="placeholder" @input="search" />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    serachVal: '',
  }),
  props: ['modelValue', 'originalList', 'placeholder', 'searchProp'],
  emits: ['update:modelValue'],

  methods: {
    search(e) {
      const val = e.target.value.toLowerCase().trim()
      const newList = this.originalList.filter((el) =>
        el[this.searchProp].toLowerCase().includes(val)
      )
      this.$emit('update:modelValue', newList)
    },
  },
}
</script>

<style></style>
