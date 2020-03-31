<template>
    <div>
        <div class="comm-sub-title">
            开启倒计时
        </div>
        <div class="count-down">
            <div class="list">
                <div class="time">{{ days }}</div>
                <div class="text">天</div>
            </div>
            <div class="list">
                <div class="time">{{ hours }}</div>
                <div class="text">时</div>
            </div>
            <div class="list">
                <div class="time">{{ minutes }}</div>
                <div class="text">分</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    name: 'CountDown'
})
export default class CountDown extends Vue {
    @Prop() countDownAt!: number;
    countdownTimer:any = null;
    days: string = '00';
    hours: string = '00';
    minutes: string = '00';

    @Watch('countDownAt')
    onCountDown () {
        this.initCountDown();
    }

    mounted () {
        this.initCountDown();
        this.countDown();
    }

    initCountDown () {
        if (this.countDownAt > 0) {
            let time = this.countDownAt - (Math.ceil(new Date().getTime()) / 1000);
            this.setCountDown(time);
        }
    }

    countDown () {
        if (this.countDownAt > 0) {
            let time = this.countDownAt - (Math.ceil(new Date().getTime()) / 1000);
            this.countdownTimer = setInterval(() => {
                this.setCountDown(time);
                time = time - 60;
            }, 60000);
        }
    }
    setCountDown (currentCountTime:number) {
        if (currentCountTime <= 0) {
            clearInterval(this.countdownTimer);
            return;
        }
        let day = currentCountTime / (60 * 60 * 24);
        day = Math.floor(day);
        console.log(day);
        let hours = (currentCountTime - (day * 60 * 60 * 24)) / (60 * 60);
        hours = Math.floor(hours);
        let minutes = (currentCountTime - (day * 60 * 60 * 24) - (hours * 60 * 60)) / 60;
        minutes = Math.ceil(minutes);
        this.hours = hours > 9 ? hours + '' : '0' + hours;
        this.minutes = minutes > 9 ? minutes + '' : '0' + minutes;
        this.days = day > 9 ? day + '' : '0' + day;
    }
};
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'UnidreamLED';
        src: url(../assets/UnidreamLED.ttf);
    }

    .count-down {
        display: flex;
        margin: 45px 0 72px;

        .list {
            flex: 1;
            margin: 0 12px;
            height: 130px;
            font-size: 0;
            padding-left: 10px;
            padding-top: 10px;
            text-align: center;
            background: url(../assets/image/time-bg.png) no-repeat 50% 50%;
            background-size: 100% 100%;

            .time {
                display: inline-block;
                font-size: 110px;
                font-family: UniDreamLED;
                color: rgba(234, 194, 126, 1);
                line-height: 110px;
                letter-spacing: 8px;
            }

            .text {
                display: inline-block;
                font-size: 28px;
                line-height: 34px;
                color: #EAC27E;
            }

        }
    }
</style>
