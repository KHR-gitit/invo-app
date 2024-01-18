import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    totalRow: {
        flexDirection: 'row',
        backgroundColor: '#2e2d2d',
        color: '#fff',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });

const PdfTableFooter = ({items}:{items:[]}) => {
const total:number = Array.isArray(items) ? items.map((item:{qty:number, rate:number}) => item.qty * item.rate).reduce((accumulator:number, currentValue:number) => accumulator + currentValue , 0) : 0
    return(  
        <>
        <View style={styles.row}>
            <Text style={styles.description}>Sub Total</Text>
            <Text style={styles.total}>{total.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
            <Text style={styles.description}>GST 10%</Text>
            <Text style={styles.total}>{((10 / 100) * total).toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
            <Text style={styles.description}>TOTAL Amount</Text>
            <Text style={styles.total}>{(total + ((10 / 100) * total)).toFixed(2)}</Text>
        </View>
        </>  
    )
};
  
  export default PdfTableFooter