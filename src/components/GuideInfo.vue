<template>
    <div>
        <template v-if="isAnchor">
            <div class="comm-title">
                <img src="@/assets/image/title-icon.png" class="icon left" alt="">
                <span class="name">盛典奖励</span>
                <img src="@/assets/image/title-icon.png" class="icon right" alt="">
            </div>
            <div class="content-box">
                <div class="rank-reward">
                    <div class="list">
                        <img src="@/assets/image/rank-1.png" alt="" class="rank-icon">
                        <div class="name">第一名</div>
                        <div class="reward-val">50000</div>
                        <img src="@/assets/image/diamond.png" alt="" class="icon">
                    </div>
                    <div class="list">
                        <img src="@/assets/image/rank-2.png" alt="" class="rank-icon">
                        <div class="name">第二名</div>
                        <div class="reward-val">30000</div>
                        <img src="@/assets/image/diamond.png" alt="" class="icon">
                    </div>
                    <div class="list">
                        <img src="@/assets/image/rank-3.png" alt="" class="rank-icon">
                        <div class="name">第三名</div>
                        <div class="reward-val">10000</div>
                        <img src="@/assets/image/diamond.png" alt="" class="icon">
                    </div>
                </div>
            </div>
            <div class="comm-title">
                <img src="@/assets/image/title-icon.png" class="icon left" alt="">
                <span class="name">详细规则</span>
                <img src="@/assets/image/title-icon.png" class="icon right" alt="">
            </div>
            <div class="content-box">
                <div class="guide-text">
                    赛事期间，通过收集星光值可参与活动，在每场比赛结束后，星光值排名在赛事规则名额内的参赛者，可进阶到下一场比赛，其余未成功进入排名的参数者将被淘汰赛。<br>
                    本轮比赛获得的星光值不累计到下一轮 <br>
                    星光值：1钻石 = 1星光值
                </div>
            </div>
        </template>
        <template v-else>
            <div class="comm-title">
                <img src="@/assets/image/title-icon.png" class="icon left" alt="">
                <span class="name">详细规则</span>
                <img src="@/assets/image/title-icon.png" class="icon right" alt="">
            </div>
            <div class="content-box">
                <div class="guide-text">
                    赛事期间，跟心仪的女神产生互动(视频，送礼等消耗钻石的行为），女神可获得星光值。<br>
                    星光值：1钻石 = 1星光值
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'GuideInfo'
})
export default class GuideInfo extends Vue {
    @Prop({
        default: false,
        type: Boolean
    }) isAnchor!: boolean;
}
</script>

<style scoped lang="scss">
.rank-reward{
    padding: 0 28px 0 35px;
    .list{
        display: flex;
        align-items: center;
        margin-bottom: 30px;
        &:last-child{
            margin-bottom: 10px;
        }
        .rank-icon{
            width: 50px;
            height: 50px;
            margin-right: 24px;
        }
        .name{
            font-size:28px;
            font-weight:400;
            color:rgba(234,194,126,1);
            line-height:32px;
        }
        .reward-val{
            flex: 1;
            text-align: right;
            font-weight:500;
            font-size: 28px;
            line-height:28px;
            color:rgba(234,194,126,1);
        }
        .icon{
            margin-left: 12px;
            height: 23px;
        }
    }
}
.guide-text {
    padding: 0 10px;
    font-size: 26px;
    text-align: left;
    font-weight: 400;
    color: rgba(234, 194, 126, 1);
    line-height: 44px;
}
</style>
