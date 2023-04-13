import { useEffect, useState } from "react";
import "./Carousel.css";

const Carousel = ({ datas }) => {
  const [index, setIndex] = useState(0);
  const [startSlide, setStartSlide] = useState(true);
  const slideshow = () => {
    if (startSlide) {
      setTimeout(() => {
        if (index < datas?.length - 1) {
          let newIndex = index;
          setIndex(newIndex + 1);
        } else {
          setIndex(0);
        }
      }, 2000);
    }
  };

  const currentSlide = (n) => {
    setStartSlide(false);
    setIndex(n);
  };

  useEffect(() => {
    slideshow();
  }, [index]);
  return (
    <>
      <div className="slideshow-container">
        <div className=" fade">
          <div className="numbertext">
            {datas[index]?.id}/ {datas?.length}
          </div>
          <img
            src={datas[index]?.image}
            style={{ width: "100%", height: "300px", objectFit: "scale-down" }}
          />
        </div>
        <div className="text">{datas[index]?.name}</div>
        <br/>
        {index != 0 && (
          <a className="prev" onClick={() => currentSlide(index - 1)}>
            ❮
          </a>
        )}
        {index + 1 < datas?.length && (
          <a className="next" onClick={() => currentSlide(index + 1)}>
            ❯
          </a>
        )}
      </div>
      <br />

      <div style={{ textAlign: "center" }}>
        {datas.map((category) => {
          return (
            <>
              <span
                key={index}
                style={{
                  backgroundColor:
                    index + 1 === category?.id ? "black" : "grey",
                }}
                className="dot"
                onClick={() => currentSlide(category?.id - 1)}
              ></span>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
