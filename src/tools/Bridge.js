
// 初始化配置bridge
var debug = new Boolean(true);
var nativeHandler = 'nativeHandler';
var jsHandler = 'jsHandler';



function EWTAlert(message) {

}

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }

    document.addEventListener('WebViewJavascriptBridgeReady'
        , function () {
            callback(WebViewJavascriptBridge)
        },
        false
    );
}

// 基础handler，统一进行路由解析或者其他方式跳转

function initBaseHandler(bridge) {
    bridge.registerHandler(nativeHandler, function (data, responseCallback) {
        EWTAlert(data)
        EWTAlert(responseCallback)
        var responseData = { 'Javascript Says': 'Right back atcha!' }
        responseCallback(responseData)
    })
}

// 根据业务需求动态添加handler

function injectHandler(handlerName, bridge, callbackHandler) {

    bridge.registerHandler(handlerName, function (data, responseCallback) {
        callbackHandler(data, responseCallback)
    })
}

// js 动态给native 发送消息 如果handlerName不传，使用默认的handlerName

function sendMessage(handlerName, bridge, data, responseCallback) {
    if (arguments.length == 3 && handlerName == window.WebViewJavascriptBridge) {
        var temp1 = handlerName;
        var temp2 = bridge;
        var temp3 = data;
        handlerName = jsHandler;
        bridge = temp1;
        data = temp2;
        responseCallback = temp3;
        temp1 = temp2 = temp3 = null;
    }
    try {
        bridge.callHandler(handlerName, data, function (response) {
            responseCallback(response);
        })
    } catch (error) {

    }

}
export default {
    sendMessage,
    injectHandler,
    initBaseHandler,
    setupWebViewJavascriptBridge,
    EWTAlert
}

