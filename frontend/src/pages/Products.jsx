import { useQuery } from "react-query";
import { getAllMattresses } from "../services/mattress.js";
import { Layout } from "../components/Layout";
import { useState } from "react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const { data, isLoading } = useQuery(
    ["mattresses", currentPage],
    () => getAllMattresses({ page: currentPage }),
    {
      staleTime: 1000 * 60 * 5,
      keepPreviousData: true
    }
  );

  const mattresses = data?.mattresses || [];
  const pagination = data?.pagination || {};

  const filteredMattresses = mattresses.filter((mattress) =>
    mattress.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= pagination.pages; i++) {
      pages.push(
        <li key={i}>
          <a
            className={`pagination-link ${currentPage === i ? 'is-current' : ''}`}
            onClick={() => setCurrentPage(i)}
            aria-label={`Go to page ${i}`}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <Layout onSearch={setSearchTerm}>
      <section className="section">
        <div className="container">
          <h1 className="title has-text-primary">Our Products</h1>
          {isLoading ? (
            <div className="has-text-centered">
              <span className="icon is-large">
                <i className="fas fa-spinner fa-pulse"></i>
              </span>
            </div>
          ) : (
            <>
              <div className="columns is-multiline">
                {filteredMattresses.map((mattress) => (
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

              {pagination.pages > 1 && (
                <nav 
                  className="pagination is-right mt-4" 
                  role="navigation" 
                  aria-label="pagination"
                >
                  <button
                    className="pagination-previous"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <button
                    className="pagination-next"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
                    disabled={currentPage === pagination.pages}
                  >
                    Next
                  </button>
                  <ul className="pagination-list">
                    {renderPagination()}
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export { Products };
