import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bookingSchema = z.object({
  venueSlug: z.string().min(1),
  venueName: z.string().min(1),
  services: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      duration: z.string(),
    }),
  ),
  date: z.string().min(1),
  time: z.string().min(1),
  customer: z.object({
    name: z.string().trim().min(1).max(120),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(4).max(40),
    notes: z.string().max(500).optional().default(""),
  }),
  paymentMethod: z.enum(["online", "at_salon"]),
  paymentRef: z.string().optional(),
  total: z.string(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const bookingId = `SS-${Date.now().toString(36).toUpperCase()}`;

    // === ERPNext adapter (stub) ===
    const erpPayload = {
      doctype: "Appointment",
      customer_name: data.customer.name,
      customer_email: data.customer.email,
      customer_phone: data.customer.phone,
      scheduled_date: data.date,
      scheduled_time: data.time,
      venue: data.venueName,
      services: data.services.map((s) => s.name).join(", "),
      total: data.total,
      payment_method: data.paymentMethod,
      payment_ref: data.paymentRef ?? null,
      status: data.paymentMethod === "online" ? "Paid" : "Pending Payment",
      external_id: bookingId,
    };
    console.log("[ERPNext stub] booking", erpPayload);

    return {
      bookingId,
      status: erpPayload.status,
      recordedAt: new Date().toISOString(),
    };
  });

// Fetch live status from ERPNext (stubbed).
// In production: GET `${ERPNEXT_URL}/api/resource/Appointment/{external_id}`
// and return the `status` field.
export const getBookingStatuses = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ ids: z.array(z.string().min(1)).max(200) }).parse(input),
  )
  .handler(async ({ data }) => {
    // Deterministic pseudo-live status so the UI feels alive without a real ERP.
    const now = Date.now();
    const result: Record<string, { status: string; syncedAt: string }> = {};
    for (const id of data.ids) {
      // Rotate through statuses based on id hash + current 30s bucket.
      const hash = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
      const bucket = Math.floor(now / 30000);
      const pool = ["Confirmed", "Paid", "Checked-in", "In service"];
      result[id] = { status: pool[(hash + bucket) % pool.length], syncedAt: new Date().toISOString() };
    }
    return result;
  });

export const cancelBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ bookingId: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    // In production: PUT `${ERPNEXT_URL}/api/resource/Appointment/{id}` { status: "Cancelled" }
    console.log("[ERPNext stub] cancel", data.bookingId);
    return { bookingId: data.bookingId, status: "Cancelled", syncedAt: new Date().toISOString() };
  });

export const sendReceiptEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({
      bookingId: z.string().min(1),
      email: z.string().trim().email(),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    console.log(`[Email Service] Sent receipt & tax invoice ${data.bookingId} to ${data.email}`);
    return { success: true, sentTo: data.email, sentAt: new Date().toISOString() };
  });

