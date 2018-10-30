<template>
    <div class="card" style="width: 100%">
        <header class="card-header">
            <p class="card-header-title">
                SInteg
            </p>
        </header>

        <div class="card-content">
            <div class="content">
                <p style="text-align: left">Temperatura: {{ temperatura }}</p>
                <p style="text-align: left">Umidade: {{ umidade }}</p>
                <p style="text-align: left">Porta: {{ porta }} </p>
                <p style="text-align: left">Luz: {{ luz }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import { throttle as _throttle } from 'lodash';

export default {
    data: () => ({
        temperatura: '',
        umidade: '',
        porta: '',
        luz: '',
    }),

    mounted() {
        // lrd sensor

        axios.get('http://barbatheus.dashboard.com:4392/sinteg/ldr')
            .then(res => {
                this.luz = res.data.state;
            });

        axios.get('http://barbatheus.dashboard.com:4392/sinteg/temperature')
            .then(res => {
                this.temperatura = res.data.state;
            });

        // this.temperatura = '31 graus';

        axios.get('http://barbatheus.dashboard.com:4392/sinteg/humidity')
            .then(res => {
                this.umidade = res.data.state;
            });

        // this.umidade = '2.6';

        axios.get('http://barbatheus.dashboard.com:4392/sinteg/reedswitch')
            .then(res => {
                this.porta = res.data.state;
            });
    },
};
</script>
