import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<Props> = (props: Props) => {
  const { navigation } = props

  const handleJump = (url: keyof RootStackParamList) => {
    navigation.navigate(url);
  }

  const components = [
    {
      label: 'Tabs',
      value: 'Tabs' as keyof RootStackParamList
    },
    {
      label: 'Toast',
      value: 'Toast' as keyof RootStackParamList
    },
    {
      label: 'Swipe',
      value: 'Swipe' as keyof RootStackParamList
    },
    {
      label: 'SwipeCell',
      value: 'SwipeCell' as keyof RootStackParamList
    },
    {
      label: 'Cascader',
      value: 'Cascader' as keyof RootStackParamList
    },
    {
      label: 'Stepper',
      value: 'Stepper' as keyof RootStackParamList
    },
    {
      label: 'Switch',
      value: 'Switch' as keyof RootStackParamList
    },
    {
      label: 'Calendar',
      value: 'Calendar' as keyof RootStackParamList
    }
  ]

  return (
    <ScrollView style={styles['box']}>
      <Text style={styles['box-title']}>React Native Components</Text>
      <Text style={styles['box-slogan']}>组件库</Text>

      <View style={styles['components']}>
        {
          components.map((_item) => {
            return (
              <TouchableOpacity 
                key={_item.value}
                style={styles['components-item']} 
                onPress={() => handleJump(_item.value)}
              >
                <Text>{_item.label}</Text>
              </TouchableOpacity>
            )
          })
        }
        
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  box: {
    height: '100%',
    width: '100%',
    paddingTop: 70,
    paddingHorizontal: 14,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  'box-title': {
    color: '#323233',
    marginBottom: 24,
    fontSize: 24,
  },
  'box-slogan': {
    color: 'rgba(69, 90, 100, 0.6)',
    fontSize: 14,
  },
  components: {
    marginTop: 40,
  },
  'components-item': {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f7f8fa',
    marginBottom: 12,
  }
});

export default Home