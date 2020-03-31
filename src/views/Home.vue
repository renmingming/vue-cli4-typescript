<template>
    <div class="content">
        <div class="container" ref="container">
            <div class="main">
                <div class="header">
                    <div class="title">女神赛</div>
                </div>
                <div class="content">
                    <div class="tab">
                        <div :class="['list', currentType === '' ? 'active' : '']">
                            <div class="tab-btn" @click="switchStage('')">预选赛</div>
                            <span class="time">12月14-12月15</span>
                        </div>
                        <div :class="['list', currentType === 'eight' ? 'active' : '']">
                            <div class="tab-btn" @click="switchStage('eight')">晋级赛</div>
                            <span class="time">12月21-12月22</span>
                        </div>
                        <div :class="['list', currentType === 'final' ? 'active' : '']">
                            <div class="tab-btn" @click="switchStage('final')">总决赛</div>
                            <span class="time">12月28-12月29</span>
                        </div>
                    </div>
                    <div class="comm-title">
                        <img src="@/assets/image/title-icon.png" class="icon left" alt="">
                        <span class="name">{{ titleText }}</span>
                        <img src="@/assets/image/title-icon.png" class="icon right" alt="">
                    </div>
                    <div v-if="usesrActivityDetail">
                        <keep-alive>
                            <Qualifier v-if="!usesrActivityDetail.first_phase" :countDownAt="countDownAt"
                                       :isAnchor="isAnchor"></Qualifier>
                            <UserRank v-else :userRankData="userRankData" :isQualifier="isQualifier"
                                      :countDownAt="countDownAt"
                                      :isAnchor="isAnchor" :isShowBtn="isShowSendGiftBtn"></UserRank>
                        </keep-alive>
                        <GuideInfo v-if="usesrActivityDetail.first_phase" :isAnchor="isAnchor"></GuideInfo>
                    </div>
                    <div class="tip-text">
                        官方保留本活动的最终解释权，如有疑问可联系客服
                    </div>
                </div>
            </div>
        </div>
        <div class="footer" v-if="isShowFooter">
            <img :src="usesrActivityDetail.avatar_url" alt="" class="avatar">
            <div class="name">{{ usesrActivityDetail.nickname }}</div>
            <div class="rank-val">
                <img src="@/assets/image/rank-icon.png" alt="">
                {{ usesrActivityDetail.rank_amount ? usesrActivityDetail.rank_amount : 0 }}
            </div>
            <div class="prev-rank">
                <div class="name">{{ rankText }}</div>
                <div class="rank-val" v-if="usesrActivityDetail.diff_amount !== 0">
                    <img src="@/assets/image/rank-icon.png" alt="">
                    {{ usesrActivityDetail.diff_amount }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Qualifier from '@/components/Qualifier.vue';
import UserRank from '@/components/UserRank.vue';
import GuideInfo from '@/components/GuideInfo.vue';
import service from '@/utils/https';

interface UserDetail {
    [propName: string]: any;
}

interface Response<T> {
    error_code: number;
    error_reason: string;
    error_url: string;
    now_at: number;
    user_ranks: T;
}

@Component({
    name: 'Home',
    components: { Qualifier, UserRank, GuideInfo }
})
export default class Home extends Vue {
    currentType: string = '';
    countDownAt: number = 0;
    usesrActivityDetail: UserDetail = {};
    userRankData: [] = [];
    isShowBtn: boolean = false;
    datanumber: number[] = [];

    mounted () {
        this.getUserDetail();
        var ios = navigator.userAgent.indexOf('iPhone');
        if (ios !== -1) {
        }
        setTimeout(() => {
            for (let i = 0; i < 100; i++) {
                this.datanumber.push(i);
            }
        }, 5000);
    }

    get isAnchor () {
        if (this.usesrActivityDetail) {
            return this.usesrActivityDetail.is_anchor;
        } else {
            return 0;
        }
    }

    get isShowFooter (): boolean {
        return this.usesrActivityDetail && this.usesrActivityDetail.first_phase && this.isAnchor;
    }

    get rankText () {
        let rank = this.usesrActivityDetail.rank;
        if (rank > 1) {
            return '距离上一名差';
        }
        if (rank === 1) {
            return '目前排名第一名';
        }
        if (rank < 0) {
            if (this.usesrActivityDetail.rank_amount === 0 && this.usesrActivityDetail.diff_amount === 0) {
                return '未上榜';
            }
            return '距离上榜还差';
        }
    }

    get isQualifier () {
        // true 为预赛，false为正赛
        if (this.currentType === 'eight') {
            return this.isFirstTwoStage();
        }
        if (this.currentType === 'final') {
            return this.isTwoFinalStage();
        }
        return false;
    }

    get titleText (): string {
        if (this.currentType === '') {
            return 'N进32预选赛';
        }
        if (this.currentType === 'eight') {
            return '32进8晋级赛';
        }
        if (this.currentType === 'final') {
            return '总决赛';
        }
        return '盛典活动';
    }

    switchStage (type: string) {
        if (!this.isSwitch(type)) {
            return;
        }
        this.currentType = type;
        this.getUserRank(type);
    }

    get isShowSendGiftBtn (): boolean {
        if (this.currentType === '') {
            return !this.usesrActivityDetail.first_end;
        }
        if (this.currentType === 'eight') {
            return !this.usesrActivityDetail.two_end;
        }
        if (this.currentType === 'final') {
            return !this.usesrActivityDetail.third_end;
        }
        return false;
    }

    isSwitch (type: string): boolean {
        let firstPhase = this.usesrActivityDetail.first_phase;
        let twoPhase = this.usesrActivityDetail.two_phase;
        let thirdPhase = this.usesrActivityDetail.third_phase;
        switch (type) {
        case '':
            return firstPhase;
        case 'eight':
            return twoPhase;
        case 'final':
            return thirdPhase;
        default:
            return false;
        }
    }

    isFirstTwoStage (): boolean {
        // 第一阶段结束，第二阶段未开始
        let currentTime = new Date().getTime() / 1000;
        if (this.currentType === 'eight' && this.usesrActivityDetail.two_start_at > currentTime) {
            return true;
        }
        return false;
    }

    isTwoFinalStage (): boolean {
        // 第er阶段结束，第san阶段未开始
        let currentTime = new Date().getTime() / 1000;
        if (this.currentType === 'final' && this.usesrActivityDetail.third_start_at > currentTime) {
            return true;
        }
        return false;
    }

    getUserDetail () {
        service.get('/activities/user_detail').then((res: any) => {
            console.log(res);
            this.usesrActivityDetail = res;
            if (!res.first_phase) {
                this.countDownAt = res.first_start_at;
            }
            if (res.first_phase && !res.two_phase && !res.third_phase) {
                this.getUserRank('');
            }
            if (res.two_phase && !res.third_phase) {
                this.currentType = 'eight';
                this.getUserRank('eight');
            }
            if (res.third_phase) {
                this.currentType = 'final';
                this.getUserRank('final');
            }
        });
    }

    getUserRank (type: string) {
        // ''空为32；eight为8；final为决赛
        if (this.isFirstTwoStage()) {
            // 预选结束，晋级未开始
            type = 'thirty_two';
            this.countDownAt = this.usesrActivityDetail.two_start_at;
        }
        if (this.isTwoFinalStage()) {
            type = 'final';
            this.countDownAt = this.usesrActivityDetail.third_start_at;
        }
        service.get('/activities/user_year_rank', {
            params: {
                type
            }
        }).then((res: Response<[]>) => {
            if (res.error_code === 0) {
                this.userRankData = res.user_ranks;
            }
        });
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .container {
        overflow-y: scroll !important;
        height: 100%;
        -webkit-overflow-scrolling: touch;
    }

    .header {
        height: 657px;
        width: 100%;
        padding-top: 540px;
        background: url(../assets/image/top-img.png) no-repeat 50% -10px;
        background-size: 750px 657px;
        font-size: 0;

        .title {
            width: 412px;
            height: 119px;
            font-weight: 600;
            font-size: 40px;
            color: rgba(234, 194, 126, 1);
            line-height: 40px;
            text-align: center;
            margin: 0 auto;
            padding-top: 50px;
            text-shadow: 0px 2px 4px rgba(255, 255, 255, 0.5);
            background: url(../assets/image/title-bg.png) no-repeat 50% 50%;
            background-size: 100% 100%;
        }
    }

    .tab {
        margin-top: 60px;
        padding: 0 24px;
        display: flex;

        .list {
            flex: 1;
            margin: 0 14px;

            .tab-btn {
                line-height: 76px;
                font-size: 34px;
                letter-spacing: 2px;
                text-align: center;
                color: #E5AD71;
                transition: all 0.4s;
                background: url(../assets/image/tab-bg-1.png) no-repeat 50% 50%;
                background-size: 100% 100% !important;
            }

            .time {
                display: block;
                margin-top: 20px;
                text-align: center;
                font-size: 24px;
                color: rgba(229, 173, 113, 1);
                line-height: 30px;
                opacity: 0.8;
            }

            &.active {
                .tab-btn {
                    color: #fff;
                    background: url(../assets/image/tab-bg.png) no-repeat 50% 50%;
                }
            }
        }
    }

    .tip-text {
        padding: 50px 0;
        text-align: center;
        font-size: 24px;
        line-height: 33px;
        color: rgba(133, 107, 65, 1);
    }

    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 120px;
        padding: 0 30px;
        display: flex;
        align-items: center;
        background: #3A3025;
        z-index: 20;

        .avatar {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 19px;
        }

        .name {
            font-size: 26px;
            line-height: 37px;
            color: #fff;
        }

        .rank-val {
            padding-left: 12px;
            font-size: 24px;
            font-weight: 400;
            color: rgba(234, 194, 126, 1);
            line-height: 24px;

            img {
                display: inline-block;
                width: 25px;
                height: 24px;
            }
        }

        .prev-rank {
            flex: 1;
            text-align: right;

            .rank-val {
                margin-top: 8px;
            }
        }
    }
</style>
