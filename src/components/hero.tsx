import React from "react";
import { CtaForm } from "./cta_form";
import type { CtaFormProps } from "./cta_form";
import dynamic from "next/dynamic";

// 1. Define the props type for PDFViewer (You likely need to create this in ./pdf_viewer or import it)
type PDFViewerProps = { pdfUrl: string }; // <-- New: Define the props type

// 2. Dynamic import with ssr: false - The loader function needs to return the component's default export
// We also inform 'dynamic' of the component's props via the generic.
const PDFViewer = dynamic<PDFViewerProps>( // <-- Change: Add generic type
  () => import("./pdf_viewer").then((mod) => mod.PDFViewer), // <-- Change: Explicitly return the named export
  {
    ssr: false,
    loading: () => <p>Loading PDF Viewer...</p>,
  }
);

export const Hero: React.FC<CtaFormProps> = (props) => {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
            Your Government,{" "}
            <span className="text-brand-purple">In Your Hands.</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-600">
            The platform for modern governance. Hold politicians accountable,
            shape policy, and be part of a more transparent democracy.
          </p>
          <div className="mt-10 max-w-2xl mx-auto">
            <CtaForm {...props} />
          </div>

          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
              How it works
            </h2>
            <div className="max-w-4xl mx-auto">
              <PDFViewer pdfUrl="https://storage.googleapis.com/civiq_landingpage_staticassets/how_it_works.pdf" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
