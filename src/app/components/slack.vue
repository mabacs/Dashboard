<template>
    <div class="card" style="width: 100%">
        <header class="card-header">
            <p class="card-header-title">
               Slack
            </p>
        </header>

        <div class="card-content">
            <div class="content">
                <p style="text-align: left">@here: {{ hereMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    path: 'http://127.0.0.1:4392/auth',
    hereMessage: '',
  }),

  mounted() {
    axios.get(this.path)
      .then((res) => {
        this.hereMessage = res;
        console.log(res);
      });
  },
};
</script>

