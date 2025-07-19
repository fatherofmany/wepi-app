import { useState, useEffect } from 'react';

export const usePiPayments = () => {
  const [piAuthenticated, setPiAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initializePi = async () => {
      try {
        if (window.Pi) {
          // ✅ FIXED: Added payments scope to initialization
          await window.Pi.init({ 
            version: "2.0", 
            sandbox: false, // Use production
            scope: ['username', 'payments'] // 🔥 This was missing!
          });
          console.log("Pi SDK initialized with payments scope");
        } else {
          console.warn("Pi SDK not available");
        }
      } catch (err) {
        console.error("Init error:", err);
      }
    };

    initializePi();
  }, []);

  const onIncompletePaymentFound = (payment) => {
    console.log("🟡 Incomplete payment:", payment);
    return payment.paymentId;
  };

  const authenticateWithPi = async () => {
    if (!window?.Pi) return alert("Open this in Pi Browser");

    setLoading(true);
    try {
      const scopes = ['username', 'payments'];
      const auth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
      setUser(auth.user);
      setAccessToken(auth.accessToken);
      setPiAuthenticated(true);
      console.log("✅ Authenticated with scopes:", scopes);
      alert(`Welcome ${auth.user.username}`);
    } catch (err) {
      console.error("Auth error:", err);
      alert("Auth failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const payPi = async (amount, memo = 'WePi purchase', metadata = {}) => {
    if (!window?.Pi) {
      console.warn("Pi SDK not found");
      alert("Pi SDK not available. Open in Pi Browser.");
      return;
    }

    if (!piAuthenticated || !accessToken) {
      console.warn("User not authenticated for payments", { piAuthenticated, accessToken });
      alert("Authenticate first to make payments.");
      return;
    }

    try {
      console.log("🚀 Creating payment with amount:", amount);
      
      const payment = await new Promise((resolve, reject) => {
        const paymentData = {
          amount: parseFloat(amount),
          memo,
          metadata: {
            ...metadata,
            userId: user?.uid || 'anonymous',
            timestamp: new Date().toISOString()
          }
        };

        console.log("Payment data:", paymentData);

        const callbacks = {
          onReadyForServerApproval: async (paymentId) => {
            console.log("✅ Payment ready for approval:", paymentId);
            try {
              const res = await fetch("https://wepi-backend-production.up.railway.app/payments/approve", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({ paymentId, amount, memo })
              });
              
              if (!res.ok) {
                const errorText = await res.text();
                console.error("Server response:", res.status, errorText);
                throw new Error(`Server approval failed: HTTP ${res.status}`);
              }
              
              const result = await res.json();
              console.log("✅ Server approved payment:", result);
            } catch (err) {
              console.error("💥 Approval error:", err);
              reject(err);
            }
          },
          
          onReadyForServerCompletion: async (paymentId, txid) => {
            console.log("🎉 Payment ready for completion:", paymentId, txid);
            try {
              const res = await fetch("https://wepi-backend-production.up.railway.app/payments/complete", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({ paymentId, txid })
              });
              
              if (!res.ok) {
                const errorText = await res.text();
                console.error("Server response:", res.status, errorText);
                throw new Error(`Completion failed: HTTP ${res.status}`);
              }
              
              const result = await res.json();
              console.log("✅ Payment completed:", result);
              alert(`✅ Payment complete: ${txid}`);
              resolve({ paymentId, txid });
            } catch (err) {
              console.error("💥 Completion error:", err);
              reject(err);
            }
          },
          
          onCancel: (paymentId) => {
            console.log("❌ Payment cancelled:", paymentId);
            reject(new Error("Payment cancelled by user"));
          },
          
          onError: (error, payment) => {
            console.error("💥 Payment error:", error, payment);
            reject(error);
          }
        };

        // Create the payment
        window.Pi.createPayment(paymentData, callbacks);
      });

      return payment;
    } catch (err) {
      console.error("💥 Payment error:", err.message);
      alert(`Payment failed: ${err.message}`);
      throw err;
    }
  };

  return {
    authenticateWithPi,
    payPi,
    piAuthenticated,
    user,
    loading
  };
};