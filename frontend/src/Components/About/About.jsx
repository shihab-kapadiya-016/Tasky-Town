import React from 'react';

const About = () => {
    return (
        <div className="mt-7 bg-white text-orange-500 px-6 py-12 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-6 border-b-4 border-orange-400 pb-2">
            About Tasky Town
        </h1>

        <p className="max-w-2xl text-lg text-gray-700 mb-8">
            Welcome to <span className="text-orange-500 font-semibold">Tasky Town</span> — your cozy corner for staying organized and productive!
            Whether you're managing personal tasks, group projects, or simply keeping your life on track, Tasky Town is designed to be your digital home for all things to-do.
        </p>

        <div className="max-w-3xl grid md:grid-cols-2 gap-8 text-left">
            <div>
            <h2 className="text-2xl font-semibold mb-2">🧠 Smart & Simple</h2>
            <p className="text-gray-700">
                Built to be intuitive and lightweight, Tasky Town doesn’t get in your way — it helps you focus on what matters.
            </p>
            </div>

            <div>
            <h2 className="text-2xl font-semibold mb-2">⚡ Fast & Responsive</h2>
            <p className="text-gray-700">
                Whether you're on desktop or mobile, enjoy a fast and seamless experience every time.
            </p>
            </div>

            <div>
            <h2 className="text-2xl font-semibold mb-2">🔒 Privacy First</h2>
            <p className="text-gray-700">
                Your data stays yours. We’re committed to secure storage and zero creepy tracking.
            </p>
            </div>

            <div>
            <h2 className="text-2xl font-semibold mb-2">🛠️ Made by Shihab</h2>
            <p className="text-gray-700">
                Crafted with care, coffee, and lots of code. Got feedback or ideas? I’d love to hear from you!
            </p>
            </div>
        </div>
        </div>
    );
};

export default About;
