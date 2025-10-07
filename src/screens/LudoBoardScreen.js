import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native'
import React, { use, useCallback, useEffect, useRef, useState } from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling'
import Wrapper from '../components/Wrapper'
import MenuIcon from '../assets/images/menu.png'
import { playSound } from '../helpers/SoundUtility'
import WinModal from '../components/WinModal'
import Pocket from '../components/Pocket'
import Dice from '../components/Dice'
import VerticalPath from '../components/path/verticalPath'
import HorizontalPath from '../components/path/HorizontalPath'
import MenuModal from '../components/MenuModal'
import FourTriangles from '../components/FourTriangles'
import { useIsFocused } from '@react-navigation/native'
import StartGame from '../assets/images/start.png'
import { useSelector } from 'react-redux'
import { selectNoOfPlayer, selectDiceTouch, selectPlayer1, selectPlayer2, selectPlayer3, selectPlayer4 } from '../redux/reducers/gameSelectors'
import { Colors } from '../constants/Colors'
import { Plot1Data, Plot3Data, Plot2Data, Plot4Data } from '../helpers/PlotData'

const LudoBoardScreen = () => {
        const player1 = useSelector(selectPlayer1);
        const player2 = useSelector(selectPlayer2);
        const player3 = useSelector(selectPlayer3);
        const player4 = useSelector(selectPlayer4);
        const isDiceTouch = useSelector(selectDiceTouch);
        const winner = useSelector(state => state.game.winner);

        const noOfPlayer = useSelector(selectNoOfPlayer);

        const isFocused = useIsFocused();
        const opacity = useRef(new Animated.Value(1)).current;

        const [menuVisible, setMenuVisible] = useState(false);
        const [showStartImage, setShowStartImage] = useState(true);

        const handleMenuPress = useCallback(() => {
                playSound('ui');
                setMenuVisible(true);
        }, []);


        useEffect(() => {
                if (isFocused) {
                        setShowStartImage(true);
                        const blinkAnimation = Animated.loop(
                                Animated.sequence([
                                        Animated.timing(opacity, {
                                                toValue: 0,
                                                duration: 500,
                                                useNativeDriver: true,
                                        }),
                                        Animated.timing(opacity, {
                                                toValue: 1,
                                                duration: 500,
                                                useNativeDriver: true,
                                        }),
                                ])
                        );
                        blinkAnimation.start();

                        const timer = setTimeout(() => {
                                setShowStartImage(false);
                                blinkAnimation.stop();
                        }, 2500);

                        return () => {
                                clearTimeout(timer);
                                blinkAnimation.stop();
                        };
                }
        }, []);
        return (
                <Wrapper >
                        <TouchableOpacity style={styles.menuIcon} onPress={handleMenuPress}>
                                <Image source={MenuIcon} style={styles.menuIconImage} />
                        </TouchableOpacity>

                        <View style={styles.container}>
                                <View
                                        style={noOfPlayer === 4 ? styles.flexRow : styles.flexRight}
                                        pointerEvents={isDiceTouch ? 'none' : 'auto'}>
                                        {noOfPlayer === 4 && < Dice color={Colors.green} player={2} data={player2} />}
                                        <Dice color={Colors.yellow} player={3} rotate data={player3} />
                                </View>
                                <View style={styles.ludoBoard}>
                                        <View style={styles.plotContainer}>
                                                <Pocket color={Colors.green} player={2} data={player2} />
                                                <VerticalPath cells={Plot2Data} color={Colors.yellow} />
                                                <Pocket color={Colors.yellow} player={3} data={player3} />
                                        </View>
                                        <View style={styles.pathContainer}>
                                                <HorizontalPath cells={Plot1Data} color={Colors.green} />
                                                <FourTriangles player1={player1} player2={player2} player3={player3} player4={player4} />
                                                <HorizontalPath cells={Plot3Data} color={Colors.blue} />
                                        </View>
                                        <View style={styles.plotContainer}>
                                                <Pocket color={Colors.red} player={1} data={player1} />
                                                <VerticalPath cells={Plot4Data} color={Colors.red} />
                                                <Pocket color={Colors.blue} player={4} data={player4} />
                                        </View>
                                </View>
                                <View style={styles.flexRow}
                                        pointerEvents={isDiceTouch ? 'none' : 'auto'}>
                                        <Dice color={Colors.red} player={1} data={player1} />
                                        {noOfPlayer === 4 && <Dice color={Colors.blue} player={4} rotate data={player4} />}

                                </View>
                        </View>



                        {showStartImage && (
                                <Animated.Image
                                        source={StartGame}
                                        style={{
                                                width: deviceWidth * 0.5,
                                                height: deviceHeight * 0.2,
                                                position: 'absolute',
                                                opacity: opacity,
                                        }}
                                />
                        )}
                        {
                                menuVisible && (
                                        <MenuModal onPressHide={() => setMenuVisible(false)} visible={menuVisible} />
                                )
                        }
                        {winner != null && <WinModal winner={1} />}
                </Wrapper>
        );

}

const styles = StyleSheet.create({
        container: {
                alignSelf: 'center',
                justifyContent: 'center',
                height: deviceHeight * 0.5,
                width: deviceWidth,
        },
        ludoBoard: {
                width: '100%',
                height: '100%',
                alignSelf: 'center',
                padding: 10,
        },
        menuIcon: {
                position: 'absolute',
                top: 60,
                left: 20,
        },
        menuIconImage: {
                width: 30,
                height: 30,
        },
        flexRow: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 10,
        },
        flexRight: {
                flexDirection: 'row',
                justifyContent: 'flex-end',
        },
        plotContainer: {
                width: '100%',
                height: '40%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: '#ccc',
        },
        pathContainer: {
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                height: '20%',
                justifyContent: 'space-between',
                backgroundColor: '#1E5162'
        }
});
export default LudoBoardScreen