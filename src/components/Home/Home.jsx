import React, { useEffect, useState } from "react";
import "./home.scss";
import download from "../../images/download.png";
import axios from "axios";
import { Link } from 'react-router-dom'
import {BiPlay} from "react-icons/bi";
import {AiOutlinePlus} from "react-icons/ai";

const url = "https://api.themoviedb.org/3";
const apiKey = "ed01fbfa43dd3fb6e9411225cb3eabb3";
const imgUrl = "https://image.tmdb.org/t/p/original";
function Card({ img }) {
 
  return <img className="card" src={img} alt="sdfd" />;
}
function Row({ title, moviesArr = [{ img: download }] }) {
  return (
    <div className="row">
      <h2>{title}</h2>
      <div>
        {moviesArr.map((items, index) => (
          <Card key={index} img={`${imgUrl}/${items.poster_path}`} />
        ))}
      </div>
    </div>
  );
}

function Home() {
  const [upcommingMovies,setUpcommingMovies] = useState([]);
  const [topRated,setTopRated] = useState([]);
  const [tvShows,setTvShows]  = useState([]);
  const [popular,setPopular] = useState([]);
  const [nowPlaying,setNowPlaying] = useState([]);
  const [genre,setGenre] = useState([]);
  
    
  useEffect(() => {

    const fetchUpcommings = async () => {
      const { data:{results}} = await axios.get(`${url}/movie/upcoming?api_key=${apiKey}`);
      setUpcommingMovies(results);
    };

    const fetchTopRated = async () => {
      const {data:{results}} = await axios.get(`${url}/movie/top_rated?api_key=${apiKey}`);
      setTopRated(results);
    }

    const fetchTvShows = async () => {
      const {data:{results}} = await axios.get(`${url}/tv/top_rated?api_key=${apiKey}`);
      setTvShows(results);
    }

    const fetchPopular = async () => {
      const {data:{results}} = await axios.get(`${url}/movie/popular?api_key=${apiKey}`);
      setPopular(results);
    }

    const fetchNowPlaying = async () => {
      const {data:{results}} = await axios.get(`${url}/movie/now_playing?api_key=${apiKey}`);
      setNowPlaying(results);
    } 

    const handleGenre = async () => {
      const {data:{genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setGenre(genres)
    }
    fetchUpcommings();
    fetchTopRated();
    fetchTvShows();
    fetchPopular();
    fetchNowPlaying();
    handleGenre()
  }, []);

  return (
    <section className="home">

      
    
      <div className="banner" style={{
        backgroundImage: popular[12] ? `url(${`${imgUrl}/${popular[12].poster_path}`})` : "rgb(16,16,16)"
      }}>
        <div>
          {popular[9] && <h1>{popular[12].original_title}</h1>}
          {popular[9] && <p>{popular[12].overview}</p>}
          <button><BiPlay/> Play</button>
          <button>List <AiOutlinePlus/></button>
        </div> 
      </div> 
      
      <Row title="Upcomming" moviesArr={upcommingMovies}/>
      <Row title="Top Rated" moviesArr={topRated}/>
      <Row title="Tv Shows" moviesArr={tvShows}/>
      <Row title="Popular" moviesArr={popular}/>
      <Row title="My List" moviesArr={nowPlaying}/>
  

      
    
      <div className = "genre">
        {genre.map((items,index) => (
          <Link key={index} to={`/genre/${items.id}`}>{items.name}</Link>
        ))}
      </div>

    </section>
  );
}


export default Home;
