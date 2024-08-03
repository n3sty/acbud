import React from "react";

function NewUser() {
  return (
    <div className="bg-base-200 text-base-content">
      <div className="flex mx-auto items-center mt-5 justify-center md:max-w-6xl max-w-3xl">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title">Card title!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
