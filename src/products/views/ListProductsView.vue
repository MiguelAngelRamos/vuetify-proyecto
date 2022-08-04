<template>
  <v-container>
    <v-row>
   <CardProducto v-for="producto of productos" :key="producto.id" :productoCard="producto"/>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import CardProducto from '@/products/components/CardProduct.vue';
// import CardProducto from '../components/CardProducto.vue';
export default {
  components: {
    CardProducto
  },
  methods: {
    ...mapActions({
      products: 'getProductsApi'
    })
  },
  computed: {
    ...mapState(['productos'])
  },
  created() {
    this.products();
  }
}
</script>

<style>

</style>