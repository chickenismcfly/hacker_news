import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";
import structuredClone from "@ungap/structured-clone";

expect.extend(toHaveNoViolations);

if (!("structuredClone" in globalThis)) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  globalThis.structuredClone = structuredClone;
}