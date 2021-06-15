<template>
  <section id="survey__show__page">
    <h1 class="title">SurveyList</h1>
    <survey-list :isAdmin="false"></survey-list>
  </section>
</template>

<script>
import SurveyList from "@/components/common/survey/SurveyList.vue";

export default {
  name: "SurveyShowPage",
  components: {
    SurveyList,
  },
};
</script>

<style scoped>
#survey__show__page {
}
</style>
