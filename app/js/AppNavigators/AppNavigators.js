import {createBottomTabNavigator,createStackNavigator} from 'react-navigation';
import HomePage from '../page/Home/index'
import LoginPage from '../page/Home/index'
import GamePage from '../page/Game/index'
import DemoPage from '../page/DemoPage/index'
import MyGamePage from '../page/MyGame/index'
import GameList from '../page/Game/list'
import GameFrom from '../page/Game/form'
import SettingPage from '../page/Setting/index'
import InvitePage from '../page/Invite/index'
import InviteDetailPage from '../page/Invite/inviteDetail'
import rewardDetailPage from '../page/Invite/rewardDetail'
import examPage from '../page/Exam/index'
import userForm from '../page/Game/userForm'
import unFinishTask from '../page/MyGame/unFinishTask'
import taskDetail from '../page/MyGame/taskDetail'
import login from '../page/LoginPage'
import React from 'react'
import {View, Text, Platform, Button, AsyncStorage} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import highLevelTaskDetail from '../page/MyGame/highLevelTaskDetail'
import register from '../page/LoginPage/register'

const HomeIconWithBadge = (props) => {
  // You should pass down the badgeCount in some other ways like react context api, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3}/>;
};

class IconWithBadge extends React.Component {
  render() {
    const {name, badgeCount, color, size} = this.props;
    return (
      <View style={{width: 24, height: 24, margin: 5}}>
        <Ionicons name={name} size={size} color={color}/>
        {badgeCount > 0 && (
          <View style={{
            // If you're using react-native < 0.57 overflow outside of the parent
            // will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>{badgeCount}</Text>
          </View>
        )}
      </View>
    );
  }
}




const HomeStack = createStackNavigator({
  Login : {
    screen: login,
  },
  Register : {
    screen: register,
  },
  HomePage : {
    screen: HomePage,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '首页',
      header: null
    }
  },
  Invite: {
    screen: InvitePage,
  },
  InviteDetailPage:{
    screen: InviteDetailPage,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '邀请明细'
    }
  },
  rewardDetailPage:{
    screen: rewardDetailPage,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '奖励明细'
    }
  },
  examPage:{
    screen: examPage,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '考试中心'
    }
  },


},{
  // headerMode:'screen',
  // mode:Platform.OS === 'ios'?'modal':'card',
  navigationOptions:{
    title:'首页',
    headerTintColor:'#ffffff',
    headerTitleStyle:{
      fontWeight:'normal',
    },
    headerStyle:{
      backgroundColor:'#6699ff',
    },
  },
});

const GamePageStack = createStackNavigator({
  MyGamePage: {
    screen: MyGamePage,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '我的游戏'
    }
  },
  GamePage: {
    screen: GamePage,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '游戏大厅'
    }
  },
  userForm:{
    screen:userForm,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '我的账号'
    }
  },
  taskDetail:{
    screen:taskDetail,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '浏览任务'
    }
  },
  highLevelTaskDetail:{
    screen:highLevelTaskDetail,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '高佣金任务'
    }
  },
  GameList:{
    screen: GameList,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '常规游戏'
    }
  },
  unFinishTask:{
    screen: unFinishTask,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '未完成浏览任务'
    }
  }
});

HomeStack.navigationOptions = ({ navigation }) => {
  return {
    tabBarVisible: navigation.state.index === 1,
  };
};


export const AppNavigators = createBottomTabNavigator({

  HomePage:HomeStack,
  GamePage: {
    screen: GamePage,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '游戏大厅'
    }
  },

  MyGamePage: GamePageStack,
  SettingPage: {
    screen: SettingPage,
    navigationOptions: { //在这里定义每个页面的导航数据，静态配置
      title: '个人中心'
    }
  },

}, {
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused, horizontal, tintColor}) => {
      const {routeName} = navigation.state;
      console.log(navigation);
      let IconComponent = Ionicons;
      console.log(routeName);
      let iconName;
      if (routeName === 'HomePage') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;

        // Sometimes we want to add badges to some icons.
        // You can check the implementation below.
        IconComponent = HomeIconWithBadge;
      } else if (routeName === 'GamePage') {
        iconName = `logo-game-controller-b`;
      } else if (routeName === 'MyGamePage') {
        iconName = `ios-contact`;
      } else if (routeName === 'SettingPage') {
        iconName = `ios-settings`;
      }

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor}/>;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});