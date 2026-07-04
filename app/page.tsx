"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    let mx = -100;
    let my = -100;
    let initialized = false;

    const handleMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!initialized) {
        initialized = true;
        if (cursor) {
          cursor.style.left = `${mx}px`;
          cursor.style.top = `${my}px`;
        }
        if (ring) {
          ring.style.left = `${mx}px`;
          ring.style.top = `${my}px`;
        }
      } else {
        if (cursor) {
          cursor.style.left = `${mx}px`;
          cursor.style.top = `${my}px`;
        }
        setTimeout(() => {
          if (ring) {
            ring.style.left = `${mx}px`;
            ring.style.top = `${my}px`;
          }
        }, 60);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        target.closest("a, button, [role='button'], .interactive-card, .app-tile-card, .process-step-card")
      ) {
        if (cursor) {
          cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
          cursor.style.backgroundColor = "transparent";
          cursor.style.border = "1px solid #db010b";
        }
        if (ring) {
          ring.style.transform = "translate(-50%, -50%) scale(1.6)";
          ring.style.borderColor = "rgba(219, 1, 11, 0.8)";
          ring.style.backgroundColor = "rgba(219, 1, 11, 0.05)";
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        target.closest("a, button, [role='button'], .interactive-card, .app-tile-card, .process-step-card")
      ) {
        if (cursor) {
          cursor.style.transform = "translate(-50%, -50%) scale(1)";
          cursor.style.backgroundColor = "#db010b";
          cursor.style.border = "none";
        }
        if (ring) {
          ring.style.transform = "translate(-50%, -50%) scale(1)";
          ring.style.borderColor = "rgba(219, 1, 11, 0.4)";
          ring.style.backgroundColor = "transparent";
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);



    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
    );

    const revealItems = document.querySelectorAll(".reveal-item");
    revealItems.forEach((item) => observer.observe(item));

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();

    };
  }, []);

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.95]);
  const heroTextY = useTransform(scrollY, [0, 600], [0, 100]);



  return (
    <div className="min-h-screen bg-white text-zinc-950 font-sans antialiased selection:bg-brand-red/10 selection:text-brand-red">
      {/* Custom premium cursor nodes */}
      <div
        id="cursor"
        ref={cursorRef}
        className="fixed w-2.5 h-2.5 bg-brand-red rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden lg:block"
        style={{ left: "-100px", top: "-100px" }}
      ></div>
      <div
        id="cursor-ring"
        ref={ringRef}
        className="fixed w-9 h-9 border border-brand-red/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out hidden lg:block"
        style={{ left: "-100px", top: "-100px" }}
      ></div>

      {/* Sticky Blur Header Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'h-16 md:h-20 bg-white/95 backdrop-blur-md border-b border-zinc-100 shadow-sm'
        : 'h-20 md:h-28 bg-[#F5F0E8]/80 backdrop-blur-sm'
        }`}>
        <div className="h-full w-full max-w-full mx-auto px-2 sm:px-4 md:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <img
              src="/brand/redtech-logo-transparent.png"
              alt="RedTech Logo"
              className={`object-contain transition-all duration-300 ${scrolled ? 'h-8 md:h-12' : 'h-10 md:h-[60px]'
                }`}
            />
          </a>

          {/* Right-aligned Navigation & CTA */}
          <div className="flex items-center justify-end gap-3">
            {/* Desktop links */}
            <ul className="hidden md:flex gap-3 items-center">
              {["Work", "Services", "Process", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className={`inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors hover:text-zinc-900 ${scrolled ? 'text-zinc-500' : 'text-zinc-500'
                      }`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                className={`odoo-arrow inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-all rounded-full border-2 ${scrolled
                  ? 'bg-brand-red text-white border-brand-red hover:bg-brand-red/90 hover:shadow-lg'
                  : 'bg-zinc-900 text-white border-zinc-900 hover:bg-brand-red hover:border-brand-red'
                  }`}
              >
                Start Project
              </a>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle Navigation Menu"
              className={`md:hidden p-2 focus:outline-none ${scrolled ? 'text-zinc-500' : 'text-zinc-700'}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div
          className={`md:hidden fixed inset-x-0 ${scrolled ? 'top-16' : 'top-20'} bg-white border-b border-zinc-200 p-6 flex flex-col gap-4 shadow-xl z-40 transition-all duration-300 origin-top transform ${mobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
            }`}
        >
          {["Work", "Services", "Process", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 py-2 border-b border-zinc-50"
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="odoo-arrow w-full text-center bg-brand-red text-white text-xs font-bold uppercase tracking-wider py-3 mt-2 hover:bg-brand-red/90 rounded-full"
          >
            Start Project
          </a>
        </div>
      </nav>

      {/* Hero Section - Flamingo-inspired warm design */}
      <motion.section
        style={{ scale: heroScale }}
        className="relative min-h-screen overflow-hidden"
        id="hero"
      >
        {/* Warm cream background */}
        <div className="absolute inset-0 bg-[#F5F0E8]"></div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #000 0.5px, transparent 0)',
          backgroundSize: '24px 24px'
        }}></div>

        {/* ---- Bottom Content Area ---- */}
        <div className="relative z-[3] min-h-screen flex flex-col pt-24 md:pt-32">
          <motion.div
            style={{ y: heroTextY }}
            className="flex flex-1 items-center px-6 sm:px-8 lg:px-12 xl:px-16"
          >
            <div className="max-w-7xl mx-auto w-full">
              <div className="w-full max-w-full text-left">
                <h1 className="flex flex-col text-left items-start">
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="block font-display text-[12vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold tracking-tighter leading-[0.9] text-zinc-900"
                  >
                    Digital products
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="block font-display text-[12vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-extrabold tracking-tighter leading-[0.9] text-zinc-900 mt-1 sm:mt-2"
                  >
                    built to <span className="italic text-brand-red">perform.</span>
                  </motion.span>
                </h1>

                {/* Feature icons row */}
                <div className="mt-8 grid grid-cols-2 md:flex md:flex-wrap items-center justify-items-start md:justify-start gap-x-8 gap-y-4 sm:mt-10">
                  {[
                    {
                      label: "Fast Performance",
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    },
                    {
                      label: "Real-time Insights",
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    },
                    {
                      label: "5+ Years Experience",
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                    },
                    {
                      label: "98% Client Satisfaction",
                      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.48 3.499a.6.6 0 011.04 0l2.26 4.58 5.06.735a.6.6 0 01.332 1.023l-3.66 3.568.864 5.04a.6.6 0 01-.87.632L12 16.707l-4.525 2.38a.6.6 0 01-.87-.632l.864-5.04-3.66-3.568a.6.6 0 01.332-1.023l5.06-.735 2.28-4.59z" />
                    }
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center justify-start gap-2 text-left sm:gap-3">
                      <div className="flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-brand-red/10 text-brand-red shrink-0">
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          {feat.icon}
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-sm font-bold sm:font-medium text-zinc-700 uppercase sm:normal-case tracking-wider sm:tracking-normal leading-none mt-px">
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          </motion.div>

          {/* Full-width CTA bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <a
              href="#contact"
              className="group flex items-center justify-between w-full bg-brand-red hover:bg-zinc-900 transition-colors duration-300 px-6 sm:px-8 lg:px-12 xl:px-16 py-5"
            >
              <div className="flex items-center gap-3">
                {/* Rocket icon */}
                <svg className="w-5 h-5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                <span className="odoo-arrow text-white text-xs sm:text-sm font-bold uppercase tracking-[0.15em]">
                  Start Your Project Today
                </span>
              </div>
              <svg className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Modules/Apps Grid Section */}
      <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#F5F0E8]/20 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item opacity-0 translate-y-10 transition-all duration-1000 ease-out max-w-3xl mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
              WHAT WE BUILD
            </h2>
            <p className="text-zinc-500 text-sm md:text-base mt-4 leading-relaxed max-w-xl">
              Choose the core modules to power your operation today. Scale up dynamically as your requirements grow.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                idx: "01",
                name: "Websites",
                copy: "High-performance websites that load fast and convert visitors.",
                tag: "Fast & SEO",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                  </svg>
                )
              },
              {
                idx: "02",
                name: "Web Apps",
                copy: "Custom portals and dashboards for your unique workflow.",
                tag: "Custom UI",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                )
              },
              {
                idx: "03",
                name: "Automation",
                copy: "Background systems that handle repetitive tasks automatically.",
                tag: "24/7 Flow",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                )
              },
              {
                idx: "04",
                name: "Databases",
                copy: "Structured data systems that scale with your business.",
                tag: "Secure SQL",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75" />
                  </svg>
                )
              },
              {
                idx: "05",
                name: "APIs",
                copy: "Connect your tools and services with custom API integrations.",
                tag: "Integrations",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                  </svg>
                )
              },
              {
                idx: "06",
                name: "Analytics",
                copy: "Custom dashboards to track what matters to your business.",
                tag: "BI & Reports",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                )
              },
              {
                idx: "07",
                name: "CRM",
                copy: "Customer management systems that fit your sales process.",
                tag: "Sales Pipeline",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0110.089 20c-2.213 0-4.3-.645-6.07-1.757v-.11a4.125 4.125 0 017.532-2.492M10 12.5a3 3 0 100-6 3 3 0 000 6zM18 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  </svg>
                )
              },
              {
                idx: "08",
                name: "Support",
                copy: "Ticketing and support platforms for your team and clients.",
                tag: "Ticketing",
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )
              }
            ].map((app, i) => (
              <div
                key={app.name}
                className="reveal-item opacity-0 translate-y-10 transition-all duration-1000 ease-out group relative bg-white border border-zinc-200/80 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[220px]"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {/* Background decorative big number */}
                <div className="absolute -right-2 -bottom-2 font-display text-8xl font-black text-zinc-50 select-none group-hover:text-brand-red/[0.03] transition-colors duration-500">
                  {app.idx}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Icon Container with interactive pulse ring */}
                    <div className="relative flex items-center justify-center w-12 h-12 bg-zinc-50 text-zinc-700 rounded-xl group-hover:bg-brand-red group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-red/20 transition-all duration-300">
                      {app.icon}
                    </div>

                    {/* Service pill tag */}
                    <span className="font-mono text-4xs uppercase tracking-widest text-zinc-400 group-hover:text-brand-red transition-colors duration-300 font-bold bg-zinc-50 group-hover:bg-brand-red/5 px-2.5 py-1 rounded-full">
                      {app.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-extrabold text-zinc-900 group-hover:text-brand-red transition-colors duration-300 mb-2">
                    {app.name}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed group-hover:text-zinc-600 transition-colors duration-300 pr-4">
                    {app.copy}
                  </p>
                </div>

                {/* Bottom line glow effect */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-red transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Mockup Section */}
      <section className="bg-zinc-50 border-t border-zinc-150 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="reveal-item opacity-0 translate-y-10 transition-all duration-1000 ease-out mb-12">
            <span className="sketch-kicker font-mono text-2xs uppercase tracking-widest text-brand-red mb-2">Live preview</span>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-tight">
              YOUR BUSINESS.
              <br />
              <span className="text-brand-red italic">ONE SCREEN.</span>
            </h2>
          </div>

          <div className="reveal-item opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100 bg-white border border-zinc-200 shadow-2xl rounded-xl overflow-hidden hover:border-zinc-300 transition-all duration-500">
            <div className="bg-zinc-50 border-b border-zinc-200/60 px-4 py-3 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
              </div>
              <div className="font-mono text-3xs tracking-widest text-zinc-400 font-bold uppercase">
                REDTECH OS · DASHBOARD
              </div>
              <div className="w-12"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[500px]">
              <aside className="bg-zinc-50/50 border-r border-zinc-100 p-5 hidden lg:block">
                <div className="h-8 w-28 bg-brand-red mb-8 rounded-lg opacity-90"></div>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Pipeline", active: true },
                    { label: "Projects", active: false },
                    { label: "Support", active: false },
                    { label: "Reports", active: false },
                    { label: "Automation", active: false },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-2 px-3 py-2.5 text-2xs font-mono font-bold tracking-wide rounded-lg cursor-pointer transition-colors ${item.active
                        ? "bg-white border-l-2 border-brand-red text-zinc-900 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-800"
                        }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${item.active ? "bg-brand-red" : "bg-zinc-300"}`}></div>
                      {item.label}
                    </div>
                  ))}
                </div>
              </aside>

              <main className="p-6 md:p-8 flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { val: "42", label: "Active leads", trend: "+12%" },
                    { val: "16", label: "Open tasks", trend: "-3%" },
                    { val: "8", label: "Automations", trend: "+2%" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-zinc-50 border border-zinc-150 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-end justify-between">
                        <div className="font-display text-3xl font-extrabold text-zinc-900 leading-none">{stat.val}</div>
                        <span className="text-xs font-mono text-emerald-600">{stat.trend}</span>
                      </div>
                      <div className="font-mono text-3xs uppercase tracking-wider text-zinc-400 mt-2 font-bold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6">
                  <div className="bg-zinc-50 border border-zinc-150 p-5 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-bold text-xs uppercase tracking-wider text-zinc-400">
                        Project Board
                      </h3>
                      <span className="inline-flex items-center gap-1.5 text-3xs font-mono font-bold text-brand-red uppercase">
                        <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
                        Live
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { col: "Plan", items: 2 },
                        { col: "Build", items: 3 },
                        { col: "Review", items: 1 },
                      ].map((item) => (
                        <div key={item.col} className="bg-white border border-zinc-150/70 p-3 rounded-lg">
                          <h4 className="font-mono text-3xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                            {item.col}
                          </h4>
                          <div className="flex flex-col gap-2">
                            {Array.from({ length: item.items }).map((_, idx) => (
                              <div key={idx} className="flex flex-col gap-1.5">
                                <div className="h-2 bg-brand-red/10 border-l-2 border-brand-red rounded"></div>
                                <div className="h-2 bg-zinc-100 rounded w-3/4"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-900 text-white p-5 rounded-lg flex flex-col justify-between">
                    <h3 className="font-display font-bold text-xs uppercase tracking-wider text-zinc-400 mb-4">
                      Automation Flow
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      {["New inquiry", "Assign owner", "Send summary"].map((flow, idx) => (
                        <div
                          key={flow}
                          className="bg-zinc-800/60 border border-zinc-700/50 p-3 text-3xs font-mono tracking-wide text-zinc-300 flex items-center gap-2 rounded-lg hover:border-brand-red hover:bg-zinc-800 transition-colors"
                        >
                          <span className="text-brand-red text-xs font-bold">0{idx + 1}</span>
                          {flow}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-zinc-950 py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[25rem] font-black text-white select-none pointer-events-none">
            RT
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="reveal-item opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="w-16 h-1 bg-brand-red mx-auto mb-8 rounded-full"></div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Let's Build Something
              <br />
              <span className="text-brand-red italic">Great Together</span>
            </h2>
            <p className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto">
              Tell us about your project. We'll get back to you within 24 hours with a practical plan.
            </p>
          </div>

          <div className="reveal-item opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-150 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@redtech.com"
              className="odoo-arrow group inline-flex items-center justify-center bg-brand-red text-white text-sm font-bold uppercase tracking-wider px-10 py-5 hover:bg-white hover:text-zinc-900 transition-all rounded-sm"
            >
              hello@redtech.com
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a
              href="#"
              className="odoo-arrow inline-flex items-center justify-center border-2 border-zinc-800 text-white hover:border-white text-sm font-bold uppercase tracking-wider px-10 py-5 transition-all rounded-sm"
            >
              Schedule Call
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="#" className="flex items-center">
            <img
              src="/brand/redtech-logo-transparent.png"
              alt="RedTech Logo"
              className="h-[42px] object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </a>
          <div className="font-mono text-3xs text-zinc-500 uppercase tracking-widest">
            © 2024 REDTECH · ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-zinc-500 hover:text-white text-xs transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
