// src/pages/LearnMore.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Sparkles,
  Shirt,
  Calendar,
  Camera,
  BookOpen,
  Users,
  CheckCircle,
} from "lucide-react";

/**
 * LearnMore - LumePath ecosystem marketing + Outfit Planner highlight
 * - Drop-in ready
 * - Uses Tailwind + Framer Motion + lucide-react
 * - Download links are placeholders ("#")
 *
 * Credits:
 * - Programmer / product builder: Amirul (18) — (put your real link if you want)
 * - Outfit Planner authored by: Master Dechocai (18, Thailand, same school)
 */

const floatTransition = {
  y: {
    duration: 6,
    yoyo: Infinity,
    ease: "easeInOut",
  },
  x: {
    duration: 10,
    yoyo: Infinity,
    ease: "easeInOut",
  },
};

const featureCards = [
  {
    icon: <Shirt className="w-7 h-7 text-pink-300" />,
    title: "Outfit Planner",
    subtitle: "Your AI stylist",
    desc:
      "Smart outfit curation powered by context: weather, calendar events, and your own wardrobe.",
    tag: "by Master Dechocai",
  },
  {
    icon: <Calendar className="w-7 h-7 text-indigo-300" />,
    title: "Daily Scheduler",
    subtitle: "Plan with intention",
    desc:
      "Plan outfits & habits for the week. Sync with events so you never wonder what to wear.",
    tag: "Integrated",
  },
  {
    icon: <Camera className="w-7 h-7 text-purple-300" />,
    title: "Closet Visualizer",
    subtitle: "Snap & organize",
    desc:
      "Digitize your wardrobe, preview combinations and save looks for later, all in-app.",
    tag: "Visual-first",
  },
  {
    icon: <Sparkles className="w-7 h-7 text-sky-300" />,
    title: "Personal Feed",
    subtitle: "Trends that fit you",
    desc:
      "A curated feed of styles and communities that amplify your personal taste — not random noise.",
    tag: "Personalized",
  },
];

export default function LearnMore() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#07070d] via-[#0d0d1a] to-[#07070d] text-white py-24 px-6">
      {/* Ambient animated blobs */}
      <motion.div
        className="absolute -left-40 -top-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-pink-600/25 to-purple-600/20 blur-3xl pointer-events-none"
        animate={{ x: [0, 30, -30, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-48 -bottom-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-400/20 blur-3xl pointer-events-none"
        animate={{ x: [0, -40, 40, 0], y: [0, -25, 25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          className="text-center mb-12 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 drop-shadow-[0_0_30px_rgba(156,163,255,0.12)]">
            LumePath — Evolve your routine, elevate your life.
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            A versatile home for your habits, tasks, communities — and aesthetic
            life tools like <strong>Outfit Planner</strong>. Designed for motion,
            clarity, and personal growth.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-[1.02] transition transform shadow-lg"
            >
              <Download className="w-5 h-5" />
              Download App
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-purple-200 hover:bg-white/5 transition"
            >
              Explore Docs
            </a>
          </div>
        </motion.div>

        {/* Modules / Feature grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {featureCards.map((f, i) => (
            <motion.article
              key={i}
              className="relative rounded-2xl p-6 bg-white/4 border border-white/6 backdrop-blur-md overflow-hidden hover:scale-105 transition-transform"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { delay: i * 0.08 } },
              }}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-white/5 to-white/3">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-gray-300">{f.subtitle}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-300">{f.desc}</p>
              <div className="mt-4">
                <span className="text-xs bg-white/5 inline-block px-3 py-1 rounded-full text-gray-200">
                  {f.tag}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <WhyCard
            icon={<CheckCircle className="w-6 h-6 text-emerald-300" />}
            title="Trusted Flow"
            text="Design your days with systems, not willpower — verifiable progress, simplified."
          />
          <WhyCard
            icon={<Users className="w-6 h-6 text-sky-300" />}
            title="Community-Powered"
            text="Shared threads, style swaps, and habit groups create momentum you can feel."
          />
          <WhyCard
            icon={<BookOpen className="w-6 h-6 text-purple-300" />}
            title="Built for Learning"
            text="Manuals, micro-guides, and developer docs — everything to customize your path."
          />
        </motion.div>

        {/* Manual / Docs */}
        <motion.div
          className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <DocCard
            title="Getting Started (Core)"
            desc="Install the app, create your first habit, and sync your calendar — quick wins in minutes."
            link="#"
          />
          <DocCard
            title="Outfit Planner — Quick API"
            desc="How to import outfits, map closet items, and auto-generate looks for events."
            link="#"
          />
          <DocCard
            title="Developer Docs"
            desc="Endpoints, webhooks, and extensibility for building on LumePath."
            link="#"
          />
        </motion.div>

        {/* Interactive credits / bios */}
        <motion.div
          className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <BioCard
            name="Amirul"
            role="Lead Developer & Product"
            bio="18 • Creator of LumePath. Focused on delightful UX and meaningful small product victories. Built the core dashboard & integrations."
            highlight="Programmer • Hustle-first • Loves clean UX"
            link="#"
          />
          <BioCard
            name="Master Dechocai"
            role="Outfit Planner — AI Stylist"
            bio="18 • Tailoring AI style suggestions and outfit-modeling. From Thailand — same school and a creative partner on Outfit Planner."
            highlight="Style-first • Computer vision • Wardrobe nerd"
            link="#"
          />
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="text-center py-12 rounded-2xl bg-gradient-to-br from-white/3 to-white/5 border border-white/6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-3">
            Join the LumePath Beta — Shape the future of productivity
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            One app to tune your habits, tasks, community, and presentation. Outfit Planner is an example of how modular LumePath can be.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 shadow hover:scale-[1.02] transition"
            >
              <Download className="w-4 h-4" />
              Join Beta / Download
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/90 hover:bg-white/5 transition"
            >
              Read Docs
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            © LumePath 2025 — Crafted by Amirul (18). Outfit Planner made by Master Dechocai (18, Thailand).
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------- Subcomponents -------------------- */

function WhyCard({ icon, title, text }) {
  return (
    <div className="p-6 rounded-2xl bg-white/4 border border-white/6 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-3">{icon}</div>
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-300">{text}</p>
    </div>
  );
}

function DocCard({ title, desc, link }) {
  return (
    <article className="p-6 rounded-2xl bg-white/4 border border-white/6 backdrop-blur-md hover:scale-[1.02] transition">
      <h5 className="font-semibold mb-2">{title}</h5>
      <p className="text-sm text-gray-300 mb-4">{desc}</p>
      <a href={link} className="text-sm text-indigo-300 hover:underline">
        View docs →
      </a>
    </article>
  );
}

/** Interactive bio card — flips on hover (3D feel) */
function BioCard({ name, role, bio, highlight, link }) {
  return (
    <motion.div
      className="relative perspective"
      style={{ perspective: 1200 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="relative rounded-2xl bg-gradient-to-br from-white/4 to-white/6 p-6 border border-white/8 shadow-lg"
        initial={{ rotateX: 0 }}
        whileHover={{ rotateX: -6 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xl font-bold">
            {name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
          </div>
          <div>
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-sm text-gray-300">{role}</div>
          </div>
        </div>

        <p className="text-sm text-gray-300 mt-4">{bio}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-400">{highlight}</div>
          <a
            href={link}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/6 text-sm text-white/90"
          >
            Contact
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

