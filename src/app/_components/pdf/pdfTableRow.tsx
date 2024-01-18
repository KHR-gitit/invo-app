import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
    itemName:{
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
    },
    itemDesc:{
        fontSize: 8,
        fontFamily: 'Helvetica',
        color: '#7f7f7f',
    }
  });


const PdfTableRow = ({items}:{items:{sno:number,name:string,desc:string,qty:number,rate:number}[]}) => {
    const rows = items.map( (item) => 
        <View style={styles.row} key={item.sno.toString()}>
            <View style={styles.description}>
            <Text style={styles.itemName}>
            {item.name}
            </Text>
            <Text style={styles.itemDesc}>
            {item.desc}
            </Text>
            </View>
            <Text style={styles.qty}>{item.qty}</Text>
            <Text style={styles.rate}>{item.rate}</Text>
            <Text style={styles.amount}>{(item.qty * item.rate).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
export default PdfTableRow