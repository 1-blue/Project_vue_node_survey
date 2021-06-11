<template>
  <section id="admin__page">
    <!-- 미로그인시 -->
    <template v-if="!isLogin">
      <h1 class="title">Admin로그인</h1>
      <admin-form></admin-form>
    </template>

    <!-- 로그인시 -->
    <template v-else>
      <h1 class="title">설문지만들기</h1>
      <add-survey-list></add-survey-list>
    </template>
  </section>
</template>

<script>
import AdminForm from "@/components/AdminForm.vue";
import AddSurveyList from "@/components/AddSurveyList.vue";

export default {
  name: "AdminPage",
  components: {
    AdminForm,
    AddSurveyList,
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
