import React from "react";
import { Button } from "@/components/ui/button";
function LoadingButton(props) {
  return (
    <Button {...props}>
      <Loader className="mr-2 h-4 w-4 animate-spin" /> {props.children}
    </Button>
  );
}

export default LoadingButton;
