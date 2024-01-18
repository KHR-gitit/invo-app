import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
      marginTop: 36,
      width:"100%",
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
    },
    reportTitle:{
        color: 'black',
        letterSpacing: 4,
        fontSize: 15,
        textTransform: 'uppercase',
    },
    invoiceNum:{
      color: 'black',
      letterSpacing: 4,
      fontSize: 15,
      textTransform: 'uppercase',
    }
  });


  const PdfTitle = ({title, invoiceNum}:{title:boolean, invoiceNum:number}) => (
    <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>{title?"qoute":"invoice"}</Text>
        <View style={styles.invoiceNum}>
                <Text >{title?"QT":"IN"}: {invoiceNum}</Text>
            </View >
    </View>
  );
  
  export default PdfTitle