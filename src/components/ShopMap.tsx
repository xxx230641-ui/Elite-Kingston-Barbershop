import React, { useCallback, useEffect, useState } from 'react';
import {
  AdvancedMarker,
  APILoadingStatus,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { ExternalLink, MapPin } from 'lucide-react';
import { SHOP_CONFIG } from '../data/shopConfig';

const MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  (typeof __MAPS_FALLBACK_KEY__ !== 'undefined' ? __MAPS_FALLBACK_KEY__ : '');

interface PlacePinState {
  position: { lat: number; lng: number };
  name: string;
  address: string;
}

const DEFAULT_PIN: PlacePinState = {
  position: SHOP_CONFIG.contact.coordinates,
  name: SHOP_CONFIG.brand.name,
  address: SHOP_CONFIG.contact.fullAddress,
};

const MapFallbackCard: React.FC<{ reason?: string }> = ({ reason }) => (
  <div className="h-full w-full silver-sheen border border-[#d9dfe6] flex flex-col items-center justify-center p-8 text-center">
    <div className="w-12 h-12 border border-[#cbd5e1] bg-white flex items-center justify-center mb-4">
      <MapPin className="w-5 h-5 text-[#111315]" aria-hidden="true" />
    </div>
    <h3 className="font-display text-xl font-semibold text-[#111315]">
      {SHOP_CONFIG.brand.name}
    </h3>
    <p className="mt-2 text-sm text-[#475569] max-w-xs">
      {SHOP_CONFIG.contact.fullAddress}
    </p>
    {reason && (
      <p className="mt-2 text-xs text-[#64707d] max-w-xs">{reason}</p>
    )}
    <a
      href={SHOP_CONFIG.contact.googleMapsShareUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[#111315] text-white hover:bg-[#272c32] transition-colors duration-150"
    >
      <span>Open in Google Maps</span>
      <ExternalLink className="w-4 h-4" aria-hidden="true" />
    </a>
  </div>
);

const KingstonBarbershopMarkerAndMap: React.FC = () => {
  const status = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const [pinState, setPinState] = useState<PlacePinState>(DEFAULT_PIN);

  useEffect(() => {
    if (!placesLib?.Place) return;
    let cancelled = false;

    const verifyPlaceLocation = async () => {
      try {
        const { places } = await placesLib.Place.searchByText({
          textQuery: `${SHOP_CONFIG.brand.name}, ${SHOP_CONFIG.contact.fullAddress}`,
          fields: ['displayName', 'formattedAddress', 'location'],
          maxResultCount: 1,
        });

        const match = places?.[0];
        if (!cancelled && match?.location) {
          setPinState({
            position: {
              lat: match.location.lat(),
              lng: match.location.lng(),
            },
            name: match.displayName || SHOP_CONFIG.brand.name,
            address: match.formattedAddress || SHOP_CONFIG.contact.fullAddress,
          });
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (
          message.includes('RESOURCE_EXHAUSTED') ||
          message.includes('OVER_QUERY_LIMIT') ||
          message.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      }
    };

    void verifyPlaceLocation();
    return () => {
      cancelled = true;
    };
  }, [placesLib]);

  const handleClose = useCallback(() => setInfoOpen(false), []);

  if (
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  ) {
    return (
      <MapFallbackCard reason="Interactive map preview is temporarily unavailable. Open Google Maps directly for live turn-by-turn directions." />
    );
  }

  return (
    <Map
      mapId="DEMO_MAP_ID"
      defaultCenter={pinState.position}
      center={pinState.position}
      defaultZoom={16}
      gestureHandling="cooperative"
      streetViewControl={false}
      mapTypeControl={false}
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      className="w-full h-full"
    >
      <AdvancedMarker
        ref={markerRef}
        position={pinState.position}
        title={pinState.name}
        onClick={() => setInfoOpen(true)}
      >
        <Pin
          background="#111315"
          borderColor="#94a3b8"
          glyphColor="#ffffff"
          scale={1.15}
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow anchor={marker} onCloseClick={handleClose} maxWidth={260}>
          <div className="p-1 text-[#111315]">
            <p className="font-semibold text-sm">{pinState.name}</p>
            <p className="text-xs text-[#475569] mt-1">{pinState.address}</p>
            <a
              href={SHOP_CONFIG.contact.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#111315] underline underline-offset-2"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>
        </InfoWindow>
      )}
    </Map>
  );
};

export const ShopMap: React.FC = () => {
  if (!MAPS_API_KEY) {
    return (
      <div className="h-[420px] lg:h-[540px] w-full">
        <MapFallbackCard reason="Use Google Maps below to preview our Division Street location and get directions." />
      </div>
    );
  }

  return (
    <div
      data-testid="shop-map-container"
      className="h-[420px] lg:h-[540px] w-full border border-[#d9dfe6] bg-[#f4f6f8] overflow-hidden"
    >
      <APIProvider
        apiKey={MAPS_API_KEY}
        libraries={['places', 'marker']}
        language="en"
        region="CA"
      >
        <KingstonBarbershopMarkerAndMap />
      </APIProvider>
    </div>
  );
};
