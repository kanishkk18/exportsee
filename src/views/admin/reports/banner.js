const Banner1 = () => {
  return (
    <div className="relative flex w-full flex-col rounded-[20px] bg-cover px-[30px] py-[40px] md:px-[64px] md:py-[66px] overflow-hidden">
      {/* Video Background */}
      <video
        src="https://cdn.pixabay.com/video/2019/06/07/24255-341474048_large.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover "
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
          Discover, collect, and Export with Exportseese
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-white md:w-[64%] lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
          Enter in this creative world of Exportseese that allows you to discover, collect, and export your favorite products.
        </p>
      
      </div>
    </div>
  );
};

export default Banner1;
