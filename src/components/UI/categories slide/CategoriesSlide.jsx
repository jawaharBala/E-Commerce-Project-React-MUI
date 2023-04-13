import { useNavigate } from "react-router-dom";
import "./CategoriesSlide.css";
const CategoriesSlide = ({ categories }) => {
  const navigate = useNavigate();
  const colors = [
    "#f1dbe9",
    "#DDD3EB",
    "#d3eaeb",
    "#eff1d9",
    "#f1dadb",
    "#d9f1de",
  ];
  const handleNavigation = (id) => {
    navigate("/catagories/" + id);
  };
  return (
    <>
      <div className="container">
        {categories?.map((category, i) => {
          return (
            <>
              <div
                className="category"
                onClick={() => handleNavigation(category.id)}
                style={{ backgroundColor: colors[i] }}
              >
                <img
                  className="image"
                  src={category.image}
                  alt={category.name}
                ></img>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoriesSlide;
