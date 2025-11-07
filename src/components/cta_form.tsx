"use client";

import React from "react";

export interface CtaFormProps {
  email: string;
  zip: string;
  submitted: boolean;
  error: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onZipChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const CtaForm: React.FC<CtaFormProps> = ({
  email,
  zip,
  submitted,
  error,
  onEmailChange,
  onZipChange,
  onSubmit,
}) => {
  if (submitted) {
    return (
      <div
        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md shadow-lg text-center"
        role="alert"
      >
        <p className="font-bold">Thank you for your interest!</p>
        <p>We&apos;ve received your submission. We&apos;ll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          name="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email address"
          className="grow w-full px-4 py-2.5 text-base text-slate-900 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none transition duration-150 ease-in-out"
          aria-label="Email address for early access"
        />
        <input
          type="text"
          name="zip"
          pattern="\d*"
          value={zip}
          onChange={onZipChange}
          placeholder="Zip Code"
          maxLength={5}
          className="w-full sm:w-28 px-4 py-2.5 text-base text-slate-900 bg-white border border-slate-300 rounded-md focus:ring-2 focus:ring-brand-purple focus:border-brand-purple outline-none transition duration-150 ease-in-out"
          aria-label="Zip code"
        />
        <button
          type="submit"
          className="px-6 py-2.5 text-base font-semibold text-white bg-brand-purple rounded-md shadow-sm hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple transition-colors whitespace-nowrap"
        >
          Get Early Access
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-red-600 text-left">{error}</p>}
    </form>
  );
};
