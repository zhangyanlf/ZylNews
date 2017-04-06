/**
 * Created by apple on 17/4/1.
 */
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
    ListView,
    Image,
    TouchableOpacity,

} from 'react-native';

//导入json数据
var LocalData = require('../localData.json');
var NewsDetail = require('../Component/ZylNewsDetail')
//导入外部组件
var ScrollImage = require('../Component/ZylScrollView');

var Home = React.createClass ({
    getDefaultProps(){
        return {
            url_api: "http://1c.m.163.com/nc/article/headline/T1348647853363/0-20.html?from=toutiao&fn=2&passport=&devId=nTM86EPlcxZu09VdpTEh6aR3%2B.1&spever=false&net=wifi&lat=50tqEKiivwW4K%2BGMt6DBdA%3D%3D&lon=jklRVyYkSNti2wwsjGQHrw%3D%3D&ts=1463384311 &sign=TtD7IZllDljVzBs2E4sa9fQyKTKF021w2EUC6qx1gEN48ErR02zJ6%2FKXOnxX046I&encryption=1&canal=appstore",
            key_word:'T1348647853363'
        }
    },
    //初始化方法
    getInitialState(){
      return {
          //listView头部数据源
          headerDataArr: [],
          //Cell数据源
          dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

      }
    },



    render() {
        return (
            <ListView dataSource={this.state.dataSource}
                      renderRow={this.renderRow}
                      renderHeader={this.renderHeader}
                     />
        );
    },

    //单独的Cell
    renderRow(rowData){
        console.log(rowData);
      return(

          <TouchableOpacity activeOpacity={0.5} onPress={() => {this.pushToNewsDetail(rowData)}}>
              <View style={styles.cellViewStyle}>
                  {/*左边*/}
                  <Image source={{uri: rowData.imgsrc}} style={styles.imagesStyle}/>
                  {/*右边*/}
                  <View style={styles.rightViewStyle}>
                      <Text style={styles.titlesStyle}>{rowData.title}</Text>
                      <Text style={styles.subTitlesStyle} numberOfLines={2}>{rowData.digest}</Text>
                      <Text style={styles.fllowTitlesStyle}>{rowData.replyCount}跟帖</Text>
                  </View>
              </View>
          </TouchableOpacity>
      );
    },
    //跳转到新闻详情页
    pushToNewsDetail(data){
        this.props.navigator.push({
            component: NewsDetail,
            title: data.title,
            passProps:{data}
        })
    },
    //头部
    renderHeader(){
        //判断
        if (this.state.headerDataArr.length == 0) return;
        return(
          <ScrollImage
              imageDataArr = {this.state.headerDataArr}
          />
        );
    },

    //请求网络数据
    componentDidMount(){
        this.loadDataFromNet();
    },

    loadDataFromNet (){
        fetch(this.props.url_api)
            .then((response) => response.json())
            .then((responseData) => {
               // console.log(responseData)
                //拿到所有数据
                var jsonData = responseData[this.props.key_word];
                //console.log(jsonData);
                //定义临时变量
               this.dealWithData(jsonData);
            })
            .catch((error)=> {
                if (error){
                   // alert(0);
                    //特殊情况处理
                    this.dealWithData(LocalData[this.props.key_word])
                    console.log(LocalData[this.props.key_word])
                }

            })
    },
    
    //处理网络数据
    dealWithData(jsonData) {
        var headDataArr = [];
        var listDataArr = [];
        //遍历拿到的json数据
        for (var i = 0; i < jsonData.length; i++){
            //取出单独的对象
            var data = jsonData[i];
            //判断
            if (data.hasAD == 1){//取出广告数据
                headDataArr = data.ads;
            } else {//剩余数据
                listDataArr.push(data);
            }
        }
        console.log(headDataArr,1,listDataArr);
        //跟新状态机
        this.setState({
            headerDataArr: headDataArr,
            //Cell数据源
            dataSource:this.state.dataSource.cloneWithRows(listDataArr)
        });
    }

});

const styles = StyleSheet.create({
    cellViewStyle:{
        //确定主轴方向
        flexDirection: 'row',
        //设置侧州的对其方式
        //alignItems: 'center'
        padding: 10,
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 0.5

    },
    rightViewStyle: {
      width: 260,
      marginLeft: 8
    },
    imagesStyle:{
        width: 90,
        height: 90

    },
    titlesStyle: {
        fontSize: 15,
        marginBottom: 5

    },
    subTitlesStyle:{
        color: 'gray'

    },
    fllowTitlesStyle:{
        //绝对定位
        position: 'absolute',
        right : 10,
        bottom: -6,

        //边框
        borderWidth:0.5,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 3,
        color: 'gray',
        fontSize: 10


    }
});
//输出
module.exports = Home;


