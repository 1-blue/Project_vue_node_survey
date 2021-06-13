<template>
  <span>
    <span>필수</span>
    <button type="button" class="toggle__btn">
      <template v-if="required">
        <i
          class="fas fa-toggle-on"
          @click="$emit('toggle:required', required)"
        ></i>
      </template>
      <template v-else>
        <i
          class="fas fa-toggle-off"
          @click="$emit('toggle:required', required)"
        ></i>
      </template>
    </button>
  </span>
</template>

<script>
export default {
  name: "FormRequireToggleBtn",
  props: {
    required: {
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
