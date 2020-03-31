<template>
<div>
    <div class="content-box">
        <count-down :countDownAt="countDownAt"></count-down>
    </div>
    <GuideInfo :isAnchor="isAnchor"></GuideInfo>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CountDown from '@/components/CountDown.vue';
import GuideInfo from '@/components/GuideInfo.vue';

@Component({
    name: 'Qualifier',
    components: { CountDown, GuideInfo }
})
export default class Qualifier extends Vue {
    @Prop()
    countDownAt!: number;
    @Prop({
        default: false,
        type: Boolean
    }) isAnchor!: boolean;
};
</script>

<style scoped lang="scss">
    .guide-text {
        padding-top: 21px;
        font-size: 26px;
        text-align: center;
        font-weight: 400;
        color: rgba(234, 194, 126, 1);
        line-height: 44px;
    }
</style>
