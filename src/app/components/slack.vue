<template>
    <div class="card" style="width: 100%">
        <header class="card-header">
            <p class="card-header-title">
                Slack
            </p>
        </header>

        <div class="card-content" style="padding: 15px;">
            <div class="content">
                <div>
                    <button
                        v-if="!connected"
                        class="btnConnect"
                        v-text="'Connect'"
                        @click="slackAuthRequest()"
                    >
                    </button>
                </div>
                <div class="slack-cont" v-if="connected">
                    <div
                        v-for="(data, index) in hereData"
                        :key="index"
                        class="slack-cont__pad"
                    >
                        <div class="slack-cont__channel">{{ data.channel }}</div>
                        <div class="slack-cont__msg">{{ data.user + ': ' }} {{ data.message }}</div>
                    </div>
                </div>

                <div class="division" v-if="connected">
                    <div class="slack-cont">
                        <div class="slack-cont__channel">reuniões</div>
                        <div
                            v-for="(data, index) in reunioesData"
                            :key="index"
                            class="division__msg"
                        >
                            <div>{{ data.user + ': '}} {{ data.message }}</div>

                        </div>
                    </div>
                </div>

                <div class="division" v-if="connected">
                    <div class="slack-cont">
                        <div class="slack-cont__channel">devops</div>
                        <div
                            v-for="(data, index) in devopsData"
                            :key="index"
                            class="division__msg"
                        >
                            <div>{{ data.user + ': '}} {{ data.message }}</div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        connected: false,
        hereData: [],
        reunioesData: [],
        devopsData: [],
    }),

    methods: {
        slackAuthRequest() {
            const Authpath = 'https://slack.com/oauth/authorize'
            + '?client_id=417514605056.418759063329'
            + '&scope=search:read '
            + 'channels:read '
            + 'channels:history '
            + 'users:read';
            if (! this.getCookie('slackToken')) {
                const win = window.open(Authpath);
                const winClosed = setInterval(() => {
                    if (win.closed) {
                        clearInterval(winClosed);
                        this.slackGetMessages();
                        this.slackGetChannel();
                        this.connected = true;
                    }
                }, 100);
            } else {
                this.slackGetMessages();
                this.slackGetReunioes();
                this.slackGetDevops();
                this.connected = true;
            }
        },

        async slackGetMessages() {
            const pathHere = `${'https://slack.com/api/search.messages'
                + '?token='}${this.getCookie('slackToken')
            }&count=2`
                + `&query=@here`
                + `&highlights=true`;

            const { data } = await axios.get(pathHere);

            for (let i = 0; i <= 1; i++) {
                this.hereData.push({
                    message: ((data.messages.matches[i].text).replace('<!', '@').replace('>', '')),
                    channel: (data.messages.matches[i].channel.name),
                    user: await this.getUser(data.messages.matches[i].user),
                });
            }
        },

        async slackGetReunioes() {
            const pathChannel = `${'https://slack.com/api/channels.history'
            + '?token='}${this.getCookie('slackToken')
            }&channel=CDBK2EPMW`
            + `&count=3`;

            const { data } = await axios.get(pathChannel);

            for (let i = 0; i <= 2; i++) {
                this.reunioesData.push({
                    message: (data.messages[i].text),
                    user: await this.getUser(data.messages[i].user),
                });
            }
        },

        async slackGetDevops() {
            const pathChannel = `${'https://slack.com/api/channels.history'
            + '?token='}${this.getCookie('slackToken')
            }&channel=CDBPLUGHE`
            + `&count=3`;

            const { data } = await axios.get(pathChannel);

            for (let i = 0; i <= 2; i++) {
                this.devopsData.push({
                    message: (data.messages[i].text),
                    user: await this.getUser(data.messages[i].user),
                });
            }
        },

        async getUser(userId) {
            const pathUser = `${'https://slack.com/api/users.info'
            + '?token='}${this.getCookie('slackToken')
            }&user=${userId}`;

            const { data } = await axios.get(pathUser);

            console.log(data.user.profile.display_name);

            return data.user.profile.display_name;
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
    },
};
</script>

<style lang="scss">
.slack-cont {
    text-align: left;
    padding-left: 10px;

    &__title {
        border-bottom-style: solid;
        border-bottom-color: grey;
        border-bottom-width: 1px;
    }

    &__channel {
        font-weight: bold;
    }

    &__pad {
        padding-top: 10px;
        padding-bottom: 25px;
    }
}

.division {
    padding-top: 15px;
    border-top-style: solid;
    border-top-color: grey;
    border-top-width: 1px;

    &__msg {
        padding-top: 10px;
        font-size: 16px;

        &:last-child {
            padding-bottom: 15px;
        }
    }
}
</style>
