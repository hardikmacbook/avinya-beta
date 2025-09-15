"use client";
import React, { useState } from "react";
import Title from "@/componets/SectionTitles/Title";

const FlipCards = () => {
  const cardData = [
    {
      id: 1,
      frontTitle: "Innovation",
      frontIcon: "💡",
      backTitle: "Drive Innovation",
      backContent:
        "We constantly push boundaries and embrace creative thinking to develop cutting-edge solutions that shape the future.",
    },
    {
      id: 2,
      frontTitle: "Collaboration",
      frontIcon: "🤝",
      backTitle: "Team Excellence",
      backContent:
        "Teamwork and communication fuel our progress, creating synergy that drives extraordinary results across all projects.",
    },
    {
      id: 3,
      frontTitle: "Quality",
      frontIcon: "⭐",
      backTitle: "Premium Standards",
      backContent:
        "We maintain the highest standards in everything we deliver, ensuring excellence and reliability in every detail.",
    },
    {
      id: 4,
      frontTitle: "Growth",
      frontIcon: "🚀",
      backTitle: "Continuous Learning",
      backContent:
        "We foster an environment of continuous improvement and learning, adapting to new challenges and opportunities.",
    },
    {
      id: 5,
      frontTitle: "Integrity",
      frontIcon: "🛡️",
      backTitle: "Trust & Ethics",
      backContent:
        "We uphold the highest standards of honesty and accountability in every interaction and decision we make.",
    },
    {
      id: 6,
      frontTitle: "Impact",
      frontIcon: "🌟",
      backTitle: "Making a Difference",
      backContent:
        "Every project we undertake is designed to create meaningful impact and positive change in our community.",
    },
  ];

  const [flippedCard, setFlippedCard] = useState(null);

  return (
    <div
      className="min-h-screen py-16 px-4"
      style={{
        background: `
          linear-gradient(135deg, rgba(210, 175, 111, 0.1) 0%, rgba(139, 39, 39, 0.05) 50%, rgba(210, 175, 111, 0.08) 100%),
          radial-gradient(ellipse at 20% 80%, rgba(210, 175, 111, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(139, 39, 39, 0.1) 0%, transparent 50%),
          linear-gradient(180deg, #f8f4f0 0%, #ffffff 50%, #f9f6f2 100%)
        `,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <Title
          title="Our Core Values"
          subtitle="These principles guide everything we do, from product development to customer service."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-12">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="group w-80 h-56"
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setFlippedCard(card.id)}
              onMouseLeave={() => setFlippedCard(null)}
              onFocus={() => setFlippedCard(card.id)}
              onBlur={() => setFlippedCard(null)}
              tabIndex={0}
            >
              <div
                className="relative w-full h-full transition-transform duration-700 ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flippedCard === card.id ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front Side */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl shadow-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#8b2727] to-[#a02f2f] text-white flex flex-col items-center justify-center p-8 rounded-2xl border border-[#d2af6f]/30">
                    <div className="text-5xl mb-4 drop-shadow-lg animate-pulse">
                      {card.frontIcon}
                    </div>
                    <h3 className="text-xl font-bold text-center tracking-wide drop-shadow-md">
                      {card.frontTitle}
                    </h3>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 w-full h-full rounded-2xl shadow-xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 flex flex-col items-center justify-center p-6 rounded-2xl border border-[#8b2727]/20">
                    <h3 className="text-xl font-bold mb-4 text-[#8b2727] text-center">
                      {card.backTitle}
                    </h3>
                    <div className="w-12 h-0.5 bg-[#8b2727] rounded-full mb-4"></div>
                    <p className="text-black text-center text-sm leading-relaxed">
                      {card.backContent}
                    </p>
                    <div className="w-16 h-1 bg-[#8b2727] rounded-full mt-4"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlipCards;