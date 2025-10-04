/* payment.js */
function simulatePayment(amountCents, description) {
  return new Promise((res)=>{ setTimeout(()=>res({ok:true,id:'pay_'+Date.now(),amount:amountCents}),700); });
}
