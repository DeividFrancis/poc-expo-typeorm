import { useEffect, useState } from "react";
import { conn } from "../configs/db";

export function useDatabaseInitialize() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!conn.isInitialized) {
      conn
        .initialize()
        .then(() => {
          console.log("Database connected!");
          setReady(true);
        })
        .catch((e) => {
          console.log("Erro on database initialize", e);
          setReady(false);
        });
    }

    return () => {
      conn.destroy();
      setReady(false);
    };
  }, []);

  return { ready };
}
