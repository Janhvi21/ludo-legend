import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import React, { useCallback, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { Button, HelperText, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { assignPiles, resetGame, setNoOfPlayers, setPlayer1Info, setPlayer2Info, setPlayer3Info, setPlayer4Info } from '../redux/reducers/gameSlice'
import { goBack, navigate } from '../helpers/NavigationUtil'
import { playSound } from '../helpers/SoundUtility'
import Ionicans from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize';


const SelectPlayersScreen = () => {
        const dispatch = useDispatch();
        const nameError = "Player's name is required";
        const [NumberOfPlayers, setNumberOfPlayers] = useState(0);
        const [player1Name, setPlayer1Name] = useState('');
        const [isNextClicked, setIsNextClicked] = useState(false);
        const [player2Name, setPlayer2Name] = useState('');
        const [player3Name, setPlayer3Name] = useState('');
        const [player4Name, setPlayer4Name] = useState('');

        const handleButtonPress = useCallback((value) => {
                setIsNextClicked(true)
                if (isFormValid()) {
                        dispatch(setPlayer1Info(player1Name));
                        dispatch(setPlayer2Info(player3Name));
                        dispatch(setPlayer3Info(player2Name));
                        dispatch(setPlayer4Info(player4Name));
                        dispatch(setNoOfPlayers(NumberOfPlayers))
                        dispatch(assignPiles());
                        playSound('game_start');
                        navigate('LudoBoardScreen');
                }
        }, [player1Name, player2Name, player3Name, player4Name, NumberOfPlayers]);
        const isFormValid = () => {
                if (player1Name.trim().length <= 0) return false;
                if (player2Name.trim().length <= 0) return false;
                if (NumberOfPlayers > 2 && player3Name.trim().length <= 0) return false;
                if (NumberOfPlayers > 3 && player4Name.trim().length <= 0) return false;
                return true;
        };
        const handleBackPress = useCallback(() => {
                playSound('ui');
                goBack();
        }, []);
        return (
                <Wrapper>
                        <TouchableOpacity style={styles.menuIcon} onPress={handleBackPress}>
                                <Ionicans name='arrow-back'
                                        size={RFValue(20)}
                                        color={'white'}
                                />
                        </TouchableOpacity>
                        <View >
                                <View>
                                        <Text style={styles.header}>Choose Name and Number of Player</Text>
                                </View>
                                <View style={styles.players}>
                                        <Button style={styles.button} mode={NumberOfPlayers == 2 ? "contained" : "outlined"} onPress={() => setNumberOfPlayers(2)}>
                                                2P
                                        </Button>
                                        <Button style={styles.button} mode={NumberOfPlayers == 3 ? "contained" : "outlined"} onPress={() => setNumberOfPlayers(3)}>
                                                3P
                                        </Button>
                                        <Button style={styles.button} mode={NumberOfPlayers == 4 ? "contained" : "outlined"} onPress={() => setNumberOfPlayers(4)}>
                                                4P
                                        </Button>
                                </View>
                                {NumberOfPlayers !== 0 && (
                                        <View>
                                                <Text style={styles.header}>Set Player Names</Text>
                                                <TextInput
                                                        style={styles.textInput}
                                                        mode="outlined"
                                                        label="Player 1"
                                                        value={player1Name}
                                                        onChangeText={setPlayer1Name}
                                                />
                                                <HelperText type="error" visible={isNextClicked && player1Name.length <= 0}>
                                                        {nameError}
                                                </HelperText>
                                                <TextInput
                                                        style={styles.textInput}
                                                        mode="outlined"
                                                        label="Player 2"
                                                        value={player2Name}
                                                        onChangeText={setPlayer2Name}
                                                />
                                                <HelperText type="error" visible={isNextClicked && player2Name.length <= 0}>
                                                        {nameError}
                                                </HelperText>
                                                {NumberOfPlayers > 2 && (<View><TextInput
                                                        style={styles.textInput}
                                                        mode="outlined"
                                                        label="Player 3"
                                                        value={player3Name}
                                                        onChangeText={setPlayer3Name}
                                                /> <HelperText type="error" visible={isNextClicked && player3Name.length <= 0}>
                                                                {nameError}
                                                        </HelperText></View>)}
                                                {NumberOfPlayers > 3 && (<View>
                                                        <TextInput
                                                                style={styles.textInput}
                                                                mode="outlined"
                                                                label="Player 4"
                                                                value={player4Name}
                                                                onChangeText={setPlayer4Name}
                                                        /> <HelperText type="error" visible={isNextClicked && player4Name.length <= 0}>
                                                                {nameError}
                                                        </HelperText></View>)}
                                                <Button style={styles.button} mode="outlined" onPress={() => handleButtonPress(true)}>
                                                        Next
                                                </Button>
                                        </View>
                                )}
                        </View>

                </Wrapper >
        )
}
const styles = StyleSheet.create({
        menuIcon: {
                position: 'absolute',
                top: 80,
                left: 20,
        },
        header: {
                color: 'white',
                fontWeight: 'bold',
                alignSelf: 'center',
                marginBottom: 10,
                marginTop: 20,
        },
        players: {
                display: 'flex',
                flexDirection: 'row',
                marginVertical: 10,
        },
        button: {
                margin: 5,
        },
        textInput: {
                width: '100%',
                margin: 5,
        }
})
export default SelectPlayersScreen