import "@testing-library/jest-dom";
import structuredClone from "@ungap/structured-clone";

if (!("structuredClone" in globalThis)) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  globalThis.structuredClone = structuredClone;
}