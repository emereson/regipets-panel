// src/context/SocketContext.tsx
import { createContext, useContext, type ReactNode } from "react";
import useSocket from "../hooks/useSocket";
import { Socket } from "socket.io-client";

// Tipo del contexto (puede ser un socket o null)

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useSocket(); // Se crea SOLO UNA VEZ y se comparte en toda la app

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => useContext(SocketContext);
