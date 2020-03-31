export function openClientApp (clientUrl: string) {
    if (/android/i.test(navigator.userAgent)) {
        window.JsCallback.getClientUrl(clientUrl);
    } else {
        try {
            window.webkit.messageHandlers.getClientUrl.postMessage(clientUrl);
        } catch (e) {

        }
    }
}
