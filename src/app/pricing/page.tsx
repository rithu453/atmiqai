"use client";

import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeProvider";
import Comets from "@/components/Comets";
import {
  Sparkles,
  ArrowLeft,
  Check,
  Zap,
  Crown,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function PricingPage() {
  const router = useRouter();

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      price: "Free",
      period: "forever",
      description: "For individuals exploring voice AI",
      features: [
        "50 messages/day",
        "1 voice profile",
        "Basic analytics",
        "Community support",
      ],
      cta: "Get Started",
      popular: false,
      color: "from-zinc-500 to-zinc-700",
    },
    {
      name: "Pro",
      icon: Crown,
      price: "$19",
      period: "per month",
      description: "For creators and professionals",
      features: [
        "Unlimited messages",
        "5 voice profiles",
        "API access",
        "Advanced analytics",
        "Priority support",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "from-brand-500 to-brand-700",
    },
    {
      name: "Enterprise",
      icon: Building2,
      price: "Custom",
      period: "contact us",
      description: "For teams with custom needs",
      features: [
        "Unlimited everything",
        "SSO & SAML",
        "Custom SLA",
        "Dedicated success manager",
        "On-prem available",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "from-purple-500 to-purple-700",
    },
  ];

  const faqs = [
    {
      question: "Can I switch plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and never use your data to train other models.",
    },
    {
      question: "What's a voice profile?",
      answer: "A voice profile is a unique AI model trained on your writing samples to replicate your voice.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 30-day money-back guarantee for all paid plans, no questions asked.",
    },
    {
      question: "Can I use Atmiq for commercial purposes?",
      answer: "Yes, all paid plans include commercial usage rights for all generated content.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7f8] dark:bg-[#09090d]">
      {/* Background System */}
      <div className="grid-pattern fixed inset-0 animate-grid-fade" />
      <Comets count={12} />
      <div className="fixed top-[-25%] left-[-15%] w-[800px] h-[800px] rounded-full bg-brand-200/30 dark:bg-brand-700/8 blur-[200px] animate-float" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-blue-200/20 dark:bg-blue-600/6 blur-[180px] animate-float-delayed" />

      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-[0.015] z-[1]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-600/20">
              <Sparkles className="w-4.5 h-4.5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-brand-800/20 blur-sm" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Atmiq</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {["Home", "Features", "How it Works", "Pricing", "Docs"].map((item) => (
            <button
              key={item}
              onClick={() => router.push(item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`)}
              className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition px-4 py-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] leading-[0.92] mb-6">
              <span className="text-zinc-900 dark:text-white">Simple,</span>{" "}
              <span className="text-shine">Transparent Pricing</span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Choose the plan that's right for you. All plans include a 30-day money-back guarantee.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border transition-all hover:-translate-y-1 ${
                  plan.popular
                    ? "bg-white dark:bg-white/[0.05] border-brand-500 shadow-2xl shadow-brand-500/20 scale-105"
                    : "bg-white dark:bg-white/[0.03] border-zinc-200 dark:border-white/[0.06] hover:border-brand-500/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-500 text-white text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6 shadow-lg`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-zinc-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {plan.period}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push("/login")}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-[15px] transition-all hover:-translate-y-0.5 mb-8 ${
                    plan.popular
                      ? "bg-zinc-900 dark:bg-white text-white dark:text-black shadow-xl"
                      : "bg-zinc-100 dark:bg-white/[0.05] text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/[0.08]"
                  }`}
                >
                  {plan.cta}
                </button>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06]"
                >
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-12 rounded-2xl bg-gradient-to-br from-brand-500/10 to-blue-500/10 border border-brand-500/20">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Still have questions?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                Our team is here to help you find the perfect plan for your needs
              </p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-[15px] transition-all hover:-translate-y-0.5 shadow-2xl"
              >
                Contact Sales
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
