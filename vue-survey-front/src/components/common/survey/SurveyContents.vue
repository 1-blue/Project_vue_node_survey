<template>
  <section id="survey__contents">
    <span class="survey__title">{{ survey.title }}</span>
    <span class="survey__time">
      <i class="far fa-clock"></i>
      {{ $filters.formatDate(survey.createdAt) }}
    </span>
  </section>
</template>

<script>
export default {
  name: "SurveyContents",
  props: {
    survey: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
#survey__contents {
  display: flex;
  flex-direction: column;
}

.survey__contents {
  display: flex;
  flex-direction: column;
}

.survey__title {
  font-size: 2vw;
  font-weight: bold;
}

.survey__time {
  font-size: 0.2vw;
}

@media screen and (max-width: 768px) {
  .survey__title {
    font-weight: 600;
  }
}
</style>
