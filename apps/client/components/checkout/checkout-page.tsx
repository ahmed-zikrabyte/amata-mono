// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@workspace/ui/components/breadcrumb";
// import { Separator } from "@workspace/ui/components/separator";
// import { Button } from "@workspace/ui/components/button";
// import { Input } from "@workspace/ui/components/input";
// import { Plus } from "lucide-react";
// import Image from "next/image";
// import productimage from "../../assets/images/image-product.png";
// import OrderSuccessfulPage from "./order-successful-page";
// import AddressAddForm from "../address-form/address-add-form";
// import { useApi } from "../../hooks/useApi";
// import { getCart } from "../../lib/api/cartApi";
// import { checkoutApi } from "../../lib/api/checkoutApi";
// import { formatToRupee } from "../../lib/utils/formatToRupee";

// const CheckoutPage = () => {
//   const [isOrderSuccess, setIsOrderSuccess] = useState(false);
//   const [showAddAddressSection, setShowAddAddressSection] = useState(false);
//   const [checkoutData, setCheckoutData] = useState<{items: any[], totalAmount: number}>()
//   const {execute} = useApi()

//   if (isOrderSuccess) {
//     return <OrderSuccessfulPage />;
//   }

//   const fetchCheckoutData = async () => {
//     try {
//       const response = await execute(checkoutApi.get().then(res => res.data));
//       console.log(response.data)
//       setCheckoutData(response.data as any)
//     } catch (error : any) {
//       console.log(error?.response.data)
//     }
//   }

//   useEffect(() => {
//     fetchCheckoutData()
//   }, [])

//   const handleAddAddress = (values: any) => {
//     console.log({ values });
//   };
//   return (
//     <div>
//       <div className="py-5 px-6 lg:px-20">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/">Home</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Checkout</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>

//         <div className="flex flex-col lg:flex-row space-y-5 space-x-5 py-5">
//           <div className="p-4 bg-white rounded-xl w-full h-min lg:w-2/3">
//             <div className="flex items-center justify-between pb-2">
//               <h3 className=" text-amber-950 font-medium">Shipping address</h3>
//               <Button
//                 className="text-amber-950"
//                 variant={"ghost"}
//                 type="button"
//                 onClick={() => setShowAddAddressSection((prev) => !prev)}
//               >
//                 {!showAddAddressSection ? (
//                   <>
//                     <Plus /> Add Address
//                   </>
//                 ) : (
//                   <>Cancel</>
//                 )}
//               </Button>
//             </div>
//             <Separator />
//             {showAddAddressSection ? (
//               <AddressAddForm
//                 setShowForm={setShowAddAddressSection}
//                 onSubmit={handleAddAddress}
//               />
//             ) : (
//               <div className="text-center p-4 text-gray-600">
//                 No addresses added
//               </div>
//             )}
//           </div>

//           <div className="flex lg:flex-col space-x-5 rounded-xl space-y-5 w-full lg:w-1/3">
//             <div className="w-1/2 lg:w-full p-4 space-y-3 bg-white">
//               <p className="text-xl text-amber-950 font-medium">Your cart</p>
//               <Separator />
//               {checkoutData?.items.map((item, idx) => (
//                 <div className="w-full flex items-center space-x-3" key={idx}>
//                   <div className="relative h-14 w-14 rounded-lg shrink-0">
//                     <Image
//                       src={item.product.images[0]}
//                       fill
//                       alt=""
//                       className="rounded-lg object-cover"
//                     />
//                   </div>
//                   <div className="w-full flex flex-col xl:flex-row justify-between">
//                     <div>
//                       <p className="text-sm">{item.productName}</p>
//                       <p className="text-xs space-x-1 text-gray-600">
//                         <span>Weight: {item.size} gm</span>
//                         <span className="border-l-2 pl-1">Qty: {item.quantity}</span>
//                       </p>
//                     </div>
//                     <p className="">{formatToRupee(item.price)}</p>
//                   </div>
//                 </div>
//               ))}
//               <div className="w-full flex items-center space-x-4">
//                 <Input
//                   className="h-12"
//                   placeholder="Enter your coupon code..."
//                 />
//                 <Button className="h-12 w-24">Apply</Button>
//               </div>
//             </div>

//             <div className="w-1/2 lg:w-full p-4 space-y-3 bg-white">
//               <p className="text-xl text-amber-950 font-medium">
//                 Price details
//               </p>
//               <Separator />
//               <div className="space-y-3">
//                 <p className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">
//                     Items(2)
//                   </span>
//                   <span>3434</span>
//                 </p>
//                 <p className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">
//                     Delivery Fee
//                   </span>
//                   <span>3434</span>
//                 </p>
//                 <p className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-600">
//                     Platform Fee
//                   </span>
//                   <span>3434</span>
//                 </p>
//                 <Separator />
//                 <p className="flex items-center justify-between">
//                   <span className="text-sm font-medium">Total</span>
//                   <span>{formatToRupee(checkoutData?.totalAmount || 0)}</span>
//                 </p>
//               </div>
//               <Button className="h-12 w-full">Proceed to Payment</Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;

"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { Separator } from "@workspace/ui/components/separator";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Plus } from "lucide-react";
import Image from "next/image";
import productimage from "../../assets/images/image-product.png";
import OrderSuccessfulPage from "./order-successful-page";
import AddressAddForm from "../address-form/address-add-form";
import { useApi } from "../../hooks/useApi";
import { getCart } from "../../lib/api/cartApi";
import { checkoutApi } from "../../lib/api/checkoutApi";
import { formatToRupee } from "../../lib/utils/formatToRupee";
import { orderApi } from "../../lib/api/orderApi";
import { toast } from "sonner";

// Razorpay Response Interface
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Declare Razorpay on Window
declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [showAddAddressSection, setShowAddAddressSection] = useState(false);
  const [checkoutData, setCheckoutData] = useState<{
    items: any[];
    totalAmount: number;
  }>();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const { execute } = useApi();

  // Load Razorpay Script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const fetchCheckoutData = async () => {
    try {
      const response = await execute(checkoutApi.get().then((res) => res.data));
      console.log(response.data);
      setCheckoutData(response.data as any);
    } catch (error: any) {
      console.log(error?.response.data);
    }
  };

  useEffect(() => {
    fetchCheckoutData();
  }, []);

  const handleAddAddress = (values: any) => {
    console.log({ values });
  };

  // Handle Payment
  const handlePayment = async () => {
    try {
      setIsProcessingPayment(true);

      // Step 1: Load Razorpay Script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Failed to load Razorpay SDK. Please check your connection.");
        setIsProcessingPayment(false);
        return;
      }

      // Step 2: Create Order on Backend
            const orderResponse: any = await execute(
              orderApi.createOrder({ addressId: "68ef43832d62aab4471b34a9" }).then((res) => res.data)
            );
            console.log({ orderResponse });

      if (!orderResponse) {
        throw new Error("Failed to create order");
      }

      const { id: orderId, amount } = orderResponse.data.razorpayOrder;
      console.log({orderId, amount})

      // Step 3: Initialize Razorpay Payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "", // Add this to your .env
        amount: amount, // Amount in paise
        currency: "INR",
        name: "Your Store Name",
        description: "Purchase from Your Store",
        order_id: orderId,
        prefill: {
          name: "Customer Name", // Get from user state
          email: "customer@example.com", // Get from user state
          contact: "9999999999", // Get from user state
        },
        theme: {
          color: "#92400e", // Your amber-950 color
        },
        handler: async (response: RazorpayResponse) => {
          // Step 4: Verify Payment on Backend
          try {
            const verifyResponse = await execute(
              fetch("/api/payment/verify", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              }).then((res) => res.json())
            );

            if (verifyResponse.success) {
              // Payment successful
              setIsOrderSuccess(true);
            } else {
              alert("Payment verification failed!");
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed!");
          } finally {
            setIsProcessingPayment(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
            alert("Payment cancelled");
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("Failed to initiate payment. Please try again.");
      setIsProcessingPayment(false);
    }
  };

  if (isOrderSuccess) {
    return <OrderSuccessfulPage />;
  }

  return (
    <div>
      <div className="py-5 px-6 lg:px-20">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/cart">Cart</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Checkout</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col lg:flex-row space-y-5 space-x-5 py-5">
          <div className="p-4 bg-white rounded-xl w-full h-min lg:w-2/3">
            <div className="flex items-center justify-between pb-2">
              <h3 className=" text-amber-950 font-medium">Shipping address</h3>
              <Button
                className="text-amber-950"
                variant={"ghost"}
                type="button"
                onClick={() => setShowAddAddressSection((prev) => !prev)}
              >
                {!showAddAddressSection ? (
                  <>
                    <Plus /> Add Address
                  </>
                ) : (
                  <>Cancel</>
                )}
              </Button>
            </div>
            <Separator />
            {showAddAddressSection ? (
              <AddressAddForm
                setShowForm={setShowAddAddressSection}
                onSubmit={handleAddAddress}
              />
            ) : (
              <div className="text-center p-4 text-gray-600">
                No addresses added
              </div>
            )}
          </div>

          <div className="flex lg:flex-col space-x-5 rounded-xl space-y-5 w-full lg:w-1/3">
            <div className="w-1/2 lg:w-full p-4 space-y-3 bg-white">
              <p className="text-xl text-amber-950 font-medium">Your cart</p>
              <Separator />
              {checkoutData?.items.map((item, idx) => (
                <div className="w-full flex items-center space-x-3" key={idx}>
                  <div className="relative h-14 w-14 rounded-lg shrink-0">
                    <Image
                      src={item.product?.images?.[0] || productimage}
                      fill
                      alt=""
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="w-full flex flex-col xl:flex-row justify-between">
                    <div>
                      <p className="text-sm">{item.productName}</p>
                      <p className="text-xs space-x-1 text-gray-600">
                        <span>Weight: {item.size} gm</span>
                        <span className="border-l-2 pl-1">
                          Qty: {item.quantity}
                        </span>
                      </p>
                    </div>
                    <p className="">{formatToRupee(item.price)}</p>
                  </div>
                </div>
              ))}
              <div className="w-full flex items-center space-x-4">
                <Input
                  className="h-12"
                  placeholder="Enter your coupon code..."
                />
                <Button className="h-12 w-24">Apply</Button>
              </div>
            </div>

            <div className="w-1/2 lg:w-full p-4 space-y-3 bg-white">
              <p className="text-xl text-amber-950 font-medium">
                Price details
              </p>
              <Separator />
              <div className="space-y-3">
                <p className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Items({checkoutData?.items.length || 0})
                  </span>
                  <span>{formatToRupee(checkoutData?.totalAmount || 0)}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Delivery Fee
                  </span>
                  <span className="text-green-600">FREE</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    Platform Fee
                  </span>
                  <span>{formatToRupee(0)}</span>
                </p>
                <Separator />
                <p className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total</span>
                  <span className="font-bold">
                    {formatToRupee(checkoutData?.totalAmount || 0)}
                  </span>
                </p>
              </div>
              <Button
                className="h-12 w-full"
                onClick={handlePayment}
                disabled={
                  isProcessingPayment ||
                  !checkoutData?.items.length ||
                  !checkoutData?.totalAmount
                }
              >
                {isProcessingPayment ? "Processing..." : "Proceed to Payment"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
