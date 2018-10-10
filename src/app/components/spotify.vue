<template>
    <div class="card border-card" style="width: 100%">
        <header class="card-header">
            <p class="card-header-title">
                Spotify
            </p>
        </header>

        <div class="card-content">
            <div class="content">
                <div>
                    <button
                        v-if="!connected"
                        class="btnConnect"
                        v-text="'Connect'"
                        @click="spotifyRequest()"
                    >
                    </button>
                </div>

                <div
                    v-if="connected"
                    class="player"
                >
                    <div class="player__info">
                        <div
                            v-text="currentTrack.name"
                            class="player__info__track"
                        ></div>
                        <div>
                            <p class="buttons player__info__btns">
                                <a
                                    class="button clickbtn"
                                    @click="previousMusic()"
                                >
                                    <span class="icon">
                                        <i class="far fa-arrow-alt-circle-left" style="color: #fff; font-size:24px;"></i>
                                    </span>
                                </a>

                                <a
                                    class="button clickbtn"
                                    @click="pauseMusic()"
                                >
                                    <span class="icon">
                                        <!-- <i class="far fa-pause-circle" style="color: #fff;"></i> -->
                                        <i class="fas fa-play-circle" style="color: #fff; font-size:30px;"></i>
                                    </span>
                                </a>
                                <a
                                    class="button clickbtn"
                                    @click="nextMusic()"
                                >
                                    <span class="icon">
                                        <i class="far fa-arrow-alt-circle-right" style="color: #fff; font-size:24px;"></i>
                                    </span>
                                </a>
                            </p>
                        </div>
                    </div>

                    <img :src="imgRepoUrl" class="player__info__imgStyle">
                </div>

            </div>
        </div>
    </div>
</template>

<script>
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/# get the token
// import axios from 'axios';

export default {

    data: () => ({
        spotifyPath: 'http://localhost:4392/spotify/token',
        currentTrack: '',
        connected: false,
        imgRepoUrl: '',
    }),

    methods: {
        getCurrent() {
            this.player.getCurrentState().then(state => {
                if (! state) {
                    console.error('User is not playing music through the Web Playback SDK');
                    return;
                }
                console.log('current: ', state.track_window.current_track);

                this.currentTrack = state.track_window.current_track;
                this.imgRepoUrl = this.currentTrack.album.images[0].url;
            });
        },

        pauseMusic() {
            this.player.togglePlay().then(() => {
                this.getCurrent();
                console.log('paused');
            });
        },

        nextMusic() {
            this.player.nextTrack().then(() => {
                this.getCurrent();
                console.log('nextTrack');
            });
        },

        previousMusic() {
            this.player.previousTrack().then(() => {
                this.getCurrent();
                console.log('previousTrack');
            });
        },

        getCookie(cname) {
            const name = `${cname}=`;
            const decodedCookie = decodeURIComponent(document.cookie);
            const ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i += 1) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return '';
        },

        spotifyRequest() {
            const win = window.open('https://accounts.spotify.com/authorize/?client_id=b35dda2c6d8844eb9ca34c7b405ef4d5&response_type=code&redirect_uri=http://localhost:4392/spotify/token&scope=streaming%20user-read-birthdate%20user-read-private%20user-read-email');
            const winClosed = setInterval(() => {
                if (win.closed) {
                    clearInterval(winClosed);
                    this.spotifySDKRequest(); // Call your function here
                }
            }, 100);
        },

        spotifySDKRequest() {
            window.onSpotifyWebPlaybackSDKReady = async () => {
                this.player = new Spotify.Player({
                    name: 'Web Playback SDK Quick Start Player',
                    getOAuthToken: cb => {
                        cb(this.getCookie('spotifyToken'));
                    },
                });

                // Error handling
                this.player.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                });
                this.player.addListener('authentication_error', ({ message }) => {
                    console.log('auth error');
                    console.error(message);
                });
                this.player.addListener('account_error', ({ message }) => {
                    console.error(message);
                });
                this.player.addListener('playback_error', ({ message }) => {
                    console.error(message);
                });

                // Playback status updates
                this.player.addListener('player_state_changed', () => {
                    console.log('player_state_changed');
                });

                // Ready
                this.player.addListener('ready', ({ deviceId }) => {
                    console.log('Ready with Device ID', deviceId);
                });

                // Not Ready
                this.player.addListener('not_ready', ({ deviceId }) => {
                    console.log('Device ID has gone offline', deviceId);
                });

                this.player.connect();
                this.getCurrent();
            };

            this.connected = true;
            const myScript = document.createElement('script');
            myScript.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js');
            document.head.appendChild(myScript);
        },
    },
};

</script>
<style lang="scss">
.btnConnect{
    cursor: pointer;
    background-color: #404450;
    color: #fff;
    border-radius: 5px;
    border: none;
    width: 120px;
    height: 40px;
    font-size: 18px;
    outline: none;

    &:hover {
        background-color: #404450c7;
    }

    &:active {
        background-color: #404450c7;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
}

.player{
    display: flex;
    justify-content: space-around;
    align-self: start;

    &__info {
        display: flex;
        flex-direction: column;
        align-self:flex-end;

        &__track {
            padding-right: 10px;
            padding-bottom: 35px;
            font-size: 14px;
        }

        &__imgStyle {
            width: 150px;
            height: 150px;
        }
    }
}

.clickbtn {
    background-color: red;
        border-radius: 5px;
    &:active {
        transform: translateY(2px);
    }
}
</style>
