"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  X,
  ExternalLink,
  Store,
  Compass,
  Maximize2,
  Minimize2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Shop } from "@/types";

interface MapModalProps {
  shop: Shop;
  onClose: () => void;
  // User location marker support
  userLocation?: { lat: number; lng: number };
}

// Default simulated user coordinates in Pettah entrance (Colombo Fort / Pettah Clock Tower)
const DEFAULT_USER_LOCATION = { lat: 6.9348, lng: 79.8510 };

export default function MapModal({
  shop,
  onClose,
  userLocation = DEFAULT_USER_LOCATION,
}: MapModalProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [mapReady, setMapReady] = useState(false);
  const [isSplitView, setIsSplitView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    let isMounted = true;

    const initLeaflet = async () => {
      try {
        const L = (await import("leaflet")).default;

        if (!mapContainerRef.current || !isMounted) return;

        // Custom Target Shop Marker
        const targetShopIcon = L.divIcon({
          html: `
            <div style="
              width: 44px; 
              height: 44px; 
              background: linear-gradient(135deg, #f97316, #dc2626); 
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid white;
              box-shadow: 0 6px 22px rgba(249,115,22,0.65);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                transform: rotate(45deg);
                font-size: 18px;
                line-height: 1;
              ">🏪</div>
            </div>
          `,
          className: "",
          iconSize: [44, 44],
          iconAnchor: [22, 44],
          popupAnchor: [0, -48],
        });

        // User Location Marker (Blue pulsing pin)
        const userLocationIcon = L.divIcon({
          html: `
            <div style="
              position: relative;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                position: absolute;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: rgba(59, 130, 246, 0.35);
                animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
              "></div>
              <div style="
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #2563eb;
                border: 3px solid #ffffff;
                box-shadow: 0 2px 10px rgba(37,99,235,0.8);
              "></div>
            </div>
          `,
          className: "",
          iconSize: [32, 32],
          iconAnchor: [16, 16],
          popupAnchor: [0, -18],
        });

        // Bounds to show both user location marker and shop marker
        const bounds = L.latLngBounds([
          [userLocation.lat, userLocation.lng],
          [shop.coordinates.lat, shop.coordinates.lng],
        ]);

        const map = L.map(mapContainerRef.current, {
          center: [shop.coordinates.lat, shop.coordinates.lng],
          zoom: 17,
          zoomControl: true,
          attributionControl: true,
        });

        // Dark carto tiles for sleek Pettah theme
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 20,
          }
        ).addTo(map);

        // Add Target Shop Marker with Shop Details Snippet inside Popup
        const shopPopupContent = `
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 210px; color: #111;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
              <span style="background: #f97316; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">TARGET SHOP</span>
              <span style="font-size: 11px; color: #666; font-weight: 600;">${shop.stallNumber || shop.area}</span>
            </div>
            <div style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 4px; line-height: 1.2;">
              ${shop.name}
            </div>
            <div style="font-size: 12px; color: #475569; margin-bottom: 6px;">
              📍 ${shop.address}
            </div>
            <div style="font-size: 11px; color: #059669; font-weight: 600; margin-bottom: 6px;">
              🕒 ${shop.openHours}
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 6px; font-size: 12px;">
              <span style="color: #f97316; font-weight: 700;">★ ${shop.rating} (${shop.reviewCount})</span>
              <span style="font-weight: 700; color: #3b82f6;">${shop.distance} walk</span>
            </div>
          </div>
        `;

        const shopMarker = L.marker(
          [shop.coordinates.lat, shop.coordinates.lng],
          { icon: targetShopIcon }
        ).addTo(map);

        shopMarker.bindPopup(shopPopupContent, { maxWidth: 280 }).openPopup();

        // Add User Location Marker
        const userPopupContent = `
          <div style="font-family: system-ui, sans-serif; font-size: 12px; color: #1e293b; font-weight: 700; padding: 2px;">
            📍 Your Location (Pettah Central)
          </div>
        `;
        const userMarker = L.marker([userLocation.lat, userLocation.lng], {
          icon: userLocationIcon,
        }).addTo(map);
        userMarker.bindPopup(userPopupContent);

        // Walking Route connecting line (dotted vibrant line)
        const polyline = L.polyline(
          [
            [userLocation.lat, userLocation.lng],
            [
              (userLocation.lat + shop.coordinates.lat) / 2 + 0.0003,
              (userLocation.lng + shop.coordinates.lng) / 2,
            ],
            [shop.coordinates.lat, shop.coordinates.lng],
          ],
          {
            color: "#f97316",
            weight: 4,
            opacity: 0.85,
            dashArray: "8, 8",
          }
        ).addTo(map);

        // Adjust view to show both points with padding
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 17 });

        mapInstanceRef.current = map;
        setMapReady(true);
      } catch (err) {
        console.error("Map load error:", err);
      }
    };

    initLeaflet();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).remove();
        mapInstanceRef.current = null;
      }
    };
  }, [shop, userLocation]);

  // Recalculate leaflet size if view splits or resizes
  useEffect(() => {
    if (mapInstanceRef.current) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (mapInstanceRef.current as any).invalidateSize();
      }, 200);
    }
  }, [isSplitView]);

  const openGoogleMapsDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${shop.coordinates.lat},${shop.coordinates.lng}&travelmode=walking`;
    window.open(url, "_blank");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const rawPhone = shop?.phone?.replace(/\s+/g, "") || "";
  const whatsappNum = (shop?.whatsapp || shop?.phone || "").replace(/[^0-9]/g, "");

  return (
    <div
      className="fixed inset-0 z-[100] modal-backdrop bg-black/85 flex items-end sm:items-center justify-center p-0 sm:p-5 animate-fade-in-up"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Interactive map showing directions to ${shop.name}`}
    >
      <div
        className={`glass-card bg-[#121212] border-t sm:border border-white/15 w-full ${
          isSplitView ? "max-w-6xl h-[92vh]" : "max-w-3xl h-[90vh] sm:h-[80vh]"
        } rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 animate-slide-up`}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-3.5 bg-[#171717] border-b border-white/10 z-10">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-orange-500/20 flex items-center justify-center border border-orange-500/40 text-orange-400 flex-shrink-0">
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-bold text-white text-xs sm:text-base leading-tight truncate">
                  {shop.name}
                </h3>
                <span className="text-[10px] sm:text-xs bg-orange-500/20 text-orange-400 px-1.5 sm:px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                  {shop.stallNumber || shop.area}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-400 flex items-center gap-1 sm:gap-1.5 mt-0.5 truncate">
                <MapPin className="w-3 h-3 text-orange-400 flex-shrink-0" />
                <span className="truncate">{shop.address}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Split Screen / Full Screen toggle */}
            <button
              onClick={() => setIsSplitView(!isSplitView)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors hidden sm:flex items-center gap-1.5 text-xs"
              title="Toggle Split Screen View"
            >
              {isSplitView ? (
                <>
                  <Minimize2 className="w-4 h-4" />
                  <span>Compact</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4" />
                  <span>Split View</span>
                </>
              )}
            </button>

            <button
              id="close-map-modal"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close map"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Map View + Split Screen Info Panel */}
        <div className="flex-1 relative flex flex-col md:flex-row overflow-hidden">
          {/* MAP CANVAS COMPONENT */}
          <div className="flex-1 relative h-full bg-neutral-950">
            {!mapReady && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-neutral-950/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs text-neutral-300 font-medium">
                    Initializing Pettah Interactive Navigation...
                  </span>
                </div>
              </div>
            )}

            {/* Map Legend Overlay */}
            <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl p-2.5 text-xs space-y-1.5 shadow-lg pointer-events-none">
              <div className="flex items-center gap-2 text-neutral-200">
                <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-white" />
                <span>Your Current Location</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <div className="w-3 h-3 rounded-full bg-orange-500 border-2 border-white" />
                <span>Target Shop: {shop.name}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400 text-[11px] pt-1 border-t border-white/10">
                <Compass className="w-3.5 h-3.5 text-orange-400" />
                <span>Est. walking time: ~3 mins ({shop.distance})</span>
              </div>
            </div>

            {/* The Leaflet Div */}
            <div ref={mapContainerRef} className="w-full h-full" id="interactive-shop-map" />
          </div>

          {/* SPLIT SCREEN SIDEBAR PANEL (if split view active) */}
          {isSplitView && (
            <div className="w-full md:w-80 bg-[#161616] border-t md:border-t-0 md:border-l border-white/10 p-5 overflow-y-auto space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Store className="w-4 h-4" />
                <span>Merchant Information</span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <h4 className="font-bold text-white text-sm">{shop.name}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {shop.description}
                </p>
                <div className="text-xs text-orange-300 font-semibold pt-1">
                  Stall / Shop: {shop.stallNumber || "Ground Floor, Pettah"}
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>{shop.openHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Verified Street Merchant</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                {shop.phone && (
                  <a
                    href={`tel:${rawPhone}`}
                    className="w-full flex items-center justify-center gap-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl border border-white/10 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    Call: {shop.phone}
                  </a>
                )}
                <a
                  href={`https://wa.me/${whatsappNum}?text=Hello! I am navigating to your shop via PettahBazaar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions Bar */}
        <div className="px-3.5 sm:px-5 py-3 sm:py-3.5 bg-[#171717] border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 z-10">
          <div className="flex items-center gap-1.5 xs:gap-2 text-[11px] sm:text-xs text-neutral-300">
            <span className="font-semibold text-white">Route:</span>
            <span>Pettah Walking Navigation ({shop.distance})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="get-directions-google"
              onClick={openGoogleMapsDirections}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-xl transition-all shadow-lg shadow-orange-500/25 active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
