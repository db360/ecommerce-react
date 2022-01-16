import React, { useEffect, useState } from "react";
import { commerce } from '../../../lib/commerce';
import useStyles from './styles';
import {
  Paper,
  Stepper,
  Step,
  SetepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  StepLabel,
} from "@material-ui/core";

//Components
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({cart}) => {

    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({})

    //Generate Checkout Token
    useEffect(() => {
        const generateToken = async() => {
            // You can't use asyng in use Effect funtion, must be a separated function
            try {
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});

                // console.log(token);

                setCheckoutToken(token);
            } catch (error) {
                console.log(error);
            }
        }
        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep)=> prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep)=> prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data)

        nextStep();
    }

    const Confirmation = () => (
        <div>
            Confirmation
        </div>
    );

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep}/>

        console.log(checkoutToken)
        // First Reacts Renders  JSX > useEffect >  renders

  return (
      <>
      {/* Padding for navBar */}
        <div className={classes.toolbar}/>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant="h4" align="center">Checkout</Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form />}
            </Paper>
        </main>
      </>
  )
};

export default Checkout;
