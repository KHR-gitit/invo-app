/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import PdfTitle from '../../_components/pdf/pdfTitle'
import PdfBillTo from '../../_components/pdf/pdfBillTo'
import PdfNum from '../../_components/pdf/pdfNum'
import PdfItemTable from '../../_components/pdf/pdfItemTable'
import PdfTYMessage from '../../_components/pdf/pdfTYMessage'
import { api } from '~/trpc/react';
import PdfHeader from '~/app/_components/pdf/pdfHeader';




// Create styles

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    invoiceHeader:{
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between"
    }


  });

// Create Document Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MyDocument = ({invoice}:any) => (
    <Document>
    <Page size="A4" style={styles.page}>
        <PdfHeader invoice={invoice}/>
        <View style={styles.invoiceHeader}>
          <PdfTitle title='invoice'/>
          <PdfNum invoice={invoice}/>
        </View>
        <PdfBillTo invoice={invoice} />
        <PdfItemTable invoice={invoice} />
        <PdfTYMessage />
    </Page>
</Document>
);



  export default function Pdf ({ params }: { params: { slug: string } }) {

console.log(params.slug)
const {data , isLoading} = api.invoice.getInvoice.useQuery({id:params.slug})


console.log(data?.data)


  
    return (
      <>
        {!isLoading ? (<>
            <PDFDownloadLink document={<MyDocument invoice={data?.data}/>
    } fileName="invoice.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : `${params.slug}`)}</PDFDownloadLink>
          <PDFViewer className='w-full h-screen'>
                <MyDocument invoice={data?.data}/>
          </PDFViewer> 
        </>
        ):<div>loading</div>}
      </>
    );
  }
  






  export const dynamic = "force-dynamic";


