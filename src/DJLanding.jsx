import React, { useEffect, useMemo, useState } from "react";

/**
 * Landing EPK web en 48h — v2 (con fixes)
 * - Imágenes desde /public
 * - rel="noopener noreferrer"
 * - Landmarks + aria-labelledby
 * - Countdown con estado expirado
 * - Fecha localizada es-ES
 * - Sticky bar accesible
 * - JSON-LD Product+Offer
 */

// 👉 Pon aquí tu fecha REAL de fin de oferta
const DEADLINE = new Date("2025-08-20T23:59:59+02:00");
const PRICE = 149;
const CONTACT_URL =
  "https://wa.me/34634634114?text=Hola%20Vandeep%2C%20quiero%20mi%20EPK%20web%20en%2048h.%20%C2%BFPr%C3%B3ximos%20huecos%3F"; // cambia número
const CONTACT_MAIL = "u6516162001@gmail.com"; // cámbialo

function useCountdown(deadline) {
  const [timeLeft, setTimeLeft] = useState(() => deadline - Date.now());
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(deadline - Date.now()), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const parts = useMemo(() => {
    const clamped = Math.max(0, timeLeft);
    const days = Math.floor(clamped / (1000 * 60 * 60 * 24));
    const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((clamped / (1000 * 60)) % 60);
    const seconds = Math.floor((clamped / 1000) % 60);
    return { days, hours, minutes, seconds };
  }, [timeLeft]);

  return { parts, expired: timeLeft <= 0 };
}

export default function EPKLandingV2() {
  const { parts, expired } = useCountdown(DEADLINE);
  const { days, hours, minutes, seconds } = parts;

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const endDateText = DEADLINE.toLocaleString("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "EPK web 48h",
    brand: "Vandeep",
    description: "EPK profesional para DJs en 48h.",
    offers: {
      "@type": "Offer",
      price: String(PRICE),
      priceCurrency: "EUR",
      availability: expired
        ? "https://schema.org/OutOfStock"
        : "https://schema.org/LimitedAvailability",
      priceValidUntil: "2025-08-20",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-800 via-purple-700 to-rose-600 text-white">
      {/* JSON-LD (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header (opcional si luego añades nav) */}
      <header className="sr-only">
        <h1 id="hero-title">EPK web en 48h para DJs</h1>
      </header>

      {/* Main */}
      <main aria-labelledby="hero-title">
        {/* Container */}
        <div className="mx-auto max-w-5xl px-6 pb-40">
          {/* extra bottom for sticky bar */}

          {/* Hero */}
          <section
            className="pt-16 pb-10 text-center"
            aria-labelledby="section-hero"
          >
            <h2 id="section-hero" className="sr-only">
              Oferta EPK 48h
            </h2>

            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-300/90 px-4 py-1 text-black mb-6 shadow mx-auto">
              <span aria-hidden>🚀</span>
              <span className="text-sm font-semibold">
                NUEVO SERVICIO · PRECIO DE LANZAMIENTO
              </span>
            </div>

            <p className="text-4xl sm:text-5xl font-extrabold leading-tight drop-shadow-sm">
              EPK web en 48h{" "}
              <span className="text-yellow-300">que consigue respuestas</span>{" "}
              de promotores
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-lg/7 text-white/90">
              Tu música, fotos y contacto en una sola página rápida y
              profesional. Sin PDFs pesados ni links sueltos.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => scrollToId("precio")}
                className="rounded-2xl bg-white px-6 py-3 font-semibold text-black shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/70"
              >
                {expired ? "Ver opciones" : "Reservar ahora"}
              </button>
              <button
                onClick={() => scrollToId("ejemplos")}
                className="rounded-2xl border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50"
              >
                Ver ejemplos reales
              </button>
            </div>

            {/* Countdown */}
            {!expired && (
              <div className="mt-10 mx-auto max-w-xl rounded-3xl bg-black/30 p-5 backdrop-blur">
                <p className="font-semibold text-yellow-200">
                  Precio de lanzamiento hasta:
                </p>
                <div className="mt-3 grid grid-cols-4 gap-3 text-center">
                  {[
                    { label: "DÍAS", value: days },
                    { label: "HORAS", value: hours },
                    { label: "MIN", value: minutes },
                    { label: "SEG", value: seconds },
                  ].map((b) => (
                    <div key={b.label} className="rounded-2xl bg-white/10 py-4">
                      <div className="text-2xl font-bold tabular-nums">
                        {String(b.value).padStart(2, "0")}
                      </div>
                      <div className="text-xs text-white/70">{b.label}</div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-white/70">
                  Termina el {endDateText}
                </p>
              </div>
            )}

            {expired && (
              <p className="mt-6 text-sm text-white/80">
                La oferta de lanzamiento ha finalizado. Aún puedes reservar tu
                EPK — plazas limitadas.
              </p>
            )}
          </section>

          {/* Problema / solución */}
          <section
            className="my-8 rounded-3xl bg-black/50 p-6"
            aria-labelledby="section-problema"
          >
            <h2 id="section-problema" className="text-2xl font-bold">
              ¿Tu EPK no te consigue respuestas?
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold text-rose-300">
                  Lo que te frena
                </h3>
                <ul className="space-y-2 text-white/90">
                  <li>✖️ PDF pesado que nadie abre</li>
                  <li>✖️ Linktree genérico sin contexto</li>
                  <li>✖️ Promotores que no entienden tu estilo</li>
                  <li>✖️ Emails sin respuesta</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-emerald-300">
                  Lo que te ayuda
                </h3>
                <ul className="space-y-2 text-white/90">
                  <li>✅ Web que carga en &lt; 2s</li>
                  <li>✅ Tu sonido se escucha al instante</li>
                  <li>✅ Imagen profesional que impacta</li>
                  <li>✅ Contacto directo (email + WhatsApp)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Beneficios */}
          <section className="py-10" aria-labelledby="section-beneficios">
            <h2
              id="section-beneficios"
              className="text-center text-3xl font-extrabold"
            >
              ¿Por qué un EPK web{" "}
              <span className="text-purple-200">funciona mejor</span>?
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                {
                  title: "Impacto instantáneo",
                  text: "Tu música se reproduce de forma clara (sin autoplay intrusivo) y la info clave se ve de un vistazo.",
                  icon: "⚡️",
                },
                {
                  title: "Todo en un link",
                  text: "Bio, música, fotos, rider técnico y contacto. Un solo enlace para enviar a promotores.",
                  icon: "🎯",
                },
                {
                  title: "Perfecto en móvil",
                  text: "Optimizado para revisiones desde el móvil. Diseño responsive y peso ligero.",
                  icon: "📱",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-3xl bg-black/40 p-6">
                  <div className="text-3xl" aria-hidden>
                    {c.icon}
                  </div>
                  <h3 className="mt-3 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-white/80">{c.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quién está detrás */}
          <section
            className="rounded-3xl bg-black/60 p-7"
            aria-labelledby="section-quien"
          >
            <h2 id="section-quien" className="text-3xl font-extrabold">
              ¿Quién está detrás de esto?
            </h2>
            <p className="mt-4 max-w-3xl text-white/90">
              Soy <span className="font-semibold">Vandeep</span>, desarrollador
              web y DJ. He visto cómo los EPKs tradicionales fallan una y otra
              vez. Después de trabajar con varios DJs, perfeccioné una fórmula
              simple: qué elementos necesita un EPK para que{" "}
              <span className="font-semibold">realmente funcione</span>.
            </p>
            <div className="mt-4 rounded-2xl bg-purple-700/30 p-4 text-sm text-white/90">
              💡 <span className="font-semibold">Garantía 14 días:</span> si tu
              EPK no cumple tus expectativas, te devuelvo el 100% del dinero.
              Sin preguntas.
            </div>
          </section>

          {/* Ejemplos */}
          <section
            id="ejemplos"
            className="py-12"
            aria-labelledby="section-ejemplos"
          >
            <h2 id="section-ejemplos" className="text-3xl font-extrabold">
              Ejemplos de diseños que creo
            </h2>
            <p className="text-white/80 mt-1">
              Mockups conceptuales — cada diseño es único.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                {
                  name: "Estilo Techno/Industrial",
                  img: "/mockup-techno2.png",
                  desc: "Colores oscuros, tipografía agresiva, player de música prominente.",
                },
                {
                  name: "Estilo Afro/Deep House",
                  img: "/luna-nova.png",
                  desc: "Colores cálidos, vibes relajadas, enfoque en la música.",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className="overflow-hidden rounded-3xl bg-black/40 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="h-48 w-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <p className="text-white/80 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Proceso */}
          <section className="py-10" aria-labelledby="section-proceso">
            <h2 id="section-proceso" className="text-3xl font-extrabold">
              Cómo funciona (3 pasos)
            </h2>
            <ol className="mt-6 grid gap-6 sm:grid-cols-3">
              <li className="rounded-3xl bg-black/40 p-6">
                <div className="text-3xl">1️⃣</div>
                <h3 className="mt-2 font-semibold">
                  Brief ultra-corto (15 min)
                </h3>
                <p className="text-white/80">
                  Me pasas bio, fotos y enlaces a tu música.
                </p>
              </li>
              <li className="rounded-3xl bg-black/40 p-6">
                <div className="text-3xl">2️⃣</div>
                <h3 className="mt-2 font-semibold">Día 1: Boceto</h3>
                <p className="text-white/80">
                  Te enseño el diseño con tu contenido real.
                </p>
              </li>
              <li className="rounded-3xl bg-black/40 p-6">
                <div className="text-3xl">3️⃣</div>
                <h3 className="mt-2 font-semibold">Día 2: Entrega</h3>
                <p className="text-white/80">
                  Publicación + 1 ronda de ajustes incluida.
                </p>
              </li>
            </ol>
          </section>

          {/* Precio */}
          <section
            id="precio"
            className="py-8"
            aria-labelledby="section-precio"
          >
            <h2 id="section-precio" className="sr-only">
              Precio y alcance
            </h2>

            <div className="rounded-3xl bg-gradient-to-b from-amber-400 to-amber-600 p-6 text-black shadow-xl">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold">
                    <span aria-hidden>🚀</span>
                    <span>
                      {expired ? "PLAZAS LIMITADAS" : "PRECIO DE LANZAMIENTO"}
                    </span>
                  </div>
                  <h3 className="mt-3 text-4xl font-extrabold">
                    {expired ? `${PRICE}€` : `${PRICE}€`}
                  </h3>
                  <p className="text-sm">
                    {expired
                      ? "La oferta de lanzamiento ha finalizado."
                      : "Ahórrate 100€ — mientras perfecciono el servicio."}
                  </p>
                </div>
                <a
                  href={CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 rounded-2xl bg-violet-700 px-6 py-3 font-semibold text-white shadow hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-900 sm:mt-0"
                >
                  {expired
                    ? "Consultar disponibilidad"
                    : `Quiero mi EPK (${PRICE}€)`}
                </a>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ul className="space-y-2">
                  <li>✅ Diseño completamente personalizado</li>
                  <li>✅ Hosting gratuito por 1 año (renovación opcional)</li>
                  <li>✅ 1 ronda de ajustes incluida (hasta 5 cambios)</li>
                  <li>✅ Entrega en 48h máximo</li>
                </ul>
                <ul className="space-y-2">
                  <li>✅ Player de música integrado</li>
                  <li>✅ Galería de fotos profesional</li>
                  <li>✅ SEO básico + rendimiento ligero</li>
                  <li>✅ Contacto directo (email/WhatsApp)</li>
                </ul>
              </div>
              <p className="mt-4 text-sm">
                * Alcance: 1 página (hero, audio, bio, galería, contacto).
                Dominio propio opcional.
              </p>
              <p className="mt-1 text-sm">
                🛡️ Garantía 14 días: reembolso 100% si no te convence.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="py-10" aria-labelledby="section-faq">
            <h2 id="section-faq" className="text-3xl font-extrabold">
              Preguntas frecuentes
            </h2>
            <div className="mt-6 space-y-3">
              <details className="group rounded-2xl bg-black/50 p-5" open>
                <summary className="cursor-pointer list-none font-semibold group-open:text-yellow-200">
                  ¿Qué necesito para empezar?
                </summary>
                <p className="mt-2 text-white/80">
                  Enlaces a tu música, 5–10 fotos, bio corta y tu contacto. El
                  brief se completa en 15 minutos.
                </p>
              </details>
              <details className="group rounded-2xl bg-black/50 p-5">
                <summary className="cursor-pointer list-none font-semibold group-open:text-yellow-200">
                  ¿Puedo usar mi propio dominio?
                </summary>
                <p className="mt-2 text-white/80">
                  Sí. Puedo conectarlo sin coste. Incluyo subdominio si lo
                  prefieres.
                </p>
              </details>
              <details className="group rounded-2xl bg-black/50 p-5">
                <summary className="cursor-pointer list-none font-semibold group-open:text-yellow-200">
                  ¿Qué pasa tras el año de hosting?
                </summary>
                <p className="mt-2 text-white/80">
                  Puedes seguir conmigo (te diré el coste antes) o mover tu web
                  a tu hosting. Te entrego todo.
                </p>
              </details>
              <details className="group rounded-2xl bg-black/50 p-5">
                <summary className="cursor-pointer list-none font-semibold group-open:text-yellow-200">
                  ¿Puedo cancelar o pedir cambios?
                </summary>
                <p className="mt-2 text-white/80">
                  Incluye 1 ronda de cambios (hasta 5 ajustes). Si no te
                  convence en 14 días, reembolso 100%.
                </p>
              </details>
              <details className="group rounded-2xl bg-black/50 p-5">
                <summary className="cursor-pointer list-none font-semibold group-open:text-yellow-200">
                  ¿De quién es la web y los archivos?
                </summary>
                <p className="mt-2 text-white/80">
                  La web es tuya. Acceso total y archivos exportables si los
                  solicitas.
                </p>
              </details>
            </div>
          </section>

          {/* Contacto */}
          <section
            id="contacto"
            className="rounded-3xl bg-black/40 p-7"
            aria-labelledby="section-contacto"
          >
            <h2 id="section-contacto" className="text-3xl font-extrabold">
              ¿Listo para destacar y conseguir más bookings?
            </h2>
            <p className="mt-2 text-white/85">
              No pierdas más oportunidades. Tu EPK profesional te espera.
            </p>
            <div className="mt-6 grid gap-4 sm:max-w-md">
              <a
                href={`mailto:${CONTACT_MAIL}`}
                className="rounded-2xl bg-white/90 px-5 py-3 font-semibold text-black hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/60"
              >
                📧 {CONTACT_MAIL}
              </a>
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-900"
              >
                💬 WhatsApp directo
              </a>
            </div>
          </section>
        </div>

        {/* Barra fija precio + CTA */}
        <div className="fixed inset-x-0 bottom-4 z-50 px-4">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-700 p-3 text-black shadow-2xl">
            <div className="font-semibold">
              {expired
                ? "EPK web 48h — plazas limitadas"
                : `EPK web 48h — ${PRICE}€`}
            </div>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-black px-4 py-2 font-semibold text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {expired ? "Consultar" : "Reservar ahora"}
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-black/50 py-6 text-center text-sm text-white/70">
        <p>
          © {new Date().getFullYear()} Vandeep —{" "}
          <a href="#" className="underline">
            Privacidad
          </a>{" "}
          •{" "}
          <a href="#" className="underline">
            Aviso legal
          </a>
        </p>
      </footer>
    </div>
  );
}
