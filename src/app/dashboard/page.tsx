"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  LogOut,
  Send,
  Loader2,
  MessageSquare,
  Trash2,
  Upload,
  FileText,
  Plus,
  X,
  Fingerprint,
  CheckCircle2,
  Mic,
  PenLine,
  Wand2,
  RotateCcw,
  Copy,
  Check,
  Brain,
  Zap,
} from "lucide-react";

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   TYPES
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

interface Sample {
  id: string;
  text: string;
  label: string;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PRESET SAMPLE DATA
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const PRESET_SAMPLES: Sample[] = [
  {
    id: "preset-1",
    text: "yo can we push the deploy to friday? im not vibing with the current auth flow tbh. also tell jake to stop merging to main without pinging me first lol",
    label: "Casual Slack",
  },
  {
    id: "preset-2",
    text: "Dear Board, I wanted to provide an update on Q4 performance. Our revenue grew 34% YoY, driven primarily by enterprise expansion. I recommend we allocate additional resources to the APAC region.",
    label: "Formal Email",
  },
  {
    id: "preset-3",
    text: "ok so basically machine learning is just fancy curve fitting right?? like the model sees data, draws a wiggly line through it, and prays it generalizes. i'm oversimplifying but that's the intuition imo",
    label: "Tech Explainer",
  },
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   DASHBOARD PAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
export default function DashboardPage() {
  const router = useRouter();

  /* â”€â”€ View state â”€â”€ */
  const [activeTab, setActiveTab] = useState<"tune" | "chat">("tune");

  /* â”€â”€ Tuning state â”€â”€ */
  const [samples, setSamples] = useState<Sample[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isSynced, setIsSynced] = useState(false);
  const [syncing, setSyncing] = useState(false);

  /* â”€â”€ Chat state â”€â”€ */
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [thinking, setThinking] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* â”€â”€ Auth check â”€â”€ */
  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (!session) {
      router.push("/login");
      return;
    }
    // Load saved samples
    const saved = localStorage.getItem("atmiq_samples");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSamples(parsed);
        if (parsed.length >= 2) setIsSynced(true);
      } catch {}
    }
  }, [router]);

  /* â”€â”€ Auto-scroll â”€â”€ */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  /* â”€â”€ Persist samples â”€â”€ */
  useEffect(() => {
    if (samples.length > 0) {
      localStorage.setItem("atmiq_samples", JSON.stringify(samples));
    }
  }, [samples]);

  /* â”€â”€ Add sample â”€â”€ */
  const addSample = useCallback(
    (text: string, label?: string) => {
      const trimmed = text.trim();
      if (!trimmed || trimmed.length < 10) return;
      const newSample: Sample = {
        id: `s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        text: trimmed,
        label: label || `Sample ${samples.length + 1}`,
      };
      setSamples((prev) => [...prev, newSample]);
      setCurrentInput("");
      setIsSynced(false);
    },
    [samples.length]
  );

  const removeSample = (id: string) => {
    setSamples((prev) => prev.filter((s) => s.id !== id));
    setIsSynced(false);
  };

  const loadPresets = () => {
    setSamples((prev) => {
      const existing = new Set(prev.map((s) => s.text));
      const newOnes = PRESET_SAMPLES.filter((p) => !existing.has(p.text));
      return [...prev, ...newOnes];
    });
    setIsSynced(false);
  };

  /* â”€â”€ Sync voice â”€â”€ */
  const syncVoice = async () => {
    if (samples.length < 2) return;
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsSynced(true);
    setSyncing(false);
  };

  /* â”€â”€ Build voice context string â”€â”€ */
  const getVoiceContext = () =>
    samples.map((s, i) => `[Sample ${i + 1} â€” ${s.label}]\n${s.text}`).join("\n\n");

  /* â”€â”€ Ask AI â”€â”€ */
  const handleAsk = async () => {
    const q = question.trim();
    if (!q) return;

    setQuestion("");
    setMessages((prev) => [...prev, { role: "user", text: q }]);
    setThinking(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q,
          voiceSamples: isSynced ? getVoiceContext() : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [...prev, { role: "ai", text: data.answer }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: `Error: ${err.message}` },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  const copyMessage = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_session");
    router.push("/login");
  };

  const clearChat = () => setMessages([]);

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
     RENDER
  â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#09090d] flex flex-col">
      {/* â”€â”€â”€â”€â”€ Topbar â”€â”€â”€â”€â”€ */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-zinc-300 dark:border-zinc-800/60 bg-white/80 dark:bg-[#09090d]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center glow-brand">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
            Atmiq AI
          </span>
          <Badge>BETA</Badge>
        </div>

        <div className="flex items-center gap-2">
          {/* Main navigation tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "tune" | "chat")}>
            <TabsList>
              <TabsTrigger value="tune">
                <Fingerprint className="w-3.5 h-3.5" />
                Tune Voice
              </TabsTrigger>
              <TabsTrigger value="chat">
                <MessageSquare className="w-3.5 h-3.5" />
                Chat
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1" />
          <ThemeToggle />
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log out</span>
          </Button>
        </div>
      </nav>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         TUNE VOICE TAB
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {activeTab === "tune" && (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <Fingerprint className="w-5 h-5 text-brand-500 dark:text-brand-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Tune Your Voice
                  </h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    Feed your writing samples â€” Atmiq learns to talk like you
                  </p>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center gap-3 mt-5">
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border",
                    isSynced
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                      : "bg-zinc-100 dark:bg-zinc-800/40 border-zinc-300 dark:border-zinc-700/40 text-zinc-500"
                  )}
                >
                  {isSynced ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <Brain className="w-3.5 h-3.5" />
                  )}
                  {isSynced ? "Voice synced" : "Not synced yet"}
                </div>
                <Badge variant="secondary">
                  {samples.length} sample{samples.length !== 1 && "s"} loaded
                </Badge>
              </div>
            </div>

            {/* â”€â”€ Add sample card â”€â”€ */}
            <div className="glass rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <PenLine className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Add Writing Sample
                  </h3>
                </div>
                <Button variant="ghost" size="sm" onClick={loadPresets}>
                  <Wand2 className="w-3.5 h-3.5" />
                  Load Presets
                </Button>
              </div>

              <Textarea
                placeholder="Paste a message, email, tweet, slack message â€” anything you've written. The more diverse your samples, the better Atmiq learns your voice..."
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                className="min-h-[120px] mb-4"
              />

              <div className="flex items-center justify-between">
                <p className="text-[11px] text-zinc-400 dark:text-zinc-600">
                  Min 10 characters Â· Add at least 2 samples to sync
                </p>
                <Button
                  size="sm"
                  onClick={() => addSample(currentInput)}
                  disabled={currentInput.trim().length < 10}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Sample
                </Button>
              </div>
            </div>

            {/* â”€â”€ Samples list â”€â”€ */}
            {samples.length > 0 && (
              <div className="space-y-3 mb-8">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 mb-3">
                  Your Dataset ({samples.length})
                </h3>

                {samples.map((sample) => (
                  <div
                    key={sample.id}
                    className="group glass rounded-xl p-4 hover:border-brand-500/20 transition-all"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-600 shrink-0" />
                          <Badge variant="secondary">{sample.label}</Badge>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-600">
                            {sample.text.length} chars
                          </span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                          {sample.text}
                        </p>
                      </div>
                      <button
                        onClick={() => removeSample(sample.id)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-500 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* â”€â”€ Sync button â”€â”€ */}
            {samples.length >= 2 && (
              <div className="flex flex-col items-center gap-3 py-6">
                <Button
                  size="lg"
                  onClick={syncVoice}
                  disabled={syncing || isSynced}
                  className="min-w-[220px]"
                >
                  {syncing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing your voice...
                    </>
                  ) : isSynced ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Voice Synced
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Sync My Voice
                    </>
                  )}
                </Button>

                {isSynced && (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setActiveTab("chat");
                        setTimeout(() => inputRef.current?.focus(), 100);
                      }}
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Start Chatting
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsSynced(false);
                      }}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Re-tune
                    </Button>
                  </div>
                )}

                {!isSynced && !syncing && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-600">
                    Atmiq will analyze your tone, vocabulary, and style
                  </p>
                )}
              </div>
            )}

            {/* â”€â”€ Empty state â”€â”€ */}
            {samples.length === 0 && (
              <div className="flex flex-col items-center text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700/30 flex items-center justify-center mb-5">
                  <Upload className="w-7 h-7 text-zinc-400 dark:text-zinc-600" />
                </div>
                <h3 className="text-base font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                  No samples yet
                </h3>
                <p className="text-sm text-zinc-400 dark:text-zinc-600 max-w-sm mb-5">
                  Add your writing samples above, or load presets to see how it
                  works. The more you add, the better Atmiq mirrors your voice.
                </p>
                <Button variant="secondary" size="sm" onClick={loadPresets}>
                  <Wand2 className="w-3.5 h-3.5" />
                  Try with Presets
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
         CHAT TAB
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      {activeTab === "chat" && (
        <div className="flex-1 flex flex-col">
          {/* Chat sub-header */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-zinc-300 dark:border-zinc-800/40 bg-white/50 dark:bg-[#09090d]/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-brand-500 dark:text-brand-400" />
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">
                  Atmiq AI
                </h2>
              </div>
              {isSynced ? (
                <Badge variant="success">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Voice Active
                  </span>
                </Badge>
              ) : (
                <Badge variant="secondary">Generic Mode</Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isSynced && samples.length < 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("tune")}
                >
                  <Fingerprint className="w-3.5 h-3.5" />
                  Tune Voice First
                </Button>
              )}
              {messages.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearChat}>
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {messages.length === 0 && !thinking && (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-300 dark:border-zinc-700/30 flex items-center justify-center mb-5">
                  <MessageSquare className="w-7 h-7 text-zinc-400 dark:text-zinc-600" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                  {isSynced ? "Your Mirror Awaits" : "Chat with Atmiq"}
                </h3>
                <p className="text-sm text-zinc-400 dark:text-zinc-600 max-w-md mb-1">
                  {isSynced
                    ? "Ask anything â€” Atmiq will respond in your voice, your tone, your style."
                    : "Start chatting, or tune your voice first for personalized responses."}
                </p>
                {isSynced && (
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                    {[
                      "Write a LinkedIn post about AI",
                      "Reply to a cold email",
                      "Explain transformers casually",
                    ].map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => {
                          setQuestion(prompt);
                          inputRef.current?.focus();
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-300 dark:border-zinc-700/40 hover:border-brand-500/30 hover:text-brand-600 dark:hover:text-brand-400 transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="max-w-3xl mx-auto space-y-5">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="group relative max-w-[80%]">
                    <div className="flex items-center gap-2 mb-1.5">
                      {msg.role === "ai" && (
                        <div className="w-5 h-5 rounded-md bg-brand-500/10 flex items-center justify-center">
                          <Sparkles className="w-3 h-3 text-brand-500" />
                        </div>
                      )}
                      <span
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-widest",
                          msg.role === "user"
                            ? "text-brand-500 dark:text-brand-400"
                            : "text-cyan-600 dark:text-cyan-400"
                        )}
                      >
                        {msg.role === "user" ? "You" : "Atmiq"}
                      </span>
                      {msg.role === "ai" && isSynced && (
                        <span className="text-[9px] text-zinc-400 dark:text-zinc-600">
                          Â· your voice
                        </span>
                      )}
                    </div>

                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                        msg.role === "user"
                          ? "bg-brand-600 text-white rounded-br-md"
                          : "bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-300 dark:border-zinc-700/30 text-zinc-700 dark:text-zinc-300 rounded-bl-md"
                      )}
                    >
                      {msg.text}
                    </div>

                    {/* Copy button */}
                    {msg.role === "ai" && (
                      <button
                        onClick={() => copyMessage(msg.text, i)}
                        className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-7 flex items-center gap-1 text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-all"
                      >
                        {copiedIdx === i ? (
                          <>
                            <Check className="w-3 h-3" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Thinking */}
              {thinking && (
                <div className="flex justify-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-5 h-5 rounded-md bg-brand-500/10 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-brand-500" />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                        Atmiq
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-300 dark:border-zinc-700/30 rounded-2xl rounded-bl-md px-4 py-3">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-500" />
                      <span className="text-xs text-zinc-500">
                        {isSynced
                          ? "Channeling your voice..."
                          : "Thinking..."}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>
          </div>

          {/* â”€â”€ Input bar â”€â”€ */}
          <div className="px-6 pb-5 pt-2">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 p-2 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-300 dark:border-zinc-800/60 focus-within:border-brand-500/40 focus-within:ring-2 focus-within:ring-brand-500/10 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={
                    isSynced
                      ? "Ask anything â€” I'll respond in your voice..."
                      : "Ask anything..."
                  }
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={thinking}
                  className="flex-1 bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none px-3 disabled:cursor-not-allowed"
                />
                <Button
                  size="icon"
                  onClick={handleAsk}
                  disabled={thinking || !question.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-2 text-center">
                Atmiq Â· Groq Â· Llama 3.3-70B
                {isSynced && " Â· Voice-tuned"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
