<template>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          {{ project }}
        </p>
      </header>

      <div class="card-content">
        <div class="content">

          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img :src="imgUrl">
              </figure>
            </div>
          </div>

          <div>Issues Opened: {{ issues }}</div>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    apiProjectPath: 'https://api.github.com/repos/mabacs/Dashboard',
    apiRepoPath: 'https://api.github.com/orgs/mabacs',
    apiRepoPR: 'https://api.github.com/repos/mabacs/Dashboard/pulls',
    imgUrl: '',
    project: '',
    issues: 0,
  }),

  mounted() {
    axios.get(this.apiProjectPath)
      .then((res) => {
        this.project = res.data.name;
        this.issues = res.data.open_issues_count;
        // console.log(res);
      });

    axios.get(this.apiRepoPath)
      .then((res) => {
        this.imgUrl = res.data.avatar_url;
      });

    axios.get(this.apiRepoPR)
      .then((res) => {
        console.log(res);

        // this.imgUrl = res.data.avatar_url;
      });
  },
};
</script>

