import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { playSound } from '../helpers/SoundUtility'
import { Button } from 'react-native-paper'

const GradentButton = ({ title, onPress, iconColor = '#d5be3e' }) => {
        return (
                <View style={styles.mainContainer}>
                        <Button theme={{ colors: { primary: 'purple' } }} mode="contained" onPress={() => {
                                playSound('ui');
                                onPress();
                        }}>
                                {title}
                        </Button>
                </View>
        )
}
const styles = StyleSheet.create({
        mainContainer: {
                borderRadius: 10,
                borderWidth: 2,
                borderColor: "#000",
                marginVertical: 10,
        },
});
export default GradentButton