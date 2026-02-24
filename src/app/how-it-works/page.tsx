"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeProvider";
import Comets from "@/components/Comets";
import {
  Sparkles,
  ArrowLeft,
  Upload,
  Brain,
  Wand2,
  CheckCircle,
  ArrowRight,
  FileText,
  Zap,
  MessageSquare,
} from "lucide-react";

export default function HowItWorksPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "How Atmiq AI Works – Voice Cloning Process";
  }, []);

  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Upload Your Writing",
      description: "Paste samples of your writing — emails, messages, articles, or any text that represents your voice. The more diverse, the better.",
      color: "from-brand-500 to-brand-700",
    },
    {
      number: "02",
      icon: Brain,
      title: "AI Analyzes Your Style",
      description: "Our advanced AI deconstructs your tone, vocabulary, sentence structure, and personality traits to build a comprehensive voice profile.",
      color: "from-blue-500 to-blue-700",
    },
    {
      number: "03",
      icon: Wand2,
      title: "Generate Authentic Content",
      description: "Ask Atmiq to write anything — emails, messages, documents. It responds in your voice, matching your style perfectly.",
      color: "from-purple-500 to-purple-700",
    },
    {
      number: "04",
      icon: CheckCircle,
      title: "Review & Refine",
      description: "Edit the output if needed, and Atmiq learns from your changes to improve future generations.",
      color: "from-green-500 to-green-700",
    },
  ];

  const useCases = [
    {
      icon: FileText,
      title: "Email Writing",
      description: "Draft professional emails that sound like you, saving hours each week.",
    },
    {
      icon: MessageSquare,
      title: "Social Media",
      description: "Create engaging posts and responses that maintain your authentic voice.",
    },
    {
      icon: Zap,
      title: "Content Creation",
      description: "Write articles, blog posts, and documentation in your unique style.",
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
            <div className="relative w-9 h-9 rounded-xl shadow-lg shadow-brand-600/20 overflow-hidden">
              <img src="/image.png" alt="Atmiq Logo" className="w-full h-full object-cover" />
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
          <div className="text-center mb-20">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] leading-[0.92] mb-6">
              <span className="text-zinc-900 dark:text-white">How</span>{" "}
              <span className="text-shine">It Works</span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              From voice cloning to content generation in four simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-16 mb-32">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                <div className="flex-shrink-0 relative">
                  <div className="text-8xl font-black text-zinc-200 dark:text-white/5">
                    {step.number}
                  </div>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block">
                    <ArrowRight className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-center text-zinc-900 dark:text-white mb-12">
              Perfect for any use case
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] hover:border-brand-500/30 transition-all hover:-translate-y-1"
                >
                  <useCase.icon className="w-10 h-10 text-brand-500 mb-4" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {useCase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-12 rounded-2xl bg-gradient-to-br from-brand-500/10 to-blue-500/10 border border-brand-500/20">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Ready to try it yourself?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                Start cloning your voice in minutes and experience authentic AI-generated content
              </p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-[15px] transition-all hover:-translate-y-0.5 shadow-2xl"
              >
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
