<template>
  <i class="far fa-trash-alt icon__delete" @click="$emit('delete:form')"></i>
</template>

<script>
export default {
  name: "FormDeleteButton",
};
</script>

<style scoped></style>
