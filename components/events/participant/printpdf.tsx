"use client";

import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

type PrintPdfButtonProps = {
  data: Array<{
    name: string | undefined;
    phone: string | undefined;
    email: string | undefined;
    status: string | undefined;
  }>;
  fileName: string;
  eventTitle: string;
};

const PrintPdfButton: React.FC<PrintPdfButtonProps> = ({
  data,
  fileName,
  eventTitle,
}) => {
  const handlePrintPDF = () => {
    const doc = new jsPDF();

    // Set title and other text elements
    doc.setFontSize(18);
    doc.text(`Participant of ${eventTitle}`, 14, 22);

    // Add status explanation text
    doc.setFontSize(12);
    doc.text("Penjelasan Status:", 14, 30);
    doc.text("Going: Ticket Berhasil dipesan", 14, 36);
    doc.text("Attended: Datang Acara", 14, 42);
    doc.text("Absent: Tidak Datang Acara", 14, 48);

    const tableBody = data.map((item) => [
      item.name || "N/A", // Replace undefined with "N/A" or any default value
      item.phone || "N/A",
      item.email || "N/A",
      item.status || "N/A",
    ]);

    // Add the table
    autoTable(doc, {
      startY: 54,
      head: [["Name", "Phone Number", "Email", "Status"]],
      body: tableBody,
    });

    // Save the PDF
    doc.save(fileName);
  };

  return (
    <button
      onClick={handlePrintPDF}
      className="flex items-center bg-white text-black px-2 w-fit py-1 rounded-md hover:bg-white/60 hover:text-white"
    >
      <FaFilePdf /> <p>Print PDF</p>
    </button>
  );
};

export default PrintPdfButton;
