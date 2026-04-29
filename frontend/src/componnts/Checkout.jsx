import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createOrder } from '../services/orderService';

const checkoutSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  email: z.string().trim().email('Email is invalid'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  address: z.string().trim().min(1, 'Address is required'),
  city: z.string().trim().min(1, 'City is required'),
  postalCode: z.string().trim().min(1, 'Postal code is required'),
  paymentMethod: z.enum(['cash', 'card', 'mobile']),
  deliveryInstructions: z.string().optional()
});

function Checkout({ cart, isUsingFallbackProducts, onClose, onOrderComplete, onCheckoutError }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      paymentMethod: 'cash',
      deliveryInstructions: ''
    }
  });

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = total > 500 ? 0 : 50;
  const finalTotal = total + deliveryFee;

  const onSubmit = async (formData) => {
    try {
      if (isUsingFallbackProducts) {
        throw new Error('Start the backend and seed Supabase products before placing production orders.');
      }

      const order = await createOrder({
        cart,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod,
        deliveryInstructions: formData.deliveryInstructions
      });

      onOrderComplete(order);
    } catch (error) {
      onCheckoutError(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Checkout</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    {...register('firstName')}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    {...register('lastName')}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  {...register('address')}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    {...register('city')}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    {...register('postalCode')}
                    className={`w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  {...register('paymentMethod')}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="mobile">Mobile Banking</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Delivery Instructions (Optional)
                </label>
                <textarea
                  {...register('deliveryInstructions')}
                  rows="2"
                  placeholder="Any special instructions for delivery..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <p className="text-xs text-gray-500 mb-3">
                Final pricing is calculated by the backend when the order is placed.
              </p>
              
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 border rounded">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded"
                      onError={(e) => {
                        e.target.src = `https://picsum.photos/48/48?random=${item.id}`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.title}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ৳{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>৳{total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'Free' : `৳${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span className="text-emerald-600">৳{finalTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full mt-6 py-3 px-4 rounded font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
