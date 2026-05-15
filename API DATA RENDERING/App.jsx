import { useEffect, useState } from "react";
import DataList from "./components/DataList";
import Loader from "./components/Loader";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>User List</h1>
      <DataList users={data} />
    </div>
  );
}

export default App;