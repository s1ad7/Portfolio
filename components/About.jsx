"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import figure from '../Figure.jpg'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3 text-center">
          <h2 className="heading font-[var(--font-poppins)]">About</h2>
          <p className="subheading mx-auto">Bio and background.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} className="glass rounded-2xl p-6 lg:col-span-3">
          <div className="flex items-start gap-6">
            <div className="relative h-24 w-24 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={figure} alt="Portrait" className="h-full w-full object-cover" />
            </div>
            <div className="space-y-4">
              <p className="leading-relaxed text-neutral-300">
                I’m Saad Ifli, an economics graduate turned full‑stack developer, currently diving deep into MERN stack and Odoo/ERP development. My path blends business insight with technical expertise, allowing me to design solutions that are not only functional but also strategically aligned with organizational goals.
              </p>
              <ul className="space-y-4">
                <li className="border-l-2 border-brand-500/70 pl-4">
                  <div className="text-white font-medium">Technical Focus</div>
                  <div className="mt-1 text-sm text-neutral-300">Building custom Odoo modules, mastering Docker environments, and crafting interactive web experiences with modern frameworks.</div>
                </li>
                <li className="border-l-2 border-indigo-500/70 pl-4">
                  <div className="text-white font-medium">Business Edge</div>
                  <div className="mt-1 text-sm text-neutral-300">Economics background to understand workflows, optimize processes, and bridge the gap between technology and business needs.</div>
                </li>
                <li className="border-l-2 border-fuchsia-500/70 pl-4">
                  <div className="text-white font-medium">Problem‑Solving Style</div>
                  <div className="mt-1 text-sm text-neutral-300">Diagnosing root causes, structuring modular solutions, and ensuring maintainability in every project.</div>
                </li>
                <li className="border-l-2 border-brand-500/70 pl-4">
                  <div className="text-white font-medium">Creative Drive</div>
                  <div className="mt-1 text-sm text-neutral-300">Designing engaging portfolio experiences—smooth animations, interactive journeys, and gamified elements.</div>
                </li>
              </ul>
              <p className="text-neutral-300">
                My short‑term goal is to build and deploy a complete Odoo module from scratch, while my long‑term vision is to become an ERP consultant who helps businesses unlock efficiency through technology.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="text-neutral-400">Location</div>
                  <div className="text-white">Morocco (remote-friendly)</div>
                </div>
                <div className="space-y-2">
                  <div className="text-neutral-400">Availability</div>
                  <div className="text-white">Open to new opportunities</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}