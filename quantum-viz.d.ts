// quantum-viz.d.ts
declare module '@microsoft/quantum-viz.js' {
    const qviz: {
      draw: (circuit: object, container: HTMLElement, style: object) => void;
      STYLES: { [key: string]: object };
    };
    export default qviz;
  }
  