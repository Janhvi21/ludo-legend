import { View, Text, StyleSheet, Image, Alert } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import Wrapper from '../components/Wrapper'
import Logo from '../assets/images/ludoLegends.png'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import GradentButton from '../components/GradentButton'
import { playSound } from '../helpers/SoundUtility'
import { useIsFocused } from '@react-navigation/native'
import SoundPlayer from 'react-native-sound-player'
import { navigate } from '../helpers/NavigationUtil'
import { selectCurrentPositions } from '../redux/reducers/gameSelectors'
import { resetGame, setScoreBoard } from '../redux/reducers/gameSlice'
import { useDispatch, useSelector } from 'react-redux'
import asyncStorage from '../redux/storage'
import { ActivePlayers } from '../redux/reducers/initialState'

const HomeScreen = () => {
        const dispatch = useDispatch();
        const currentPosition = useSelector(selectCurrentPositions);
        const isFocused = useIsFocused();
        useEffect(() => {
                (async () => {
                        await asyncStorage.setItem('LUDOPLAYERS', JSON.stringify(ActivePlayers));
                })();
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
                        navigate('SelectPlayersScreen');
                }
                else {
                        navigate('LudoBoardScreen');
                }
                playSound('game-start');
        }
        const handleNewGamePress = useCallback(() => {
                startGame(true);
        }, []);
        const handleResumePress = useCallback(() => {
                startGame();
        }, []);
        const handleScoreBoardPress = useCallback(() => {
                navigate('ScoreBoardScreen');
        }, []);
        return (
                <Wrapper style={styles.mainContainer}>
                        <View style={styles.imgContainer}>
                                <Image source={Logo} style={styles.img} />
                        </View>
                        {currentPosition && currentPosition.length !== 0 &&
                                renderButton('RESUME GAME', handleResumePress)}
                        {renderButton('NEW GAME', handleNewGamePress)}
                        {renderButton('SCORE BOARD', handleScoreBoardPress)}
                        {renderButton('VS CPU', () => { Alert.alert("Coming Soon") })}
                        {renderButton('2 VS 2', () => { Alert.alert("Coming Soon") })}


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
                width: '200%',
                height: '200%',
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