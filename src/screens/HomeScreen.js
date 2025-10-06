import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { use, useCallback, useEffect } from 'react'
import Wrapper from '../components/Wrapper'
import Logo from '../assets/images/logo.png'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import GradentButton from '../components/GradentButton'
import { playSound } from '../helpers/SoundUtility'
import { useIsFocused } from '@react-navigation/native'
import SoundPlayer from 'react-native-sound-player'
import { navigate } from '../helpers/NavigationUtil'
import { selectCurrentPositions } from '../redux/reducers/gameSelectors'
import { resetGame } from '../redux/reducers/gameSlice'
import { useDispatch, useSelector } from 'react-redux'

const HomeScreen = () => {
        const dispatch = useDispatch();
        const currentPosition = useSelector(selectCurrentPositions);
        const isFocused = useIsFocused();

        useEffect(() => {
                if (isFocused) {
                        playSound('home');
                }
        }, [isFocused]);
        const renderButton = useCallback(
                (title, onPress) => <GradentButton title={title} onPress={onPress} />, []
        );
        const startGame = async (isNew = false) => {
                SoundPlayer.stop();
                if (isNew) {
                        dispatch(resetGame());
                }
                navigate('LudoBoardScreen');
                playSound('game-start');
        }
        const handleNewGamePress = useCallback(() => {
                startGame(true);
        }, []);
        const handleResumePress = useCallback(() => {
                startGame();
        }, []);
        return (
                <Wrapper style={styles.mainContainer}>
                        <View style={styles.imgContainer}>
                                <Image source={Logo} style={styles.img} />
                        </View>
                        {currentPosition.length !== 0 &&
                                renderButton('RESUME GAME', handleResumePress)}
                        {renderButton('NEW GAME', handleNewGamePress)}
                        {renderButton('VS CPU', () => { Alert.alert("Coming Soon") })}
                        {renderButton('2 VS 2', () => { Alert.alert("Coming Soon") })}
                        {renderButton('Score Board', () => { Alert.alert("Coming Soon") })}

                        <Text style={styles.artist}>Made by - Janhvi Chitnis </Text>
                </Wrapper >
        );
};
const styles = StyleSheet.create({
        mainContainer: {
                justifyContent: 'flex-start',
        },
        imgContainer: {
                width: deviceWidth * 0.6,
                height: deviceHeight * 0.2,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 40,
                alignSelf: 'center',
        },
        img: {
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
        },
        artist: {
                position: 'absolute',
                bottom: 40,
                color: 'white',
                fontWeight: '500',
                opacity: 0.2,
                fontStyle: 'italic',
        }
});
export default HomeScreen