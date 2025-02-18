import React from 'react'

const Stats = () => {

    const stats = [
        { number: "1000+", text: "Happy Users" },
        { number: "5000+", text: "Tasks Completed" },
        { number: "98%", text: "User Satisfaction" }
      ];

  return (
     <section className="py-16 bg-indigo-600 text-white text-center">
      <h2 className="text-4xl font-bold">Trusted by Thousands</h2>
      <div className="flex justify-center gap-10 mt-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <h3 className="text-5xl font-bold">{stat.number}</h3>
            <p className="text-lg">{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats
