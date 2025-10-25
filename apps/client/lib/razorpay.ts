// services/razorpay.service.ts

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpayResponse) => void;
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

class RazorpayService {
  private razorpayKey: string;

  constructor() {
    this.razorpayKey = process.env.VITE_RAZORPAY_KEY_ID || '';
  }

  // Load Razorpay script dynamically
  loadRazorpayScript(): Promise<boolean> {
    return new Promise((resolve) => {
      // Check if script is already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  }

  // Initialize Razorpay payment
  async initiatePayment(
    orderId: string,
    amount: number,
    userDetails: {
      name: string;
      email: string;
      contact: string;
    },
    onSuccess: (response: RazorpayResponse) => void,
    onFailure?: () => void
  ): Promise<void> {
    const isScriptLoaded = await this.loadRazorpayScript();

    if (!isScriptLoaded) {
      alert('Failed to load Razorpay SDK. Please check your internet connection.');
      return;
    }

    const options: RazorpayOptions = {
      key: this.razorpayKey,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'Your Store Name',
      description: 'Purchase Description',
      order_id: orderId,
      prefill: {
        name: userDetails.name,
        email: userDetails.email,
        contact: userDetails.contact,
      },
      theme: {
        color: '#3399cc',
      },
      handler: (response: RazorpayResponse) => {
        onSuccess(response);
      },
      modal: {
        ondismiss: () => {
          if (onFailure) {
            onFailure();
          }
        },
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  }
}

export default new RazorpayService();
