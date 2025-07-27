import React from 'react';

const Newsletter = () => {
  return (
    <section className="max-w-[1600px] px-6 sm:px-12 lg:px-16 mt-32 mx-auto">
      <div 
        className="w-auto h-auto min-h-[150px] rounded-[20px] backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl shadow-lg relative overflow-hidden"
        style={{
          background: 'linear-gradient(90deg, rgba(217, 217, 217, 0.5) 0%, rgba(99, 17, 224, 0.5) 100%)',
          border: 'none'
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between p-8 sm:p-12 gap-8 h-full relative z-10">
          
          <div className="flex-1">
            <h2 className="text-white text-4xl sm:text-4xl lg:text-5xl font-bold font-['Inter'] leading-tight text-left">
              Subscribe our<br />
              NewsLetter
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <input
              type="email"
              className="w-full sm:w-[300px] lg:w-[350px] h-[50px] border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 text-base font-normal font-['Inter'] focus:border-white focus:shadow-lg focus:bg-white/20 hover:border-white/50 transition-all duration-300 rounded-lg px-4 outline-none"
              placeholder="johndoe@gmail.com"
            />
            <button className="w-auto sm:w-[120px] h-[50px] border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white text-base font-medium font-['Inter'] transform transition-all duration-300 hover:scale-105 hover:bg-white hover:text-purple-900 hover:border-white hover:shadow-lg active:scale-95 rounded-lg">
              Subscribe
            </button>
          </div>

        </div>
        
        {/* Vector Image */}
        <img
          className="absolute w-[100px] sm:w-[150px] lg:w-[200px] h-auto top-4 sm:top-2 right-4 sm:right-6 bg-blend-overlay transition-all duration-300 hover:scale-105 pointer-events-none select-none z-0 opacity-20"
          alt="Vector"
          src="./Vector.svg"
        />
      </div>
    </section>
  );
};

export default Newsletter;
