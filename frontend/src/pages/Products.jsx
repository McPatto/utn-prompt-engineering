import { useQuery } from "react-query";
import { getAllMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";

const Products = () => {
  // Uso de useQuery
  const { data: mattresses = [] } = useQuery(
    ["mattresses"],
    getAllMattresses,
    {
      staleTime: 1000 * 60 * 5,
      refetchInterval: 1000 * 30, // Hace refetch cada 30 segundos
    }
  );

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-primary">Our Products</h1>
          <div className="columns is-multiline">
            {mattresses.map((mattress) => (
              <div className="column is-one-third" key={mattress._id}>
                <div className="card">
                  <div className="card-content">
                    <p className="title">{mattress.name}</p>
                    <p>Dimensions: {mattress.dimensions}</p>
                    <p>Material: {mattress.material}</p>
                    <p>Price: ${mattress.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export { Products };
