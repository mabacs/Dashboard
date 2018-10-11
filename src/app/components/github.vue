<template>
    <div class="card" style="width: 100%">
      <header class="card-header">
        <p class="card-header-title">
          {{ projectName }}
        </p>

        <a href="#" class="card-header-icon">
          <span class="icon">
            <figure class="image">
              <img :src="imgRepoUrl">
            </figure>
          </span>
        </a>
      </header>

      <div class="card-content">
        <div class="content">
          <div class="tags has-addons">
            <span class="tag is-dark is-small">
              <font-awesome-icon icon="star" class="star-icon" />
            </span>
            <span class="tag is-dark" v-text="projectStarts"></span>
          </div>
          <p style="text-align: left">Subscribers: {{ projectSubscribers }}</p>
          <p style="text-align: left">Opened Issues: {{ projectIssues }}</p>
          <p style="text-align: left">Opened Pull Requests: {{ prQuantity }}</p>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    projectPath: 'https://api.github.com/repos/mabacs/Dashboard?client_id=53371ebb2de694eb8d75&client_secret=9abc87b1e2f0cc5b72e9ca22390e12e288c1a264',
    projectName: '',
    projectIssues: 0,
    projectStarts: 0,
    projectSubscribers: 0,

    repoPath: 'https://api.github.com/orgs/mabacs?client_id=53371ebb2de694eb8d75&client_secret=9abc87b1e2f0cc5b72e9ca22390e12e288c1a264',
    imgRepoUrl: '',

    prPath: 'https://api.github.com/repos/mabacs/Dashboard/pulls?client_id=53371ebb2de694eb8d75&client_secret=9abc87b1e2f0cc5b72e9ca22390e12e288c1a264',
    prQuantity: 0,
  }),

  mounted() {
    axios.get(this.projectPath)
      .then((res) => {
        this.projectName = res.data.name;
        this.projectIssues = res.data.open_issues_count;
        this.projectStarts = res.data.stargazers_count;
        this.projectSubscribers = res.data.subscribers_count;
      });

    axios.get(this.repoPath)
      .then((res) => {
        this.imgRepoUrl = res.data.avatar_url;
      });

    axios.get(this.prPath)
      .then((res) => {
        this.prQuantity = res.data.length;
      });
  },
};
</script>

<style lang="scss">
</style>
