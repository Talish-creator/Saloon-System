import type { StoredBooking } from "./bookings-store";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

export function generateReceiptHtml(b: StoredBooking): string {
  const isPaid = b.paymentMethod === "online" || b.status.toLowerCase().includes("paid");
  const paymentBadgeText = isPaid ? "PAID IN FULL" : "PAYMENT PENDING";
  const paymentBadgeBg = isPaid ? "#dcfce7" : "#fef3c7";
  const paymentBadgeColor = isPaid ? "#15803d" : "#b45309";

  const rows = b.services
    .map(
      (s) =>
        `<tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; font-size: 14px;">
            <strong style="color: #18181b;">${escapeHtml(s.name)}</strong>
            <div style="color: #71717a; font-size: 12px; margin-top: 2px;">Duration: ${escapeHtml(s.duration)}</div>
          </td>
          <td style="padding: 12px 0; border-bottom: 1px solid #f4f4f5; text-align: right; font-weight: 700; font-size: 14px; color: #18181b;">
            ${escapeHtml(s.price)}
          </td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tax Invoice - ${escapeHtml(b.bookingId)}</title>
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
      <div class="inv-ref">${escapeHtml(b.bookingId)}</div>
      <span class="badge" style="background-color: ${paymentBadgeBg}; color: ${paymentBadgeColor};">
        ${paymentBadgeText}
      </span>
    </div>
  </div>

  <div class="grid">
    <div class="box">
      <div class="box-title">Billed To</div>
      <div class="box-val">${escapeHtml(b.customer.name)}</div>
      <div class="box-sub">${escapeHtml(b.customer.email)}</div>
      <div class="box-sub">${escapeHtml(b.customer.phone)}</div>
    </div>
    <div class="box">
      <div class="box-title">Salon & Location</div>
      <div class="box-val">${escapeHtml(b.venueName)}</div>
      <div class="box-sub">${escapeHtml(b.venueAddress || "")}</div>
      <div class="box-sub" style="margin-top: 6px; font-weight: 600; color: #0f172a;">${escapeHtml(b.date)} at ${escapeHtml(b.time)}</div>
    </div>
  </div>

  <div class="box" style="margin-bottom: 24px;">
    <div class="box-title">Line Items</div>
    <table>
      ${rows}
    </table>
    <div class="total-row">
      <span class="total-label">Total Amount</span>
      <span class="total-amount">${escapeHtml(b.total)}</span>
    </div>
    <div style="margin-top: 10px; font-size: 12px; color: #64748b;">
      Payment Method: <strong>${b.paymentMethod === "online" ? `Paid Online (${escapeHtml(b.paymentRef || "Stripe/Card")})` : "Pay at Salon"}</strong>
    </div>
  </div>

  <div class="footer-note">
    Thank you for booking with Saloon System. Present this invoice at the salon if required.
  </div>
</body>
</html>`;
}

export function printBookingInvoice(b: StoredBooking) {
  if (typeof window === "undefined") return;
  const html = generateReceiptHtml(b);
  const printWindow = window.open("", "_blank", "width=800,height=900");
  if (!printWindow) {
    alert("Please allow popups to print/generate your invoice.");
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 300);
}

export function downloadBookingInvoice(b: StoredBooking) {
  if (typeof window === "undefined") return;
  const html = generateReceiptHtml(b);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `saloon-invoice-${b.bookingId}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
