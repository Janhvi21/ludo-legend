import { View, Text, StyleSheet } from 'react-native'
import React, { use, useCallback } from 'react'
import Modal from 'react-native-modal'
import { useDispatch } from 'react-redux'
import { playSound } from '../helpers/SoundUtility'
import LinearGradient from 'react-native-linear-gradient'
import { assignPiles, resetGame } from '../redux/reducers/gameSlice'
import GradentButton from './GradentButton'
import { goBack, navigate } from '../helpers/NavigationUtil'

const MenuModal = ({ visible, onPressHide }) => {
        const dispatch = useDispatch();
        const handleNewGame = useCallback(() => {
                onPressHide();
                navigate('SelectPlayersScreen')
        }, [dispatch, onPressHide]);

        const handleHome = useCallback(() => {
                onPressHide();
                navigate('HomeScreen');
        }, []);

        return (
                <Modal
                        style={styles.bottomModalView}
                        isVisible={visible}
                        backdropColor="black"
                        backdropOpacity={0.8}
                        onBackdropPress={onPressHide}
                        animationIn="zoomIn"
                        animationOut="zoomOut"
                        onBackButtonPress={onPressHide}
                >
                        <View style={styles.modalContainer}>
                                <LinearGradient colors={['#0f0c29', '#302b63', '#24243e']} style={styles.gradientContainer} >
                                        <View style={styles.subView}>
                                                <GradentButton title="RESUME" onPress={onPressHide} />
                                                <GradentButton title="NEW GAME" onPress={handleNewGame} />
                                                <GradentButton title="HOME" onPress={handleHome} />
                                        </View>
                                </LinearGradient>
                        </View>
                </Modal>
        )
};

const styles = StyleSheet.create({
        bottomModalView: {
                justifyContent: 'center',
                width: '95%',
                alignSelf: 'center',
        },
        gradientContainer: {
                borderRadius: 20,
                overflow: 'hidden',
                width: '96%',
                borderWidth: 2,
                borderColor: 'gold',
                justifyContent: 'center',
                alignItems: 'center',
        },
        subView: {
                width: '100%',
                marginVertical: 20,
                alignItems: 'center',
                justifyContent: 'center',
                alignItems: 'center',
        },
        modalContainer: {
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
        },
});

export default MenuModal