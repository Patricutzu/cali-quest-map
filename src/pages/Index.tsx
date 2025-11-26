import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  ArrowRight,
  Compass,
  MapPin,
  Mountain,
  PlaneTakeoff,
  Sparkles,
  Star,
  Waves,
} from "lucide-react";

const heroImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
];

const destinations = [
  {
    title: "Serengeti Platinum",
    blurb: "Witness the golden migration from a luxury skysuite with private chef.",
    stat: "8k acres reserved",
    video:
      "https://cdn.coverr.co/videos/coverr-luxurious-journey-7286/1080p.mp4",
  },
  {
    title: "Maasai Mara Elite",
    blurb: "Helicopter safaris, star beds, and sommelier-led bush dining.",
    stat: "5 bespoke camps",
    video:
      "https://cdn.coverr.co/videos/coverr-astronaut-walking-on-the-moon-1479/1080p.mp4",
  },
  {
    title: "Zanzibar Noir",
    blurb: "Private island villas with black-sand spa rituals and pearl dives.",
    stat: "Private atoll",
    video:
      "https://cdn.coverr.co/videos/coverr-night-sky-with-stars-9161/1080p.mp4",
  },
];

const timeline = [
  {
    title: "Awakening",
    text: "You arrive at dawn. A WebGL savannah breathes beneath a velvet sky.",
  },
  {
    title: "Ascend",
    text: "Scroll reveals constellations connecting Nairobi, Arusha, and Zanzibar.",
  },
  {
    title: "Immerse",
    text: "Horizontal journeys glide you through heated air-balloon horizons.",
  },
  {
    title: "Belong",
    text: "Testimonials orbit with depth, every voice wrapped in cinematic focus.",
  },
  {
    title: "Depart",
    text: "A 3D plane arcs across your booking steps—the story closes on your terms.",
  },
];

const testimonials = [
  {
    name: "Isabella Laurent",
    quote:
      "Safari Elite is poetry in motion. From the private Maasai chopper to the underwater dinner in Zanzibar, every transition felt choreographed for us alone.",
    title: "Creative Director, Paris",
  },
  {
    name: "Anik Shah",
    quote:
      "They balanced cinematic spectacle with quiet, bespoke care. The stargazing deck over Serengeti rewired how I think about travel.",
    title: "Founder, Nairobi",
  },
  {
    name: "Chen Wei",
    quote:
      "The narrative scrolling pulled me into the journey before I stepped on the plane. Booking felt like watching a film I was starring in.",
    title: "Film Producer, Singapore",
  },
];

const parallaxLayers = [
  { speed: 0.08, label: "Starlight", size: "120px" },
  { speed: 0.12, label: "Savannah", size: "220px" },
  { speed: 0.18, label: "Horizon", size: "320px" },
];

function useLenisLike() {
  useEffect(() => {
    let animationFrame: number;
    let lastY = window.scrollY;
    let targetY = window.scrollY;
    const smooth = 0.12;

    const onWheel = (e: WheelEvent) => {
      targetY += e.deltaY;
      targetY = Math.max(0, targetY);
    };

    const loop = () => {
      lastY += (targetY - lastY) * smooth;
      window.scrollTo({ top: lastY, behavior: "auto" });
      animationFrame = requestAnimationFrame(loop);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    animationFrame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const aura = auraRef.current;
    if (!cursor || !aura) return;

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      aura.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const handleMagnet = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.dataset?.magnetic) {
        cursor.classList.add("scale-150");
        aura.classList.add("scale-125", "opacity-70");
      } else {
        cursor.classList.remove("scale-150");
        aura.classList.remove("scale-125", "opacity-70");
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleMagnet);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleMagnet);
    };
  }, []);

  return (
    <>
      <div
        ref={auraRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 bg-gold/5 blur-xl transition-transform duration-200 ease-out"
      />
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_0_8px_rgba(255,209,125,0.15)] transition-all duration-200 ease-out"
      />
    </>
  );
}

function GradientMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const nodes = new Array(8).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 200 + Math.random() * 200,
      h: Math.floor(180 + Math.random() * 60),
    }));

    const draw = (mouseX?: number, mouseY?: number) => {
      ctx.clearRect(0, 0, width, height);
      nodes.forEach((node, idx) => {
        const gradient = ctx.createRadialGradient(
          node.x + (mouseX ? (mouseX - width / 2) * 0.05 * (idx / nodes.length) : 0),
          node.y + (mouseY ? (mouseY - height / 2) * 0.05 * (idx / nodes.length) : 0),
          0,
          node.x,
          node.y,
          node.r,
        );
        gradient.addColorStop(0, `hsla(${node.h},90%,65%,0.35)`);
        gradient.addColorStop(1, "hsla(210,40%,15%,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.rect(0, 0, width, height);
        ctx.fill();
      });
    };

    const onMove = (e: MouseEvent) => draw(e.clientX, e.clientY);

    draw();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      draw();
    });
    return () => {
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0" />;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = new Array(80).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.5 + 0.5,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,209,125,${0.2 * p.z})`;
        ctx.shadowColor = "rgba(0,0,0,0.25)";
        ctx.shadowBlur = 6;
        ctx.arc(p.x, p.y, p.r * p.z, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(render);
    };

    render();
    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />;
}

export default function Index() {
  const [headline, setHeadline] = useState("Safari Elite");
  const [activeDestination, setActiveDestination] = useState(0);
  const scrollNarrativeRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useLenisLike();

  useEffect(() => {
    let current = 0;
    const words = ["Safari Elite", "Cinematic Journeys", "Awwwards Luxury"];
    const interval = setInterval(() => {
      current = (current + 1) % words.length;
      setHeadline(words[current]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const heroVideo = heroVideoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && heroVideo) {
            heroVideo.play().catch(() => undefined);
          }
        });
      },
      { threshold: 0.5 },
    );
    if (heroVideo) observer.observe(heroVideo);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = scrollNarrativeRef.current;
    if (!target) return;
    const onScroll = () => {
      const children = Array.from(target.querySelectorAll("[data-step]") as NodeListOf<HTMLElement>);
      children.forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
        const visible = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
        if (visible) child.style.opacity = "1";
        child.style.transform = `translateY(${Math.max(0, 60 - rect.top * 0.1)}px)`;
        child.style.filter = visible ? "blur(0px)" : "blur(3px)";
        if (visible) setActiveDestination(idx % destinations.length);
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxStyles = useMemo(
    () =>
      parallaxLayers.map((layer) => ({
        style: {
          transform: `translate3d(0, ${layer.speed * 40}px, 0)`,
          boxShadow: "0 20px 80px rgba(0,0,0,0.25)",
        },
      })),
    [],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-night via-deep to-night text-ivory">
      <CustomCursor />
      <GradientMesh />
      <ParticleField />

      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-10 py-6 backdrop-blur-xl">
        <div className="flex items-center gap-3" data-magnetic>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-sand shadow-lg" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Safari Elite</p>
            <p className="text-lg font-semibold text-ivory">Luxury Motion Safaris</p>
          </div>
        </div>
        <nav className="hidden gap-8 text-sm font-semibold md:flex">
          {["Story", "Destinations", "Booking", "Testimonials", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="group relative" data-magnetic>
              {item}
              <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-gold transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
        <Button className="bg-gold text-night shadow-[0_0_30px_rgba(255,209,125,0.35)]" data-magnetic>
          Book a Dream
        </Button>
      </header>

      <section id="story" className="relative flex min-h-screen flex-col justify-end overflow-hidden pt-32">
        <video
          ref={heroVideoRef}
          muted
          loop
          playsInline
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
          src="https://cdn.coverr.co/videos/coverr-sunrise-aerial-7663/1080p.mp4"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,209,125,0.2),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(82,116,255,0.25),transparent_35%),linear-gradient(180deg,rgba(5,8,20,0.1),rgba(5,8,20,0.75))]" />
        <div className="container relative z-10 mx-auto grid gap-10 px-6 pb-28 pt-20 md:grid-cols-2">
          <div className="space-y-6">
            <Badge className="bg-white/10 text-gold">Awwwards-level Craft</Badge>
            <h1 className="text-4xl font-black leading-tight text-ivory md:text-6xl">
              {headline}
              <span className="ml-2 animate-pulse text-gold">|</span>
            </h1>
            <p className="max-w-xl text-lg text-ivory/70">
              A cinematic, scroll-driven odyssey through Tanzania, Kenya, and Zanzibar. Crafted with parallax,
              particle fields, and responsive gradient meshes for a tactile, luxurious feel.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-gold text-night shadow-[0_10px_40px_rgba(255,209,125,0.35)] hover:-translate-y-1"
                data-magnetic
              >
                Plan the Impossible <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-gold/40 text-ivory hover:border-gold hover:text-gold" data-magnetic>
                Watch the Journey
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              {["GSAP Scroll", "WebGL Motion", "Lenis Smooth"].map((item) => (
                <Card key={item} className="border-white/10 bg-white/5 px-4 py-3 text-center text-ivory/70">
                  {item}
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            {heroImages.map((src, idx) => (
              <div
                key={src}
                className="absolute right-0 top-0 h-44 w-44 rounded-3xl border border-white/10 shadow-2xl transition-transform duration-700"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transform: `translate3d(${idx * 40}px, ${idx * 70}px, 0) scale(${1 - idx * 0.08}) rotate(${idx * -2}deg)`
                }}
              />
            ))}
            <div className="relative mt-64 w-full overflow-hidden rounded-3xl border border-white/10 bg-night/60 p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.4em] text-gold">Motion Story</p>
              <p className="text-xl text-ivory/80">Multi-layered parallax with clip-path morphing along your scroll path.</p>
              <div className="mt-6 h-32 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gold/20 via-deep to-night">
                <div className="clip-morph h-full w-full" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 h-16 w-16 -translate-x-1/2 rounded-full border border-gold/40 bg-white/5 text-center text-xs uppercase tracking-[0.3em] text-gold/80 backdrop-blur-lg">
          Scroll
        </div>
      </section>

      <section id="destinations" className="relative overflow-hidden bg-night/70 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(255,209,125,0.18),transparent_28%),radial-gradient(circle_at_90%_20%,rgba(82,116,255,0.2),transparent_30%)]" />
        <div className="container relative mx-auto px-6">
          <div className="flex items-center justify-between gap-4 pb-10">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gold/70">Destinations</p>
              <h2 className="text-4xl font-bold text-ivory">Hover to flip into the wild</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-ivory/70">
              <Star className="h-4 w-4 text-gold" /> Awwwards-ready micro-interactions
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {destinations.map((dest, idx) => (
              <div
                key={dest.title}
                className="group relative h-[420px] perspective"
                onMouseEnter={() => setActiveDestination(idx)}
              >
                <div className="flip-card absolute inset-0 rounded-3xl border border-white/10 bg-white/5">
                  <div className="flip-face flip-front flex h-full flex-col justify-between overflow-hidden rounded-3xl">
                    <video
                      src={dest.video}
                      className="h-64 w-full object-cover opacity-70"
                      muted
                      loop
                      playsInline
                      autoPlay
                    />
                    <div className="p-6 space-y-2">
                      <h3 className="text-2xl font-semibold text-ivory">{dest.title}</h3>
                      <p className="text-ivory/70">{dest.blurb}</p>
                      <Badge className="bg-gold/20 text-gold">{dest.stat}</Badge>
                    </div>
                  </div>
                  <div className="flip-face flip-back flex h-full flex-col justify-between rounded-3xl bg-gradient-to-br from-gold/10 via-deep to-night p-6 text-left">
                    <p className="text-sm uppercase tracking-[0.3em] text-gold">Parallax Depth</p>
                    <p className="text-ivory/80">
                      3-layer parallax foreground animals, midground acacias, and background dusk clouds
                      glide with cursor. Scroll counter animates when entering view.
                    </p>
                    <div className="text-4xl font-bold text-gold">+{(idx + 1) * 12} curated moments</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="storyline" ref={scrollNarrativeRef} className="relative overflow-hidden bg-gradient-to-b from-night via-deep to-night py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 pb-8">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold to-sand" />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold/80">Scroll-driven narrative</p>
              <h2 className="text-4xl font-bold text-ivory">Five scenes that unlock as you travel</h2>
            </div>
          </div>
          <div className="relative grid gap-10 md:grid-cols-[360px_1fr]">
            <div className="sticky top-28">
              <Card className="border-white/10 bg-white/5 p-6 text-ivory/80">
                <p className="text-sm uppercase tracking-[0.3em] text-gold">Live counter</p>
                <p className="mt-3 text-5xl font-black text-gold">0{activeDestination + 1}</p>
                <p className="mt-2 text-sm text-ivory/60">Scroll to advance the storyline. Imagery sequences morph with depth.</p>
              </Card>
              <div className="mt-6 h-56 overflow-hidden rounded-3xl border border-white/10">
                <div
                  className="h-full w-full bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${heroImages[activeDestination % heroImages.length]})`,
                    transform: `scale(${1 + activeDestination * 0.05})`
                  }}
                />
              </div>
            </div>
            <div className="space-y-10" data-step-container>
              {timeline.map((step, idx) => (
                <Card
                  key={step.title}
                  data-step
                  className="relative overflow-hidden border-white/10 bg-white/5 p-8 opacity-70 transition-all duration-500"
                >
                  <div className="absolute right-6 top-6 text-5xl font-black text-white/5">0{idx + 1}</div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gold">{step.title}</p>
                  <p className="mt-4 text-xl text-ivory/80">{step.text}</p>
                  <div className="mt-6 h-24 overflow-hidden rounded-xl bg-gradient-to-r from-gold/10 via-deep to-night">
                    <div className="parallax-layer" style={parallaxStyles[idx % parallaxStyles.length].style} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="relative bg-night py-24">
        <div className="container mx-auto grid gap-10 px-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Booking Process</p>
            <h2 className="text-4xl font-bold text-ivory">Step into a cinematic booking flow</h2>
            <Tabs defaultValue="dates" className="w-full">
              <TabsList className="bg-white/5">
                <TabsTrigger value="dates">Dates</TabsTrigger>
                <TabsTrigger value="guests">Guests</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="dates" className="mt-6">
                <Card className="border-white/10 bg-white/5 p-6">
                  <Calendar mode="range" className="rounded-3xl bg-night/60 p-4 text-ivory" />
                </Card>
              </TabsContent>
              <TabsContent value="guests" className="mt-6">
                <Card className="border-white/10 bg-white/5 p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="text-ivory/70">Travelers</Label>
                    <Input type="number" defaultValue={2} className="bg-night/70 border-white/10" />
                  </div>
                  <div className="flex items-center gap-4">
                    <Label className="text-ivory/70">Suites</Label>
                    <Input type="number" defaultValue={1} className="bg-night/70 border-white/10" />
                  </div>
                </Card>
              </TabsContent>
              <TabsContent value="details" className="mt-6">
                <Card className="border-white/10 bg-white/5 p-6 space-y-4">
                  <Label className="text-ivory/70">Dream highlights</Label>
                  <textarea
                    className="h-32 w-full rounded-2xl bg-night/70 p-3 text-ivory outline-none ring-1 ring-white/10"
                    placeholder="Sunrise balloon, champagne butler, underwater dinner..."
                  />
                  <Button className="w-full bg-gold text-night" data-magnetic>
                    Send the cinematic plan
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gold/15 via-deep to-night p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">3D Flight path</p>
            <p className="mt-3 text-lg text-ivory/80">
              A stylized plane model glides across when you confirm. Reduced-motion users see a subtle fade.
            </p>
            <div className="relative mt-8 h-64 overflow-hidden rounded-2xl bg-night/70">
              <div className="plane" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(255,209,125,0.25),transparent_30%),radial-gradient(circle_at_70%_60%,rgba(82,116,255,0.2),transparent_32%)]" />
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between text-ivory/60">
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-gold" /> Nairobi
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gold" /> Zanzibar
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-ivory/70">
              <Sparkles className="h-4 w-4 text-gold" /> Floating labels, magnetic CTA, and morphing clip-path transitions.
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="relative overflow-hidden bg-deep py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between pb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gold">Voices</p>
              <h2 className="text-4xl font-bold text-ivory">3D carousel of praise</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-ivory/70">
              <Waves className="h-4 w-4 text-gold" /> Video rolls on hover
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="testimonial border-white/10 bg-white/5 p-6 text-ivory/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-ivory font-semibold">{t.name}</p>
                    <p className="text-sm text-ivory/60">{t.title}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-sand" />
                </div>
                <p className="mt-4 text-lg leading-relaxed">“{t.quote}”</p>
                <video
                  className="mt-6 h-32 w-full rounded-2xl object-cover opacity-60 transition duration-300 hover:opacity-100"
                  src="https://cdn.coverr.co/videos/coverr-nature-forest-trees-1574/1080p.mp4"
                  muted
                  loop
                  playsInline
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative bg-night py-24">
        <div className="container mx-auto grid gap-10 px-6 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Contact</p>
            <h2 className="text-4xl font-bold text-ivory">Keep the name, elevate the legend</h2>
            <p className="text-ivory/70">keep.travelling.agent@gmail.com — +40 7XX XXX XXX</p>
            <div className="mt-6 grid gap-4 text-ivory/70">
              <div className="flex items-center gap-3">
                <Mountain className="h-5 w-5 text-gold" /> Layered parallax maps that reveal destinations as you scroll.
              </div>
              <div className="flex items-center gap-3">
                <PlaneTakeoff className="h-5 w-5 text-gold" /> Service worker caching and WebP imagery for performance.
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-gold" /> Respect reduced-motion: subtle fades replace flights.
              </div>
            </div>
          </div>
          <Card className="border-white/10 bg-white/5 p-8 shadow-2xl">
            <div className="grid gap-6">
              <div className="relative">
                <Input className="peer bg-night/70 border-white/10" placeholder=" " />
                <Label className="floating">Name</Label>
              </div>
              <div className="relative">
                <Input type="email" className="peer bg-night/70 border-white/10" placeholder=" " />
                <Label className="floating">Email</Label>
              </div>
              <div className="relative">
                <Input className="peer bg-night/70 border-white/10" placeholder=" " />
                <Label className="floating">Phone</Label>
              </div>
              <div className="relative">
                <textarea className="peer h-32 w-full rounded-2xl bg-night/70 p-3 text-ivory" placeholder=" " />
                <Label className="floating">Dream safari notes</Label>
              </div>
              <Button className="w-full bg-gold text-night" data-magnetic>
                Send the gold-tier brief
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-night/80 py-8 text-center text-ivory/60">
        Safari Elite • Crafted for Awwwards • keep.travelling.agent@gmail.com
      </footer>
    </div>
  );
}
