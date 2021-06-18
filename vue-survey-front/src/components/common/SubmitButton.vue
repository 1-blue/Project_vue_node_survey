<template>
  <form class="wapper" @submit.prevent="submit">
    <button
      type="submit"
      class="btn"
      :class="{ btn__active: isEnough, no__active__button: !isEnough }"
    >
      <span class="btn__text">
        <slot></slot>
      </span>
    </button>
  </form>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    isEnough: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    submit() {
      if (this.isEnough) {
        return this.$emit("submit1:survey");
      }

      alert("필수 입력란에 모두 입력해주세요");
    },
  },
};
</script>

<style scoped>
.wapper {
  display: flex;
}

.btn {
  margin: auto;
  margin-bottom: 10vh;
  background: lightgray;
  width: 20vw;
  height: 10vh;
  font-size: 2rem;
}

.btn__active {
  background: #997ace;
  cursor: pointer;
}

/* 이거 조건만족할 때만 부여하기로 바꾸기 */
/* .btn::after {
  background: lightgray;
} */
</style>
