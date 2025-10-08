import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useCallback } from 'react'
import Wrapper from '../components/Wrapper'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { assignPiles, resetGame, setNoOfPlayers } from '../redux/reducers/gameSlice'
import { navigate } from '../helpers/NavigationUtil'
import { playSound } from '../helpers/SoundUtility'

const SelectPlayersScreen = () => {
        const dispatch = useDispatch();
        const handleButtonPress = useCallback((value) => {
                dispatch(resetGame());
                dispatch(setNoOfPlayers(value))
                dispatch(assignPiles());
                playSound('game_start');
                navigate('LudoBoardScreen');
        }, []);
        return (
                <Wrapper>
                        <View>
                                <Text style={styles.header}>Choose Name and Number of Player</Text>
                        </View>
                        <View style={styles.players}>
                                <Button style={styles.button} theme={{ colors: { primary: 'purple' } }} mode="contained" onPress={() => handleButtonPress(2)}>
                                        2P
                                </Button>
                                <Button style={styles.button} theme={{ colors: { primary: 'purple' } }} mode="contained" onPress={() => handleButtonPress(3)}>
                                        3P
                                </Button>
                                <Button style={styles.button} theme={{ colors: { primary: 'purple' } }} mode="contained" onPress={() => handleButtonPress(4)}>
                                        4P
                                </Button>
                        </View>
                </Wrapper>
        )
}
const styles = StyleSheet.create({
        header: {
                color: 'white',
                fontWeight: 'bold',
        },
        players: {
                display: 'flex',
                flexDirection: 'row',
                top: 20,
        },
        button: {
                margin: 5,
        }
})
export default SelectPlayersScreen