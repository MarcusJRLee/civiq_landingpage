"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  pdfUrl: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const goToPrevPage = useCallback(
    () => setPageNumber((prev) => Math.max(1, prev - 1)),
    []
  );
  const goToNextPage = useCallback(
    () => setPageNumber((prev) => Math.min(numPages, prev + 1)),
    [numPages]
  );

  const goToPage = (page: number) => {
    setPageNumber(page);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setError("");
  };

  const onDocumentLoadError = (error: Error) => {
    setError(`Failed to load PDF: ${error.message}`);
    console.error("PDF load error:", error);
  };

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (numPages <= 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const isLeftHalf = clickX < rect.width / 2;

    if (isLeftHalf && pageNumber > 1) {
      goToPrevPage();
    } else if (!isLeftHalf && pageNumber < numPages) {
      goToNextPage();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (numPages <= 1) return;
      if (e.key === "ArrowLeft" && pageNumber > 1) {
        goToPrevPage();
      } else if (e.key === "ArrowRight" && pageNumber < numPages) {
        goToNextPage();
      }
    },
    [numPages, pageNumber, goToPrevPage, goToNextPage]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="bg-white overflow-hidden rounded-xl">
      {error ? (
        <div className="p-8 text-center text-red-500">{error}</div>
      ) : (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="p-8 text-center text-slate-500">Loading PDF...</div>
          }
        >
          <div
            className="relative flex justify-center bg-slate-50 cursor-pointer w-full"
            style={{ aspectRatio: "16/9" }}
            onClick={handlePageClick}
          >
            {/* ---- LEFT ARROW (responsive size) ---- */}
            {numPages > 1 && pageNumber > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevPage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-[8vw] h-[12vw] max-w-16 max-h-24 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity z-10"
                aria-label="Previous page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
            )}

            {/* ---- RIGHT ARROW (responsive size) ---- */}
            {numPages > 1 && pageNumber < numPages && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextPage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-[8vw] h-[12vw] max-w-16 max-h-24 flex items-center justify-center opacity-30 hover:opacity-100 transition-opacity z-10"
                aria-label="Next page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-full h-full"
                >
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                </svg>
              </button>
            )}

            {/* ---- PAGES ---- */}
            {Array.from(new Array(numPages), (el, index) => {
              const isVisible = pageNumber === index + 1;

              return (
                <div
                  key={`page_${index + 1}`}
                  className={isVisible ? "" : "hidden"}
                  style={{
                    aspectRatio: "16/9",
                    width: "100%",
                    overflow: "hidden",
                    display: isVisible ? "flex" : "none",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div className="[&_canvas]:m-0! [&_canvas]:border-0! [&_div]:m-0! [&_div]:border-0! w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:max-w-full! [&_canvas]:max-h-full! [&_canvas]:w-full! [&_canvas]:h-full! [&_canvas]:object-contain!">
                      <Page
                        pageNumber={index + 1}
                        width={1920}
                        loading={null}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ---- PAGE INDICATOR: CIRCLES ---- */}
          {numPages > 1 && (
            <div className="flex justify-center items-center gap-1 py-2 px-4">
              {Array.from({ length: numPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPage(i + 1);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    pageNumber === i + 1
                      ? "bg-brand-purple"
                      : "border border-slate-100 bg-slate-100"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </Document>
      )}
    </div>
  );
};
