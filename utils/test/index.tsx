import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent, PropsWithChildren, ReactNode } from "react";
import { render } from "@testing-library/react";

const queryClient = new QueryClient();

export const QueryClientWrapper: FunctionComponent<PropsWithChildren> = (
  props,
) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  );
};

export const renderWithQueryClient = (ui: ReactNode) =>
  render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);

export * from "@testing-library/react";
