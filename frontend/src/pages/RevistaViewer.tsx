import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonToolbar } from '@ionic/react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const RevistaViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const initialPage = 26;
  const [pageNumber, setPageNumber] = useState<number>(initialPage);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerWrapRef = useRef<HTMLDivElement | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(700);
  const historyRef = useRef<any>(null);

  // responsive width: measure container and cap at 700, with small padding
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth || 700;
      const calc = Math.max(280, Math.min(700, w - 24));
      setPageWidth(calc);
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function onDocumentLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n);
  }

  // scroll to top of viewer when changing pages
  useEffect(() => {
    if (viewerWrapRef.current) viewerWrapRef.current.scrollTop = 0;
  }, [pageNumber]);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div ref={containerRef} style={{ maxWidth: 700, width: '100%', margin: '24px auto' }}>
            <IonToolbar>
                <div style={{ marginBottom: 12 }} slot='start'>
                    <button className="btn-contact-nav" onClick={() => historyRef.current ? historyRef.current.push('/') : window.location.href = '/'}>{'<'}</button>
                </div>
                <h1>Revista — OZONO v37</h1>

            </IonToolbar>

          <div ref={viewerWrapRef} style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 20px 40px rgba(2,8,23,0.08)', maxHeight: 'calc(100vh - 170px)', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Document
              file="/doc/RevistaOZONOv37.pdf"
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div style={{ padding: 40, textAlign: 'center' }}>Cargando documento...</div>}
              noData={<div style={{ padding: 40 }}>Documento no encontrado.</div>}
            >
              <Page pageNumber={pageNumber} width={pageWidth} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
          </div>

          <div style={{ marginTop: 12, color: 'var(--text-muted)', display: 'flex', gap: 12, alignItems: 'center' }}>
            {numPages ? (
              <>
                <div style={{ fontWeight: 700 }}>{pageNumber}/{numPages}</div>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                  <button className="btn-contact-nav" onClick={() => setPageNumber(p => Math.max(1, p - 1))} disabled={pageNumber <= 1}>ANTERIOR</button>
                  <button className="btn-contact-nav" onClick={() => setPageNumber(p => Math.min(numPages || p, p + 1))} disabled={pageNumber >= (numPages || 1)}>SIGUIENTE</button>
                </div>
              </>
            ) : (
              <span>Cargando páginas...</span>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RevistaViewer;
