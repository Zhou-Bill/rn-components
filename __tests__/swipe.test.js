import * as React from 'react';
import { View ,Text } from 'react-native';
import {fireEvent, render} from '@testing-library/react-native'
import Swipe from '../src/components/swipe'

const SwipeItem = Swipe.SwipeItem

describe('<Swipe />', () => {
  const Basic = (props) => {
    return (
      <Swipe {...props} >
        <SwipeItem>
          <View>
            <Text>123123</Text>
          </View>
        </SwipeItem>
        <SwipeItem>
          <View>
            <Text>swipe2</Text>
          </View>
        </SwipeItem>
      </Swipe>
    )
  }
  it('works', () => {
    expect(1).toBe(1);
  });
  it('Basic Swipe', () => {
    const {getAllByText} = render(<Basic />)
    expect(getAllByText('123123')).toHaveLength(2)
  });
 
});