"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeProvider";
import Comets from "@/components/Comets";
import {
  Sparkles,
  ArrowLeft,
  Brain,
  MessageSquare,
  Zap,
  Shield,
  Globe,
  Layers,
  Lock,
  Terminal,
  Fingerprint,
  BarChart3,
} from "lucide-react";

export default function FeaturesPage() {
  const router = useRouter();

  useEffect(() => {
    document.title = "Features – Atmiq AI";
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Voice Cloning",
      description: "Paste your writing once. Atmiq learns your tone, rhythm, and personality to replicate your unique voice.",
      color: "from-brand-500 to-brand-700",
    },
    {
      icon: MessageSquare,
      title: "Context-Aware Responses",
      description: "Generate responses that understand the full context of your conversation, maintaining consistency throughout.",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Powered by Groq's inference engine, get responses 10x faster than traditional AI models.",
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your writing samples and conversations are encrypted and never used to train other models.",
      color: "from-green-500 to-green-700",
    },
    {
      icon: Globe,
      title: "Multi-Platform",
      description: "Use Atmiq across web, mobile, and integrations with your favorite tools and platforms.",
      color: "from-orange-500 to-orange-700",
    },
    {
      icon: Layers,
      title: "Multiple Voice Profiles",
      description: "Create different voice profiles for various contexts — professional, casual, technical, and more.",
      color: "from-pink-500 to-pink-700",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "SOC 2 Type II compliant with enterprise-grade security and access controls.",
      color: "from-red-500 to-red-700",
    },
    {
      icon: Terminal,
      title: "API Access",
      description: "Integrate Atmiq into your existing workflows with our powerful REST API and SDKs.",
      color: "from-cyan-500 to-cyan-700",
    },
    {
      icon: Fingerprint,
      title: "Style Matching",
      description: "Automatically detect and match writing styles from different authors and contexts.",
      color: "from-indigo-500 to-indigo-700",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track usage, monitor quality, and gain insights into your AI-generated content.",
      color: "from-teal-500 to-teal-700",
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
              <span className="text-zinc-900 dark:text-white">Powerful</span>{" "}
              <span className="text-shine">Features</span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
              Everything you need to create AI-generated content that sounds authentically you
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] hover:border-brand-500/30 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-12 rounded-2xl bg-gradient-to-br from-brand-500/10 to-blue-500/10 border border-brand-500/20">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Ready to get started?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                Join thousands of users who are already using Atmiq to create authentic AI-generated content
              </p>
              <button
                onClick={() => router.push("/login")}
                className="mt-4 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-[15px] transition-all hover:-translate-y-0.5 shadow-2xl"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
