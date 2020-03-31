<template>
    <div class="content-box">
        <div v-if="!isQualifier">
            <div class="comm-sub-title">
                榜单
            </div>
            <div class="user-rank">
                <div class="top-3-rank clearfix">
                    <div class="list" v-for="(item, index) in rank3Data" :key="item.user_id">
                        <div class="img-info">
                            <img v-if="index === 0" src="@/assets/image/rank-1.png" alt="" class="icon">
                            <img v-if="index === 1" src="@/assets/image/rank-2.png" alt="" class="icon">
                            <img v-if="index === 2" src="@/assets/image/rank-3.png" alt="" class="icon">
                            <img :src="item.avatar" class="avatar" alt="">
                        </div>
                        <div class="nickname">{{item.nickname}}</div>
                        <div class="rank-val">
                            <img src="@/assets/image/rank-icon.png" alt="">
                            {{item.rank_amount}}
                        </div>
                        <div v-if="!isAnchor && isShowBtn" class="btn" @click="sendGift(item.user_id)">
                            <img src="@/assets/image/btn-icon.png" alt="" class="btn-icon">支持她
                        </div>
                    </div>
                </div>
                <div :class="['top-4-last-rank', !isAnchor && isShowBtn ? 'female' : '']">
                    <div class="list" v-for="(item, index) in rank3lastData" :key="item.user_id">
                        <div class="rank">{{ index + 4 }}</div>
                        <img :src="item.avatar" alt="" class="avatar">
                        <div class="info">
                            <div class="nickname">{{ item.nickname }}</div>
                            <div class="rank-val">
                                <img src="@/assets/image/rank-icon.png" alt="">
                                {{ item.rank_amount }}
                            </div>
                        </div>
                        <div v-if="!isAnchor && isShowBtn" class="btn" @click="sendGift(item.user_id)">
                            <img src="@/assets/image/btn-icon.png" alt="" class="btn-icon">支持她
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <CountDown :countDownAt="countDownAt"></CountDown>
            <div class="comm-sub-title">
                晋级名单
            </div>
            <div class="user-rank">
                <div class="top-4-last-rank">
                    <div class="list" v-for="item in userRankData" :key="item.user_id">
                        <img :src="item.avatar" alt="" class="avatar">
                        <div class="info" style="padding: 0 50px 0 20px;">
                            <div class="nickname">{{ item.nickname }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CountDown from '@/components/CountDown.vue';
import { openClientApp } from '@/utils/utils';

@Component({
    name: 'UserRank',
    components: { CountDown }
})
export default class UserRank extends Vue {
    @Prop({
        default: true,
        type: Boolean
    }) isAnchor!: boolean;
    @Prop()
    userRankData!: [];
    @Prop()
    isQualifier!: boolean;
    @Prop()
    countDownAt!: number;
    @Prop()
    isShowBtn!: boolean;

    get rank3Data () {
        return this.userRankData.slice(0, 3);
    }

    get rank3lastData () {
        return this.userRankData.slice(3);
    }

    sendGift (userId: number) {
        openClientApp(`app://chats/send?receiver_id=${userId}&open=gift`);
    }
}
</script>

<style scoped lang="scss">
    .user-rank {
        padding-top: 45px;
    }

    .top-3-rank {
        position: relative;
        margin: 90px -20px 30px;
        min-height: 150px;
        .list {
            width: 33%;
            text-align: center;
            padding: 0 20px;

            &:nth-child(2) {
                float: left;

                .img-info {
                    border-color: #b7d1f7;
                }
            }

            &:nth-child(1) {
                position: absolute;
                top: -90px;
                left: 50%;
                transform: translateX(-50%);
            }

            &:nth-child(3) {
                float: right;

                .img-info {
                    border-color: #e9a28c;
                }
            }
        }

        .img-info {
            position: relative;
            width: 134px;
            height: 134px;
            margin: 0 auto;
            border-radius: 50%;
            border: 7px solid #fcef9c;

            .avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
            }

            .icon {
                position: absolute;
                top: -25px;
                right: -15px;
                width: 50px;
                height: 50px;
                transform: rotate(38deg);
            }
        }

        .nickname {
            display: block;
            font-size: 28px;
            line-height: 40px;
            margin-top: 14px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #fff;
        }

        .rank-val {
            padding-top: 6px;
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
    }

    .top-4-last-rank {
        &.female {
            .list {
                .info {
                    text-align: left;
                    padding-left: 40px;
                    .nickname{
                        display: block;
                        width: 180px;
                        -ms-text-overflow: ellipsis;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }
        }

        .list {
            padding: 20px 10px 20px 20px;
            display: flex;
            align-items: center;

            .rank {
                width: 64px;
                font-size: 34px;
                line-height: 34px;
                color: #EAC27E;
                text-align: center;
            }

            .avatar {
                margin-left: 45px;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                object-fit: cover;
            }

            .info {
                flex: 1;
                text-align: right;
                padding-right: 20px;

                .nickname {
                    font-size: 26px;
                    line-height: 37px;
                    font-weight: 500;
                    color: #fff;
                }

                .rank-val {
                    padding-top: 6px;
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
            }
        }
    }

    .btn {
        width: 144px;
        display: flex;
        height: 48px;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        margin: 16px auto 0;
        color: #fff;
        background: linear-gradient(90deg, rgba(213, 169, 107, 1) 0%, rgba(208, 167, 106, 1) 14%, rgba(208, 167, 105, 1) 32%, rgba(207, 167, 105, 1) 47%, rgba(173, 126, 79, 1) 100%);
        border-radius: 24px;

        .btn-icon {
            margin-right: 9px;
            width: 24px;
        }
    }
</style>
