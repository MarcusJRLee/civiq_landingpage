"use client";

import React, { useState } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how_it_works";
import { Footer } from "@/components/footer";
import type { CtaFormProps } from "@/components/cta_form";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Contact } from "@/components/contact";
import type { SignUpData } from "@/types/sign_up_data";
import { OurVision } from "@/components/our_vision";

function validateZip(zip: string): boolean {
  const re = /^\d{5}$/;
  return re.test(zip);
}

function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

async function sendSignupPayload(payload: SignUpData): Promise<Response> {
  try {
    console.log("Early access signup:", payload);
    return await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
  } catch (reason: unknown) {
    console.log(reason);
    return Promise.reject(reason);
  }
}

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZip(e.target.value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      setError("Email address is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!zip) {
      setError("Zip code is required.");
      return;
    }
    if (!validateZip(zip)) {
      setError("Please enter a valid 5-digit zip code.");
      return;
    }

    // Send the SignUpData to the backend.
    const payload: SignUpData = { email, zip, timestamp: Date.now() };
    const res = await sendSignupPayload(payload);
    if (res instanceof Response && !res.ok) {
      const err = await res.json();
      setError(err.error || "Something went wrong");
    } else if (res instanceof Error) {
      setError(res.message);
    }

    setSubmitted(true);
    setError("");
  };

  const formProps: Omit<CtaFormProps, "onSubmit"> = {
    email,
    zip,
    submitted,
    error,
    onEmailChange: handleEmailChange,
    onZipChange: handleZipChange,
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero {...formProps} onSubmit={handleSubmit} />
        <Features />
        <OurVision />
        <HowItWorks />
        <Contact />
      </main>
      <Footer {...formProps} onSubmit={handleSubmit} />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
