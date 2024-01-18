import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import PdfTableHeader from './pdfTableHeader'
import PdfTableRow from './pdfTableRow'

import PdfTableFooter from './pdfTableFooter'
import { JSONValue } from 'superjson/dist/types';


const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
    },
});

  const PdfItemsTable = ({invoiceItem}:{invoiceItem: JSONValue | null}) => (
    <View style={styles.tableContainer}>
        <PdfTableHeader />
        <PdfTableRow items={invoiceItem as {sno:number,name:string,desc:string,qty:number,rate:number}[]} />
        {!invoiceItem ? 'loading' : <PdfTableFooter items={invoiceItem as []} />}
    </View>
  );
  
  export default PdfItemsTable