// Standard methods for HybridWebView

export default class HybridWebView {

  static SendRawMessageToDotNet = function (message) {
    this.SendMessageToDotNet(0, message);
  }

  static SendInvokeMessageToDotNet = function (methodName, paramValues) {
    if (typeof paramValues !== 'undefined') {
      if (!Array.isArray(paramValues)) {
        paramValues = [paramValues];
      }
      for (var i = 0; i < paramValues.length; i++) {
        paramValues[i] = JSON.stringify(paramValues[i]);
      }
    }

    this.SendMessageToDotNet(1, JSON.stringify({ "MethodName": methodName, "ParamValues": paramValues }));
  }

  static SendMessageToDotNet = function (messageType, messageContent) {
    var message = JSON.stringify({ "MessageType": messageType, "MessageContent": messageContent });

    if (window.chrome && window.chrome.webview) {
      // Windows WebView2
      window.chrome.webview.postMessage(message);
    }
    else {
      // Android WebView
      window.hybridWebViewHost.sendMessage(message);
    }
  }
};
