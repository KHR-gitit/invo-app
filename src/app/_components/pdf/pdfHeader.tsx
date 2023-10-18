/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Text, View, StyleSheet, Image } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    headerContainer: {

    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    viewContainer: {
        position:"relative",
        top:0,
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-end",
        lineHeight: 1.5,
    },
    logo: {
        width: 74,
        height: 66,
        position:"absolute",
        left:0,
        top:0,
    }
  });



    
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const PdfHeader = ({invoice}:any) => (
    <View style={styles.viewContainer}>

    

    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Bill From:</Text>
        <Text>{invoice.businessData.company}</Text>
        <Text>{invoice.businessData.address}</Text>
        <Text>{invoice.businessData.phone}</Text>
        <Text>{invoice.businessData.email}</Text>
    </View>
    </View>
  );
  
  export default PdfHeader