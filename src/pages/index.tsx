import { useEffect, useState } from "react";

export default function Home() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchStores() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/store/find`,
        {
          method: "GET",
        }
      );
      const stores = await response.json();
      setStores(stores);
    }

    fetchStores();
  }, []);

  return <h1>teste</h1>;
}
