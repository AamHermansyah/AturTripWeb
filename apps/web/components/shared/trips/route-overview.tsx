'use client'

import {
  Map,
  MapControls,
  MapMarker,
  MapViewport,
  MarkerContent,
  MarkerPopup,
  MarkerTooltip
} from "@/components/ui/map"
import { MapPinIcon } from "@phosphor-icons/react"
import { useState } from "react";

export function RouteOverview() {
  const [viewport, setViewport] = useState<MapViewport>({
    center: [108.2181097, -7.3478742],
    zoom: 17,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-heading font-extrabold tracking-tight text-foreground">Ringkasan Rute</h2>

      <div className="relative rounded-3xl overflow-hidden h-56 w-full shadow-sm">
        <Map viewport={viewport} onViewportChange={setViewport}>
          {viewport.zoom > 15 && (
            <MapMarker
              longitude={108.2181097}
              latitude={-7.3478742}
            >
              <MarkerContent>
                <MapPinIcon weight="fill" className="size-6 text-primary" />
              </MarkerContent>
              <MarkerTooltip>Kota Tasikmalaya</MarkerTooltip>
              <MarkerPopup>
                <div className="space-y-1">
                  <p className="text-foreground font-medium">
                    Perjalanan ke kota Tasikmalaya
                  </p>
                  <p className="text-muted-foreground text-xs">
                    -7.3478742, 108.2181097
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          )}
          <MapControls
            position="top-right"
            showCompass
            showFullscreen
          />
        </Map>

        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center gap-4 shadow-md shadow-black/5">
          <div>
            <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Jarak</p>
            <p className="text-xs font-extrabold text-foreground mt-0.5">12.4 km</p>
          </div>
        </div>
      </div>
    </div>
  )
}
