import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../../Shared/Loading';

const ItemDetail = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // getting items
    const { data: item, isLoading, refetch } = useQuery(['items', user], () =>
        fetch(`https://driller-tools.herokuapp.com/items/${id}`)
            .then(res => res.json())
    )

    // usestate for button handling
    const [error, setError] = useState(true);
    if (isLoading) {
        return <Loading></Loading>
    }
    // getting value from input via onckeyup function
    const getInput = event => {
        const quantityInput = event.target.value;
        console.log(quantityInput)
        const minimunQuantity = 50;
        const availableQuantity = parseInt(item.quantity);
        if (quantityInput < minimunQuantity) {
            setError(true);
        }
        else if (quantityInput > availableQuantity) {
            setError(true)
        }
        else {
            setError(false)
        }
    }

    const onSubmit = async (data, event) => {
        const quantityInput = data.quantity;
        const quantity = item.quantity - parseInt(quantityInput);

        const updatedItems = { quantity };

        // send data to the server
        const url = `https://driller-tools.herokuapp.com/items/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedItems)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                event.target.reset();
            })
        const totalPrice = parseInt(quantityInput * item.price)
        const purchased = {
            buyerName: data.Name,
            buyer: user.email,
            address: data.Address,
            mobileNumber: data.mobileNumber,
            quantity: data.quantity,
            price: totalPrice
        }
        fetch('https://driller-tools.herokuapp.com/purchased', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(purchased)
        })
            .then(res => res.json())
            .then(inserted => {
                if (inserted.insertedId) {
                    toast.success('Booked Successfully. Please Pay to complete purchase')
                    reset();
                }
                else {
                    toast.error('Failed to book')
                }
            })
    };
    return (
        <div className='py-20 px-8'>
            <div className='mt-4 rounded-2xl shadow-2xl p-6 gap-6 bg-neutral lg:w-[1350px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center'>
                <img className='w-80 lg:w-[380px] bg-white p-6 rounded-xl' src={item.img} alt="" />
                <div className='flex flex-col items-center justify-center text-center gap-4'>
                    <h3 className='font-bold text-xl mt-3'>{item.name}</h3>
                    <p className='text-center'>{item.description}</p>
                    <p className='font-medium'>Available Quantity: {item.quantity}</p>
                    <p className='font-medium'>Must buy quantity: 50</p>
                    <p className='font-bold'>Price: ${item.price}</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder='Full name' {...register("Name", {})} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 max-w-xs' />
                    <input type="text" placeholder={user.email} disabled {...register("Email", {})} className='bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5 mb-4 placeholder-gray-900 block max-w-xs' />
                    <input type="tel" placeholder="mobileNumber" {...register("mobileNumber", {
                        required: {
                            value: true,
                            message: ' Please provide a phone number'
                        },
                        minLength: 6, maxLength: 12
                    })}
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 max-w-xs' />
                    <label className="label">
                        {errors.mobileNumber?.type === 'required' && <span className="label-text-alt text-red-500">{errors.mobileNumber.message}</span>}
                    </label>
                    <input type="text" placeholder="address" {...register("Address", {})} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 max-w-xs' />
                    <input type="number" onKeyUp={getInput} name='number' {...register("quantity", {})} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 max-w-xs' required />
                    <input type="submit" value='Buy Now' className='btn btn-outline' disabled={error} />
                </form>
            </div>
        </div>
    );
};

export default ItemDetail;