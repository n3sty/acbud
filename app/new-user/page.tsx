import React from "react";

function NewUser() {
  return (
    <div className="bg-base-200 text-base-content">
      <div className="flex mx-auto items-center min-h-screen justify-center md:max-w-6xl max-w-3xl">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">
              Personalise your profile
            </h2>
            
            {/* Input Fields */}

            {/* Username */}

            {/* Date of Birth */}

            {/* Additional Fields... */}
            
            <div className="card-actions justify-end">
              <button className="btn">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
