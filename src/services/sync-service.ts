export interface SyncService {
    subscribe(topics: string[], cb: (topic: string, event: string) => void ): void;
    unsubscribe(topics: string[]): void;
}