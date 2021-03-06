declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module 'vue-awesome-swiper' {
    export const swiper: any;
    export const swiperSlide: any;
}

interface Window {
    USER_SID: string;
    webkit: any;
    JsCallback: any;
}
