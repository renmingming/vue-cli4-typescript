<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
    body, html, #app, .content {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .main {
        min-height: 100%;
        padding-bottom: 120px;
        font-size: 0;
        background: url(./assets/image/bg.png) no-repeat 50% 0;
        background-size: cover;
    }

    .comm-sub-title {
        font-size: 38px;
        font-weight: 500;
        padding-bottom: 20px;
        line-height: 53px;
        text-align: center;
        color: rgba(229, 173, 113, 1);
        background: url(./assets/image/sub-title-bg.png) no-repeat 50% 100%;
        background-size: 225px 18px;
    }

    .comm-title {
        font-size: 0;
        text-align: center;
        padding: 54px 0;

        .icon {
            display: inline-block;
            vertical-align: middle;
            width: 45px;
            height: 35px;
        }

        .right {
            transform: rotate(180deg);
        }

        .name {
            display: inline-block;
            vertical-align: middle;
            padding: 0 20px;
            font-weight: 500;
            font-size: 48px;
            color: rgba(234, 194, 126, 1);
            line-height: 48px;
        }
    }

    .content-box {
        width: 690px;
        margin: 0 auto;
        padding: 47px 30px 38px;
        box-shadow: inset 0px 1px 20px 0px rgba(234, 194, 126, 0.5);
        border-radius: 12px;
        border: 2px solid rgba(206, 151, 57, 1);
    }
</style>
