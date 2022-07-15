import React, { Fragment } from 'react'
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./CheckOutStepper.css"

const CheckOutStepper = ({ activeStep }) => {

    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon />
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon />
        },
        {
            label: <Typography>Payent</Typography>,
            icon: <AccountBalanceIcon />
        }
    ];

    const stepStyle = {
        boxSizing: "border-box"
    }
    return (
        <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyle} >
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={index <= activeStep ? true : false}
                    >
                        <StepLabel
                            icon={item.icon}
                            style={{
                                color: index <= activeStep ? "tomato" : "rgba(0, 0, 0, 0.649)"
                            }}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Fragment>
    )
}

export default CheckOutStepper