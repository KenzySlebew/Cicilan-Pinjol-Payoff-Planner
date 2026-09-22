import { Debt } from "@/types/debt";

/**
 * Utility to generate and download an iCalendar (.ics) file
 * for all active debts. This allows users to import due date reminders
 * directly into Apple Calendar, Google Calendar, or Outlook
 * with 100% offline privacy (no email or backend server needed).
 */
export function exportDebtsToCalendar(debts: Debt[]): void {
  if (debts.length === 0) return;

  const now = new Date();
  const timestamp = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const events = debts.map((debt) => {
    // Determine the next due date for the event start
    const year = now.getFullYear();
    const month = now.getMonth();
    const targetDueDay = Math.min(debt.dueDay, 28); // Safe day of month

    // Create event date in UTC format YYYYMMDDTHHMMSSZ
    const startDate = new Date(Date.UTC(year, month, targetDueDay, 9, 0, 0));
    const endDate = new Date(Date.UTC(year, month, targetDueDay, 10, 0, 0));

    const dtStart = startDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
    const dtEnd = endDate
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");

    const formattedPayment = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(debt.minimumPayment);

    const summary = `Jatuh Tempo: ${debt.name} (${formattedPayment})`;
    const description = `Pengingat bayar cicilan ${debt.name} sebesar ${formattedPayment} per bulan. Total sisa pokok: Rp ${debt.balance.toLocaleString("id-ID")}. Dibuat via Pelunas App (100% Offline & Privat).`;

    return [
      "BEGIN:VEVENT",
      `UID:pelunas-${debt.id}-${timestamp}@pelunas.app`,
      `DTSTAMP:${timestamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      // Recurring every month on the due day
      `RRULE:FREQ=MONTHLY;BYMONTHDAY=${targetDueDay}`,
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Pengingat Jatuh Tempo Cicilan",
      "-TRIGGER:-P1D", // 1 day before
      "END:VALARM",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "DESCRIPTION:Jatuh Tempo Hari Ini",
      "-TRIGGER:PT0M", // On the day at 09:00 AM
      "END:VALARM",
      "END:VEVENT",
    ].join("\r\n");
  });

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pelunas//Cicilan Payoff Planner//ID",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Jadwal Jatuh Tempo Cicilan (Pelunas)",
    "X-WR-TIMEZONE:Asia/Jakarta",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "jadwal-jatuh-tempo-pelunas.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
