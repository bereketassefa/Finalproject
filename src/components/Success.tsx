import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Success() {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="   md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base  font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-muted-foreground my-2">
              Thank you for completing your secure online payment.
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

export default Success;
