<template>
  <search-block
    v-model="servicesFormated"
    :originalList="services"
    :placeholder="'Поиск услуги'"
    :searchProp="'title'"
  ></search-block>
  <div class="boocking__item__list">
    <service-card
      v-for="(service, index) in servicesFormated"
      :key="index"
      :data="service"
      :currentService="currentService"
    ></service-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SearchBlock from '../SearchBlock.vue'
import ServiceCard from './ServiceCard.vue'

export default {
  // data() {
  //   return {}
  // },
  data: () => ({
    servicesFormated: [],
  }),
  computed: {
    // services() {
    //   return this.$store.getters.services
    // },
    // currentService() {
    //   return this.$store.getters.currentService
    // },

    ...mapGetters(['services', 'currentService']),
  },
  watch: {
    services: {
      handler() {
        this.servicesFormated = this.services
      },
      deep: true,
    },
  },

  components: { SearchBlock, ServiceCard },
}
</script>
