<template>
  <div class="bg">
    <AppHeader />
      <router-view />
  </div>
    <AppFooter/>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
export default {
  components: {
    AppHeader,
    AppFooter
}
};
</script>

<style>
  @import '@/assets/home.css';
</style>