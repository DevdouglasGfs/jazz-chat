import "../global.css";
import "@root/polyfills";
import { Slot } from "expo-router";

import { JazzProvider } from "jazz-expo";
import React, { StrictMode } from "react";

export default function Layout() {
  return (
    <StrictMode>
      <JazzProvider
        sync={{
          peer: process.env.EXPO_PUBLIC_WS_CRDT_SERVER,
        }}
      >
        <Slot />
      </JazzProvider>
    </StrictMode>
  );
}
