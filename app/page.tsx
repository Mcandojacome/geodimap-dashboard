"use client";

import { useState } from "react";
import Map, { Source, Layer, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const osmStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
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
};

const satelliteStyle = {
  version: 8,
  sources: {
    esri: {
      type: "raster",
      tiles: [
        "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Tiles © Esri",
    },
  },
  layers: [
    {
      id: "esri-satellite",
      type: "raster",
      source: "esri",
    },
  ],
};

export default function GeoDIMAPDashboard() {
  const [activePanel, setActivePanel] = useState("Vista 3D");
  const [baseMap, setBaseMap] = useState("osm");

  const [showSocavon, setShowSocavon] = useState(true);
  const [showViviendas, setShowViviendas] = useState(true);
  const [showCoronas, setShowCoronas] = useState(true);
  const [showObras, setShowObras] = useState(true);

  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col overflow-hidden">
      <header className="h-16 bg-black border-b border-zinc-800 flex items-center justify-between px-5">
        <div>
          <h1 className="text-2xl font-bold">
            MAPA GEODIMAP. Marcelo Cando Jácome PhD.
          </h1>
          <p className="text-sm text-zinc-400">
            Celica — Parque de La Madre | Cuadro de mando Territorial DInSAR
          </p>
        </div>

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

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-black border-r border-zinc-800 overflow-y-auto p-4">
          <h2 className="text-4xl font-bold mb-6">Capas</h2>

          <div className="mb-6">
            <h3 className="text-cyan-400 font-bold mb-2">MAPA BASE</h3>

            <div className="space-y-2 text-lg">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="baseMap"
                  checked={baseMap === "osm"}
                  onChange={() => setBaseMap("osm")}
                />
                OSM
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="baseMap"
                  checked={baseMap === "satellite"}
                  onChange={() => setBaseMap("satellite")}
                />
                Imagen satelital
              </label>
            </div>
          </div>

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
            layers={[
              "Subsidencia",
              "Levantamiento",
              "Deformación",
              "Perfiles",
            ]}
          />

          <LayerGroup title="GEOFÍSICA" layers={["GPR", "Perfiles GPR"]} />

          <div className="mb-6">
            <h3 className="text-cyan-400 font-bold mb-2">RIESGO</h3>

            <div className="space-y-2 text-lg">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showSocavon}
                  onChange={() => setShowSocavon(!showSocavon)}
                />
                Socavón
              </label>

              <label className="flex items-center gap-2">
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
            </div>
          </div>
        </aside>

        <main className="flex-1 relative">
          <Map
            initialViewState={{
              longitude: -79.956,
              latitude: -4.101,
              zoom: 15,
              pitch: 45,
              bearing: -15,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle={baseMap === "osm" ? osmStyle : satelliteStyle}
          >
            <NavigationControl position="top-right" />

            {showViviendas && (
              <Source
                id="viviendas"
                type="geojson"
                data="/data/viviendas.geojson"
              >
                <Layer
                  id="viviendas-fill"
                  type="fill"
                  paint={{
                    "fill-color": "#ffcc00",
                    "fill-opacity": 0.5,
                  }}
                />
                <Layer
                  id="viviendas-outline"
                  type="line"
                  paint={{
                    "line-color": "#000000",
                    "line-width": 1,
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
                    "line-width": 4,
                  }}
                />
              </Source>
            )}

            {showObras && (
              <Source
                id="obras-gad"
                type="geojson"
                data="/data/obras_gad.geojson"
              >
                <Layer
                  id="obras-gad-line"
                  type="line"
                  paint={{
                    "line-color": "#00ff66",
                    "line-width": 4,
                  }}
                />
              </Source>
            )}

            {showSocavon && (
              <Source id="socavon" type="geojson" data="/data/socavon.geojson">
                <Layer
                  id="socavon-fill"
                  type="fill"
                  paint={{
                    "fill-color": "#ff0040",
                    "fill-opacity": 0.25,
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

          <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md p-6 rounded-2xl w-80 border border-zinc-700">
            <h2 className="text-3xl font-bold mb-4">Evento principal</h2>
            <p className="text-lg text-zinc-300 leading-relaxed">
              La anomalía DInSAR detectada en marzo de 2025 coincide con el
              hundimiento ocurrido el 9 de abril de 2025 en el Parque de La
              Madre, Celica.
            </p>
          </div>

          {activePanel === "Vista 3D" && (
            <DynamicPanel
              title="Vista 3D Territorial"
              text="Modelo tridimensional del área de subsidencia."
              color="border-cyan-500"
            />
          )}

          {activePanel === "DINSAR" && (
            <DynamicPanel
              title="Panel DInSAR"
              text="Información de deformación, subsidencia y levantamiento relativo."
              color="border-cyan-500"
            />
          )}

          {activePanel === "Impacto" && (
            <DynamicPanel
              title="Impacto Territorial"
              text="Viviendas afectadas, infraestructura urbana y zonas críticas."
              color="border-red-500"
            />
          )}

          {activePanel === "Evidencias" && (
            <DynamicPanel
              title="Evidencias"
              text="Fotografías, grietas, subsidencia y monitoreo de campo."
              color="border-yellow-500"
            />
          )}

          {activePanel === "Mitigación" && (
            <DynamicPanel
              title="Mitigación"
              text="Obras, drenajes, coronas y estabilización territorial."
              color="border-green-500"
            />
          )}

          {activePanel === "Cronología" && (
            <DynamicPanel
              title="Cronología del evento"
              text="Evolución temporal desde 2023 hasta mayo de 2025."
              color="border-purple-500"
            />
          )}
        </main>

        <aside className="w-80 bg-black border-l border-zinc-800 p-4 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6">
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
            description="Anomalía previa detectada antes del evento."
          />

          <InfoCard
            title="Impacto"
            value="Infraestructura urbana"
            description="Afectación de viviendas, vías y áreas públicas cercanas."
          />

          <InfoCard
            title="Mitigación"
            value="Obras GAD + Coronas"
            description="Implementación de drenajes y zonas de control."
          />
        </aside>
      </div>

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

function LayerGroup({
  title,
  layers,
}: {
  title: string;
  layers: string[];
}) {
  return (
    <div className="mb-6">
      <h3 className="text-cyan-400 font-bold mb-2">{title}</h3>
      <div className="space-y-2 text-lg">
        {layers.map((layer) => (
          <label key={layer} className="flex items-center gap-2">
            <input type="checkbox" defaultChecked />
            {layer}
          </label>
        ))}
      </div>
    </div>
  );
}

function DynamicPanel({
  title,
  text,
  color,
}: {
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div
      className={`absolute bottom-10 left-10 bg-black/70 p-5 rounded-2xl border ${color}`}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-zinc-300">{text}</p>
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
    <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 mb-6">
      <h3 className="text-zinc-400 mb-2">{title}</h3>
      <h4 className="text-2xl font-bold mb-2">{value}</h4>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}