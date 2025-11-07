"use client";

import { Providers } from "@/app/Providers";
import HeaderNavigation from "@/app/HeaderNavigation";
import { Container } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <HeaderNavigation />
          <Container maxW="7xl" py={8} bg="gray.100" minHeight="100vh">
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}
