<template>
    <div id="app">
        <div
            class="container"
            id="container"
        >
            <div class="tile is-ancestor">
                <div class="tile is-vertical is-4">
                    <div class="tile is-parent is-vertical">
                        <div class="tile is-child">
                            <github></github>
                        </div>

                        <div class="tile is-child">
                            <github-milestone></github-milestone>
                        </div>
                    </div>
                </div>

                <div class="tile is-parent is-horizontal">
                    <div class="tile is-child">
                        <slack></slack>
                    </div>
                </div>

                <div class="tile is-vertical is-4">
                    <div class="tile is-parent is-vertical">
                        <div class="tile is-child">
                            <spotify></spotify>
                        </div>

                        <div class="tile is-child">
                            <iot></iot>
                        </div>
                    </div>
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
// eslint-disable-next-line
import Slack from 'AppComponentsSlack';
// eslint-disable-next-line
import Spotify from 'AppComponentsSpotify';
// eslint-disable-next-line
import Iot from 'AppComponentsIot';
export default {
    name: 'app',
    components: {
        Github,
        GithubMilestone,
        Slack,
        Spotify,
        Iot,
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/_bulma-style.scss';

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #e8e8e8;
    background-color: $background-grey;
}
//
#container {
    padding: 20px;
    margin: 0px;
}
</style>
