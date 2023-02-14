import React from "react";
import { useEffect, useState } from "react";
import { Button,Card } from "@mui/joy";
import "./Home.css";
import axios from "axios";
import { uid } from "react-uid";

const Home = () => {
  const [news, setNews] = useState({ data: [], country: "" });
  const [region] = useState([
    { country: "India", code: "in" },
    { country: "US", code: "us" },
    { country: "Canada", code: "ca" },
  ]);
  const [errorHandling, setErrorHandling] = useState(false);
  const getNews = async (region) => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=" +
          region +
          "&category=general&pageSize=10&apiKey=c5db7d1432d44031adc0f1a180b7cfb7"
      );
      setNews({ data: response.data.articles, country: region });
      setErrorHandling(false);
    } catch (error) {
      console.log(error);
      setErrorHandling(true);
    }
  };
  useEffect(() => {
    getNews("us");
  }, []);
  return (
    <div className="">
        <Button
        
          style={{ backgroundColor: "black" , color:'white'}}
          type="primary"
          onClick={() => {
            getNews(news.country);
          }}
        >
          Refresh
        </Button>
        {region.map((reg, index) => {
          return (
            <>
              <Button
                key={uid(index)}
                style={
                  news.country === reg.code
                    ? { backgroundColor: "red", color: "white",margin:'2px' }
                    : { backgroundColor: "black" , color:'white',margin:'2px'}
                }
                
                color="primary"
                onClick={() => {
                  getNews(reg.code);
                }}
              >
                {reg.country}-headlines
              </Button>
            </>
          );
        })}

      {errorHandling ? <h1>404 Error. Try refreshing the page.</h1> : null}
      {news.data ? (
        news.data.map((data, index) => {
          return (
            <div key={uid(data, index)} className="home">
              <Card>
                <h2>{data.description}</h2>
                <img
                  className="image"
                  alt="Loading.."
                  src={data.urlToImage}
                ></img>
              </Card>
            </div>
          );
        })
      ) : (
        <h2>loading...</h2>
      )}
    </div>
  );
};

export default Home;
