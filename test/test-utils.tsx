import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function customRender(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";

