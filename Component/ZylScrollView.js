/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

//引入计时器内库
var TimerMixin = require('react-timer-mixin');
var Dimensions = require('Dimensions')

var  {width} = Dimensions.get('window')
var WScrollImage = React.createClass ({

  //注册计时器
    mixins: [TimerMixin],

    //设置固定的值
    getDefaultProps(){
      return {
        //每隔多长时间
          duration: 1000,

          //所有的Image对象数组
          imageDataArr: []
      };
    },


    //设置可变的初始值
    getInitialState() {
        return {
          //当前页码
            currentPage: 0,
            //标题
            title : this.props.imageDataArr[0].title
        };
    },
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
            ref="scrollView"
            horizontal={true}
            //隐藏滚动条
            showsHorizontalScrollIndicator={false}
            //自动分页
            pagingEnabled={true}
            //当一帧滚动结束
            onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
            //开始拖拽
            onScrollBeginDrag={this.onScrollBeginDrag}
            //停止拖拽
            onScrollEndDrag = {this.onScrollEndDrag}
        >
            {this.renderAllImage()}
        </ScrollView>

          {/*返回焦点(指示器)*/}
          <View style={styles.pageViewStyle}>
              {/*返回标题*/}
              <Text>{this.state.title}</Text>
              {/*返回5个圆点*/}
              <View style={{flexDirection: 'row'}}>
                  {this.renderPageDots()}
              </View>

          </View>
      </View>
    );
  },

    //当拖拽 停止自动滚动
    onScrollBeginDrag(){
      //停止定时器
        this.clearInterval(this.timer);
    },
    //停止拖拽启动定时器
    onScrollEndDrag() {
        //开启定时器
        //this.startTimer();
    },

    //实现复杂的操作
    componentDidMount() {
      //开启定时器
       // this.startTimer();
    },

    //开启定时器
    startTimer() {
        //拿到scrollview
        var scrollView = this.refs.scrollView;
        var imgCount = this.props.imageDataArr.length;
        //2.添加定时器
       this.timer = this.setInterval(function () {
            //2.1 设置圆点
            var activePage;
            //2.2 判断
            if (this.state.currentPage+1 >= imgCount){
                activePage = 0;
            } else {
                activePage = this.state.currentPage+1;
            }
            //2.3 更新状态机
            this.setState({
                currentPage: activePage
            });
            //2.4 让scrollview滚动
            var offSetX = activePage * width;
            scrollView.scrollResponderScrollTo({x: offSetX, y: 0,animated: true});
           console.log(offSetX,this.state.currentPage);
        },this.props.duration);
    },

    //返回所有图片
    renderAllImage (){
      //数组
        var allImage = [];
        //拿到图像数组
        var imageArr = this.props.imageDataArr;
        //遍历
        for (var i = 0; i < imageArr.length; i++){
          //取出单独的每一个对象
            var imgItem = imageArr[i];
            //创建组件装入数组
            allImage.push(
                <Image key={i} source={{uri: imgItem.imgsrc}} style={{width: width, height: 180}}/>
            );
        }

        //返回数组
        return allImage;
    },
    //返回所有圆点
    renderPageDots() {
        //定义一个数组存放所有圆点
        var dotsArr = [];
        var style;
        //拿到图像数组
        var imageArr = this.props.imageDataArr;
        //遍历
        for (var i = 0; i < imageArr.length; i++) {

            //判断
            style = (i == this.state.currentPage) ? {color: 'orange'} : {color: '#ffffff'};
            //把圆点装入数组
            dotsArr.push(
                <Text key={i} style={[{fontSize: 25},style]}>&bull;</Text>
            );
        }
        //返回圆点
        return dotsArr;

    },

    //当一帧滚动结束的时候调用
    onAnimationEnd(e){
        //1.求出水平方向的偏移量
        var offSetX = e.nativeEvent.contentOffset.x;
        //求出当前的页数
        var currentPage = Math.floor(offSetX / width);
        //console.log(offSetX,currentPage);
        this.setState ({
            currentPage : currentPage,
            //标题
            title:this.props.imageDataArr[currentPage].title
        });
    }

});

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#F5FCFF',
      //marginTop: 25
  },
    pageViewStyle: {
      width: width,
        height:25,
        backgroundColor: 'rgba(241,241,241,0.8)',


        //定位
        position: 'absolute',
        bottom: 0,

        //设置主轴的方向
        flexDirection: 'row',
        //设置侧轴的方向
        alignItems: 'center',

        //设置主轴对齐方式
        justifyContent: 'space-between'
    }
});

module.exports = WScrollImage;
