"use client";

import { useState } from "react";
import Map, {
  Source,
  Layer,
  NavigationControl,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

export default function GeoDIMAPDashboard() {

  // =========================
  // ESTADOS
  // =========================

  const [activePanel, setActivePanel] = useState("Vista 3D");

  const [showSocavon, setShowSocavon] = useState(true);

  const [showViviendas, setShowViviendas] = useState(true);
const [showCoronas, setShowCoronas] = useState(true);
const [showObras, setShowObras] = useState(true);

  // =========================
  // RETURN
  // =========================

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col overflow-hidden">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <header className="h-16 bg-black border-b border-zinc-800 flex items-center justify-between px-5">

        <div>
          <h1 className="text-2xl font-bold">
            MAPA GEODIMAP Marcelo Cando Jácome PhD.
          </h1>

          <p className="text-sm text-zinc-400">
            Celica — Parque de La Madre | Cuadro de mando Territorial DInSAR
          </p>
        </div>

        {/* BOTONES */}

        <div className="flex gap-3 text-sm">

          {[
            "Vista 3D",
            "DINSAR",
            "Impacto",
            "Evidencias",
            "Mitigación",
            "Cronología",
          ].map((item) => (

            <button
              key={item}
              onClick={() => setActivePanel(item)}
              className={`px-4 py-2 rounded-xl transition-all ${
                activePanel === item
                  ? "bg-cyan-500 text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </header>

      {/* ========================= */}
      {/* CONTENIDO */}
      {/* ========================= */}

      <div className="flex flex-1 overflow-hidden">

        {/* ========================= */}
        {/* PANEL IZQUIERDO */}
        {/* ========================= */}

        <aside className="w-72 bg-black border-r border-zinc-800 overflow-y-auto p-4">

          <h2 className="text-4xl font-bold mb-6">
            Capas
          </h2>

          {/* BASE */}

          <div className="mb-6">

            <h3 className="text-cyan-400 font-bold mb-2">
              BASE
            </h3>

            <div className="space-y-2 text-lg">

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Ortofoto
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                DEM
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Sombra de colina
              </label>

            </div>
          </div>

          {/* GEOMORFOLOGÍA */}

          <div className="mb-6">

            <h3 className="text-cyan-400 font-bold mb-2">
              GEOMORFOLOGÍA
            </h3>

            <div className="space-y-2 text-lg">

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                LS
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Curvaturas
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Pendientes
              </label>

            </div>
          </div>

          {/* HIDROLOGÍA */}

          <div className="mb-6">

            <h3 className="text-cyan-400 font-bold mb-2">
              HIDROLOGÍA
            </h3>

            <div className="space-y-2 text-lg">

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                TWI
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                HAND
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Drenaje
              </label>

            </div>
          </div>

          {/* DINSAR */}

          <div className="mb-6">

            <h3 className="text-cyan-400 font-bold mb-2">
              DINSAR
            </h3>

            <div className="space-y-2 text-lg">

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Subsidencia
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Levantamiento
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Deformación
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Perfiles
              </label>

            </div>
          </div>

          {/* GEOFÍSICA */}

          <div className="mb-6">

            <h3 className="text-cyan-400 font-bold mb-2">
              GEOFÍSICA
            </h3>

            <div className="space-y-2 text-lg">

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                GPR
              </label>

              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked />
                Perfiles GPR
              </label>

            </div>
          </div>

          {/* RIESGO */}

          <div className="mb-6">
map
            <h3 className="text-cyan-400 font-bold mb-2">
              RIESGO
            </h3>

            <<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={showViviendas}
    onChange={() => setShowViviendas(!showViviendas)}
  />
  Viviendas afectadas
</label>

<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={showCoronas}
    onChange={() => setShowCoronas(!showCoronas)}
  />
  Coronas
</label>

<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={showObras}
    onChange={() => setShowObras(!showObras)}
  />
  Obras GAD
</label>

                Socavón

              {showViviendas && (
  <Source id="viviendas" type="geojson" data="/data/viviendas.geojson">
    <Layer
      id="viviendas-points"
      type="circle"
      paint={{
        "circle-radius": 6,
        "circle-color": "#ffff00",
        "circle-stroke-color": "#000000",
        "circle-stroke-width": 2,
      }}
    />
  </Source>
)}

{showCoronas && (
  <Source id="coronas" type="geojson" data="/data/coronas.geojson">
    <Layer
      id="coronas-line"
      type="line"
      paint={{
        "line-color": "#00ffff",
        "line-width": 3,
      }}
    />
  </Source>
)}

{showObras && (
  <Source id="obras-gad" type="geojson" data="/data/obras_gad.geojson">
    <Layer
      id="obras-gad-line"
      type="line"
      paint={{
        "line-color": "#00ff66",
        "line-width": 3,
      }}
    />
  </Source>
)}
            </div>
          </div>

        </aside>

        {/* ========================= */}
        {/* MAPA */}
        {/* ========================= */}

        <main className="flex-1 relative">

          <Map
            initialViewState={{
              longitude: -79.95,
              latitude: -4.10,
              zoom: 15,
              pitch: 45,
              bearing: -15,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
            mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          >

            <NavigationControl position="top-right" />

            {/* SOCAVÓN */}

            {showSocavon && (

              <Source
                id="socavon"
                type="geojson"
                data="/data/socavon.geojson"
              >

                <Layer
                  id="socavon-fill"
                  type="fill"
                  paint={{
                    "fill-color": "#ff0040",
                    "fill-opacity": 0.45,
                  }}
                />

                <Layer
                  id="socavon-outline"
                  type="line"
                  paint={{
                    "line-color": "#ffffff",
                    "line-width": 2,
                  }}
                />

              </Source>

            )}

          </Map>

          {/* PANEL CENTRAL */}

          <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md p-6 rounded-2xl w-80 border border-zinc-700">

            <h2 className="text-3xl font-bold mb-4">
              Evento principal
            </h2>

            <p className="text-lg text-zinc-300 leading-relaxed">
              La anomalía DInSAR detectada en marzo de 2025 coincide
              con el hundimiento ocurrido el 9 de abril de 2025
              en el Parque de La Madre, Celica.
            </p>

          </div>

          {/* PANEL DINÁMICO */}

          {activePanel === "DINSAR" && (

            <div className="absolute bottom-10 left-10 bg-black/70 p-5 rounded-2xl border border-cyan-500">

              <h2 className="text-2xl font-bold mb-2">
                Panel DInSAR
              </h2>

              <p className="text-zinc-300">
                Información de deformación y subsidencia.
              </p>

            </div>

          )}

          {activePanel === "Impacto" && (

            <div className="absolute bottom-10 left-10 bg-black/70 p-5 rounded-2xl border border-red-500">

              <h2 className="text-2xl font-bold mb-2">
                Impacto Territorial
              </h2>

              <p className="text-zinc-300">
                Viviendas afectadas e infraestructura.
              </p>

            </div>

          )}

          {activePanel === "Mitigación" && (

            <div className="absolute bottom-10 left-10 bg-black/70 p-5 rounded-2xl border border-green-500">

              <h2 className="text-2xl font-bold mb-2">
                Mitigación
              </h2>

              <p className="text-zinc-300">
                Obras, drenajes y estabilización.
              </p>

            </div>

          )}

        </main>
{activePanel === "Evidencias" && (

  <div className="absolute bottom-10 left-10 bg-black/70 p-5 rounded-2xl border border-yellow-500">

    <h2 className="text-2xl font-bold mb-2">
      Evidencias
    </h2>

    <p className="text-zinc-300">
      Fotografías, grietas, subsidencia y monitoreo de campo.
    </p>

  </div>

)}
        {/* ========================= */}
        {/* PANEL DERECHO */}
        {/* ========================= */}

        <aside className="w-80 bg-black border-l border-zinc-800 p-4 overflow-y-auto">

          <h2 className="text-3xl font-bold mb-6">
            Interpretación Territorial
          </h2>

          <div className="space-y-6">

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

              <h3 className="text-zinc-400 mb-2">
                Subsidencia
              </h3>

              <h4 className="text-2xl font-bold mb-2">
                Alta
              </h4>

              <p className="text-zinc-400">
                Zona de deformación coincidente con hundimiento superficial validado.
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

              <h3 className="text-zinc-400 mb-2">
                DInSAR
              </h3>

              <h4 className="text-2xl font-bold mb-2">
                Marzo 2025
              </h4>

              <p className="text-zinc-400">
                Anomalía previa detectada antes del evento.
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

              <h3 className="text-zinc-400 mb-2">
                Impacto
              </h3>

              <h4 className="text-2xl font-bold mb-2">
                Infraestructura urbana
              </h4>

              <p className="text-zinc-400">
                Afectación de viviendas, vías y áreas públicas cercanas.
              </p>

            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800">

              <h3 className="text-zinc-400 mb-2">
                Mitigación
              </h3>

              <h4 className="text-2xl font-bold mb-2">
                Obras GAD + Coronas
              </h4>

              <p className="text-zinc-400">
                Implementación de drenajes y zonas de control.
              </p>

            </div>

          </div>

        </aside>

      </div>

      {/* ========================= */}
      {/* TIMELINE */}
      {/* ========================= */}

      <footer className="h-32 bg-black border-t border-zinc-800 px-6 py-4">

        <h2 className="text-3xl font-bold mb-4">
          Línea de tiempo territorial
        </h2>

        <div className="flex justify-between items-center text-lg text-zinc-300">

          <div>2023</div>
          <div>2024</div>
          <div>Marzo 2025</div>
          <div>9 abril 2025</div>
          <div>Mayo 2025</div>

        </div>

        <div className="relative mt-4 h-2 bg-zinc-800 rounded-full">

          <div className="absolute left-[5%] top-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-400 rounded-full"></div>

          <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-400 rounded-full"></div>

          <div className="absolute left-[55%] top-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-400 rounded-full"></div>

          <div className="absolute left-[80%] top-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-400 rounded-full"></div>

        </div>

      </footer>

    </div>
  );
}