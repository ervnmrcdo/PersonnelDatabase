import { NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { pdfBase64 } = await req.json();

    const signaturePath = path.join(process.cwd(), 'public/signature.png');
    const pdf = await PDFDocument.load(pdfBase64);

    const signature = await pdf.embedPng(fs.readFileSync(signaturePath));

    const lastPage = pdf.getPages()[pdf.getPages().length - 1];
    const height = lastPage.getSize().height;

    lastPage.drawImage(signature, {
      x: 230,
      y: 680,
      width: 300,
      height: 300,
    });

    const pdfInBytes = await pdf.save();

    return NextResponse.json({
      pdfInBytes: Array.from(pdfInBytes), // Convert Uint8Array to regular array for JSON
    });

  } catch (err) {
    console.error('Error signing PDF:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Internal Server error: ${errorMessage}` },
      { status: 500 }
    );
  }
}