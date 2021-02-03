import React from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'
// import  {WebView}  from 'react-native-web-webview'

const Webview = () => {
  return (
    <WebView
      source={{
        html: `<script>
        (function (w, d, s, o, f, js, fjs) {
            w['JS-Widget'] = o; w[o] = w[o] || function () { (w[o].q = w[o].q || []).push(arguments) };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o; js.src = f; js.async = 1; fjs.parentNode.insertBefore(js, fjs);
        }(window, document, 'script', 'mw', 'https://cxp.azureedge.net/static/js/app/widget.js'));
        mw('init', { someConfiguration: 42 });
        mw('accessToken', 'e901e517-6ea8-acca-73cd-39d774df6329');
    </script>`,
      }}
    />
  )
}

export default Webview
