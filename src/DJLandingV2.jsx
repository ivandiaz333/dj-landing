import React, { useEffect, useMemo, useState } from "react";

const DEADLINE = new Date("2025-08-20T23:59:59+02:00");
const PRICE = 149;
const CONTACT_URL =
  "https://wa.me/34600000000?text=Hola%20Vandeep%2C%20quiero%20mi%20EPK%20web%20en%2048h.%20%C2%BFPr%C3%B3ximos%20huecos%3F";
const CONTACT_MAIL = "tu@email.com";

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

  return parts;
}

export default function EPKLandingV2() {
  const { days, hours, minutes, seconds } = useCountdown(DEADLINE);

  return (
    <main className="min-h-screen bg-gradient-to-br from-fuchsia-800 via-purple-700 to-rose-600 text-white">
      <div className="mx-auto max-w-5xl px-6 pb-4 md:pb-2">
        {/* Hero */}
        <section className="pt-10 sm:pt-16 pb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-300/90 px-3 py-1 text-black mb-4 sm:mb-6 shadow mx-auto">
            <span>🚀</span>
            <span className="text-xs sm:text-sm font-semibold">
              NUEVO SERVICIO · PRECIO DE LANZAMIENTO
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight drop-shadow-sm">
            EPK profesional en 48 h{" "}
            <span className="text-yellow-300">que consigue bolos</span>
          </h1>

          <p className="mt-2 sm:mt-3 max-w-xl mx-auto text-base sm:text-lg/7 text-white/90 px-2">
            Para DJs que quieren enviar a promotores una página clara y rápida
            con su música, fotos y contacto. Sin PDFs pesados ni 5 links
            distintos.
          </p>

          {/* Precio + CTA */}
          <div className="mt-4 sm:mt-6 inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-gradient-to-b from-amber-400 to-amber-600 text-black rounded-xl px-4 py-3 sm:px-6 sm:py-4 shadow-lg mx-auto">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold">
                {PRICE}€
              </div>
              <p className="text-xs sm:text-sm">Bonus: 3 banners IG</p>
              <p className="text-xs font-semibold text-red-700">
                Solo 3 plazas
              </p>
            </div>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg sm:rounded-xl bg-black px-4 sm:px-5 py-2 sm:py-3 font-semibold text-white hover:bg-gray-900 text-sm sm:text-base"
            >
              Quiero mi EPK
            </a>
          </div>

          {/* Countdown */}
          <div className="mt-4 sm:mt-5 mx-auto max-w-md rounded-2xl sm:rounded-3xl bg-black/30 p-4 sm:p-5 backdrop-blur">
            <p className="font-semibold text-yellow-200 text-sm sm:text-base">
              Oferta válida hasta:
            </p>
            <div className="mt-2 sm:mt-3 grid grid-cols-4 gap-2 sm:gap-3 text-center">
              {[
                { label: "DÍAS", value: days },
                { label: "HORAS", value: hours },
                { label: "MIN", value: minutes },
                { label: "SEG", value: seconds },
              ].map((b) => (
                <div
                  key={b.label}
                  className="rounded-xl sm:rounded-2xl bg-white/10 py-3 sm:py-4"
                >
                  <div className="text-lg sm:text-2xl font-bold tabular-nums">
                    {String(b.value).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/70">
                    {b.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problema / solución */}
        <section className="my-8 rounded-3xl bg-black/50 p-6">
          <h2 className="text-2xl font-bold">¿Te pasa que…?</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold text-rose-300">
                Lo que te frena
              </h3>
              <ul className="space-y-2 text-white/90">
                <li>✖️ Te piden EPK y terminas enviando 5 enlaces sueltos</li>
                <li>✖️ Tu bio/fotos no venden</li>
                <li>✖️ Tu web va lenta o mal en móvil</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-emerald-300">
                Lo que te ayuda
              </h3>
              <ul className="space-y-2 text-white/90">
                <li>✅ Un solo link rápido y ordenado</li>
                <li>✅ Bio clara y profesional + música al instante</li>
                <li>✅ Contacto visible para cerrar fechas</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-10">
          <h2 className="text-center text-3xl font-extrabold">
            ¿Por qué un EPK web{" "}
            <span className="text-purple-200">funciona mejor</span>?
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Impacto instantáneo",
                text: "En segundos saben quién eres y qué tocas. La info clave se ve de un vistazo.",
                icon: "⚡️",
              },
              {
                title: "Todo en un link",
                text: "Bio, música, fotos y contacto. Sin confusión, sin perder tiempo.",
                icon: "🎯",
              },
              {
                title: "Perfecto en móvil",
                text: "Optimizado para revisión rápida en backstage o desde el teléfono.",
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

        {/* CTA final */}
        <section
          id="contacto"
          className="w-full rounded-3xl bg-black/40 p-7 text-center mb-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold">
              Reserva tu EPK Express hoy
            </h2>
            <p className="mt-2 text-white/85">
              Entrega en 48 h. Sin riesgo: si no te convence, reembolso 100% en
              14 días.
            </p>
            <div className="mt-6 grid gap-4 sm:max-w-md mx-auto">
              <a
                href={`mailto:${CONTACT_MAIL}`}
                className="rounded-2xl bg-white/90 px-5 py-3 font-semibold text-black hover:bg-white"
              >
                📧 {CONTACT_MAIL}
              </a>
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
              >
                💬 WhatsApp directo
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer con copy y legales */}
      <footer className="mt-8 bg-black/50 py-8 text-center text-white/80 text-sm">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <p className="text-lg font-semibold text-white">
            Tu música merece ser escuchada. Haz que tu primera impresión cuente.
          </p>
          <p>
            EPK Express 48h es el atajo profesional para que promotores y salas
            digan <span className="font-semibold text-yellow-300">"sí"</span> a
            tu propuesta.
          </p>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-3 rounded-xl bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-500 transition"
          >
            🚀 Quiero mi EPK ahora
          </a>
          <div className="border-t border-white/20 my-6"></div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-white/60">
            <p>
              © {new Date().getFullYear()} Vandeep — Todos los derechos
              reservados
            </p>
            <span className="hidden sm:block">•</span>
            <a href="#" className="hover:underline">
              Política de privacidad
            </a>
            <span className="hidden sm:block">•</span>
            <a href="#" className="hover:underline">
              Aviso legal
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
