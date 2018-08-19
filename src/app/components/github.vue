<template>
    <div class="card">
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

          <!-- <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="imgRepoUrl">
              </figure>
            </div>
          </div> -->

          <div>Issues Open: {{ projectIssues }}</div>

          <div>Milestone Progress: {{ milestoneProgress }}</div>

          <div>Pull Requests Open: {{ prQuantity }}</div>
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


    repoPath: 'https://api.github.com/orgs/mabacs?client_id=53371ebb2de694eb8d75&client_secret=9abc87b1e2f0cc5b72e9ca22390e12e288c1a264',
    imgRepoUrl: '',

    prPath: 'https://api.github.com/repos/mabacs/Dashboard/pulls:open?client_id=53371ebb2de694eb8d75&client_secret=9abc87b1e2f0cc5b72e9ca22390e12e288c1a264',
    prQuantity: 0,

    milestonePath: 'https://api.github.com/repos/mabacs/Dashboard/milestones?client_id=53371ebb2de694eb8d75&client_secret=9abc87b1e2f0cc5b72e9ca22390e12e288c1a264',
    milestoneIssuesOpened: 0,
    milestoneIssuesClosed: 0,
    milestoneProgress: 0,

  }),

  mounted() {
    axios.get(this.projectPath)
      .then((res) => {
        this.projectName = res.data.name;
        this.projectIssues = res.data.open_issues_count;
      });

    axios.get(this.repoPath)
      .then((res) => {
        this.imgRepoUrl = res.data.avatar_url;
      });

    axios.get(this.prPath)
      .then((res) => {
        console.log(res);
      });

    axios.get(this.milestonePath)
      .then((res) => {
        this.milestoneIssuesOpened = res.data[0].open_issues;
        this.milestoneIssuesClosed = res.data[0].closed_issues;
        this.milestoneProgress = this.milestoneIssuesClosed / this.milestoneIssuesOpened;
      });
  },
};
</script>

