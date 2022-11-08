
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);
    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }
        console.log(order);

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorication:`Bearer ${localStorage.getItem('genius')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('Order placed successfully')
                    form.reset();

                }
            })
            .catch(er => console.error(er));

    }
    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className='text-4xl font-semibold text-cyan-400 text-center'>Service : {title}</h2>
                <h4 className='text-3xl text-center mt-2 font-semibold text-cyan-400 mb-12'> Price: ${price}</h4>
                <div className=' border-2 shadow-slate-400 p-6 mb-12 bg-slate-300 rounded-lg '>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name='firstName' type="text" placeholder="First name" className="input w-full input-bordered" />
                    <input name='lastName' type="text" placeholder="Last name " className="input w-full input-bordered" />
                    <input name='phone' type="number" placeholder="Your phone " className="input w-full input-bordered" required />
                    <input name="email" type="text" placeholder="Your email" defaultValue={user?.email} className="input input-ghost w-full  input-bordered" readOnly />
                </div>
                <textarea name='message' className="textarea textarea-bordered h-24 w-full my-6" placeholder="Your massage"></textarea>
                <input className='btn border-0  w-full bg-cyan-400 mb-4'type='submit' value='Place your service'></input>
                </div>
            </form>
        </div>
    );
};

export default Checkout;