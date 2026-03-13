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
  const [zoomed, setZoomed] = useState<boolean>(false);
  const lastTapRef = useRef<number>(0);
  const ZOOM_SCALE = 1.6;

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

  const handleTouch = (ev: React.TouchEvent) => {
    const now = Date.now();
    if (now - (lastTapRef.current || 0) < 300) {
      ev.preventDefault();
      setZoomed(z => !z);
    }
    lastTapRef.current = now;
  };

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

          {(() => {
            const widthToUse = zoomed ? Math.round(pageWidth * ZOOM_SCALE) : pageWidth;
            const viewerStyle: React.CSSProperties = {
              borderRadius: 12,
              overflowX: zoomed ? 'auto' : 'hidden',
              boxShadow: '0 20px 40px rgba(2,8,23,0.08)',
              maxHeight: 'calc(100vh - 190px)',
              display: 'flex',
              // always align to top to ensure the document's top is visible
              alignItems: 'flex-start',
              justifyContent: zoomed ? 'flex-start' : 'center',
              paddingTop: 8,
            };

            return (
              <div ref={viewerWrapRef} style={viewerStyle}>
                <Document
                  file="/doc/RevistaOZONOv37.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<div style={{ padding: 40, textAlign: 'center' }}>Cargando documento...</div>}
                  noData={<div style={{ padding: 40 }}>Documento no encontrado.</div>}
                >
                  <div onDoubleClick={() => setZoomed(z => !z)} onTouchEnd={handleTouch} style={{ display: 'flex', justifyContent: zoomed ? 'flex-start' : 'center', padding: '12px' }}>
                    <div style={{ transition: 'transform .18s ease', transform: 'none', minWidth: widthToUse, paddingTop: 6 }}>
                      <Page pageNumber={pageNumber} width={widthToUse} renderTextLayer={false} renderAnnotationLayer={false} />
                    </div>
                  </div>
                </Document>
              </div>
            );
          })()}

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
