import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Failed() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="md:mx-auto">
          <svg
            fill="#ff0000"
            width="200px"
            height="200px"
            viewBox="0 -8 528 528"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ff0000"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <title>fail</title>
              <path d="M264 456Q210 456 164 429 118 402 91 356 64 310 64 256 64 202 91 156 118 110 164 83 210 56 264 56 318 56 364 83 410 110 437 156 464 202 464 256 464 310 437 356 410 402 364 429 318 456 264 456ZM264 288L328 352 360 320 296 256 360 192 328 160 264 224 200 160 168 192 232 256 168 320 200 352 264 288Z"></path>
            </g>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base  font-semibold text-center">
              Payment Failed!
            </h3>
            <p className="text-muted-foreground my-2">
              Thanks for your trial. Can you please try again?
            </p>

            <Button asChild className="mt-7">
              <Link to="/">Go Back</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Failed;
