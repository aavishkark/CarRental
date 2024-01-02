import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './carcarousal.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const CarCarousal = () => {
    const [cars,setcars]=useState([])
    const [page,setpage]=useState(1)
    const [singlecar,setsinglecar]=useState([])
    const [singlepage,setsinglepage]=useState(1)
    const [totalcars,settotalcars]=useState()
    const [totalpagesthree,settotalpagesthree]=useState()
    useEffect(()=>{
      axios.get(`https://mock-server-rentride.onrender.com/cars`)
      .then((res)=>{
        settotalcars(res.data)
        settotalpagesthree(Math.ceil(res.data.length/3))
      })
      .catch((err)=>{
        console.log(err)
      })
        getCars()
        getSingleCars()
    },[page,singlepage])
    const getCars=()=>{
      axios.get(`https://mock-server-rentride.onrender.com/cars?_page=${page}&_limit=3`)
      .then((res)=>{
        setcars(res.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    }
    const getSingleCars=()=>{
      axios.get(`https://mock-server-rentride.onrender.com/cars?_page=${singlepage}&_limit=1`)
      .then((res)=>{
        setsinglecar(res.data)
      })
      .catch((err)=>{
          console.log(err)
      })
    }
    const handleprevious=()=>{
      if(page!=1){
        setpage((prev)=>{return prev-1})
      }
    }
    const handlenext=()=>{
      setpage((prev)=>{return prev+1})
    }
    const handleprevioussingle=()=>{
      console.log(singlepage)
        setsinglepage((prev)=>{return prev-1})
    }
    const handlenextsingle=()=>{
      setsinglepage((prev)=>{return prev+1})
    }
  return (
    <>
   {cars && cars.length > 0 ? (
        <div className='container d-none d-md-block'>
          <div className='row'>
            {cars.map((car) => (
              <div className='col-md-4 mb-4' key={car.id}>
                <div className='card'>
                  <img src={car.photos} alt={car.name} className='card-img-top cardimg' />
                  <div className='card-body cardinfo'>
                    <p className='card-text'>
                      <strong>City:</strong> {car.city}
                    </p>
                    <p className='card-text'>
                      <strong>Car:</strong> {car.name}
                    </p>
                    <p className='card-text'>
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                    <button className='btn btn-primary bookbtn'>Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {page===1? <button className={`btn btn-primary prevbtn disabled`}>
              <ArrowBackIcon />
            </button>:
             <button className={`btn btn-primary prevbtn`} onClick={handleprevious}>
             <ArrowBackIcon />
           </button>}
           {page===totalpagesthree?<button className={`btn btn-primary nextbtn disabled`}>
              <ArrowForwardIcon />
            </button>:
            <button className={`btn btn-primary nextbtn`} onClick={handlenext}>
            <ArrowForwardIcon />
          </button>}
            
          </div>
        </div>
      ) : null}

      {singlecar && singlecar.length > 0 ? (
        <div className='containertwo d-md-none'>
          <div className='row'>
            {singlecar.map((car) => (
              <div key={car.id}>
                <div className='card'>
                  <img src={car.photos} alt={car.name} className='card-img-top cardimg' />
                  <div className='card-body cardinfo'>
                    <p className='card-text'>
                      <strong>City:</strong> {car.city}
                    </p>
                    <p className='card-text'>
                      <strong>Car:</strong> {car.name}
                    </p>
                    <p className='card-text'>
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                    <button className='btn btn-primary bookbtn'>Book</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            {singlepage===1? <button className={`btn btn-primary prevbtn disabled`}>
              <ArrowBackIcon />
            </button>:
             <button className={`btn btn-primary prevbtn`} onClick={handleprevioussingle}>
             <ArrowBackIcon />
           </button>}
           {(totalcars)&&singlepage===totalcars.length?<button className={`btn btn-primary nextbtn disabled`}>
              <ArrowForwardIcon />
            </button>:
            <button className={`btn btn-primary nextbtn`} onClick={handlenextsingle}>
            <ArrowForwardIcon />
          </button>}
            
          </div>
        </div>
      ) : null}
  </>
  )
}

export default CarCarousal