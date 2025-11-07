"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Crucial: Set the PDF worker source for react-pdf to work correctly in the
// browser. The library itself provides a helper for this.
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

  const progress = numPages > 1 ? ((pageNumber - 1) / (numPages - 1)) * 100 : 0;

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
            className="flex justify-center bg-slate-50 relative cursor-pointer w-full"
            onClick={handlePageClick}
            style={{ aspectRatio: "16/9" }}
          >
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
                  <div className="[&_canvas]:!m-0 [&_canvas]:!border-0 [&_div]:!m-0 [&_div]:!border-0 w-full h-full flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full [&>div]:w-full [&>div]:h-full [&_canvas]:!max-w-full [&_canvas]:!max-h-full [&_canvas]:!w-full [&_canvas]:!h-full [&_canvas]:!object-contain">
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
        </Document>
      )}
      {numPages > 1 && (
        <div className="h-1 bg-slate-300 relative">
          <div
            className="h-full bg-brand-purple transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};
