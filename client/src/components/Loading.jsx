import React from "react";

function LoadingDots() {
  console.log("LoadingDots")
return(
<div class="size-full flex items-stretc self-center place-content-center">
  <div className="w-[120px] flex justify-between items-center">
     <div className="w-5 h-5 bg-primary-content rounded-[50%] animate-pulse_0.4s_ease_0s_infinite_alternate"></div>
     <div className="w-5 h-5 bg-primary-content rounded-[50%] animate-pulse_0.4s_ease_0.2s_infinite_alternate"></div>
     <div className="w-5 h-5 bg-primary-content rounded-[50%] animate-pulse_0.4s_ease_0.4s_infinite_alternate"></div>
  </div>
</div>
    )
}
export default LoadingDots;