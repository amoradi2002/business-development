"use client";

import {
  ShieldAlert,
  AlertTriangle,
  Scale,
  Gavel,
  UserX,
  Ban,
  FileWarning,
  CheckCircle2,
} from "lucide-react";

const fraudExamples = [
  "Submitting false or misleading information on a loan application",
  "Providing fake or altered pay stubs, tax returns, or bank statements",
  "Using a straw buyer to purchase property on behalf of someone else",
  "Inflating the appraised value of a property",
  "Failing to disclose debts, liens, or other liabilities",
  "Identity theft or using another person's identity to obtain a loan",
  "Occupancy fraud — claiming a property will be owner-occupied when it will be rented or vacant",
  "Equity stripping schemes targeting vulnerable homeowners",
  "Cash-back schemes at closing that are not disclosed to the lender",
  "Falsifying employment history or income sources",
  "Air loans — loans on properties that do not exist or that the borrower does not own",
  "Submitting forged or fraudulent documents of any kind",
];

const borrowerConsequences = [
  "Federal criminal prosecution with penalties of up to 30 years in prison",
  "Fines of up to $1,000,000 per offense",
  "Civil liability and restitution to victims",
  "Immediate loan acceleration and foreclosure",
  "Permanent damage to credit history",
  "Difficulty obtaining future financing of any kind",
  "Loss of the property",
  "A permanent federal criminal record",
];

const brokerConsequences = [
  "Federal criminal prosecution with penalties of up to 30 years in prison",
  "Fines of up to $1,000,000 per offense",
  "Permanent revocation of real estate and/or mortgage license",
  "Civil lawsuits from lenders, investors, and borrowers",
  "Restitution orders to all harmed parties",
  "Disgorgement of all commissions and fees earned on fraudulent transactions",
  "Debarment from the real estate and lending industry",
  "A permanent federal criminal record",
];

export default function ZeroMortgageFraudPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-pcg-dark py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-pcg-dark-green/30 to-pcg-dark/90" />
        <div className="relative mx-auto max-w-7xl px-4 text-center lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-pcg-green">
            Prime Capital Group
          </p>
          <h1 className="font-playfair text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            OUR MORTGAGE FRAUD POLICY
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 md:text-xl">
            Protecting our investors, borrowers, and partners through
            uncompromising integrity
          </p>
        </div>
      </section>

      {/* Zero Mortgage Fraud Heading */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="text-center font-playfair text-3xl font-bold text-pcg-red md:text-4xl lg:text-5xl">
            ZERO MORTGAGE FRAUD
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-gray-700">
            Prime Capital Group, Inc. maintains a strict zero-tolerance policy
            toward mortgage fraud in any form. We are committed to ensuring the
            integrity of every transaction we fund and every relationship we
            maintain. Our commitment to fraud prevention protects our investors,
            our borrowers, and the broader real estate and lending community.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            We employ advanced software tools and rigorous manual review
            processes to detect and prevent mortgage fraud at every stage of the
            loan origination and funding process. Every application, document,
            and transaction is carefully scrutinized by our experienced
            underwriting team and verified through multiple independent sources.
          </p>

          {/* Advanced Detection */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-6 shadow-sm">
              <ShieldAlert className="h-10 w-10 text-pcg-green" />
              <h3 className="mt-4 text-lg font-bold text-pcg-dark">
                Advanced Detection Software
              </h3>
              <p className="mt-2 text-gray-600">
                We use industry-leading fraud detection software to analyze
                every loan application, verify document authenticity, and
                cross-reference borrower information against multiple databases.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-pcg-light p-6 shadow-sm">
              <Scale className="h-10 w-10 text-pcg-green" />
              <h3 className="mt-4 text-lg font-bold text-pcg-dark">
                Rigorous Manual Review
              </h3>
              <p className="mt-2 text-gray-600">
                Our experienced underwriters personally review every file,
                verifying income, employment, property values, and all
                supporting documentation through independent channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Federal Crime Warning */}
      <section className="bg-pcg-red py-12 lg:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <AlertTriangle className="mx-auto h-12 w-12 text-white" />
          <h2 className="mt-4 font-playfair text-2xl font-bold text-white md:text-3xl">
            Mortgage Fraud Is a Federal Crime
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/90">
            Under federal law (18 U.S.C. &sect; 1014), knowingly making a false
            statement or report for the purpose of influencing the action of a
            financial institution on any application, advance, commitment, or
            loan is punishable by a fine of up to $1,000,000 and/or imprisonment
            of up to 30 years. Mortgage fraud is investigated by the FBI, HUD
            Office of Inspector General, and other federal agencies.
          </p>
        </div>
      </section>

      {/* Definition */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            What Is Mortgage Fraud?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Mortgage fraud is a material misstatement, misrepresentation, or
            omission relied upon by an underwriter or lender to fund, purchase,
            or insure a mortgage loan. It includes any scheme to defraud a
            lender or other party through false or misleading information in
            connection with a real estate transaction.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-gray-700">
            Mortgage fraud can be committed by borrowers, brokers, realtors,
            appraisers, closing agents, title officers, or any other party
            involved in the loan transaction. It can occur at any stage of the
            process, from application through closing and post-closing.
          </p>
        </div>
      </section>

      {/* Common Examples */}
      <section className="bg-pcg-light py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
            Common Examples of Mortgage Fraud
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            The following are examples of activities that constitute mortgage
            fraud. This list is not exhaustive.
          </p>
          <div className="mt-8 space-y-3">
            {fraudExamples.map((example, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm"
              >
                <FileWarning className="mt-0.5 h-5 w-5 flex-shrink-0 text-pcg-red" />
                <span className="text-gray-700">{example}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consequences for Borrowers */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <UserX className="h-8 w-8 text-pcg-red" />
            <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
              Consequences for Borrowers
            </h2>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Borrowers who commit or participate in mortgage fraud face severe
            consequences, including but not limited to:
          </p>
          <div className="mt-6 space-y-3">
            {borrowerConsequences.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Ban className="mt-0.5 h-5 w-5 flex-shrink-0 text-pcg-red" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consequences for Brokers/Realtors */}
      <section className="bg-pcg-light py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Gavel className="h-8 w-8 text-pcg-red" />
            <h2 className="font-playfair text-3xl font-bold text-pcg-dark md:text-4xl">
              Consequences for Brokers &amp; Realtors
            </h2>
          </div>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            Mortgage brokers, real estate agents, and other industry
            professionals who commit, facilitate, or knowingly participate in
            mortgage fraud face additional consequences beyond criminal
            prosecution:
          </p>
          <div className="mt-6 space-y-3">
            {brokerConsequences.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <Ban className="mt-0.5 h-5 w-5 flex-shrink-0 text-pcg-red" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-pcg-dark py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <ShieldAlert className="mx-auto h-12 w-12 text-pcg-green" />
          <p className="mt-6 font-playfair text-2xl font-bold leading-relaxed text-white md:text-3xl">
            Prime Capital Group, Inc. will report any suspected mortgage fraud
            to the appropriate federal, state, and local authorities. We will
            cooperate fully with all law enforcement investigations and will
            pursue all available civil and criminal remedies against any party
            that engages in fraudulent activity.
          </p>
          <p className="mt-6 text-lg text-gray-300">
            If you suspect mortgage fraud or have been asked to participate in a
            fraudulent transaction, we encourage you to report it to the FBI at{" "}
            <span className="font-semibold text-white">tips.fbi.gov</span> or
            call{" "}
            <span className="font-semibold text-white">1-800-CALL-FBI</span>.
          </p>
        </div>
      </section>
    </div>
  );
}
