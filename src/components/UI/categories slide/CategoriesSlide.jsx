import "./CategoriesSlide.css"
const CategoriesSlide = ({ categories }) => {
    const colors = ["#f1dbe9","#DDD3EB","#d3eaeb","#eff1d9","#f1dadb","#d9f1de"]
    return (
    <>
      <div className="container">
        {categories?.map((category, i) => {
          return (
            <>
              <div className="category" style={{backgroundColor:colors[i]}}>
                <img className="category"  src={category.image}></img>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoriesSlide;
