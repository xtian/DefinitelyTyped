// Type definitions for phoenix 1.4.0
// Project: https://github.com/phoenixframework/phoenix
// Definitions by: Mirosław Ciastek <https://github.com/mciastek>
//                 Christian Wesselhoeft <https://github.com/xtian>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "phoenix" {
  class Push {
    constructor(channel: Channel, event: string, payload: any, timeout: number);

    resend(timeout: number): void;
    send(): void;

    receive(status: string, callback: (response?: any) => void): Push;
  }

  export class Channel {
    constructor(topic: string, params?: object | (() => object), socket?: Socket);

    join(timeout?: number): Push;
    leave(timeout?: number): Push;

    onClose(callback: (payload: any, ref: any, joinRef: any) => void): void;
    onError(callback: (reason?: any) => void): void;
    onMessage(event: string, payload: any, ref: number): any;

    on(event: string, callback: (response?: any) => void): number;
    off(event: string, ref?: number): void;

    push(event: string, payload: object, timeout?: number): Push;
  }

  export class Socket {
    constructor(endPoint: string, opts?: SocketOpts);

    protocol(): string;
    endPointURL(): string;

    disconnect(callback?: () => void, code?: number, reason?: string): void;
    connect(params?: object): void;

    log(kind: string, msg: string, data: any): void;
    hasLogger(): boolean;

    onOpen(callback: () => void): void;
    onClose(callback: () => void): void;
    onError(callback: () => void): void;
    onMessage(callback: () => void): void;

    onConnClose(event: any): void;

    connectionState(): string;

    isConnected(): boolean;

    remove(channel: Channel): void;
    channel(topic: string, chanParams?: object): Channel;

    push(data: any): void;

    makeRef(): string;
    sendHeartbeat(): void;
    flushSendBuffer(): void;

    onConnMessage(rawMessage: any): void;
  }

  export interface SocketOpts {
    transport?: string;
    encode?: (payload: any, callback: (encoded: any) => void) => void;
    decode?: (payload: any, callback: (decoded: any) => void) => void;
    timeout?: number;
    heartbeatIntervalMs?: number;
    reconnectAfterMs?: number;
    logger?: (kind: string, msg: string, data: object) => void;
    longpollerTimeout?: number;
    params?: object | (() => object);
  }

  export class LongPoll {
    constructor(endPoint: string);

    normalizeEndpoint(endPoint: string): string;
    endpointURL(): string;

    closeAndRetry(): void;
    ontimeout(): void;

    poll(): void;

    send(body: any): void;
    close(code?: any, reason?: any): void;
  }

  export class Ajax {
    static request(
      method: string,
      endPoint: string,
      accept: string,
      body: any,
      timeout?: number,
      ontimeout?: any,
      callback?: (response?: any) => void
    ): void;

    static xdomainRequest(
      req: any,
      method: string,
      endPoint: string,
      body: any,
      timeout?: number,
      ontimeout?: any,
      callback?: (response?: any) => void
    ): void;

    static xhrRequest(
      req: any,
      method: string,
      endPoint: string,
      accept: string,
      body: any,
      timeout?: number,
      ontimeout?: any,
      callback?: (response?: any) => void
    ): void;

    static parseJSON(resp: string): JSON;
    static serialize(obj: any, parentKey: string): string;
    static appendParams(url: string, params: any): string;
  }

  export class Presence {
    static syncState(
      currentState: any,
      newState: any,
      onJoin?: PresenceOnJoinCallback,
      onLeave?: PresenceOnLeaveCallback
    ): Presence;

    static syncDiff(
      currentState: any,
      newState: { joins: any; leaves: any },
      onJoin?: PresenceOnJoinCallback,
      onLeave?: PresenceOnLeaveCallback
    ): Presence;

    static list(presences: object, chooser?: PresenceChooserCallback): Presence;

    constructor(channel: Channel, opts?: PresenceOpts);

    onJoin(callback: PresenceOnJoinCallback): void;
    onLeave(callback: PresenceOnLeaveCallback): void;
    onSync(callback: () => void): void;
    list(by?: PresenceChooserCallback): Presence;
    inPendingSyncState(): boolean;
  }

  export type PresenceChooserCallback = (key?: string, presence?: any) => any;

  export type PresenceOnJoinCallback = (
    key?: string,
    currentPresence?: any,
    newPresence?: any
  ) => void;

  export type PresenceOnLeaveCallback = (
    key?: string,
    currentPresence?: any,
    newPresence?: any
  ) => void;

  export interface PresenceOpts {
    events?: { state: string; diff: string };
  }
}
