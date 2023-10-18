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

interface Props {
    invoice: {
        id: string;
        invoice_no: number ;
        businessData: {
          company: string;
          email: string;
          phone: string;
          address: string;
        }
        clientData: {
          fullName: string;
          email: string;
          phone: string;
          address: string;
        }

        trans_date: string;
        due_date: string;
        items: {
            sno: number;
            desc: string;
            qty: number;
            rate: number;
        }[]

    };

    
  }

// Create Document Component
const MyDocument = ({invoice}:Props) => (
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





  
    return (
      <>
        {!isLoading && (<>
            <PDFDownloadLink document={<MyDocument invoice={data?.data}/>} fileName="invoice.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : `${params.slug}`)}</PDFDownloadLink>
          <PDFViewer className='w-full h-screen'>
                <MyDocument invoice={data?.data}/>
          </PDFViewer> 
        </>
        )}
      </>
    );
  }
  






  export const dynamic = "force-dynamic";


