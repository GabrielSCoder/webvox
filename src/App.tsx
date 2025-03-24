import { useState, useEffect } from 'react';
import MainRouter from './router';
import { getIPAddress } from './services/soinformation';
import { generateHMAC2 } from './services/crypto';
import NotifyProvider from './contexts/NotifyContext';
const key = import.meta.env.VITE_SECRET_KEY


function App() {
  const info = window.localStorage.getItem("NIF")

  const darkMode = useState(() => {

    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      return storedTheme === "dark";
    }

    return systemPrefersDark;
  });

  useEffect(() => {

    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {

    const inx = async () => {
      const resp = await getIPAddress()
      const hmac = await generateHMAC2(resp, key)
      window.localStorage.setItem("NIF", hmac)
    }

    if (!info) {
      inx()
    }

  }, [])

  return (
    <NotifyProvider>
      <MainRouter />
    </NotifyProvider>
  )
}

export default App
