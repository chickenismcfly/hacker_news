import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { render } from "@testing-library/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

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

export const renderWithQueryClient = (ui: ReactNode) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
};

export const renderWithChakra = (children: ReactElement) =>
  render(<ChakraProvider value={defaultSystem}>{children}</ChakraProvider>);

export * from "@testing-library/react";
