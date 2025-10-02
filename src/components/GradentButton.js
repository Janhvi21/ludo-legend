import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { playSound } from '../helpers/SoundUtility'

const iconSize = RFValue(18)
const GradentButton = ({ title, onPress, iconColor = '#d5be3e' }) => {
        return (
                <View style={styles.mainContainer}>
                        <TouchableOpacity
                                style={styles.btnContainer}
                                activeOpacity={0.8}
                                onPress={() => {
                                        playSound('ui');
                                        onPress();
                                }}>
                                <LinearGradient
                                        colors={['#4c669f', '#3b5998', '#192f6a']}
                                        style={styles.button}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}>
                                        {title == "RESUME" ? (<MaterialIcons name='play-arrow' color={iconColor} size={iconSize} />) :
                                                title == 'NEW GAME' ? (<MaterialIcons name='play-circle' color={iconColor} size={iconSize} />) :
                                                        title == 'VS CPU' ? (<MaterialIcons name='airplay' color={iconColor} size={iconSize} />) :
                                                                title == 'HOME' ? (<MaterialIcons name='home' color={iconColor} size={iconSize} />) :
                                                                        <MaterialIcons name='person-4' color={iconColor} size={iconSize} />
                                        }
                                        <Text style={styles.buttonText}>{title}</Text>
                                </LinearGradient>
                        </TouchableOpacity>
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
        btnContainer: {
                borderRadius: 5,
                borderWidth: 1,
                elevation: 5,
                backgroundColor: 'white',
                shadowColor: "#d5be3e",
                shadowOffset: {
                        width: 1,
                        height: 1,
                },
                shadowOpacity: 0.5,
                shadowRadius: 10,
                borderColor: "#d5be3e",
                width: 220,
        },
        buttonText: {
                color: 'white',
                fontSize: RFValue(16),
                width: '70%',
                textAlign: 'center',
                fontFamily: 'Philosopher-Bold',
        },
        button: {
                width: '100%',
                borderRadius: 5,
                borderWidth: 2,
                height: 45,
                borderColor: "#000",
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
        }

});
export default GradentButton