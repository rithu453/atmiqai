"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/ThemeProvider";
import Comets from "@/components/Comets";
import {
  Sparkles,
  ArrowRight,
  Mic,
  Brain,
  MessageSquare,
  Zap,
  Shield,
  Globe,
  ChevronRight,
  Check,
  Star,
  BarChart3,
  Clock,
  Users,
  Fingerprint,
  Layers,
  Lock,
  Terminal,
  Quote,
  Play,
} from "lucide-react";

/* ”€”€”€ Animated counter hook ”€”€”€ */
function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export default function LandingPage() {
  const router = useRouter();
  const [activeDemo, setActiveDemo] = useState(0);

  const stat1 = useCounter(2847);
  const stat2 = useCounter(98);
  const stat3 = useCounter(143);

  /* ”€”€ Demo rotation ”€”€ */
  const demos = [
    {
      input: "yo can we push the deploy to friday? im not vibing with the current auth flow tbh. also tell jake to stop merging to main without pinging me first lol",
      output: "yo so here's the thing — friday's def doable but only if we lock down the auth middleware by thursday EOD. the current flow is lowkey janky and i refuse to ship that. also yeah jake's been going rogue on main, i'll ping him. no more yolo merges on my watch lol",
      label: "Casual Dev Lead",
    },
    {
      input: "Dear Board, I wanted to provide an update on Q4 performance. Our revenue grew 34% YoY, driven primarily by enterprise expansion. I recommend we allocate additional resources to the APAC region.",
      output: "Dear Board, Following our discussion on strategic priorities, I'd like to recommend we accelerate the APAC investment thesis. The 34% YoY growth validates our enterprise positioning, and early signals from the Singapore pilot suggest a 2.3x LTV improvement. I believe a measured increase in regional headcount would be prudent at this juncture.",
      label: "Executive Voice",
    },
    {
      input: "ok so basically machine learning is just fancy curve fitting right?? like the model sees data, draws a wiggly line through it, and prays it generalizes. i'm oversimplifying but that's the intuition imo",
      output: "alright so you wanna understand transformers? think of attention like this — imagine you're reading a sentence and your brain automatically highlights the important words. that's literally what the attention mechanism does, it assigns weights to tokens. is it more complex than that? obviously. but the intuition is solid imo. the math is just matrix multiplication dressed up in a suit.",
      label: "Tech Educator",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDemo((prev) => (prev + 1) % demos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [demos.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7f7f8] dark:bg-[#09090d]">
      {/* ••••••••••••••• BACKGROUND SYSTEM ••••••••••••••• */}
      <div className="grid-pattern fixed inset-0 animate-grid-fade" />
      <Comets count={16} />
      <div className="fixed top-[-25%] left-[-15%] w-[800px] h-[800px] rounded-full bg-brand-200/30 dark:bg-brand-700/8 blur-[200px] animate-float" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-blue-200/20 dark:bg-blue-600/6 blur-[180px] animate-float-delayed" />
      <div className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-200/15 dark:bg-brand-500/4 blur-[150px]" />

      {/* Noise overlay */}
      <div className="fixed inset-0 opacity-[0.015] z-[1]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      {/* ••••••••••••••• NAVBAR ••••••••••••••• */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl shadow-lg shadow-brand-600/20 overflow-hidden">
            <img src="/image.png" alt="Atmiq Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Atmiq</span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-brand-500/15 text-brand-500 dark:text-brand-400 border border-brand-500/20 uppercase tracking-widest">AI</span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          <a
            href="/"
            className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
          >
            Home
          </a>
          <a
            href="/features"
            className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
          >
            Features
          </a>
          <a
            href="/how-it-works"
            className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
          >
            How it Works
          </a>
          <a
            href="/pricing"
            className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
          >
            Pricing
          </a>
          <a
            href="/docs"
            className="px-4 py-2 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
          >
            Docs
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => router.push("/login")}
            className="hidden sm:block text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition px-4 py-2"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/login")}
            className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-all hover:-translate-y-0.5 shadow-lg shadow-zinc-900/10 dark:shadow-white/10"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ••••••••••••••• HERO ••••••••••••••• */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 md:pt-32 pb-16">
        {/* Announcement badge */}
        <button className="group flex items-center gap-2.5 px-5 py-2 rounded-full bg-zinc-100 dark:bg-white/[0.03] border border-zinc-300 dark:border-white/[0.06] hover:border-brand-500/30 mb-10 transition-all hover:bg-brand-50 dark:hover:bg-brand-500/5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20">
            <Zap className="w-2.5 h-2.5 text-brand-500 dark:text-brand-400" />
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition">
            Powered by Groq — 10x faster inference
          </span>
          <ChevronRight className="w-3 h-3 text-zinc-400 dark:text-zinc-600 group-hover:text-brand-500 dark:group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
        </button>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-[-0.035em] leading-[0.92] max-w-5xl">
          <span className="text-zinc-900 dark:text-white">AI that writes in</span>
          <br />
          <span className="text-shine">your voice.</span>
        </h1>

        <p className="mt-8 text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed font-light">
          Paste your writing once. Atmiq deconstructs your tone, rhythm, and
          personality — then speaks as you across every conversation.
        </p>

        {/* CTA Row */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="group relative flex items-center gap-3 px-8 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-[15px] transition-all hover:-translate-y-0.5 shadow-2xl shadow-zinc-900/10 dark:shadow-white/10 hover:shadow-zinc-900/20 dark:hover:shadow-white/20"
          >
            Start Cloning Your Voice
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group flex items-center gap-2.5 px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-white/10 flex items-center justify-center group-hover:bg-zinc-300 dark:group-hover:bg-white/15 transition">
              <Play className="w-3 h-3 ml-0.5 text-zinc-600 dark:text-white" />
            </div>
            Watch demo
          </button>
        </div>

        {/* Social proof bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <div className="flex -space-x-2.5">
            {["#7c3aed", "#2563eb", "#059669", "#d97706", "#dc2626", "#8b5cf6"].map((color, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-white dark:border-[#09090d] flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: color }}
              >
                {["S", "M", "A", "R", "K", "J"][i]}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-xs text-zinc-500 ml-1.5">
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold">4.9/5</span> from 2,400+ users
            </span>
          </div>
        </div>
      </section>

      {/* ••••••••••••••• LIVE DEMO ••••••••••••••• */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-24 pt-8">
        <div className="glass rounded-2xl overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-zinc-300/80 dark:border-white/[0.04] bg-zinc-50/80 dark:bg-white/[0.02]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="ml-4 flex-1 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.04] text-xs text-zinc-500">
                <Lock className="w-3 h-3" />
                app.atmiq.ai/dashboard
              </div>
            </div>
          </div>

          {/* Demo content */}
          <div className="grid md:grid-cols-2 divide-x divide-zinc-200/80 dark:divide-white/[0.04]">
            {/* Input side */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-widest">User&apos;s Voice Sample</span>
              </div>
              <div className="bg-zinc-50 dark:bg-black/30 rounded-xl p-4 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-mono min-h-[120px] transition-all duration-700">
                &ldquo;{demos[activeDemo].input}&rdquo;
              </div>
            </div>

            {/* Output side */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">Atmiq&apos;s Response</span>
              </div>
              <div className="bg-zinc-50 dark:bg-black/30 rounded-xl p-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed min-h-[120px] transition-all duration-700">
                {demos[activeDemo].output}
              </div>
            </div>
          </div>

          {/* Demo tabs */}
          <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-zinc-300/80 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
            {demos.map((demo, i) => (
              <button
                key={i}
                onClick={() => setActiveDemo(i)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeDemo === i
                    ? "bg-brand-500/15 text-brand-600 dark:text-brand-300 border border-brand-500/25"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 border border-transparent"
                }`}
              >
                {demo.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ••••••••••••••• METRICS BAR ••••••••••••••• */}
      <section className="relative z-10 border-y border-zinc-300 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01] py-16">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {[
            { ref: stat1.ref, value: stat1.count.toLocaleString() + "+", label: "Active Users", icon: Users },
            { ref: stat2.ref, value: stat2.count + "%", label: "Voice Accuracy", icon: Fingerprint },
            { ref: stat3.ref, value: stat3.count + "ms", label: "Avg. Latency", icon: Clock },
            { ref: null, value: "10M+", label: "Messages Generated", icon: MessageSquare },
          ].map((stat, i) => (
            <div key={i} ref={stat.ref} className="flex flex-col items-center text-center">
              <stat.icon className="w-5 h-5 text-zinc-400 dark:text-zinc-600 mb-3" />
              <div className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1.5 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ••••••••••••••• VIDEO SHOWCASE ••••••••••••••• */}
      <section className="relative z-10 py-28 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[900px] h-[500px] rounded-full bg-brand-600/10 dark:bg-brand-600/8 blur-[120px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-widest">See it in action</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Watch Atmiq mirror
              <span className="text-shine ml-2">a real voice.</span>
            </h2>
            <p className="mt-3 text-zinc-500 text-base max-w-md mx-auto">
              Paste your writing, sync your voice, and chat — all in under 60 seconds.
            </p>
          </div>

          {/* Video container */}
          <div className="relative group">
            {/* Outer glow ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-brand-500/20 via-blue-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

            <div className="relative glass rounded-2xl overflow-hidden shadow-2xl shadow-black/20 dark:shadow-black/40">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-300/80 dark:border-white/[0.04] bg-zinc-50/90 dark:bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="ml-4 flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-zinc-100 dark:bg-white/[0.04] text-xs text-zinc-500">
                    <Lock className="w-3 h-3" />
                    app.atmiq.ai/dashboard
                  </div>
                </div>
              </div>

              {/* Video embed area */}
              <div className="relative aspect-video bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-[#0c0c12] dark:to-[#09090d]">
                {/* Replace this div with your actual video:
                    <video src="/demo.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    or
                    <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ... />
                */}

                {/* Placeholder: Animated chat mockup */}
                <div className="absolute inset-0 flex">
                  {/* Full chat pane */}
                  <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-5">
                      <MessageSquare className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                      <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Atmiq AI</span>
                    </div>

                    <div className="flex-1 space-y-4 overflow-hidden">
                      {/* User message */}
                      <div className="animate-[fadeSlideUp_0.6s_ease-out_0.5s_both]">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-brand-500 dark:text-brand-400 mb-1 block">You</span>
                        <div className="rounded-xl px-4 py-2.5 text-xs leading-relaxed bg-brand-500/10 border border-brand-500/15 text-zinc-700 dark:text-zinc-200 max-w-[80%]">
                          Write me a cold email to a YC partner about Atmiq
                        </div>
                      </div>

                      {/* AI response */}
                      <div className="animate-[fadeSlideUp_0.6s_ease-out_1.2s_both]">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1 block">Atmiq</span>
                        <div className="rounded-xl px-4 py-2.5 text-xs leading-relaxed bg-zinc-200/50 dark:bg-zinc-800/40 border border-zinc-300 dark:border-zinc-700/30 text-zinc-600 dark:text-zinc-300 max-w-[85%]">
                          yo — so i built this thing called Atmiq. it clones your writing voice using Groq + Llama 3.3-70B. paste your writing, it deconstructs your style, then responds as you. not &quot;professional-you&quot; — actual you. 2.4k users, 98% accuracy, sub-200ms latency. would love 15 min to show you the demo. lmk 🤙
                        </div>
                      </div>

                      {/* Second user message */}
                      <div className="animate-[fadeSlideUp_0.6s_ease-out_2s_both]">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-brand-500 dark:text-brand-400 mb-1 block">You</span>
                        <div className="rounded-xl px-4 py-2.5 text-xs leading-relaxed bg-brand-500/10 border border-brand-500/15 text-zinc-700 dark:text-zinc-200 max-w-[80%]">
                          Now make it more formal for a board email
                        </div>
                      </div>

                      {/* Second AI response */}
                      <div className="animate-[fadeSlideUp_0.6s_ease-out_2.8s_both]">
                        <span className="text-[9px] font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 mb-1 block">Atmiq</span>
                        <div className="rounded-xl px-4 py-2.5 text-xs leading-relaxed bg-zinc-200/50 dark:bg-zinc-800/40 border border-zinc-300 dark:border-zinc-700/30 text-zinc-600 dark:text-zinc-300 max-w-[85%]">
                          Dear Partner, I&apos;m reaching out regarding Atmiq AI €” a voice-cloning platform that replicates individual writing styles with 98% accuracy. Our stack leverages Groq infrastructure for sub-200ms inference. With 2,400+ active users and strong retention metrics, I&apos;d welcome the opportunity to discuss how Atmiq fits your thesis.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play overlay button (for when you add a real video) */}
                {/*
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                    <Play className="w-8 h-8 text-zinc-900 dark:text-white ml-1" />
                  </div>
                </div>
                */}
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-xs text-zinc-400 dark:text-zinc-600 mt-6">
            Same prompt, two completely different tones — both sound like you.
          </p>
        </div>
      </section>

      {/* ••••••••••••••• HOW IT WORKS ••••••••••••••• */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-28">
        <div className="text-center mb-20">
          <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-widest">How it works</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Three steps to
            <span className="text-shine ml-2">your digital twin.</span>
          </h2>
          <p className="mt-4 text-zinc-500 text-base max-w-lg mx-auto">
            No training. No fine-tuning. No waiting. Paste, sync, chat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: Mic,
              title: "Paste Your Writing",
              desc: "Drop in emails, tweets, essays, Slack messages — anything that sounds like you. The more, the sharper the clone.",
              gradient: "from-brand-500/10 via-transparent to-transparent",
              border: "hover:border-brand-500/20",
            },
            {
              step: "02",
              icon: Brain,
              title: "Sync Your Voice",
              desc: "Atmiq deconstructs your linguistic fingerprint — tone shifts, sentence cadence, vocabulary habits, punctuation quirks.",
              gradient: "from-blue-500/10 via-transparent to-transparent",
              border: "hover:border-blue-500/20",
            },
            {
              step: "03",
              icon: MessageSquare,
              title: "Chat As Yourself",
              desc: "Every AI response mirrors your exact voice. Write emails, brainstorm, reply to DMs — all in the way only you would say it.",
              gradient: "from-cyan-500/10 via-transparent to-transparent",
              border: "hover:border-cyan-500/20",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl border border-zinc-300 dark:border-white/[0.06] ${item.border} bg-zinc-50/50 dark:bg-white/[0.02] p-8 transition-all duration-500 hover:bg-zinc-100/50 dark:hover:bg-white/[0.03] hover:-translate-y-1`}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-600 mb-6 block">{item.step}</span>
                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700/40 flex items-center justify-center mb-6 group-hover:border-brand-500/30 group-hover:shadow-lg group-hover:shadow-brand-500/5 transition-all">
                  <item.icon className="w-5.5 h-5.5 text-zinc-500 dark:text-zinc-400 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition" />
                </div>
                <h3 className="text-xl font-bold mb-3 tracking-tight text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ••••••••••••••• FEATURES GRID ••••••••••••••• */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-20">
          <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-widest">Capabilities</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Built for the way you write.
          </h2>
          <p className="mt-3 text-zinc-500 dark:text-zinc-400 text-sm">
            <a href="/features" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors underline">Explore all features →</a>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { icon: Fingerprint, title: "Voice Fingerprinting", desc: "Captures 47 stylistic dimensions — from comma frequency to sarcasm density." },
            { icon: Zap, title: "Sub-200ms Responses", desc: "Groq's LPU delivers inference faster than you can blink. No loading screens." },
            { icon: Layers, title: "Persistent Memory", desc: "Your voice profile is stored locally. Open the app — it's still you. No re-pasting." },
            { icon: Shield, title: "Zero Data Retention", desc: "We don't store your writing on our servers. Your words stay on your device." },
            { icon: Terminal, title: "API Access", desc: "Integrate your voice into any workflow. Slack bots, email drafters, customer support." },
            { icon: BarChart3, title: "Voice Analytics", desc: "See how your writing style breaks down — formality scores, vocabulary richness, tempo." },
          ].map((feat, i) => (
            <div
              key={i}
              className="group flex gap-4 p-6 rounded-xl border border-zinc-300 dark:border-white/[0.04] bg-zinc-50/30 dark:bg-white/[0.015] hover:bg-zinc-100/50 dark:hover:bg-white/[0.03] hover:border-zinc-300 dark:hover:border-white/[0.08] transition-all duration-300"
            >
              <div className="w-10 h-10 shrink-0 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-300 dark:border-zinc-700/30 flex items-center justify-center group-hover:border-brand-500/25 transition">
                <feat.icon className="w-4.5 h-4.5 text-zinc-500 group-hover:text-brand-500 dark:group-hover:text-brand-400 transition" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1 text-zinc-900 dark:text-white">{feat.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ••••••••••••••• COMPARISON TABLE ••••••••••••••• */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-widest">Why Atmiq</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Not another chatbot.
          </h2>
          <p className="mt-3 text-zinc-500 text-base">
            See how we compare to generic AI assistants. <a href="/how-it-works" className="hover:text-brand-500 dark:hover:text-brand-400 transition-colors underline">Learn how it works →</a>
          </p>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-300/80 dark:border-white/[0.06]">
                <th className="text-left py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Feature</th>
                <th className="text-center py-4 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-widest">ChatGPT</th>
                <th className="text-center py-4 px-4 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Claude</th>
                <th className="text-center py-4 px-4">
                  <span className="text-xs font-bold text-brand-500 dark:text-brand-400 uppercase tracking-widest">Atmiq</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Voice cloning from text", false, false, true],
                ["Persistent voice profiles", false, false, true],
                ["Sub-200ms latency", false, false, true],
                ["Tone matching", "Partial", "Partial", true],
                ["Zero data retention", false, false, true],
                ["Free tier", true, true, true],
              ].map((row, i) => (
                <tr key={i} className="border-b border-zinc-100 dark:border-white/[0.03] last:border-0">
                  <td className="py-3.5 px-6 text-zinc-700 dark:text-zinc-300 font-medium">{row[0] as string}</td>
                  {[row[1], row[2], row[3]].map((val, j) => (
                    <td key={j} className="py-3.5 px-4 text-center">
                      {val === true ? (
                        <Check className={`w-4 h-4 mx-auto ${j === 2 ? "text-brand-500 dark:text-brand-400" : "text-zinc-400 dark:text-zinc-500"}`} />
                      ) : val === false ? (
                        <span className="text-zinc-300 dark:text-zinc-700">—</span>
                      ) : (
                        <span className="text-xs text-zinc-500">{val as string}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ••••••••••••••• TESTIMONIALS ••••••••••••••• */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-widest">Testimonials</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Loved by creators and founders.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              quote: "I pasted 3 months of my Slack messages and now Atmiq writes my standups better than I do. My team can't tell the difference.",
              name: "Sarah K.",
              role: "Content Creator",
              rating: 5,
            },
            {
              quote: "This is the first AI tool that actually sounds like me. Not corporate-me. Not polished-me. The real me. It's kind of unsettling how good it is.",
              name: "Marcus T.",
              role: "Founder, Stealth Startup",
              rating: 5,
            },
            {
              quote: "We integrated Atmiq's API into our customer support. Response quality went up 40% because every reply matches our brand voice perfectly.",
              name: "Priya R.",
              role: "Content Creator",
              rating: 5,
            },
          ].map((t, i) => (
            <div
              key={i}
              className="glass glass-hover rounded-2xl p-7 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-5 h-5 text-brand-500/40 mb-4" />
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</div>
                <div className="text-xs text-zinc-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ••••••••••••••• PRICING ••••••••••••••• */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold text-brand-500 dark:text-brand-400 uppercase tracking-widest">Pricing</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Simple pricing. Start free.
          </h2>
          <p className="mt-3 text-zinc-500">No hidden fees. No commitment. Scale when you&apos;re ready.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              name: "Starter",
              price: "Free",
              period: "",
              desc: "For individuals exploring voice AI.",
              features: ["50 messages/day", "1 voice profile", "Basic analytics", "Community support"],
              cta: "Get Started",
              highlighted: false,
            },
            {
              name: "Pro",
              price: "$19",
              period: "/month",
              desc: "For creators and professionals.",
              features: ["Unlimited messages", "5 voice profiles", "API access", "Advanced analytics", "Priority support"],
              cta: "Start Free Trial",
              highlighted: true,
            },
            {
              name: "Enterprise",
              price: "Custom",
              period: "",
              desc: "For teams with custom needs.",
              features: ["Unlimited everything", "SSO & SAML", "Custom SLA", "Dedicated success manager", "On-prem available"],
              cta: "Contact Sales",
              highlighted: false,
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-brand-500/10 to-transparent border-2 border-brand-500/25 glow-brand scale-[1.02]"
                  : "border border-zinc-300 dark:border-white/[0.06] bg-zinc-50/30 dark:bg-white/[0.02] hover:border-zinc-300 dark:hover:border-white/[0.1]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-brand-600 text-[10px] font-bold uppercase tracking-widest text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-zinc-500 mt-1">{plan.desc}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-zinc-900 dark:text-white">{plan.price}</span>
                {plan.period && <span className="text-sm text-zinc-500">{plan.period}</span>}
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                    <Check className="w-4 h-4 text-brand-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/login")}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-black hover:bg-zinc-700 dark:hover:bg-zinc-200 shadow-lg shadow-zinc-900/10 dark:shadow-white/10 hover:-translate-y-0.5"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-300 dark:border-zinc-700/50"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ••••••••••••••• FINAL CTA ••••••••••••••• */}
      <section className="relative z-10 py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-brand-600/10 blur-[80px]" />
            <div className="relative glass rounded-3xl p-12 md:p-16 border border-brand-500/10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5 text-zinc-900 dark:text-white">
                Ready to clone
                <span className="text-shine ml-2">your voice?</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-base mb-10 max-w-md mx-auto">
                Join 2,400+ creators, founders, and teams who write faster by being themselves.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-base transition-all hover:-translate-y-1 shadow-2xl shadow-zinc-900/10 dark:shadow-white/10 hover:shadow-zinc-900/20 dark:hover:shadow-white/20"
              >
                Get Started — It&apos;s Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ••••••••••••••• FOOTER ••••••••••••••• */}
      <footer className="relative z-10 border-t border-zinc-300 dark:border-white/[0.04] bg-zinc-50/50 dark:bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg overflow-hidden">
                <img src="/image.png" alt="Atmiq Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-zinc-900 dark:text-white">Atmiq AI</span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              AI that speaks in your voice.<br />Built on Groq. Llama 3.3-70B.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: [
                { text: "Features", href: "/features" },
                { text: "Pricing", href: "/pricing" },
                { text: "API Docs", href: "/docs" },
                { text: "How it Works", href: "/how-it-works" },
              ],
            },
            {
              title: "Company",
              links: [
                { text: "About", href: "/#" },
                { text: "Blog", href: "/#" },
                { text: "Careers", href: "/#" },
                { text: "Press", href: "/#" },
              ],
            },
            {
              title: "Legal",
              links: [
                { text: "Privacy", href: "/#" },
                { text: "Terms", href: "/#" },
                { text: "Security", href: "/#" },
                { text: "Status", href: "/#" },
              ],
            },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a href={link.href} className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition">
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-300 dark:border-white/[0.04] py-6 text-center text-xs text-zinc-500 dark:text-zinc-600">
          © 2026 Atmiq AI, Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
