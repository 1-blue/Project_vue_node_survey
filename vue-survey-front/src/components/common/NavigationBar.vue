<template>
  <section id="navigation-bar" class="shadow">
    <ul class="container__link">
      <li>
        <router-link to="/survey/show" class="link">
          <span class="link__text">LOGO</span>
        </router-link>
      </li>
      <div class="wrapper__link">
        <li>
          <router-link to="/home" class="link">
            <span class="link__text">Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin" class="link">
            <span class="link__text">Admin</span>
          </router-link>
        </li>
      </div>
      <li>
        <a href="https://github.com/1-blue" class="link">
          <span class="link__text">Github</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "NavigationBar",
};
</script>

<style scoped>
#navigation-bar {
  position: sticky;
  top: 0;
  z-index: 9999;
  background: var(--black-color);
  padding: 0 1rem;
}

.container__link {
  display: flex;
  justify-content: space-between;
}

.wrapper__link {
  display: flex;
}

li {
  display: flex;
  position: relative;
}

a {
  display: block;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 2rem 1rem;
}

/* 네이게이션바 더늘어나면 햄버그메뉴만들생각 */
@media screen and (max-width: 768px) {
  #navigation-bar {
    padding: 0 0.75rem;
  }

  a {
    font-weight: 600;
    font-size: 1rem;
    padding: 1.5rem 0.75rem;
  }
}
</style>
