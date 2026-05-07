export function getTimelineState(status: string | undefined): {
  bookingConfirmed: "done" | "current" | "pending";
  agentAssigned: "done" | "current" | "pending";
  collected: "done" | "current" | "pending";
  paymentReleased: "done" | "current" | "pending";
} {
  switch (status) {
    case "INSPECTION_SCHEDULED":
      return {
        bookingConfirmed: "current",
        agentAssigned: "pending",
        collected: "pending",
        paymentReleased: "pending",
      };
    case "UNDER_ASSESSMENT":
      return {
        bookingConfirmed: "done",
        agentAssigned: "current",
        collected: "pending",
        paymentReleased: "pending",
      };
    case "OFFER_SENT":
    case "ACCEPTED":
      return {
        bookingConfirmed: "done",
        agentAssigned: "done",
        collected: "current",
        paymentReleased: "pending",
      };
    case "PAID":
      return {
        bookingConfirmed: "done",
        agentAssigned: "done",
        collected: "done",
        paymentReleased: "done",
      };
    default:
      return {
        bookingConfirmed: "current",
        agentAssigned: "pending",
        collected: "pending",
        paymentReleased: "pending",
      };
  }
}
