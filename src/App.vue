<template>
  <div id="app">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-3">
          <github></github>
        </div>

        <div class="tile is-4" style="padding-left: 50px">
          <github-milestone></github-milestone>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import Github from 'AppComponentsGithub';
// eslint-disable-next-line
import GithubMilestone from 'AppComponentsGithubMilestone';

export default {
  name: 'app',
  components: {
    Github,
    GithubMilestone,
  },
};
</script>

<style lang="scss">
@import '~bulma/bulma';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
