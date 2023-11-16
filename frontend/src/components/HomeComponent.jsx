import React from 'react';


const HomeComponent = () => {
  return (
    <div className=" h-[800px] items-center flex items-center align-middle">
      <div className="flex flex-col items-center align-middle justify-center">
        {/* <div className="rounded-full w-1/5">
          <img className="rounded-full" src={ppSaya} alt="" />
        </div>
        <br /> */}
        <div className="w-[800px] items-center align-middle ">
          <h1 className=" w-[800px] text-6xl -ml-20 text-left text-gray-800  font-bold px-3 py-2 rounded-md ">
            Discover Unique Products and Articles That Resonate
          </h1>
          <br />
          <p className=" text-lg text-justify text-gray-800  px-3 py-2 rounded-md  font-medium">
            Here In this project, I am focused on refining basic REST API CRUD
            operations, authorization, and authentication. There might still
            unresponsive be a more bugs that need fixing. I genuinely appreciate
            your testing and active participation in contributing articles or
            products on this platform.
          </p>
        </div>

      </div>
    </div>
  );
};

export default HomeComponent;
