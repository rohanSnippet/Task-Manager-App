import React, { forwardRef } from "react";

const FeaturesSection = forwardRef((props,ref) => {
  const features = [
    {
      title: "Task Management",
      description: "Create, edit, and organize tasks effortlessly.",
      icon: "📌",
    },
    {
      title: "Due Date Alerts",
      description: "Never miss a deadline with smart reminders.",
      icon: "⏰",
    },
    {
      title: "Task Categories",
      description: "Group tasks by Work, Study, or Personal.",
      icon: "📂",
    },
    {
      title: "Real-Time Sync",
      description: "Access your tasks from any device.",
      icon: "🌍",
    },
  ];
  return (
    <section className="py-16 bg-gray-100" ref={ref} id="featuresSection">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold">Why Choose Our Task Manager?</h2>
        <p className="text-gray-600 mt-4">
          Effortless task management at your fingertips.
        </p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <span className="text-4xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;
