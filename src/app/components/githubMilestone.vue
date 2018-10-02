<template>
    <div class="card" style="width: 100%">
      <header class="card-header">
        <p class="card-header-title">
          {{ projectName }} / {{ milestoneName }}
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
          <p style="text-align: left">Description: {{ milestoneDescription }} </p>

          <p style="text-align: left">Opened Issues: {{ milestoneIssuesOpened }}</p>

          <p style="text-align: left">Closed Issues: {{ milestoneIssuesClosed }}</p>

          <p style="text-align: left"> Milestone Progress:
            <progress class="progress is-success" :value="milestoneProgress" max="100">60%</progress>
          </p>

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

    repoPath: 'https://api.github.com/orgs/mabacs?client_id=53371ebb2de694eb8d75&client_secret=9abc87b1e2f0cc5b72e9ca22390e12e288c1a264',
    imgRepoUrl: '',

    milestonePath: 'https://api.github.com/repos/mabacs/Dashboard/milestones?client_id=53371ebb2de694eb8d75&client_secret=9abc87b1e2f0cc5b72e9ca22390e12e288c1a264',
    milestoneName: '',
    milestoneDescription: '',
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
        this.prQuantity = res.data.length;
      });

    axios.get(this.milestonePath)
      .then((res) => {
        this.milestoneName = res.data[0].title;
        this.milestoneIssuesOpened = res.data[0].open_issues;
        this.milestoneIssuesClosed = res.data[0].closed_issues;
        const total = this.milestoneIssuesOpened + this.milestoneIssuesClosed;
        this.milestoneProgress = (this.milestoneIssuesClosed / total) * 100;
        this.milestoneDescription = res.data[0].description;
      });
  },
};
</script>

