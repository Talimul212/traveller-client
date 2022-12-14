import React, { useContext, useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import UseTitle from '../../../Hooks/UseTitle';
import ServiceReview from './ServiceReview';
const rating = {
  rating: "4.5"
}

const Details = () => {
  const { _id, img, price, title, description } = useLoaderData();
  const { user } = useContext(AuthContext);
  UseTitle('Details')
  const [orders, setOrders] = useState([])
  useEffect(() => {
    fetch(`https://traveller-server-talimul212.vercel.app/reviews/${_id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
      })
  }, [])
  return (
    <>
      <div className="card card-compact bg-base-100 shadow-xl mb-8">
        <figure><img className='w-full h-80' src={img} alt="Shoes" /></figure>
        <div className="card-body">
          <div className='flex justify-between'>
            <h2 className="card-title text-4xl">{title}</h2>
            <div className=' flex gap-2'>
              <FaStar className=' text-yellow-400 mt-1'></FaStar> <span className=' text-base mb-2'>{rating.rating}</span>
            </div>
          </div>
          <p className=' text-slate-600 mb-8 text-2xl font-semibold'>Description:<br /> <span className='text-xl'>{description}</span></p>
          <div className="card-actions justify-between">
            <h2 className='text-2xl text-sky-400 font-semibold'>Price: ${price}</h2>

            <div>
              <Link to={`/review/${_id}`}><button className="btn mr-5 border-0 w-36  bg-sky-400">Review</button></Link>
              <Link to={`/checkout/${_id}`}>
                <button className="btn  border-0 w-36  bg-sky-400">Booking Now</button>
              </Link>
            </div>
          </div>
        </div>

      </div>
      <h4 className='text-3xl font-bold mb-3 text-center'>Travelers Reviews:</h4>
      {
        orders.map(review => <ServiceReview key={review._id} review={review}></ServiceReview>)
      }
    </>
  );
};

export default Details;