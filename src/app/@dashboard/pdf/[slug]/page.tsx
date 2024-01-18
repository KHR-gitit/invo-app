/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import React from 'react';
import { Document, Page, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import PdfTitle from '../../../_components/pdf/pdfTitle'
import PdfBillTo from '../../../_components/pdf/pdfBillTo'
import PdfItemTable from '../../../_components/pdf/pdfItemTable'
import PdfTYMessage from '../../../_components/pdf/pdfTYMessage'
import { api } from '~/trpc/react';
import PdfHeader from '~/app/_components/pdf/pdfHeader';
import type { JSONValue } from 'superjson/dist/types';





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
type Invoice = {

    id: string;
    invoice_no: number;
    clientData: {
        fullName: string;
        address: string;
        phone: string;
        email: string;
    };
    businessData: {
      company: string;
      address: string;
      abn: string;
      phone: string;
      email: string;
      logo: string;
    };
    trans_date: string;
    due_date: string;
    items: JSONValue | null;
    quote: boolean;

}
// Create Document Component
const MyDocument = ({invoice}: { invoice: Invoice }) => {



return(

    <Document>
    <Page size="A4" style={styles.page}>
        <PdfHeader invoice={invoice}/>
        <View style={styles.invoiceHeader}>
          <PdfTitle title={invoice.quote} invoiceNum={invoice.invoice_no}/>
        </View>
        <PdfBillTo invoiceClient={invoice.clientData} />
        <PdfItemTable invoiceItem={invoice.items} />
        <PdfTYMessage />
    </Page>
</Document>
)

};



  export default function Pdf ({ params }: { params: { slug: string } }) {

console.log(params.slug)
const {data , isLoading} = api.invoice.getInvoice.useQuery({id:params.slug})
console.log({data , isLoading})



  
    return (
      <>
        {isLoading ?<div>loading</div> :  data ? (<>
            <PDFDownloadLink document={<MyDocument invoice={data}/>
    } fileName="invoice.pdf">
          {({ loading }) => (loading ? 'Loading document...' : `${params.slug}`)}</PDFDownloadLink>
          <PDFViewer className='w-full h-screen'>
                <MyDocument invoice={data}/>
          </PDFViewer> 
        </>
        ):<div>no data</div>}
      </>
    );
  }
  






  export const dynamic = "force-dynamic";



