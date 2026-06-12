



"use client";

import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

import { useState, useRef } from "react";
import Map, {
  Source,
  Layer,
  Popup,
  NavigationControl,
  ScaleControl,
  type MapRef,
} from "react-map-gl/maplibre";
const initialViewState = {
  longitude: -79.956,
  latitude: -4.101,
  zoom: 15,
  pitch: 45,
  bearing: -20,
};

const mapStyle: any = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap © CARTO",
    },
  },
  layers: [
    {
      id: "carto-base",
      type: "raster",
      source: "carto",
    },
  ],
};
const satelliteStyle: any = {
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
  layers: [{ id: "esri-satellite", type: "raster", source: "esri" }],
};

export default function GeoDIMAPDashboard() {
  const [globalRasterOpacity, setGlobalRasterOpacity] = useState(55);
  const [activePanel, setActivePanel] = useState("Vista 3D");
  const [baseMap, setBaseMap] = useState("osm");
  const [showSocavon, setShowSocavon] = useState(true);
  const [showViviendas, setShowViviendas] = useState(true);
  const [showCoronas, setShowCoronas] = useState(true);
  const [showObras, setShowObras] = useState(true);
  const [showEvento, setShowEvento] = useState(true);
  const [showPanelInfo, setShowPanelInfo] = useState(true);
  const [showDEM, setShowDEM] = useState(true);
  const [showRelieve, setShowRelieve] = useState(true);
  const [showTWI, setShowTWI] = useState(true);
  const [twiOpacity, setTwiOpacity] = useState(55);
  const [showLS, setShowLS] = useState(true); 
  const [lsOpacity, setLsOpacity] = useState(55);
  const [showOrtofoto, setShowOrtofoto] = useState(true);
  const [Ortrofoto, setOrtofotoOpacity] = useState(55);
  const [showFlujoErosion, setShowFlujoErosion] = useState(true);
  const [FlujoErosionOpacity, setFlujoErosionOpacity] = useState(55);
  const [showCurvaturadePerfil, setShowCurvaturadePerfil] = useState(true);
  const [showCurvaturaPlana, setShowCurvaturaPlana] = useState(true);
  const [showIndiceConvergencia, setShowIndiceConvergencia] = useState(true);
  const [showDrenajes, setShowDrenajes] = useState(true);
  const [showDefor20222025, setShowDefor20222025] = useState(true);
  const [dinsarOpacity, setDinsarOpacity] = useState(2);
  const [showDeformacionEstructural, setShowDeformacionEstructural] = useState(true);
  const [opacityDeformacionEstructural, setOpacityDeformacionEstructural] = useState(0.75);
  const [showFracturas, setShowFracturas] = useState(true);
  const [opacityFracturas, setOpacityFracturas] = useState(100);
  const [showLaMadre, setShowLaMadre] = useState(true);
  const [globalOpacity, setGlobalOpacity] = useState(1);
  const [selectedEvidencia, setSelectedEvidencia] = useState<any>(null);
  const [showEvidenciasCampo, setShowEvidenciasCampo] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const isMobile =
  typeof window !== "undefined" && window.innerWidth < 768;
  
 
  const mapRef = useRef<MapRef | null>(null);

const vista2D = () => {
  mapRef.current?.getMap().easeTo({
    pitch: 0,
    bearing: 0,
    duration: 1200,
  });
};

const vista3D = () => {
  mapRef.current?.getMap().easeTo({
    pitch: 75,
    bearing: -30,
    duration: 1200,
  });
};
  
   
  return (
    <div className="w-screen h-screen bg-black text-white flex flex-col overflow-hidden">
      <header className="h-16 bg-black border-b border-zinc-800 flex items-center justify-between px-5">
        <div>
          <h1 className="text-lg md:text-2xl font-bold">
            MAPA GEODIMAP 
          </h1>
          <p className="text-sm text-zinc-400">
            Celica — Parque de La Madre | Cuadro de mando Territorial DInSAR
          </p>
        </div>

        <div className="flex gap-3 text-sm overflow-x-auto">
          {["Vista 3D", "DINSAR", "Impacto", "Evidencias", "Mitigación", "Cronología"].map(
            (item) => (
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
            )
          )}
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        <aside className="hidden md:block w-72 bg-black border-r border-zinc-800 overflow-y-auto p-4">
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

          <div className="mb-6">
            <h3 className="text-cyan-400 font-bold mb-2">BASE</h3>

            <div className="space-y-2 text-lg">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showOrtofoto}
                  onChange={() => setShowOrtofoto(!showOrtofoto)}
                />
                Ortofoto
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDEM}
                  onChange={() => setShowDEM(!showDEM)}
                />
                DEM 13 m 2026
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showRelieve}
                  onChange={() => setShowRelieve(!showRelieve)}
                />
                Relieve / Hillshade
              </label>
                          
            </div>
          </div>


          <LayerGroup

            title="HIDROLOGÍA"
            layers={[]}
          />
<label className="flex items-center gap-2 text-lg mb-2">
  <input

    type="checkbox"
    checked={showDrenajes}
    onChange={() => setShowDrenajes(!showDrenajes)}
 
 />
  Drenajes

</label>



          <div className="mb-6">
  <h3 className="text-cyan-400 font-bold mb-2">HIDROGEOMORFOLOGÍA</h3>

  <label className="flex items-center gap-2 text-lg mb-2">
    <input
      type="checkbox"
      checked={showIndiceConvergencia}
      onChange={() => setShowIndiceConvergencia(!showIndiceConvergencia)}
    />
    Índice de Convergencia
  </label>
</div>
          <label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showTWI}
    onChange={() => setShowTWI(!showTWI)}
  />
  Índice de Humedad Topográfica
</label>
<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={showLS}
    onChange={() => setShowLS(!showLS)}
  />
  LS
</label>
<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showFlujoErosion}
    onChange={() => setShowFlujoErosion(!showFlujoErosion)}
  />
  Int. Flujo-Erosión
</label>
<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showCurvaturadePerfil}
    onChange={() =>
      setShowCurvaturadePerfil(!showCurvaturadePerfil)
    }
  />
  Curvatura de Perfil
</label>
<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showCurvaturaPlana}
    onChange={() =>
      setShowCurvaturaPlana(!showCurvaturaPlana)
    }
  />
  Curvatura Plana
</label>
<h3 className="text-cyan-400 font-bold mt-6 mb-3">EVIDENCIAS</h3>

<label className="flex items-center gap-2 text-lg">
  <input
    type="checkbox"
    checked={showEvidenciasCampo}
    onChange={() => setShowEvidenciasCampo(!showEvidenciasCampo)}
  />
  Evidencias de campo
</label>


{/* ========================= */}
{/* INFRAESTRUCTURA Y DEFORMACIÓN */}
{/* ========================= */}

<div className="mb-6">
  <h3 className="text-cyan-400 font-bold mb-2">
    INFRAESTRUCTURA Y DEFORMACIÓN
  </h3>
  <div className="space-y-2 text-lg">

    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={showDeformacionEstructural}
        onChange={(e) =>
          setShowDeformacionEstructural(e.target.checked)
        }
      />
      Deformación Estructural
    </label>
<label className="flex items-center gap-2">
  <input
    type="checkbox"
    checked={showFracturas}
    onChange={(e) => setShowFracturas(e.target.checked)}
    
  />
  Fracturas verificadas
</label>
  </div>
</div>
       
              <LayerGroup
            title="Análisis DINSAR. Deformación del Relieve Topográfico"
            layers={[ "Subsidencia-Hundimiento", "Levantamiento","Perfiles", "Placas de rotura morfológica"]}
          />
<label>
  <input
    type="checkbox"
    checked={showDefor20222025}
    onChange={(e) => setShowDefor20222025(e.target.checked)}
  />
  Deformación 2022-2025
</label>
<div className="mt-2 mb-4">
  <label className="text-sm text-cyan-300">
    Visible: {dinsarOpacity}%
  </label>

  <input
    type="range"
    min="0"
    max="100"
    value={dinsarOpacity}
    onChange={(e) => setDinsarOpacity(Number(e.target.value))}
    className="w-full"
  />
</div>

<div style={{ marginBottom: "20px" }}>
  <strong>Transparencia General</strong>

  <div style={{ marginTop: "8px" }}>
    Visible: {Math.round(globalOpacity * 100)}%
  </div>

  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={globalOpacity}
    onChange={(e) =>
      setGlobalOpacity(Number(e.target.value))
    }
    style={{ width: "100%" }}
  />
</div>

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

<label>
  <input
    type="checkbox"
    checked={showLaMadre}
    onChange={(e) => setShowLaMadre(e.target.checked)}
  />
  Ortofoto La Madre
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

        <main className="relative flex-1 h-[calc(100vh-180px)] overflow-hidden">
         
<Map
  mapLib={maplibregl}
  mapStyle={mapStyle}
  initialViewState={initialViewState}
  style={{ width: "100%", height: "100%" }}
  interactiveLayerIds={["evidencias-rosario-layer"]}
  onClick={(e) => {
    const feature = e.features?.[0];

    if (feature?.layer?.id === "evidencias-rosario-layer") {
      setSelectedEvidencia({
        longitude: e.lngLat.lng,
        latitude: e.lngLat.lat,
        properties: feature.properties,
      });
    }
  }}
>


          {showDEM && (
  <Source
    id="dem-color"
    type="image"
    url="/rasters/demcelica2_1.png"
    coordinates={[
      [-80.255, -4.058], // UL
      [-79.804, -4.058], // UR
      [-79.804, -4.277], // LR
      [-80.255, -4.277], // LL
    ]}
  >
    <Layer
      id="dem-color-layer"
      type="raster"
      paint={{
        "raster-opacity": (globalRasterOpacity / 100) * globalOpacity,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}

{showRelieve && (
  <Source
    id="hillshade-gray"
    type="image"
    url="/rasters/hillshadecelica.png"
    coordinates={[
      [-80.255, -4.058], // UL
      [-79.804, -4.058], // UR
      [-79.804, -4.277], // LR
      [-80.255, -4.277], // LL
  
    ]}
  >
    <Layer
      id="hillshade-gray-layer"
      type="raster"
      paint={{
        "raster-opacity": 0.65 * globalOpacity,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}
{showOrtofoto && (
  <Source
    id="ortofoto"
    type="image"
    url="/imagenes/ortorec.png"
    coordinates={[
      [-79.994373165, -4.090647310],
      [-79.911038619, -4.090647310],
      [-79.911038619, -4.121937922],
      [-79.994373165, -4.121937922],
    ]}
  >
    <Layer
      id="ortofoto-layer"
      type="raster"
      paint={{
        "raster-opacity": 1.0 * globalOpacity,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}
{showLaMadre && (
  <Source
    id="lamadre"
    type="image"
    url="/rasters/LaMadre.png"
    coordinates={[
      [-79.95602980, -4.10513213],
      [-79.95493538, -4.10513213],
      [-79.95493538, -4.10589784],
      [-79.95602980, -4.10589784],
    ]}
  >
    <Layer
      id="lamadre-layer"
      type="raster"
      paint={{
        "raster-opacity": 0.85,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}


{showTWI && (
  <Source
    id="twi"
    type="image"
    url="/rasters/twi1mf.png"
    coordinates={[
      [-79.994380750, -4.082170496], // UL
      [-79.934730250, -4.082170496], // UR
      [-79.934730250, -4.153277896], // LR
      [-79.994380750, -4.153277896], // LL
    ]}
  >
    <Layer
      id="twi-layer"
      type="raster"
      paint={{
        "raster-opacity": (twiOpacity / 100) * globalOpacity,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}
{showTWI && !isMobile &&(
  <img
    src="/legends/celica_twi_legend.png"
    alt="Leyenda TWI"
    style={{
      position: "absolute",
      bottom: "360px",
      right: "90px",
      height: "250px",
      width: "auto",
      background: "rgba(255,255,255,0.92)",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.45)"
    }}
  />
 
)}
{showLS && (
  <Source
    id="ls"
    type="image"
    url="/rasters/celica_ls.png"
    coordinates={[
      [-80.343577246, -4.035742128], // UL
      [-79.724828832, -4.035742128], // UR
      [-79.724828832, -4.310786298], // LR
      [-80.343577246, -4.310786298], // LL
    ]}
  >
    <Layer
      id="ls-layer"
      type="raster"
      paint={{
       "raster-opacity": (lsOpacity / 100) * globalOpacity,
       "raster-fade-duration": 0,
      }}
    />
  </Source>
)}
{showLS && !isMobile &&(
  <img
    src="/legends/ls_legend.png"
    alt="Leyenda LS"
    style={{
      position: "absolute",
      bottom: "55px",
      right: "100px",
      height: "250px",
      width: "auto",
      zIndex: 1000,
      background: "rgba(255,255,255,0.92)",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.45)"
    }}
  />
)}
 {showFlujoErosion && (
  <Source
    id="flujo-erosion"
    type="image"
    url="/rasters/celica_concent_escorren_erosion__detalle5..png"
    coordinates={[
      [-79.9964812361, -4.0797863374], // UL
      [-79.9128490841, -4.0797863374], // UR
      [-79.9128490841, -4.1169470814], // LR
      [-79.9964812361, -4.1169470814], // LL
    ]}
  >
    <Layer
      id="flujo-erosion-layer"
      type="raster"
      paint={{
        "raster-opacity": (FlujoErosionOpacity / 100) * globalOpacity,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}
{showFlujoErosion && !isMobile &&(
  <img
    src="/legends/flujo_erosion_legend.png"
    alt="Leyenda Flujo-Erosión"
    style={{
      position: "absolute",
      bottom: "360px",
      right: "90px",
      height: "140px",
      width: "auto",
      transform: "scale(2.2)",
      transformOrigin: "bottom right",
      zIndex: 1000,
      background: "rgba(255,255,255,0.92)",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.45)"
    }}
  />
)}

<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showFlujoErosion}
    onChange={() => setShowFlujoErosion(!showFlujoErosion)}
  />
  Flujo-Erosión
</label>

{showCurvaturadePerfil && (
  <Source
    id="curvatura-perfil"
    type="image"
    url="/rasters/celica_perfil_curv.png"
    coordinates={[
      [-80.248886424, -4.060536677], // UL
      [-79.810450541, -4.060536677], // UR
      [-79.810450541, -4.274169049], // LR
      [-80.248886424, -4.274169049], // LL
    ]}
  >
    <Layer
      id="curvatura-perfil-layer"
      type="raster"
      paint={{
        "raster-opacity": 0.60,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}

<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showCurvaturadePerfil}
    onChange={() => setShowCurvaturadePerfil(!showCurvaturadePerfil)}
  />
  Curvatura de Perfil
</label>

{showCurvaturadePerfil && !isMobile &&(
  <img
    src="/legends/perfil_curv_legend.png"
    alt="Leyenda Curvatura de Perfil"
    style={{
      position: "absolute",
      bottom: "360px",
      right: "30px",
      height: "140px",
      width: "auto",
      transform: "scale(1.8)",
      transformOrigin: "bottom right",
      zIndex: 1000,
      background: "rgba(255,255,255,0.92)",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.45)"
    }}
  />
)}
<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showCurvaturadePerfil}
    onChange={() =>
      setShowCurvaturadePerfil(!showCurvaturadePerfil)
    }
  />
  Curvatura de Perfil
</label>

{showCurvaturaPlana && (
  <Source
    id="curvatura-plana"
    type="image"
    url="/rasters/curvatura_plana.png"
    coordinates={[
      [-80.255278198, -4.057511647], // UL
      [-79.804178198, -4.057511647], // UR
      [-79.804178198, -4.277341647], // LR
      [-80.255278198, -4.277341647], // LL
    ]}
  >
    <Layer
      id="curvatura-plana-layer"
      type="raster"
      paint={{
        "raster-opacity": 0.55,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}
{showCurvaturaPlana && !isMobile &&(
  <img
    src="/legends/curvatura_plana_legend.png"
    alt="Leyenda Curvatura Plana"
    style={{
      position: "absolute",
      bottom: "360px",
      right: "90px",
      height: "140px",
      width: "auto",
      transform: "scale(1.3)",
      transformOrigin: "bottom right",
      zIndex: 1000,
      background: "rgba(255,255,255,0.92)",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.45)"
    }}
  />
)}

<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showCurvaturaPlana}
    onChange={() =>
      setShowCurvaturaPlana(!showCurvaturaPlana)
    }
  />
  Curvatura Plana
</label>
  
   
  {showIndiceConvergencia && (
  <Source
    id="indice-convergencia"
    type="image"
    url="/rasters/Indice_Convergencia.png"
    coordinates={[
      [-80.255, -4.058], // UL
      [-79.804, -4.058], // UR
      [-79.804, -4.277], // LR
      [-80.255, -4.277], // LL
    ]}
  >
    <Layer
      id="indice-convergencia-layer"
      type="raster"
      paint={{
        "raster-opacity": 0.55,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}
{showIndiceConvergencia && !isMobile && (
  <img
    src="/legends/indice_convergencia_legend.png"
    alt="Leyenda Índice de Convergencia"
    style={{
      position: "absolute",
      bottom: "360px",
      right: "90px",
      height: "140px",
      width: "auto",
      transform: "scale(1.3)",
      transformOrigin: "bottom right",
      zIndex: 1000,
      background: "rgba(255,255,255,0.92)",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.45)"
    }}
  />
)}

{showDrenajes && (
  <Source id="drenajes" type="geojson" data="/data/drenes.geojson">
    <Layer
      id="drene-line"
      type="line"
      paint={{
        "line-color": "#00BFFF",
        "line-width": 2,
        "line-opacity": 0.9,
      }}
    />
  </Source>
)}

{showFracturas && (
  <Source
    id="fracturas"
    type="geojson"
    data="/data/fracturas.geojson"
  >
    <Layer
      id="fracturas-line"
      type="line"
      paint={{
        "line-color": "#00ffff",
        "line-width": 2,
        "line-opacity": 1,
      }}
    />
  </Source>
)}

  <LayerGroup
    title="Análisis DINSAR. Deformación del Relieve Topográfico"
    layers={[
      
      "Subsidencia-Hundimiento",
      "Levantamiento del relieve",
      "Perfiles",
      "Placas de rotura morfológica",
    ]}
  />

  {showDefor20222025 && (
  <Source
    id="deformacion-image"
    type="image"
    url="/dinsar/defor2022_2025_micro.png"
    coordinates={[
  [-80.006993195, -4.081992195],
  [-79.934938633, -4.081992195],
  [-79.934938633, -4.162983757],
  [-80.006993195, -4.162983757],
]}
  
  >
    <Layer
      id="deformacion-layer"
      type="raster"
      paint={{
        "raster-opacity": dinsarOpacity / 100,
      }}
    />
  </Source>
)}
<div style={{ marginBottom: "15px" }}>
  <div
    style={{
      color: "#00d4ff",
      fontWeight: "bold",
      marginBottom: "6px",
    }}
  >
    Transparencia General
  </div>

  <div style={{ color: "white", fontSize: "13px" }}>
    Visible: {Math.round(globalOpacity * 100)}%
  </div>

  <input
    type="range"
    min="0"
    max="1"
    step="0.01"
    value={globalOpacity}
    onChange={(e) =>
      setGlobalOpacity(Number(e.target.value))
    }
    style={{ width: "100%" }}
  />
</div>
{showDefor20222025 && !isMobile &&(
  <img
    src="/legends/deforma2022_2025f_legend1.png"
    alt="Leyenda Deformación del Relieve"
    style={{
      position: "absolute",
      bottom: "150px",
      right: "90px",
      height: "250px",
      width: "280",
      transform: "scale(1.50)",
      transformOrigin: "bottom right",
      zIndex: 1000,
      background: "rgba(255,255,255,0.92)",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.45)"
    }}
  />
)}

<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showDefor20222025}
    onChange={() =>
      setShowDeformacionEstructural(!showDefor20222025)
    }
  />
  Deformacion del Relieve
</label>

{showDeformacionEstructural && (
  <Source
    id="deformacion-estructural"
    type="image"
    url="/dinsar/deforestruc11.png"
    coordinates={[
      [-79.978547000, -4.092336900],
      [-79.930203500, -4.092336900],
      [-79.930203500, -4.117275900],
      [-79.978547000, -4.117275900],
    ]}
  >
    <Layer
      id="deformacion-estructural-layer"
      type="raster"
      paint={{
       "raster-opacity": globalOpacity,
      "raster-fade-duration": 0,
      }}
    />
  </Source>
)}



{showDeformacionEstructural && !isMobile &&(
    <img
    src="/legends/deforma2022_2025f_legend1.png"
    alt="Leyenda Deformación Estructural"
    style={{
      position: "absolute",
      bottom: isMobile ? "80px" : "150px",
      right: isMobile ? "15px" : "90px",
      height: isMobile ? "120px" : "250px",
      width: "auto",
      transform: isMobile ? "scale(1.0)" : "scale(1.50)",
      transformOrigin: "bottom right",
      zIndex: 1000,
      background: "rgba(255,255,255,0.92)",
      padding: "6px",
      borderRadius: "10px",
      boxShadow: "0 0 12px rgba(0,0,0,0.45)",
    }}
  />
)}
    
      
<label className="flex items-center gap-2 text-lg mb-2">
  <input
    type="checkbox"
    checked={showDeformacionEstructural}
    onChange={() =>
      setShowDeformacionEstructural(!showDeformacionEstructural)
    }
  />
  Deformacion Estructural
</label>

            {showViviendas && (
              <Source id="viviendas" type="geojson" data="/data/viviendas.geojson">
                <Layer
                  id="viviendas-fill"
                  type="fill"
                  paint={{ "fill-color": "#ffcc00", "fill-opacity": 0.5 }}
                />
                <Layer
                  id="viviendas-outline"
                  type="line"
                  paint={{ "line-color": "#000000", "line-width": 1 }}
                />
              </Source>
            )}
            
            {showCoronas && (
              <Source id="coronas" type="geojson" data="/data/coronas.geojson">
                <Layer
                  id="coronas-line"
                  type="line"
                  paint={{ "line-color": "#00ffff", "line-width": 4 }}
                />
              </Source>
            )}

            {showObras && (
              <Source id="obras-gad" type="geojson" data="/data/obras_gad.geojson">
                <Layer
                  id="obras-gad-line"
                  type="line"
                  paint={{ "line-color": "#00ff66", "line-width": 4 }}
                />
              </Source>
            )}

            {showSocavon && (
              <Source id="socavon" type="geojson" data="/data/socavon.geojson">
                <Layer
                  id="socavon-fill"
                  type="fill"
                  paint={{ "fill-color": "#ff0040", "fill-opacity": 0.25 }}
                />
                <Layer
                  id="socavon-outline"
                  type="line"
                  paint={{ "line-color": "#ffffff", "line-width": 2 }}
                />
              </Source>
            )}

/* =============================== */
/* DEFORMACIÓN ESTRUCTURAL DInSAR  */
/* =============================== */

{showDeformacionEstructural && (
  <Source
    id="deformacion-estructural"
    type="image"
    url="/dinsar/defestru6.png"
    coordinates={[
      [-79.964207948, -4.096092468],
      [-79.944587948, -4.096092468],
      [-79.944587948, -4.118889468],
      [-79.964207948, -4.118889468],
    ]}
  >
    <Layer
      id="defor-construct-layer"
      type="raster"
      paint={{
        "raster-opacity": 1,
        "raster-fade-duration": 0,
      }}
    />
  </Source>
)}

{showFracturas && (
  <Source
    id="fracturas"
    type="geojson"
    data="/data/fracturas.geojson"
  >
    <Layer
      id="fracturas-line"
      type="line"
      paint={{
        "line-color": "#ffffff",
        "line-width": 3,
        "line-opacity": 1,
      }}
    />
  </Source>
)}

{showEvidenciasCampo && (
  <Source
    id="evidencias-rosario"
    type="geojson"
    data="/data/evidencias/rosario.geojson"
  >
    <Layer
      id="evidencias-rosario-layer"
      type="circle"
      paint={{
        "circle-radius": 7,
        "circle-color": "#ff00ff",
        "circle-stroke-color": "#ffffff",
        "circle-stroke-width": 2,
        "circle-opacity": globalOpacity,
      }}
    />
  </Source>
)}

{selectedEvidencia && (
  <Popup
  longitude={selectedEvidencia.longitude}
  latitude={selectedEvidencia.latitude}
  closeButton={false}
  closeOnClick={false}
> <div style={{ position: "relative" }}>
    <button
      onClick={() => setSelectedEvidencia(null)}
      style={{position: "absolute",
        top: "4px",
        right: "4px",
        background: "#dc2626",
        color: "white",
        border: "none",
        borderRadius: "9999px",
        padding: "2px 8px",
        cursor: "pointer",
        zIndex: 9999,
      }}
      >
  ×|
</button>

      {Object.keys(selectedEvidencia.properties || {})
        .filter((key) => key.startsWith("IMAGE_LINK"))
        .map((key, i) => {
          const foto =  "/fotos/rosario/" +  String(selectedEvidencia.properties[key]).replace(/\\/g, "/");
          

          return (
            <img
              key={i}
              src={foto}
              alt={`Foto ${i + 1}`}
              style={{
  width: "70%",
  maxHeight: "100px",
  objectFit: "cover",
  borderRadius: "8px",
  marginTop: "8px",
}}
            />
          );
        })}
    </div>
  </Popup>
)}


          <button
            onClick={() => setShowEvento(!showEvento)}
            className="absolute top-4 left-4 z-30 bg-cyan-500 text-black px-4 py-2 rounded-xl font-bold shadow-lg"
          >
            Evento
          </button>

          {showEvento && (
            <div className="absolute top-16 left-4 z-40 bg-black/85 backdrop-blur-md p-4 rounded-2xl w-[250px] border border-zinc-700">
              <button
                onClick={() => setShowEvento(false)}
                className="absolute top-2 right-3 text-zinc-300 text-lg"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-3">Evento principal</h2>

              <p className="text-sm text-zinc-300 leading-relaxed">
                La anomalía DInSAR detectada en el período febrero de 2022-marzo 2025, coincide con el
                hundimiento ocurrido el 9 de abril de 2025 en el Parque de La Madre, Celica.
              </p>
            </div>
          )}

          <button
            onClick={() => setShowPanelInfo(!showPanelInfo)}
            className="absolute bottom-4 left-4 z-30 bg-zinc-900 text-white px-4 py-2 rounded-xl border border-cyan-500 shadow-lg"
          >
            Panel
          </button>

          {showPanelInfo && (
            <div className="absolute bottom-20 left-4 right-4 z-40 bg-black/85 backdrop-blur-md p-4 rounded-2xl border border-cyan-500">
              <button
                onClick={() => setShowPanelInfo(false)}
                className="absolute top-2 right-3 text-zinc-300 text-lg"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-2">{activePanel}</h2>

              <p className="text-sm text-zinc-300">
  {activePanel === "Vista 3D" &&
    "Modelo tridimensional del área de subsidencia."}
  {activePanel === "DINSAR" &&
    "Información de deformación, subsidencia y levantamiento relativo."}
  {activePanel === "Impacto" &&
    "Viviendas afectadas, infraestructura urbana y zonas críticas."}
  {activePanel === "Evidencias" &&
    "Fotografías, grietas, subsidencia y monitoreo de campo."}
  {activePanel === "Mitigación" &&
    "Obras, drenajes, coronas y estabilización territorial."}
  {activePanel === "Cronología" &&
    "Evolución temporal desde 2023 hasta mayo de 2025."}
</p>
            </div>
          )}
               </Map>

                     </main>
  
   <aside className="hidden lg:block w-80 bg-black border-l border-zinc-800 p-4 overflow-y-auto"></aside>


        <aside className="hidden lg:block w-80 bg-black border-l border-zinc-800 p-4 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6">Interpretación Territorial</h2>

          <InfoCard
            title="Subsidencia"
            value="Alta"
            description="Zona de deformación coincidente con hundimiento superficial validado."
          />

          <InfoCard
            title="DInSAR"
            value="Marzo 2025"
            description="Anomalía previa detectada antes del evento de abril 2025. Período de análisis Dinsar febrero 2022-abril 2025."
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

      <footer className="h-24 md:h-32 bg-black border-t border-zinc-800 px-4 md:px-6 py-3 md:py-4 overflow-x-auto">
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
          Línea de tiempo territorial
        </h2>

        <div className="min-w-[650px]">
          <div className="flex justify-between items-center text-sm md:text-lg text-zinc-300">
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
        </div>
      </footer>
    </div>
  );
}

function LayerGroup({ title, layers }: { title: string; layers: string[] }) {
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