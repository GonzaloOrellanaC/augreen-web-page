import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import type { Response } from 'express';

const COLORS = {
  brandGreen: '#12B21E',
  brandYellow: '#E7F21C',
  textMain: '#0F172A',
  textMuted: '#64748B'
};

export async function sendBrochure(res: Response) {
  try {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="AuGreen_Brochure.pdf"');

    const doc = new PDFDocument({ size: 'A4', margin: 36 });
    doc.pipe(res);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const pageHeight = doc.page.height - doc.page.margins.top - doc.page.margins.bottom;

    // Cover: hero image full width top + brand title overlay
    const heroImg = path.join(__dirname, '..', '..', 'frontend', 'public', 'images', 'aire-acondicionado-casa.png');
    if (fs.existsSync(heroImg)) {
      try {
        doc.image(heroImg, doc.page.margins.left, doc.page.margins.top, { width: pageWidth, height: Math.round(pageHeight * 0.45), fit: [pageWidth, Math.round(pageHeight * 0.45)] });
      } catch (e) {
        // ignore image errors
      }
    }

    // Overlay title on top of image area
    const titleY = doc.page.margins.top + 28;
    doc.fillColor('white').fontSize(28).font('Helvetica-Bold').text('AuGreen', doc.page.margins.left + 24, titleY);
    doc.fillColor(COLORS.brandYellow).fontSize(28).font('Helvetica-Bold').text(' — Brochure Corporativo', doc.page.margins.left + 140, titleY);

    // Subtitle under title
    doc.moveDown(3);
    doc.fillColor(COLORS.textMuted).fontSize(11).font('Helvetica').text('Eficiencia energética • Climatización • Energías renovables', { align: 'left' });

    // Short intro box below hero
    const introY = doc.page.margins.top + Math.round(pageHeight * 0.45) + 18;
    doc.moveTo(doc.page.margins.left, introY).lineTo(doc.page.margins.left + pageWidth, introY).strokeOpacity(0.03).stroke();
    doc.fontSize(12).fillColor(COLORS.textMain).font('Helvetica-Bold').text('Quiénes somos', doc.page.margins.left, introY + 12);
    doc.fontSize(10).fillColor(COLORS.textMain).font('Helvetica').text('AuGreen es una ingeniería especializada en soluciones de eficiencia energética: climatización, bombas de calor, geotermia, aerotermia y proyectos solares fotovoltaicos. Operamos en Chile con foco en soluciones robustas, eficientes y orientadas a reducir la huella de carbono.', { width: pageWidth - 40, align: 'left' , continued: false });

    doc.moveDown(1);

    // Services columns
    const services = [
      { title: 'Paneles Solares Fotovoltaicos', desc: 'Diseño, suministro e instalación.' },
      { title: 'Climatización Residencial y Comercial', desc: 'Bombas de calor y soluciones multi-zone.' },
      { title: 'Sistemas Térmicos', desc: 'Geotermia y Aerotermia para calefacción y ACS.' }
    ];

    doc.addPage();
    // Header on second page
    doc.fillColor(COLORS.brandGreen).fontSize(20).font('Helvetica-Bold').text('Nuestros Servicios', { align: 'left' });
    doc.moveDown(0.5);
    const colWidth = (pageWidth - 24) / 3;
    let x = doc.page.margins.left;
    const yStart = doc.y;
    services.forEach((s, i) => {
      doc.rect(x, yStart - 2, colWidth - 8, 120).fillOpacity(0).strokeOpacity(0.02).stroke();
      doc.fillColor(COLORS.textMain).fontSize(12).font('Helvetica-Bold').text(s.title, x + 6, yStart + 6, { width: colWidth - 20 });
      doc.fillColor(COLORS.textMuted).fontSize(10).font('Helvetica').text(s.desc, x + 6, yStart + 32, { width: colWidth - 20 });
      x += colWidth;
    });

    // Contact / CTA block
    doc.moveDown(6);
    doc.fillColor(COLORS.brandGreen).fontSize(14).font('Helvetica-Bold').text('Contacto', { align: 'left' });
    doc.moveDown(0.3);
    doc.fillColor(COLORS.textMain).fontSize(11).font('Helvetica').text('Teléfono: +56 9 8765 4321');
    doc.text('Email: contacto@augreen.cl');
    doc.text('Dirección: Providencia 1234, Santiago, Chile');

    doc.moveDown(1);
    doc.fillColor(COLORS.brandYellow).fontSize(12).font('Helvetica-Bold').text('Solicite una auditoría energética gratuita', { align: 'left' });

    doc.end();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to generate brochure PDF', err);
    try {
      res.status(500).json({ error: 'Failed to generate brochure' });
    } catch (e) {
      // ignore
    }
  }
}
