// api/payments.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // always approve instantly for Pi testnet
    res.json({ txid: Math.random().toString(36).substr(2, 9) });
  } else {
    res.status(405).end();
  }
}