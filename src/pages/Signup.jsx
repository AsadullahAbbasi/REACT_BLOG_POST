import React from "react";
import { Signup as SignupComponent } from "../components"; // js auto looks for index file coz its consider as entry point and get from there so w edont need to add index in path so its optional

function Signup() {
  return (
    <div className="py-8">
      <SignupComponent />
    </div>
  );
}

export default Signup;
