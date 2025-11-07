import React from "react";

export const OurVision: React.FC = () => {
  return (
    <section class="py-20 md:py-28 bg-white">
      <div class="container mx-auto px-6 text-center max-w-3xl">
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900">
          🏛️ Our Vision: A New Era of Civic Power
        </h2>
        <p class="mt-8 text-lg text-slate-700 leading-relaxed">
          We envision a future where democracy is direct, effective, and truly
          representative of the people. Imagine a government that works like
          this:
        </p>
        <ul class="mt-8 space-y-6 text-lg text-slate-700 text-left md:text-center leading-relaxed">
          <li>
            Projects Get Done{" "}
            <p class="mt-1 text-slate-600">
              Popular projects, from high-speed rail to local infrastructure,
              are executed efficiently because political will is clear and
              undeniable.
            </p>
          </li>
          <li>
            Direct Democratic Action{" "}
            <p class="mt-1 text-slate-600">
              You vote on specific, relevant issues as they arise, replacing the
              frustrating cycle of only choosing between 'mid candidates' every
              few years.
            </p>
          </li>
          <li>
            Perfect Representation{" "}
            <p class="mt-1 text-slate-600">
              Representatives know exactly what their constituents want, and a
              clear, objective scorecard shows who delivered on those
              preferences—and who didn't.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};
