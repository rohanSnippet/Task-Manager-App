import React from 'react'

const FAQ = () => {
    const faqs = [
        { question: "How do I add tasks?", answer: "Simply click the 'Add Task' button and fill in the details." },
        { question: "Is my data secure?", answer: "Yes, we use Firebase authentication and database security rules." },
        { question: "Can I use it on mobile?", answer: "Yes! Our app is fully responsive for mobile and desktop." }
      ];
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>
      <div className="mt-8 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <details key={index} className="mb-4 p-4 bg-white shadow-lg rounded-lg">
            <summary className="cursor-pointer font-semibold">{faq.question}</summary>
            <p className="mt-2 text-gray-600">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FAQ
