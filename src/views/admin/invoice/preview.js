import { CloseIcon } from '@chakra-ui/icons';
import { Button, IconButton, Spinner } from '@chakra-ui/react';
import { Card } from 'components/ui/card';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getApi } from 'services/api';
import {  Flex, Grid, GridItem, Modal, ModalBody, ModalContent,ModalFooter, } from '@chakra-ui/react'

const Preview = (props) => {
    const { onClose, isOpen, id, generatePDF, selectedId, isLoading } = props
    const [invoiceDetails, setInvoiceDetails] = useState({});
    const [isLoding, setIsLoding] = useState(false)
    // const largeLogo = useSelector((state) => state?.images?.images?.filter(item => item?.isActive === true));

    const fetchInvoiceDetails = async () => {
        try {
            setIsLoding(true)
            let result = await getApi('api/invoices/view/', selectedId)
            if (result?.status === 200) {
                setInvoiceDetails(result?.data?.result)
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setIsLoding(false)
        }
    }

    useEffect(() => {
        if (selectedId) fetchInvoiceDetails()
    }, [selectedId])

    // const invoiceData = {
    //     companyInfo: {
    //       name: "ETERNAL HR SERVICES PRIVATE LIMITED",
    //       address: "B-217-219, Logix Technopark, Sector 132, Noida - 201301",
    //       phone: "0120 - 4746838",
    //       email: "info@eternalhrservices.com",
    //       website: "www.eternalhrservices.com",
    //       cin: "U74900DL2009PTC193006",
    //       gst: "09AADCE3874K1ZW",
    //       logo: "/lovable-uploads/abc1624e-8103-4bcc-b3cc-94f3629cd0f8.png"
    //     },
    //     invoiceDetails: {
    //       title: "TAX INVOICE",
    //       billTo: "OIL TOWER A SPACE I TEG PHASE, SECTOR 16 NOIDA 201301, Gurgaon, Delhi NCT 110031 INDIA",
    //       billNo: "BL242342",
    //       date: "6-Apr-23",
    //       dueDate: "6-May-23",
    //       poNo: "APR-23/221",
    //       poDate: "4-APR-23",
    //       gstNo: "AADCE3874K1ZW",
    //       stateCode: "09",
    //       placeOfSupply: "UP",
    //       reverseCharges: "NO",
    //       contactPerson: "BILWANT DHILLON"
    //     },
    //     items: [
    //       {
    //         id: 1,
    //         description: "Services fee @ 7% of Annual CTC for the recruitment of Visitor Kaushik at Annual CTC 450000",
    //         amount: 31500.00
    //       }
    //     ],
    //     calculations: {
    //       taxableAmount: 31500.00,
    //       sgst: 0.00,
    //       cgst: 0.00,
    //       igst: 5670.00,
    //       total: 37170.00
    //     },
    //     bankDetails: {
    //       name: "State Bank of India",
    //       branch: "Saket Branch",
    //       accountNo: "1234567890",
    //       ifsc: "SBIN0001234"
    //     },
    //     termsAndConditions: [
    //       "All payments to be made by NEFT",
    //       "This invoice will surely be reflected in your account",
    //       "All disputes are subject to Delhi jurisdiction exclusively",
    //       "E & O.E",
    //       "TDS to be deducted @ 10% (if applicable)"
    //     ],
    //     signatureImage: "/signature.png"
    //   };

    return (
      <Modal isOpen={isOpen} size={"6xl"} >

                        <ModalContent className=" bg-black bg-opacity-50 overflow-scroll flex justify-center mt-96">
                         
        
      <ModalBody className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-6 relative">
      <IconButton onClick={() => onClose(false)} icon={<CloseIcon />} />

            <Card className="overflow-auto border-0">
      <div className="print:shadow-none">
        {/* Company Header */}
        <div className="border-b border-gray-200">
      <div className="flex justify-between items-start p-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-red-600">ETERNAL HR SERVICES PRIVATE LIMITED</h1>
          <p className="text-sm text-gray-600">B-217-219, Logix Technopark, Sector 132, Noida - 201301</p>
          <div className="mt-2 text-sm">
            <p><span className="font-semibold">Phone:</span> 0120 - 4746838 </p>
            <p><span className="font-semibold">Email:</span> info@eternalhrservices.com </p>
            <p><span className="font-semibold">Website:</span> www.eternalhrservices.com </p>
            <p><span className="font-semibold">CIN:</span> U74900DL2009PTC193006 </p>
            <p><span className="font-semibold">GST:</span> 09AADCE3874K1ZW </p>
          </div>
        </div>
        <div className="w-24 h-24">
          <img 
            src="https://res.cloudinary.com/dna3hwzre/image/upload/v1741499065/473408572_1590238345196986_2661325784945347044_n_ii9ax7.jpg" 
            alt="Company Logo" 
            className="object-contain w-full h-full p-1 rounded-xl" 
          />
        </div>
      </div>
    </div>

        {/* Invoice Info */}
        <div className="p-6 pt-4">
      <h2 className="text-center font-bold text-lg border border-gray-300 mb-4 py-1">
       TAX INVOICE
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="col-span-1 border border-gray-300 p-2">
          <div className="font-semibold text-sm border-b border-gray-300 pb-1 mb-1">Bill To:</div>
          <div className="text-sm">{invoiceDetails?.billingStreet ? `${invoiceDetails?.billingStreet},${invoiceDetails?.billingCity},${invoiceDetails?.billingPostalCode},${invoiceDetails?.billingCountry}` : ""}</div>
        </div>
        
        <div className="col-span-2">
          <div className="grid grid-cols-3 gap-1">
            <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">Invoice No:</div>
              <div>{invoiceDetails?.invoiceNumber}</div>
            </div>
            <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">Invoice Date:</div>
              <div>{invoiceDetails?.invoiceDate && moment(invoiceDetails?.invoiceDate).format("DD-MM-YYYY")}</div>
            </div>
            <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">Due Date:</div>
              <div>{invoiceDetails?.dueDate && moment(invoiceDetails?.dueDate).format("DD-MM-YYYY")}</div>
            </div>
            
            <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">P.O. No:</div>
              <div></div>
            </div>
            <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">P.O. Date:</div>
              <div></div>
            </div>
            <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">Status</div>
              <div>{invoiceDetails?.status}</div>
            </div>
            
            {/* <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">State Code:</div>
              <div></div>
            </div> */}
            {/* <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">Place of Supply:</div>
              <div></div>
            </div> */}
            {/* <div className="border border-gray-300 p-2 text-sm">
              <div className="font-semibold border-b border-gray-300 pb-1 mb-1">Reverse Charge:</div>
              <div></div>
            </div> */}
          </div>
        </div>
      </div>
      
      <div className="border border-gray-300 p-2 mb-4">
        <div className="font-semibold text-sm border-b border-gray-300 pb-1 mb-1">Contact Person:</div>
        <div className="text-sm">{invoiceDetails?.title}</div>
      </div>
    </div>

        {/* Invoice Items */}
        {invoiceDetails?.items?.length > 0 && invoiceDetails?.items?.map((item, index) => (
        <div key={index} className="px-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left w-16 text-sm font-bold">S. NO</th>
                <th className="border border-gray-300 p-2 text-left text-sm font-bold">Product Description</th>
                <th className="border border-gray-300 p-2 text-left w-32 text-sm font-bold">Quantity</th>
                <th className="border border-gray-300 p-2 text-left w-32 text-sm font-bold">Rate</th>
                <th className="border border-gray-300 p-2 text-left w-32 text-sm font-bold">Discount</th>
                <th className="border border-gray-300 p-2 text-center w-32 text-sm font-bold">
                  <div>AMOUNT</div>
                  <div>in Rs.</div>
                </th>
              </tr>
            </thead>
            <tbody>
             
                <tr >
                  <td className="border border-gray-300 p-2 text-sm">{item?.id}</td>
                  <td className="border border-gray-300 p-2 text-sm">{item?.productName}</td>
                  <td className="border border-gray-300 p-2 text-sm text-right">{item?.qty}</td>
                  <td className="border border-gray-300 p-2 text-sm text-right">{item?.rate}</td>
                  <td className="border border-gray-300 p-2 text-sm text-right">{`${item?.discountType === "percent" ? `${item?.discount}%` : item?.discountType === "flatAmount" ? `${invoiceDetails?.currency}${item?.discount}` : item?.discountType === "none" ? 0 : ""}`}</td>
                  <td className="border border-gray-300 p-2 text-right text-sm">{item?.amount}</td>
                </tr>
            
              {/* Empty row for spacing/future items */}
              <tr>
                <td className="border border-gray-300 p-2 h-64"></td>
                <td className="border border-gray-300 p-2"></td>
                <td className="border border-gray-300 p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
         ))
        }

        

        {/* Invoice Summary and Total */}
        <div className="px-6 py-2">
          <div className="flex">
            <div className="w-1/2 border border-gray-300 p-2 text-sm">
              <div className="font-semibold mb-2">Bank Details:</div>
                <div>Comapany Name: Eternal Hr Services Private Limited</div>
              <div>Bank Name: HDFC Bank</div>
              <div>Branch: HDFC Bank </div>
              <div>Account No: 05902560000465</div>
              <div>IFSC Code: HDFC0000590</div>
            </div>
            <div className="w-1/2">
              <table className="w-full border-collapse">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold text-sm">Subtotal amount</td>
                    <td className="border border-gray-300 p-2 text-right text-sm">{`${invoiceDetails?.currency} ${invoiceDetails?.subtotal || 0}`}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold text-sm">CGST @9% on Taxable Value</td>
                    <td className="border border-gray-300 p-2 text-right text-sm">{`${invoiceDetails?.currency} ${invoiceDetails?.shippingTax || 0}`}</td>
                  </tr>
                  {/* <tr>
                    <td className="border border-gray-300 p-2 font-semibold text-sm">SGST @9% on Taxable Value</td>
                    <td className="border border-gray-300 p-2 text-right text-sm">1700</td>
                  </tr> */}
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold text-sm">IGST @18% on Taxable Value</td>
                    <td className="border border-gray-300 p-2 text-right text-sm">{`${invoiceDetails?.currency} ${invoiceDetails?.tax || 0}`}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-semibold text-sm bg-gray-100">TOTAL BILL VALUE</td>
                    <td className="border border-gray-300 p-2 text-right font-bold text-sm bg-gray-100">{`${invoiceDetails?.currency} ${invoiceDetails?.grandTotal || 0}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer with Terms and Signature */}
        <div className="px-6 py-4">
          <div className="flex border border-gray-300">
            <div className="w-3/4 p-2 text-sm">
              <div className="font-semibold mb-2">Terms & Conditions:</div>
              <ol className="list-decimal pl-4 text-sm">
             
                  <li  className="mb-1 text-sm"> ANY DISCRIPENCY IN THE BILL MUST BE INTIMATED WITHIN 7 DAYS.</li>
                  <li  className="mb-1 text-sm"> ANY TAX LEVIED BY THE GOVT. WILL BE ENTIRELY IN YOUR ACCOUNT.</li>
                  <li  className="mb-1 text-sm"> ALL DISPUTES ARE SUBJECT TO DELHI COURTS DURIDICTION ONLY.</li>
                  <li  className="mb-1 text-sm"> RS. 300 WILL BE CHARGED FOR EVERY DISHONOURED CHEQUE.</li>
                  <li  className="mb-1 text-sm"> S. C. DATE IS  COMPLETION OF SERVICE DATE AND INV. DATE IS INVOICE RAISED DATE</li>
                  <li  className="mb-1 text-sm"> GST Payable on reverse charges – NO.</li>

               
              </ol>
            </div>
            <div className="w-1/4 border-l border-gray-300 p-2">
              <div className="text-center text-sm font-semibold">
                FOR ETERNAL HR SERVICES PRIVATE LIMITED
              </div>
              <div className="flex justify-center items-end h-24">
                <img 
                  src="" 
                  alt="Authorized Signature" 
                  className="max-h-20" 
                />
              </div>
              <div className="text-center text-sm mt-2">Authorized Signatory</div>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-0 mt-2 text-sm border border-gray-300">
            <div className="border-r border-gray-300 p-1 font-semibold">Name</div>
            <div className="border-r border-gray-300 p-1 font-semibold">Prepared by</div>
            <div className="border-r border-gray-300 p-1 font-semibold">Checked by</div>
            <div className="border-r border-gray-300 p-1 font-semibold">Approved by</div>
            <div className="border-r border-gray-300 p-1 font-semibold">Signature</div>
            <div className="border-r border-gray-300 p-1 font-semibold">Date</div>
            <div className="p-1 font-semibold">Time</div>
            
            <div className="border-r border-gray-300 border-t p-1">Name</div>
            <div className="border-r border-gray-300 border-t p-1"></div>
            <div className="border-r border-gray-300 border-t p-1"></div>
            <div className="border-r border-gray-300 border-t p-1"></div>
            <div className="border-r border-gray-300 border-t p-1"></div>
            <div className="border-r border-gray-300 border-t p-1"></div>
            <div className="border-t p-1"></div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-red-600 text-white text-center py-1 text-sm font-bold">
          PARTNERING YOUR CHALLENGES
        </div>
      </div>
    </Card>
                {/* <DrawerHeader alignItems={"center"} justifyContent='space-between' display='flex'  >
                    Invoice
                    <IconButton onClick={() => onClose(false)} icon={<CloseIcon />} />
                </DrawerHeader> */}
                {/* <DrawerBody>
                    {
                        !isLoding ?
                            <div id={id} style={{ padding: "5px" }}>
                                <div className="invoice-container" >
                                    <div style={{ marginBottom: 10 }}><h1 style={{ fontSize: 30, textAlign: "center" }}>Invoice</h1></div>
                                    <div className="invoice-header">
                                        <div>
                                            <img
                                                style={{ width: "100%", height: '52px' }}
                                                src="https://res.cloudinary.com/dna3hwzre/image/upload/v1741499065/473408572_1590238345196986_2661325784945347044_n_ii9ax7.jpg"
                                                alt="Logo"
                                                cursor="pointer"
                                                userSelect="none"
                                                my={2}
                                            />
                                        </div>
                                        <div className="invoice-details">
                                            <table>
                                                <tr>
                                                    <th style={{ textAlign: "start" }}>Invoice No.</th>
                                                    <td>:</td>
                                                    <td style={{ textAlign: "start" }}>{invoiceDetails?.invoiceNumber}</td>
                                                </tr>
                                                <tr>
                                                    <th style={{ textAlign: "start" }}>Invoice Date</th>
                                                    <td>:</td>
                                                    <td style={{ textAlign: "start" }}>{invoiceDetails?.invoiceDate && moment(invoiceDetails?.invoiceDate).format("DD-MM-YYYY")}</td>
                                                </tr>
                                                <tr>
                                                    <th style={{ textAlign: "start" }}>Name</th>
                                                    <td>:</td>
                                                    <td style={{ textAlign: "start" }}>{invoiceDetails?.title}</td>
                                                </tr>
                                                <tr>
                                                    <th style={{ textAlign: "start" }}>Status</th>
                                                    <td>:</td>
                                                    <td style={{ textAlign: "start" }}>{invoiceDetails?.status}</td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="address-section">
                                        <div className="address">
                                            <strong>Billing Address</strong><br />
                                            <p style={{ width: "250px", wordBreak: "break-all" }}>
                                                {invoiceDetails?.billingStreet ? `${invoiceDetails?.billingStreet},${invoiceDetails?.billingCity},` : ""}
                                            </p>
                                            <p style={{ width: "250px", wordBreak: "break-all" }}>
                                                {invoiceDetails?.billingState ? `${invoiceDetails?.billingState},` : ""}
                                            </p>
                                            <p style={{ width: "250px", wordBreak: "break-all" }}>
                                                {`${invoiceDetails?.billingCountry} - ${invoiceDetails?.billingPostalCode}`}
                                            </p>
                                        </div>
                                        <div className="address">
                                            <strong>Shipping Address</strong><br />
                                            <p style={{ width: "250px", wordBreak: "break-all" }}>
                                                {invoiceDetails?.shippingStreet ? `${invoiceDetails?.shippingStreet},${invoiceDetails?.shippingCity},` : ""}
                                            </p>
                                            <p style={{ width: "250px", wordBreak: "break-all" }}>
                                                {invoiceDetails?.shippingState ? `${invoiceDetails?.shippingState},` : ""}
                                            </p>
                                            <p style={{ width: "250px", wordBreak: "break-all" }}>
                                                {`${invoiceDetails?.shippingCountry} - ${invoiceDetails?.shippingPostalCode}`}
                                            </p>
                                        </div>
                                    </div>
                                    <table className="invoice-table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "50px" }}>S No</th>
                                                <th style={{ width: "100px" }}>ITEM</th>
                                                <th style={{ width: "50px" }}>QTY</th>
                                                <th style={{ width: "50px" }}>RATE</th>
                                                <th style={{ width: "50px" }}>DISCOUNT</th>
                                                <th style={{ width: "50px" }}>AMOUNT</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                invoiceDetails?.items?.length > 0 && invoiceDetails?.items?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.id}</td>
                                                        <td>{item?.productName}</td>
                                                        <td>{item?.qty}</td>
                                                        <td>{item?.rate}</td>
                                                        <td>{`${item?.discountType === "percent" ? `${item?.discount}%` : item?.discountType === "flatAmount" ? `${invoiceDetails?.currency}${item?.discount}` : item?.discountType === "none" ? 0 : ""}`}</td>
                                                        <td>{item?.amount}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <div className="totals">
                                        <table>
                                            <tr>
                                                <th style={{ textAlign: "start" }}>Total</th>
                                                <td>:</td>
                                                <td style={{ textAlign: "start" }}>{`${invoiceDetails?.currency} ${invoiceDetails?.total || 0}`}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ textAlign: "start" }}>Discount </th>
                                                <td>:</td>
                                                <td style={{ textAlign: "start" }}>{`${invoiceDetails?.currency} ${invoiceDetails?.discount || 0}`}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ textAlign: "start" }}>Subtotal</th>
                                                <td>:</td>
                                                <td style={{ textAlign: "start" }}>{`${invoiceDetails?.currency} ${invoiceDetails?.subtotal || 0}`}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ textAlign: "start" }}>Shipping </th>
                                                <td>:</td>
                                                <td style={{ textAlign: "start" }}>{`${invoiceDetails?.currency} ${invoiceDetails?.shipping || 0}`}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ textAlign: "start" }}>Shipping Tax</th>
                                                <td>:</td>
                                                <td style={{ textAlign: "start" }}>{`${invoiceDetails?.currency} ${invoiceDetails?.shippingTax || 0}`}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ textAlign: "start" }}>Tax ({invoiceDetails?.ptax}%)</th>
                                                <td>:</td>
                                                <td style={{ textAlign: "start" }}>{`${invoiceDetails?.currency} ${invoiceDetails?.tax || 0}`}</td>
                                            </tr>
                                            <tr>
                                                <th style={{ textAlign: "start" }}>Grand Total</th>
                                                <td>:</td>
                                                <td style={{ textAlign: "start" }}>{`${invoiceDetails?.currency} ${invoiceDetails?.grandTotal || 0}`}</td>

                                            </tr>
                                        </table>

                                    </div>
                                    <div className="footer">
                                        <div>{invoiceDetails?.description}</div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Spinner />
                            </div>
                    }
                </DrawerBody> */}
                {/* <DrawerFooter>
                    <Button sx={{ textTransform: "capitalize" }} size="sm" disabled={isLoading} variant="brand" type="submit" onClick={generatePDF}>
                        {isLoading ? <Spinner /> : 'Download'}
                    </Button>
                </DrawerFooter> */}
                <ModalFooter>
                    <Button sx={{ textTransform: "capitalize" }} size="sm" disabled={isLoading} variant="brand" type="submit" onClick={generatePDF}>
                        {isLoading ? <Spinner /> : 'Download'}
                    </Button>
                </ModalFooter>
           </ModalBody>
          
           </ModalContent>
           </Modal>
    )
}

export default Preview

// import { useEffect, useState } from 'react';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
// import { getApi } from 'services/api';

// const InvoicePreview = ({ isOpen, onClose, id, generatePDF, selectedId, isLoading }) => {
//   const [invoiceDetails, setInvoiceDetails] = useState({});
//   const [isLoding, setIsLoding] = useState(false);
//   const largeLogo = useSelector((state) => state?.images?.images?.filter(item => item?.isActive));

//   const fetchInvoiceDetails = async () => {
//     try {
//       setIsLoding(true);
//       const result = await getApi('api/invoices/view/', selectedId);
//       if (result?.status === 200) {
//         setInvoiceDetails(result?.data?.result);
//       }
//     } catch (e) {
//       console.log(e);
//     } finally {
//       setIsLoding(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedId) fetchInvoiceDetails();
//   }, [selectedId]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start overflow-auto pt-10">
//       <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-6 relative">
//         <button onClick={() => onClose(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black">
//           ✕
//         </button>

//         {isLoding ? (
//           <div className="flex justify-center py-10">
//             <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
//           </div>
//         ) : (
//           <div id={id} className="space-y-4 text-sm text-gray-700">
//             <div className="text-center text-2xl font-bold uppercase">Tax Invoice</div>

//             <div className="flex justify-between items-center border-b pb-4">
//               <div>
//                 <img src={largeLogo?.[0]?.logoLgImg} alt="Logo" className="h-14" />
//                 <div className="mt-2 font-bold">Eternal HR Services Private Limited</div>
//                 <div>331, Tower A, Spaze I Tech Park, Sector 49, Sohna Road, Gurgaon, Haryana, 122001</div>
//                 <div>GST: 06AABFU8051C1ZG</div>
//               </div>
//               <div className="text-right">
//                 <div><strong>Invoice No:</strong> {invoiceDetails?.invoiceNumber}</div>
//                 <div><strong>Date:</strong> {invoiceDetails?.invoiceDate && moment(invoiceDetails.invoiceDate).format('DD-MMM-YYYY')}</div>
//                 <div><strong>FY:</strong> 2024–25</div>
//                 <div><strong>Process Month:</strong> Dec-24</div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-6 border-b pb-4">
//               <div>
//                 <div className="font-semibold">Bill To:</div>
//                 <div>{invoiceDetails?.title}</div>
//                 <div>{invoiceDetails?.billingStreet}, {invoiceDetails?.billingCity}</div>
//                 <div>{invoiceDetails?.billingState}, {invoiceDetails?.billingCountry} - {invoiceDetails?.billingPostalCode}</div>
//                 <div><strong>Client GST:</strong> {invoiceDetails?.billingGstNumber || '--'}</div>
//                 <div><strong>Client PAN:</strong> AACCE2225J</div>
//               </div>
//               <div>
//                 <div><strong>PO No:</strong> {invoiceDetails?.poNumber || '--'}</div>
//                 <div><strong>PAN:</strong> 09AACCE2225J1ZS</div>
//               </div>
//             </div>

//             <table className="w-full border mt-2 text-sm">
//               <thead>
//                 <tr className="bg-gray-100 border">
//                   <th className="p-2 border">S No.</th>
//                   <th className="p-2 border text-left">Particulars</th>
//                   <th className="p-2 border">Type of Service</th>
//                   <th className="p-2 border">Amount (Rs.)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {invoiceDetails?.items?.map((item, index) => (
//                   <tr key={index} className="border">
//                     <td className="p-2 border text-center">{index + 1}</td>
//                     <td className="p-2 border">{item?.productName}</td>
//                     <td className="p-2 border text-center">Contract Staffing</td>
//                     <td className="p-2 border text-right">{item?.amount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <div className="flex justify-end mt-4">
//               <table className="text-sm w-80">
//                 <tbody>
//                   <tr><td>Total Taxable Amount</td><td className="text-right">{invoiceDetails?.currency} {invoiceDetails?.total}</td></tr>
//                   <tr><td>CGST 9%</td><td className="text-right">{invoiceDetails?.currency} {invoiceDetails?.cgst || 0}</td></tr>
//                   <tr><td>SGST 9%</td><td className="text-right">{invoiceDetails?.currency} {invoiceDetails?.sgst || 0}</td></tr>
//                   <tr><td>IGST 0%</td><td className="text-right">0.00</td></tr>
//                   <tr className="font-semibold"><td>Grand Total</td><td className="text-right">{invoiceDetails?.currency} {invoiceDetails?.grandTotal}</td></tr>
//                 </tbody>
//               </table>
//             </div>

//             <div className="mt-4">
//               <strong>Amount in Words:</strong> Thirty Seven Thousand Six Hundred Sixty Six Only
//             </div>

//             <div className="mt-4 border-t pt-4 text-xs">
//               <p>Bank Name: HDFC Bank</p>
//               <p>Account No.: 67000393100001099</p>
//               <p>IFSC Code: HDFC0000590</p>
//               <p>Branch: Indirapuram, Ghaziabad</p>
//             </div>

//             <div className="mt-4 text-xs text-gray-600 border-t pt-2">
//               <ul className="list-disc pl-4">
//                 <li>Any discrepancy in the bill must be intimated within 7 days.</li>
//                 <li>TDS is deducted on total taxable amount only (excl. GST) as per circulars.</li>
//                 <li>All disputes are subject to Delhi courts jurisdiction only.</li>
//                 <li>₹300 will be charged for every dishonored cheque.</li>
//                 <li>GST Payable on reverse charges – NO</li>
//               </ul>
//             </div>

//             <div className="text-right mt-6 font-semibold">For Eternal HR Services Private Limited</div>
//           </div>
//         )}

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={generatePDF}
//             disabled={isLoading}
//             className="bg-blue-600 text-white text-sm px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//           >
//             {isLoading ? 'Loading...' : 'Download PDF'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoicePreview;
