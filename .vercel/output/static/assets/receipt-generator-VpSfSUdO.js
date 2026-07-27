import{t as e}from"./createLucideIcon-nbxvpVGC.js";var t=e(`circle-check`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`m9 12 2 2 4-4`,key:`dzmm74`}]]);function n(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function r(e){let t=e.paymentMethod===`online`||e.status.toLowerCase().includes(`paid`),r=t?`PAID IN FULL`:`PAYMENT PENDING`,i=t?`#dcfce7`:`#fef3c7`,a=t?`#15803d`:`#b45309`,o=e.services.map(e=>`<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; font-size: 14px;">
            <strong style="color: #18181b;">${n(e.name)}</strong>
            <div style="color: #71717a; font-size: 12px; margin-top: 2px;">Duration: ${n(e.duration)}</div>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; text-align: right; font-weight: 700; font-size: 14px; color: #18181b;">
            ${n(e.price)}
          </td>
        </tr>`).join(``);return`<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tax Invoice - ${n(e.bookingId)}</title>
  <style>
    @media print {
      body { margin: 0; padding: 20px; }
      .no-print { display: none; }
    }
    body {
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      max-width: 680px;
      margin: 30px auto;
      padding: 32px;
      color: #18181b;
      background: #ffffff;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #18181b;
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .brand { font-size: 26px; font-weight: 900; letter-spacing: -0.5px; margin: 0; text-transform: uppercase; }
    .subtitle { color: #71717a; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
    .inv-title { font-size: 14px; font-weight: 700; color: #71717a; text-transform: uppercase; }
    .inv-ref { font-family: ui-monospace, monospace; font-size: 18px; font-weight: 800; color: #18181b; }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      margin-top: 8px;
    }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 16px; }
    .box-title { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 6px; }
    .box-val { font-size: 14px; font-weight: 700; color: #0f172a; }
    .box-sub { font-size: 12px; color: #64748b; margin-top: 2px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    .total-row { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid #18181b; padding-top: 16px; margin-top: 16px; }
    .total-label { font-size: 16px; font-weight: 800; color: #18181b; }
    .total-amount { font-size: 24px; font-weight: 900; color: #18181b; }
    .footer-note { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #a1a1aa; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="brand">Saloon System</h1>
      <div class="subtitle">Official Booking Invoice</div>
    </div>
    <div style="text-align: right;">
      <div class="inv-title">Invoice Ref</div>
      <div class="inv-ref">${n(e.bookingId)}</div>
      <span class="badge" style="background-color: ${i}; color: ${a};">
        ${r}
      </span>
    </div>
  </div>

  <div class="grid">
    <div class="box">
      <div class="box-title">Billed To</div>
      <div class="box-val">${n(e.customer.name)}</div>
      <div class="box-sub">${n(e.customer.email)}</div>
      <div class="box-sub">${n(e.customer.phone)}</div>
    </div>
    <div class="box">
      <div class="box-title">Salon & Location</div>
      <div class="box-val">${n(e.venueName)}</div>
      <div class="box-sub">${n(e.venueAddress||``)}</div>
      <div class="box-sub" style="margin-top: 6px; font-weight: 600; color: #0f172a;">${n(e.date)} at ${n(e.time)}</div>
    </div>
  </div>

  <div class="box" style="margin-bottom: 24px;">
    <div class="box-title">Line Items</div>
    <table>
      ${o}
    </table>
    <div class="total-row">
      <span class="total-label">Total Amount</span>
      <span class="total-amount">${n(e.total)}</span>
    </div>
    <div style="margin-top: 10px; font-size: 12px; color: #64748b;">
      Payment Method: <strong>${e.paymentMethod===`online`?`Paid Online (${n(e.paymentRef||`Stripe/Card`)})`:`Pay at Salon`}</strong>
    </div>
  </div>

  <div class="footer-note">
    Thank you for booking with Saloon System. Present this invoice at the salon if required.
  </div>
</body>
</html>`}function i(e){if(typeof window>`u`)return;let t=r(e),n=window.open(``,`_blank`,`width=800,height=900`);if(!n){alert(`Please allow popups to print/generate your invoice.`);return}n.document.write(t),n.document.close(),n.focus(),setTimeout(()=>{n.print()},300)}function a(e){if(typeof window>`u`)return;let t=r(e),n=new Blob([t],{type:`text/html`}),i=URL.createObjectURL(n),a=document.createElement(`a`);a.href=i,a.download=`saloon-invoice-${e.bookingId}.html`,a.click(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}export{i as n,t as r,a as t};