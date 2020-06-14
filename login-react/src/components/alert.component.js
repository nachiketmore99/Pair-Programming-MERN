import React, { Fragment } from "react";
import { useAlert } from "react-alert";

const Alert = () => {
  const alert = useAlert();

  return (
    <Fragment>
      <button id='show' style={{color: "transparent"}} 
        onClick={() => {
          alert.show("Oh look, an alert!");
        }}
      >
        Show Alert
      </button>
      <button id='error' style={{color: "transparent"}} 
        onClick={() => {
          alert.error("You just broke something!");
        }}
      >
        Oops, an error
      </button>
      <button id='success' style={{color: "transparent"}} 
        onClick={() => {
          alert.success("Registered Successfully!");
        }}
      >
        Success!
      </button>
    </Fragment>
  );
};

export default Alert;