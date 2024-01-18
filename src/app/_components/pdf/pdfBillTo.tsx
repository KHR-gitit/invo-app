import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#F0F0F0',
        borderTop: 1,
        padding: 8,
        width: '100%',
        marginTop: 36,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between"
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });

  const PdfBillTo = ({invoiceClient}:{invoiceClient: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
}}) => (
    <View style={styles.headerContainer}>
        <Text>{invoiceClient.fullName}</Text>
        <View>
        <Text>{invoiceClient.address}</Text>
        <Text>{invoiceClient.phone}</Text>
        <Text>{invoiceClient.email}</Text>
        </View>
    </View>
  );
  
  export default PdfBillTo