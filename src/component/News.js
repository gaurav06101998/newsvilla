import React, { useEffect, useState } from "react";
import NewItems from "./NewItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const captilizationFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


  const [articles, setArticle] = useState([]);
  const [totalResults, setTotalResult] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const updateMethod = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(20);
    let parsedData = await data.json();
    props.setProgress(40);
    props.setProgress(70);
    setArticle(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };
  useEffect(() => {
    document.title = `${captilizationFirstLetter(
      props.category
    )} - NewsVilla`;
    updateMethod();
    // eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    setPage(page + 1);
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    // https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
    setLoading(false);
    
  };

  return (
    <>
      <h1 className="text-center my-3">
        NewsVilla-Top {captilizationFirstLetter(props.category)} Heading
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading&&<Spinner />}
      >
        <div className="container mb-4 my-3">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {articles.map((ele) => {
              return (
                <div className="col" key={ele.url}>
                  <NewItems
                    tittle={ele.title}
                    discription={ele.description}
                    imageUrl={ele.urlToImage}
                    newsUrl={ele.url}
                    author={ele.author}
                    date={ele.publishedAt}
                    source={ele.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};
News.propTypes = {
  contry: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
