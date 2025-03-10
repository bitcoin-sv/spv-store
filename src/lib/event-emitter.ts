interface IEvents {
  [event: string]: Listener[];
}
type Listener = (...args: any[]) => void;

// export class EventEmitter<T extends string> {
export class EventEmitter {
  private readonly events: IEvents = {};
  // private readonly events: IEvents = {[event: T]: Listener};

  public on(event: string, listener: Listener): () => void {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }

    this.events[event].push(listener);
    return () => this.removeListener(event, listener);
  }

  public removeListener(event: string, listener: Listener): void {
    if (typeof this.events[event] !== "object") {
      return;
    }

    const idx: number = this.events[event].indexOf(listener);
    if (idx > -1) {
      this.events[event].splice(idx, 1);
    }
  }

  public removeAllListeners(): void {
    Object.keys(this.events).forEach((event: string) =>
      this.events[event].splice(0, this.events[event].length),
    );
  }

  public emit(event: string, ...args: any[]): void {
    if (typeof this.events[event] !== "object") {
      return;
    }

    [...this.events[event]].forEach((listener) => {
      listener.apply(this, args)
    });
    [...(this.events['message'] || [])].forEach((listener) => listener.apply(this, args));
  }

  public once(event: string, listener: Listener): () => void {
    const remove: () => void = this.on(event, (...args: any[]) => {
      remove();
      listener.apply(this, args);
    });

    return remove;
  }
}
