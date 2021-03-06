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
                        v-if="!connected && !waitDevice"
                        class="btnConnect"
                        v-text="'Connect'"
                        @click="spotifyRequest()"
                    >
                    </button>
                </div>

                <div v-if="waitDevice && !connected">
                    Waiting for Device Connection
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
                                    class="clickbtn"
                                    @click="previousMusic()"
                                >
                                    <span class="icon">
                                        <i
                                            class="far fa-arrow-alt-circle-left"
                                            style="color: #fff; font-size:24px;"
                                        ></i>
                                    </span>
                                </a>

                                <a
                                    class="clickbtn"
                                    @click="playMusic()"
                                >
                                    <span class="icon">
                                        <i
                                            :class="changeButton()"
                                            style="color: #fff; font-size:30px;"
                                        ></i>
                                    </span>
                                </a>
                                <a
                                    class="clickbtn"
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
        currentTrack: '',
        connected: false,
        waitDevice: false,
        imgRepoUrl: '',
        play: false,
    }),

    methods: {
        changeButton() {
            return this.play
                ? 'far fa-pause-circle'
                : 'fas fa-play-circle';
        },

        getCurrent() {
            this.player.getCurrentState().then(state => {
                if (! state) {
                    console.error('User is not playing music through the Web Playback SDK');
                    return;
                }

                // this.currentTrack = state.track_window.current_track;
                this.imgRepoUrl = this.currentTrack.album.images[0].url;
            });
        },

        playMusic() {
            this.player.togglePlay().then(() => {
                this.play = ! this.play;
                this.getCurrent();
            });
        },

        nextMusic() {
            this.player.nextTrack().then(() => {
                this.getCurrent();
            });
        },

        previousMusic() {
            this.player.previousTrack().then(() => {
                this.getCurrent();
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
            const win = window.open('https://accounts.spotify.com/authorize/?client_id=f7480b16ff9c46fea5cd2d76afa655a5&response_type=code&redirect_uri=http://barbatheus.dashboard.com:4392/spotify/token&scope=streaming%20user-read-birthdate%20user-read-private%20user-read-email');
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
                    name: 'Dashboard Barbatheus',
                    getOAuthToken: cb => {
                        cb(this.getCookie('spotifyToken'));
                    },
                });

                // Error handling
                this.player.addListener('initialization_error', ({ message }) => {
                    console.error(message);
                });
                this.player.addListener('authentication_error', ({ message }) => {
                    console.error(message);
                });
                this.player.addListener('account_error', ({ message }) => {
                    console.error(message);
                });
                this.player.addListener('playback_error', ({ message }) => {
                    console.error(message);
                });

                // Playback status updates
                this.player.addListener('player_state_changed', ({
                    track_window: { current_track },
                }) => {
                    this.connected = true;
                    this.currentTrack = current_track;
                    this.getCurrent();
                });

                // Ready
                this.player.addListener('ready', ({ deviceId }) => {
                    if (deviceId === undefined) {
                        this.waitDevice = true;
                    }
                });

                // Not Ready
                this.player.addListener('not_ready', ({ deviceId }) => {
                    console.log('Device ID has gone offline', deviceId);
                });

                this.player.connect();
                if (this.connected && (! this.waitDevice)) {
                    this.getCurrent();
                }
            };

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
    padding-left: 10px;

    &:active {
        border-radius: 25px;
        transform: translateY(2px);
    }
}
</style>
