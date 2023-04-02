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
                <img className="image"  src={category.image} alt={category.name}></img>
                <br/>
                <h4 className="name">{category.name}</h4>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoriesSlide;
