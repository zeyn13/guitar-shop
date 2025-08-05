import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      image
    }
  }
`;

function BrandsPage() {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const navigate = useNavigate();

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {data.findAllBrands.map((brand) => (
        <div
          key={brand.id}
          onClick={() => navigate(`/brand/${brand.id}`)}
          className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
        >
          <img src={brand.image} alt={brand.name} className="w-full h-32 object-contain mb-2" />
          <h2 className="text-lg font-semibold text-center">{brand.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default BrandsPage;
