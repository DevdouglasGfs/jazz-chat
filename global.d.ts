/// <reference types="nativewind/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_WS_CRDT_SERVER: `wss://${string}` | `ws://${string}`;
  }
}
