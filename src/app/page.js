"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const COLUMNS = [
  {
    label: "Applied",
    color: "#3b82f6",
    cards: [
      { company: "Paystack", role: "Frontend Engineer", date: "Apr 28" },
      { company: "Flutterwave", role: "React Developer", date: "Apr 25" },
      { company: "Andela", role: "Software Engineer", date: "Apr 20" },
    ],
  },
  {
    label: "Interview",
    color: "#f59e0b",
    cards: [
      { company: "Stripe", role: "Product Engineer", date: "Apr 22" },
      { company: "Vercel", role: "Frontend Dev", date: "Apr 18" },
    ],
  },
  {
    label: "Offer",
    color: "#22c55e",
    cards: [
      { company: "Notion", role: "UI Engineer", date: "Apr 15" },
    ],
  },
  {
    label: "Rejected",
    color: "#ef4444",
    cards: [
      { company: "Meta", role: "SWE Intern", date: "Apr 10" },
      { company: "Google", role: "L4 Engineer", date: "Apr 8" },
    ],
  },
];

const STATS = [
  { label: "Applied", value: "24" },
  { label: "Interviews", value: "6" },
  { label: "Offers", value: "1" },
  { label: "Rejected", value: "4" },
];

function KanbanCol({ col, colIndex, progress }) {
  const start = 0.1 + colIndex * 0.1;
  const end = start + 0.2;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [24, 0]);

  return (
    <motion.div style={{ opacity, y }} className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <span className="w-2 h-2 rounded-full" style={{ background: col.color }} />
        <span className="text-[10px] uppercase text-zinc-400">
          {col.label}
        </span>
      </div>

      {col.cards.map((card, i) => (
        <div key={i} className="bg-zinc-800 border border-zinc-700/40 rounded-xl p-2">
          <div className="text-xs text-white font-medium">
            {card.company}
          </div>
          <div className="text-[11px] text-zinc-400">
            {card.role}
          </div>
          <div className="text-[10px] text-zinc-600">
            {card.date}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function DashboardPreview() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  const scale = useTransform(progress, [0, 0.2], [0.92, 1]);
  const opacity = useTransform(progress, [0, 0.1], [0, 1]);

  return (
    <div ref={ref} className="relative min-h-[120vh]">
      <div className="sticky top-6 flex justify-center px-4">
        <motion.div
          style={{ scale, opacity }}
          className="w-full max-w-5xl bg-[#111] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="flex gap-2 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span className="w-2 h-2 bg-green-500 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3 border-b border-zinc-800">
            {STATS.map((s, i) => (
              <div key={i} className="bg-zinc-900 p-3 rounded-xl">
                <div className="text-[10px] text-zinc-500">
                  {s.label}
                </div>
                <div className="text-xl font-bold">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3">
            {COLUMNS.map((col, i) => (
              <KanbanCol
                key={i}
                col={col}
                colIndex={i}
                progress={progress}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Page() {
  const text = "Welcome to Job Tracker";
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div className="bg-black text-white overflow-x-hidden">

      <section className="main pt-14 pb-10 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold">
          {displayed}
          <span className="text-[#cf1247]">|</span>
        </h1>

        <p className="text-gray-400 mt-3 max-w-xl">
          Track your job applications and stay organized.
        </p>

        <Link href="/auth">
          <button className="bg-[#cf1247] px-6 py-3 rounded mt-5">
            Get Started
          </button>
        </Link>
      </section>

      <section className="pt-10">
        <DashboardPreview />
      </section>


    </div>
  );
}