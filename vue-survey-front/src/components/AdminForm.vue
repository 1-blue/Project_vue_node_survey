<template>
  <section id="admin__form">
    <form method="post">
      <label for="password">비밀번호 : </label>
      <input type="password" placeholder="비밀번호 입력" v-model="password" />
      <button type="submit" @click.prevent="login">로그인</button>
    </form>
  </section>
</template>

<script>
import { loginAdmin } from "@/api/index.js";
import { setToken } from "@/utils/cookie.js";

export default {
  name: "AdminForm",
  data() {
    return {
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const { data } = await loginAdmin(this.password);
        await this.$store.dispatch("SET_TOKEN", data.token);
        setToken(data.token);
      } catch (error) {
        switch (error.response.status) {
          case 401: // 인증오류
            alert("잘못된 비밀번호 입니다.");
            break;

          default:
            alert("알 수 없는 오류입니다. 잠시후에 다시 시도해주세요");
            break;
        }
      }
    },
  },
};
</script>

<style scoped>
#admin__form {
}
</style>
