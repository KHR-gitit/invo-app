/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import {Text, View, StyleSheet, Image } from '@react-pdf/renderer';

interface Invoice {
    businessData: {
        company: string;
        address: string;
        abn: string;
        phone: string;
        email: string;
        logo: string;
    };
}

const styles = StyleSheet.create({
    viewContainer: {
        position:"relative",
        width:352,
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
        textAlign:"right",
        
    },
    logo: {
        width: 200,
        height: 106,
        marginLeft:-50
    },
    headerContainer: {
        lineHeight: 1.5,
        paddingRight: 8,

    },
    billTo: {   
        fontWeight: 'extrabold',
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        width:'50%',
        textAlign:"right",

    },
    textDetail:{
        position:"relative",
        textAlign:"right",
        width:'50%'

    },

  });

const PdfHeader = ({invoice}: {invoice: Invoice}) => (
    <View style={styles.viewContainer}>
        <Image src={invoice.businessData.logo  } style={styles.logo}/>
        <View style={styles.headerContainer}>
            <Text style={styles.billTo}>Prepered By:</Text>
            <Text style={styles.textDetail} >{invoice.businessData.company}</Text>
            <Text style={styles.textDetail} >{invoice.businessData.address}</Text>
            <Text style={styles.textDetail} >ABN {invoice.businessData.abn}</Text>
            <Text style={styles.textDetail} > www.painthouse.coma.au</Text>
            <Text style={styles.textDetail} >{invoice.businessData.email} - {invoice.businessData.phone}</Text>
        </View>
    </View>
);

  
  export default PdfHeader