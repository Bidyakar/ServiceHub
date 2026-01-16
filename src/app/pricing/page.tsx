"use client";

import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for occasional home maintenance",
      monthlyPrice: 29,
      yearlyPrice: 290,
      icon: "🏠",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Up to 3 service bookings/month",
        "Basic customer support",
        "Standard service professionals",
        "24-hour response time",
        "Email notifications",
        "Service history tracking",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for regular home service needs",
      monthlyPrice: 59,
      yearlyPrice: 590,
      icon: "⭐",
      color: "from-indigo-600 to-purple-600",
      features: [
        "Up to 10 service bookings/month",
        "Priority customer support",
        "Verified professionals only",
        "Same-day service available",
        "SMS + Email notifications",
        "Service warranty included",
        "Flexible rescheduling",
        "10% discount on all services",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For property managers and businesses",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      icon: "🏢",
      color: "from-purple-600 to-pink-600",
      features: [
        "Unlimited service bookings",
        "24/7 dedicated support",
        "Premium professionals",
        "Instant service dispatch",
        "All notification channels",
        "Extended service warranty",
        "Free rescheduling",
        "20% discount on all services",
        "Account manager",
        "Custom invoicing",
        "Multi-property management",
      ],
      popular: false,
    },
  ];

  const addOns = [
    {
      name: "Emergency Service",
      price: 15,
      description: "24/7 emergency service availability",
      icon: "🚨",
    },
    {
      name: "Premium Support",
      price: 25,
      description: "Dedicated support line with instant response",
      icon: "📞",
    },
    {
      name: "Service Guarantee",
      price: 10,
      description: "Extended warranty and satisfaction guarantee",
      icon: "✅",
    },
    {
      name: "Seasonal Maintenance",
      price: 40,
      description: "Quarterly home maintenance checks",
      icon: "🔧",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#000001] to-[#340063] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your home service needs. All plans include access to our network of verified professionals.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-white text-indigo-600 shadow-lg"
                  : "text-white hover:text-white/80"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-white text-indigo-600 shadow-lg"
                  : "text-white hover:text-white/80"
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular ? "ring-4 ring-indigo-600 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg`}
                >
                  {plan.icon}
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ${billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-gray-600">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-sm text-green-600 mt-2">
                      Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}/year
                    </p>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  Get Started
                </button>

                {/* Features */}
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Available Add-ons
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enhance your plan with additional services and features
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="text-4xl mb-4">{addon.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {addon.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${addon.price}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <button className="w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-medium transition-colors duration-200">
                  Add to Plan
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change my plan later?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, and digital payment methods including PayPal.",
              },
              {
                question: "Is there a cancellation fee?",
                answer: "No cancellation fees. You can cancel your subscription at any time with no penalties.",
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee on all plans if you're not satisfied.",
              },
            ].map((faq, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our team is here to help you choose the perfect plan for your needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
              Contact Sales
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}