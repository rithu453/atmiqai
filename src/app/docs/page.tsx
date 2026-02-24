import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation – Atmiq AI",
  description: "Complete guide to using Atmiq AI. API documentation, tutorials, and best practices for voice cloning.",
};

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeProvider";
import Comets from "@/components/Comets";
import {
  Sparkles,
  ArrowLeft,
  BookOpen,
  Code,
  Rocket,
  Shield,
  Search,
  ChevronRight,
  Terminal,
  FileText,
  Zap,
  Link as LinkIcon,
  Key,
  Settings,
} from "lucide-react";

export default function DocsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const docSections = [
    {
      title: "Getting Started",
      icon: Rocket,
      color: "from-brand-500 to-brand-700",
      articles: [
        { title: "Introduction to Atmiq", description: "Learn what Atmiq is and how it can help you create authentic AI-generated content in your voice." },
        { title: "Creating Your First Voice Profile", description: "Step-by-step guide to upload writing samples and train your first voice profile." },
        { title: "Understanding Voice Analysis", description: "How Atmiq analyzes your tone, style, and personality to replicate your unique voice." },
        { title: "Generating Your First Response", description: "Learn how to use your voice profile to generate content that sounds like you." },
      ],
    },
    {
      title: "Core Features",
      icon: Zap,
      color: "from-blue-500 to-blue-700",
      articles: [
        { title: "Voice Cloning Technology", description: "Deep dive into how Atmiq's AI clones your writing voice from samples." },
        { title: "Multiple Voice Profiles", description: "Create and manage different voice profiles for various contexts and audiences." },
        { title: "Context-Aware Generation", description: "How Atmiq maintains consistency and understands conversation context." },
        { title: "Real-Time Generation", description: "Generate responses 10x faster with Groq-powered inference." },
        { title: "Voice Profile Refinement", description: "Improve your voice profiles over time by providing feedback on generations." },
      ],
    },
    {
      title: "Using Atmiq",
      icon: BookOpen,
      color: "from-purple-500 to-purple-700",
      articles: [
        { title: "Writing Emails with Atmiq", description: "Use your voice profile to draft professional or casual emails quickly." },
        { title: "Social Media Content", description: "Create engaging social media posts that match your authentic voice." },
        { title: "Document Writing", description: "Generate reports, articles, and documentation in your style." },
        { title: "Chat & Messaging", description: "Respond to messages and chats while maintaining your personality." },
        { title: "Content Editing & Refinement", description: "Review and edit generated content to match your intent perfectly." },
      ],
    },
    {
      title: "Advanced Topics",
      icon: Settings,
      color: "from-green-500 to-green-700",
      articles: [
        { title: "Voice Profile Settings", description: "Customize tone, formality, and style parameters for your profiles." },
        { title: "Training Best Practices", description: "Tips for providing high-quality writing samples for better results." },
        { title: "Managing Multiple Profiles", description: "Organize and switch between different voice profiles efficiently." },
        { title: "API Integration", description: "Integrate Atmiq into your workflows with REST API and SDKs." },
        { title: "Privacy & Data Security", description: "How Atmiq protects your data and ensures privacy." },
      ],
    },
  ];

  const quickLinks = [
    {
      icon: Rocket,
      title: "Quick Start",
      description: "Get up and running in 5 minutes",
      color: "text-brand-500",
    },
    {
      icon: FileText,
      title: "User Guide",
      description: "Complete guide to using Atmiq",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      title: "Feature Tutorials",
      description: "Learn about each feature in detail",
      color: "text-purple-500",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "How we protect your data",
      color: "text-green-500",
    },
  ];

  const usageExample = `Step 1: Create Your Voice Profile
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Click "New Voice Profile" in your dashboard
2. Give your profile a name (e.g., "Professional" or "Casual")
3. Paste 3-5 samples of your writing:
   • Emails you've sent
   • Messages or chat conversations
   • Articles or blog posts
   • Any text that represents your voice

4. Click "Train Voice" and wait 30-60 seconds

Step 2: Generate Content
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Select your voice profile from the dropdown
2. Enter your prompt:
   "Write an email to my team about the project delay"
3. Add context (optional):
   "Be professional but empathetic"
4. Click "Generate" and get instant results!

Step 3: Refine & Use
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Review the generated content
• Edit if needed (Atmiq learns from your edits)
• Copy to clipboard or share directly
• Rate the output to improve future generations`;

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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6">
              <BookOpen className="w-12 h-12 text-brand-500" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] leading-[0.92] mb-6">
              <span className="text-zinc-900 dark:text-white">Documentation &</span>{" "}
              <span className="text-shine">Guides</span>
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
              Learn how to use Atmiq to create AI-generated content that sounds authentically you
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-white/[0.05] border border-zinc-200 dark:border-white/[0.06] text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-brand-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                className="group p-6 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06] hover:border-brand-500/30 transition-all hover:-translate-y-1 text-left"
              >
                <link.icon className={`w-8 h-8 ${link.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {link.description}
                </p>
              </button>
            ))}
          </div>

          {/* Documentation Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {docSections.map((section, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/[0.06]"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center shadow-lg`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-3">
                  {section.articles.map((article, idx) => (
                    <button
                      key={idx}
                      className="group w-full flex items-start gap-3 p-4 rounded-lg hover:bg-zinc-50 dark:hover:bg-white/[0.03] transition-all text-left"
                    >
                      <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-brand-500 group-hover:translate-x-1 transition-all mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-zinc-900 dark:text-white group-hover:text-brand-500 dark:group-hover:text-brand-400 font-semibold mb-1">
                          {article.title}
                        </div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                          {article.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Usage Guide */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-6 h-6 text-brand-500" />
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Quick Start Guide
              </h2>
            </div>
            <div className="relative p-8 rounded-2xl bg-zinc-900 dark:bg-black border border-zinc-800">
              <pre className="text-sm text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap">
                <code>{usageExample}</code>
              </pre>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-12 rounded-2xl bg-gradient-to-br from-brand-500/10 to-blue-500/10 border border-brand-500/20">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                Ready to start using Atmiq?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
                Create your first voice profile and start generating authentic content in minutes
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
