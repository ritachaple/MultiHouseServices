import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import ModalScreen from '../../Component/ModalScreen'
import {
  RadioChecked,
  RadioUnchecked,
  OpenPost,
  Refresh,
  Spam,
} from '../../Images/SelectCBoxIcon'

const ChatScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#E5E5E5', height: '10%' }}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            width: '50%',
            paddingLeft: '2%',
          }}
        >
          <View style={styles.headerButton}>
            <View style={styles.Icon}>
              <RadioChecked />
            </View>
            <Text style={styles.ButtonText}>Detractor</Text>
          </View>
          <View style={styles.headerButton}>
            <View style={styles.Icon}>
              <RadioUnchecked />
            </View>
            <Text style={styles.ButtonText}>Influencer</Text>
          </View>
          <View style={styles.headerButton}>
            <View style={styles.Icon}>
              <Refresh />
            </View>
            <Text style={styles.ButtonText}>Refresh</Text>
          </View>
          <View style={[styles.headerButton, { width: '20%' }]}>
            <View style={styles.Icon}>
              <OpenPost />
            </View>
            <Text style={styles.ButtonText}>View Post</Text>
          </View>
          <View style={styles.headerButton}>
            <View style={styles.Icon}>
              <Spam />
            </View>
            <Text style={styles.ButtonText}>Spam</Text>
          </View>
          <Icon
            style={{ paddingTop: '4%' }}
            name="ellipsis-v"
            size={15}
            color="#000"
          />
        </View>
      </View>
      <ModalScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: '3%',
    paddingVertical: '1%',
    marginVertical: '2%',
    flexDirection: 'row',
  },
  ButtonText: {
    color: '5A607F',
    fontFamily: 'Poppins-Black',
    fontSize: 12,
    lineHeight: 20,
  },
  Icon: {
    paddingRight: '6%',
    paddingTop: '4%',
  },
})

export default ChatScreen
