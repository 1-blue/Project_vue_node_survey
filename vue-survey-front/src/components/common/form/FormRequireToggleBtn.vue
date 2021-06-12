<template>
  <span>
    필수
    <button type="button" class="toggle__btn">
      <template v-if="isRequired">
        <i
          class="fas fa-toggle-on"
          @click="$emit('toggle:isRequired', isRequired)"
        ></i>
      </template>
      <template v-else>
        <i
          class="fas fa-toggle-off"
          @click="$emit('toggle:isRequired', isRequired)"
        ></i>
      </template>
    </button>
  </span>
</template>

<script>
export default {
  name: "FormRequireToggleBtn",
  props: {
    isRequired: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.toggle__btn {
  border: 0;
  background: transparent;
  cursor: pointer;
}
</style>
