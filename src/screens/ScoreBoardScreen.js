import { View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { deviceHeight, deviceWidth } from '../constants/Scaling';
import Wrapper from '../components/Wrapper';
import MenuIcon from '../assets/images/menu.png'
import { playSound } from '../helpers/SoundUtility';
import MenuModal from '../components/MenuModal';
import { Table, Row, Rows } from 'react-native-table-component';
import asyncStorage from '../redux/storage';
import { IconButton, MD3Colors } from 'react-native-paper';
import { goBack } from '../helpers/NavigationUtil';
import Ionicans from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize';

const ScoreBoardScreen = () => {
        const [tableData, setTableData] = useState(null);
        const handleBackPress = useCallback(() => {
                playSound('ui');
                goBack();
        }, []);
        const tableHead = ['ID', 'PLAYER NAME', 'WINS',];
        const loadValue = async () => {
                try {
                        const value = JSON.parse(await asyncStorage.getItem('SCOREBOARD'));

                        const temp = value.map(obj => Object.values(obj));
                        setTableData(temp);
                } catch (error) {
                        console.error('Error loading value:', error);
                }
        }
        useEffect(() => {
                loadValue();
        }, []);

        return (
                <Wrapper>
                        <TouchableOpacity style={styles.menuIcon} onPress={handleBackPress}>
                                <Ionicans name='arrow-back'
                                        size={RFValue(20)}
                                        color={'white'}
                                />
                        </TouchableOpacity>
                        {tableData !== null && (<View style={styles.container}>
                                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                                        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
                                        <Rows data={tableData} textStyle={styles.text} />
                                </Table>
                        </View>)}
                </Wrapper >
        )
}
const styles = StyleSheet.create({
        menuIcon: {
                position: 'absolute',
                top: 80,
                left: 20,
        },
        menuIconImage: {
                width: 40,
                height: 50,
        },
        row: {
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderColor: '#FFF',
        },
        headerCell: {

                flex: 1,
                fontWeight: 'bold',
                padding: 5,
                borderWidth: 1,
                textAlign: 'center',
                color: '#000',
        },
        item: {
                padding: 10,
                borderColor: '#FFF',

        },
        container: {
                alignSelf: 'center',
                //justifyContent: 'center',
                height: deviceHeight,
                width: deviceWidth,
                top: deviceHeight * 0.1,
                padding: 30
        },
        head: { height: 40, backgroundColor: '#1E5162' },
        text: { margin: 6, color: '#FFF' }
});
export default ScoreBoardScreen