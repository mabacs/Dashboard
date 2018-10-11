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
                <p style="text-align: left">@channel: {{ hereMessage }}</p>
                <p style="text-align: left">@channel: {{ hereMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        path: 'http://localhost:4392/channel',
        hereMessage: '',
    }),

    mounted() {
        // axios.get(this.path)
        //     .then(res => {
        //         // this.hereMessage = res;
        //         console.log(res.data);
        //     });
    },
};
</script>
