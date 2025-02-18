import React from 'react'

const Testimonials = () => {
    const testimonials = [
        { name: "John D.", text: "This app changed my productivity!" },
        { name: "Sarah W.", text: "Simple & effective task management tool!" }
      ];
      
  return (
    <section className="py-16 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold">What Our Users Say</h2>
      <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
        {testimonials.map((test, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
            <p className="italic">"{test.text}"</p>
            <h3 className="mt-4 font-semibold">- {test.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Testimonials
