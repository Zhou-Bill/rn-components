import React from 'react';
import { View, Image, Text } from 'react-native';
import Swipe from '../../components/swipe';
import Wrapper from '../../components/wrapper';
import BasePage from '../basePage';

const SwipeItem = Swipe.SwipeItem;
const IMAGE1 = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.qqju.com%2Fpic%2Ftx%2Ftx38640_1.jpg&refer=http%3A%2F%2Fimg.qqju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1668586431&t=ac8bb7d37a776a96cfd7f09871de7e2b"
const IMAGE2 = "http://t14.baidu.com/it/u=354312569,1165323083&fm=224&app=112&f=JPEG?w=500&h=500"
const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']

const SwipePage = () => {
  return (
    <BasePage title="Swipe">
      <Wrapper name='基础用法'>
        <Swipe direction='horizontal' height={250}>
          <SwipeItem>
            <View style={[{ width: '100%' }]}>
              <Image 
                style={{width: '100%', height: '100%'}} 
                source={{uri: IMAGE1}}
              />
            </View>
          </SwipeItem>
          <SwipeItem>
            <View style={[{ width: '100%' }]}>
              <Image 
                style={{width: '100%', height: '100%'}} 
                source={{uri: IMAGE2}} 
              />
            </View>
          </SwipeItem>
        </Swipe>
      </Wrapper>
      <Wrapper name='基础用法'>
        <Swipe direction='horizontal'>
          {
            colors.map((_item) => {
              return (
                <SwipeItem key={_item}>
                  <View style={[{ width: '100%', backgroundColor: _item, paddingVertical: 40, paddingHorizontal: 12 }]}>
                    <Text>{_item}</Text>
                  </View>
                </SwipeItem>
              )
            })
          }
        </Swipe>
      </Wrapper>

      <Wrapper name='竖向方向'>
       <Swipe direction='vertical' height={170}>
        {
          colors.map((_item) => {
            return (
              <SwipeItem key={_item}>
                <View style={[{ width: '100%', backgroundColor: _item, paddingVertical: 40, paddingHorizontal: 12 }]}>
                  <Text>{_item}</Text>
                </View>
              </SwipeItem>
            )
          })
        }
        </Swipe>
      </Wrapper>
      <Wrapper name='基础用法'>
        <Swipe direction='horizontal' width={300}>
          {
            colors.map((_item) => {
              return (
                <SwipeItem key={_item}>
                  <View style={[{ width: '100%', backgroundColor: _item, paddingVertical: 40, paddingHorizontal: 12 }]}>
                    <Text>{_item}</Text>
                  </View>
                </SwipeItem>
              )
            })
          }
        </Swipe>
      </Wrapper>
    </BasePage>
  )
}

export default SwipePage;