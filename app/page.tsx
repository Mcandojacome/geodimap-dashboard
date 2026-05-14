button"use client";

import { useState } from "react";

import Map, {
  NavigationControl,
  Source,
  Layer,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";

export default function GeoDIMAPDashboard() {
  const [showSocavon, setShowSocavon] = useState(true);

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col overflow-hidden">
      {/* HEADER */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-6 bg-zinc-950">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">MAPA GEODIMAP. Marcelo Cando Jácome PhD.</h1>
          <p className="text-xs text-zinc-400">
            Celica — Parque de La Madre | Cuadro de mando Territorial DInSAR
          </p>
        </div>

        <div className="flex gap-3 text-sm">
          {["Vista 3D", "DINSAR", "Impacto", "Evidencias", "Mitigación", "Cronología"].map(
            (item) => (
              <button
                key={item}
                className="px-3 py-1 rounded-xl bg-zinc-800 hover:bg-zinc-700"
              >
                {item}
              </button>
            )
          )}
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex flex-1 overflow-hidden">
        {/* PANEL IZQUIERDO */}
        <aside className="w-72 border-r border-zinc-800 bg-zinc-950 overflow-y-auto p-4">
          <h2 className="text-lg font-semibold mb-4">Capas</h2>

          <LayerGroup
            title="BASE"
            layers={["Ortofoto", "DEM", "Sombra de colina"]}
          />

          <LayerGroup
            title="GEOMORFOLOGÍA"
            layers={["LS", "Curvaturas", "Pendientes"]}
          />

          <LayerGroup
            title="HIDROLOGÍA"
            layers={["TWI", "HAND", "Drenaje"]}
          />

          <LayerGroup
            title="DINSAR"
            layers={["Subsidencia", "Levantamiento", "Deformación", "Perfiles"]}
          />

          <LayerGroup
            title="GEOFÍSICA"
            layers={["GPR", "Perfiles GPR"]}
          />

          {/* RIESGO CON CONTROL REAL DEL SOCAVÓN */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-cyan-400 mb-2 tracking-wide">
              RIESGO
            </h3>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={showSocavon}
                  onChange={() => setShowSocavon(!showSocavon)}
                />
                Socavón
              </label>

              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" defaultChecked />
                Viviendas afectadas
              </label>

              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" defaultChecked />
                Coronas
              </label>

              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input type="checkbox" defaultChecked />
                Obras GAD
              </label>
            </div>
          </div>
        </aside>

        {/* MAPA */}
        <main className="flex-1 relative overflow-hidden">
          <Map
            initialViewState={{
  longitude: -79.95,
  latitude: -4.10,
  zoom: 15,
  pitch: 60,
  bearing: -15,
}}
            style={{ width: "100%", height: "100%" }}
mapStyle={{
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
    },
  ],
}}          >
            <NavigationControl position="top-right" />

            {/* CAPA SOCAVÓN */}
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
                    "fill-color": "#ff0000",
                    "fill-opacity": 0.55,
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

          {/* TARJETA SOBRE EL MAPA */}
          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-2xl p-4 border border-zinc-800 w-72 z-10">
            <h3 className="font-semibold mb-2">Evento principal</h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              La anomalía DInSAR detectada en marzo de 2025 coincide con el
              hundimiento ocurrido el 9 de abril de 2025 en el Parque de La
              Madre, Celica.
            </p>
          </div>
        </main>

        {/* PANEL DERECHO */}
        <aside className="w-80 border-l border-zinc-800 bg-zinc-950 overflow-y-auto p-4">
          <h2 className="text-lg font-semibold mb-4">
            Interpretación Territorial
          </h2>

          <InfoCard
            title="Subsidencia"
            value="Alta"
            description="Zona de deformación coincidente con hundimiento superficial validado."
          />

          <InfoCard
            title="DInSAR"
            value="Marzo 2025"
            description="Anomalía previa detectada antes del evento del 9 de abril de 2025."
          />

          <InfoCard
            title="Impacto"
            value="Infraestructura urbana"
            description="Afectación de viviendas, vías y áreas públicas cercanas."
          />

          <InfoCard
            title="Mitigación"
            value="Obras GAD + Coronas"
            description="Implementación de drenajes, embaulados y zonas de control."
          />
        </aside>
      </div>

      {/* LÍNEA DE TIEMPO */}
      <footer className="h-28 border-t border-zinc-800 bg-zinc-950 px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Línea de tiempo territorial</h2>
          <span className="text-sm text-zinc-500">
            Evolución temporal del evento
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-zinc-300">
          <TimelineNode date="2023" label="Monitoreo" />
          <TimelineNode date="2024" label="Análisis" />
          <TimelineNode date="Marzo de 2025" label="DInSAR" />
          <TimelineNode date="9 de abril de 2025" label="Hundimiento" />
          <TimelineNode date="Mayo de 2025" label="Mitigación" />
        </div>
      </footer>
    </div>
  );
}

function LayerGroup({
  title,
  layers,
}: {
  title: string;
  layers: string[];
}) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-bold text-cyan-400 mb-2 tracking-wide">
        {title}
      </h3>

      <div className="space-y-2">
        {layers.map((layer) => (
          <label
            key={layer}
            className="flex items-center gap-2 text-sm text-zinc-300"
          >
            <input type="checkbox" defaultChecked />
            {layer}
          </label>
        ))}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">
      <h3 className="text-sm text-zinc-400 mb-1">{title}</h3>
      <p className="text-lg font-semibold mb-2">{value}</p>
      <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
    </div>
  );
}

function TimelineNode({
  date,
  label,
}: {
  date: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center flex-1 relative">
      <div className="w-full h-px bg-zinc-700 absolute top-2 left-1/2"></div>
      <div className="w-4 h-4 rounded-full bg-cyan-400 z-10"></div>

      <div className="mt-2 text-center">
        <div className="font-semibold">{date}</div>
        <div className="text-zinc-500 text-xs">{label}</div>
      </div>
    </div>
  );
}