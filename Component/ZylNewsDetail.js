/**
 * Created by zhaofei on 17/4/6.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';

// http://c.3g.163.com/nc/article/BMU8KHQD00964J40/full.html


var NewsDetail;
NewsDetail = React.createClass({

    getDefaultProps(){
        return {}
    },
    getInitialState(){
        return {
            detailData: ''
        }
    },

    render() {
        return (
            <WebView
                automaticallyAdjustContentInsets={true}
                style={styles.webView}
                source={{html: this.state.detailData, baseUrl: ''}}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                //scalesPageToFit={this.state.scalesPageToFit}
            />
        );
    },
    componentDidMount() {
        //请求路径
        var url_api = 'http://c.3g.163.com/nc/article/' + this.props.data.docid + '/full.html'
        //console.log(url_api);

        //发送请求
        fetch(url_api)
            .then((response => response.json()))
            .then((responseData) => {
                //处理拿到的数据
                var allData = responseData[this.props.data.docid];
                //拿到body
                var bodyHtml = allData['body'];

                //console.log(allData);
                //拿到图片数据
                if (allData['img'].length > 0) {
                    //遍历
                    for (var i = 0; i< allData['img'].length; i++){
                        //取出单个图片
                        var img = allData['img'][i];

                        //取出src
                        var imgSrc = img['src'];
                        var imgHtml = '<img src="'+imgSrc+'" width="100%">'
                        //替换body图像占位符
                        bodyHtml = bodyHtml.replace(img['ref'],imgHtml);
                    }
                }

                //跟新状态机
                this.setState({
                    detailData: bodyHtml
                });

            })
            .catch((error) => {
                alert('请求数据失败');
            })
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
//输出
module.exports = NewsDetail;