import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface WrapperProps {
  name: string,
  children: React.ReactNode
}

const Wrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
  const { children, name } = props
  return (
    <View style={styles['wrapper']}>
      <Text style={styles['wrapper-title']}>{name}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  'wrapper-title': {
    padding: 14,
    fontSize: 14,
    color: 'rgba(69,90,100,.6)',
  }
})

export default Wrapper