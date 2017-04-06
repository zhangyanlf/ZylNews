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
    TabBarIOS,
    NavigatorIOS
} from 'react-native';

var Home = require('../Component/ZylHome');
var Message = require('../Component/ZylMessage');
var Find = require('../Component/ZylFind');
var Mine = require('../Component/ZylMine');


var Main = React.createClass({
    //初始化
    getInitialState(){
      return{
          selectItem: 'Home'  //默认首页被选中
      }
    },


    render() {
        return (
            <TabBarIOS
                tintColor="orange"
            >
                {/*首页*/}
                <TabBarIOS.Item
                    icon= {{uri:'home_normal'}}
                    title= "首页"
                    selected={this.state.selectItem == 'Home'}
                    onPress={() => {this.setState({selectItem: 'Home'})}}
                >
                    <NavigatorIOS
                        tintColor="orange"
                        style={{flex: 1}}
                        initialRoute= {
                            {
                                component: Home, //具体板块名称
                                title: '网易',
                                leftButtonIcon:{uri:'user-shouye'},
                                rightButtonIcon:{uri: 'sweep-shouye'}

                            }
                        }
                    />
                </TabBarIOS.Item>
                {/*消息*/}
                <TabBarIOS.Item
                    icon= {{uri:'message_normal'}}
                    title= "消息"
                    selected={this.state.selectItem == 'message'}
                    onPress={() => {this.setState({selectItem: 'message'})}}
                >
                    <NavigatorIOS
                        style={{flex: 1}}
                        initialRoute= {
                            {
                                component: Message, //具体板块名称
                                title: '消息'

                            }
                        }
                    />
                </TabBarIOS.Item>
                {/*发现*/}
                <TabBarIOS.Item
                    icon= {{uri:'fish_normal'}}
                    title= "发现"
                    selected={this.state.selectItem == 'fish'}
                    onPress={() => {this.setState({selectItem: 'fish'})}}
                >
                    <NavigatorIOS
                        style={{flex: 1}}
                        initialRoute= {
                            {
                                component: Find, //具体板块名称
                                title: '发现'

                            }
                        }
                    />
                </TabBarIOS.Item>
                {/*我的*/}
                <TabBarIOS.Item
                    icon= {{uri:'account_normal'}}
                    title= "我的"
                    selected={this.state.selectItem == 'account'}
                    onPress={() => {this.setState({selectItem: 'account'})}}
                >
                    <NavigatorIOS
                        style={{flex: 1}}
                        initialRoute= {
                            {
                                component: Mine, //具体板块名称
                                title: '我的'

                            }
                        }
                    />
                </TabBarIOS.Item>
            </TabBarIOS>

        );
    }
});

const styles = StyleSheet.create({

});
//输出
module.exports = Main;

