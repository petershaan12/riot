import QRCode from "qrcode";
import { db } from "@/lib/db";

const generateQRCode = async (text: string) => {
  try {
    const qrCodeImage = await QRCode.toDataURL(text);
    return qrCodeImage;
  } catch (error) {
    throw new Error("Failed to generate QR code");
  }
};

export const generateTicketBarcode = async (
  userId: string,
  eventId: string
) => {
  const qrCodeText = `${userId}-${eventId}`;
  const qrCodeImage = await generateQRCode(qrCodeText);

  // Simpan barcodeImage ke database atau kembalikan sebagai response
  // Contoh: Simpan dalam collection "tickets"
  const ticket = await db.ticket.create({
    data: {
      userId,
      eventId,
      qrCodeImage, // Simpan barcode sebagai string base64
    },
  });

  return ticket.id;
};

export const getTicketQRCode = async (id: string) => {
  try {
    const ticket = await db.ticket.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        event: {
          select: {
            title: true,
            date: true,
            location: true,
          },
        },
        attendance: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    if (!ticket) {
      return { error: "Ticket not found" };
    }

    return ticket;
  } catch {
    return null;
  }
};
