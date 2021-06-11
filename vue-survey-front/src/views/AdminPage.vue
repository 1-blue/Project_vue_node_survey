<template>
  <section id="admin__page">
    <h1 class="title">Admin</h1>
    <template v-if="!isLogin">
      <admin-form></admin-form>
    </template>
    <template v-else></template>
  </section>
</template>

<script>
import AdminForm from "@/components/AdminForm.vue";

export default {
  name: "AdminPage",
  components: {
    AdminForm,
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style scoped>
#admin__page {
}
</style>
