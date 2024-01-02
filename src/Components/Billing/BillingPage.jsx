import React from 'react';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
  } from "mdb-react-ui-kit";
  import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button
  } from '@chakra-ui/react';
import './billing.css';
import { useNavigate } from 'react-router-dom';

const BillingPage = () => {
   // const car=useSelector((store)=>{return store.carsReducer.singleCar})
   const { isOpen, onOpen, onClose } = useDisclosure();
   const cancelRef = React.useRef();
   const navigate=useNavigate()
    const car=JSON.parse(localStorage.getItem('rentaridesinglecar'))
    const dates=JSON.parse(localStorage.getItem('startenddates'))
    const start = new Date(dates.start);
    const end = new Date(dates.end);
    const differenceInMs = end - start;
    const differenceInDays = Math.ceil(differenceInMs / (24 * 60 * 60 * 1000));
    const handlePay=()=>{
        onOpen()
    }
    const handleClose=()=>{
        onClose()
        navigate('/')
    }
  return (
    <>
     <div>
    <div key={car.name} className="col mb-4">
                    <div className="card h-100">
                    <div className="card-body">
                      <img src={car.photos} alt={car.name} className='card-img-top cardimg' />
                  <div className='card-body cardinfo'>
                    <p className='card-text'>
                      <strong>City:</strong> {car.city}
                    </p>
                    <p className='card-text'>
                      <strong>Car:</strong> {car.name}
                    </p>
                    <p className='card-text'>
                      <strong>Price:</strong> {car.pricePerDay}/Day
                    </p>
                    <p className='card-text'>
                      <strong>Rating:</strong> {car.rating}
                    </p>
                  </div>
                      </div>
                    </div>
                  </div>
       {`start date:${start}
        End date:${end}
        total days:${differenceInDays+1}
        total:${differenceInDays+1}*${car.pricePerDay}
        To pay:${(differenceInDays+1)*(car.pricePerDay)}
        `}
    </div>
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <MDBRow className="d-flex align-items-center">
                <MDBCol size="9">
                  <MDBInput
                    label="Card Number"
                    id="form1"
                    type="text"
                    placeholder="1234 5678 9012 3457"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <img
                    src="https://img.icons8.com/color/48/000000/visa.png"
                    alt="visa"
                    width="64px"
                  />
                </MDBCol>

                <MDBCol size="9">
                  <MDBInput
                    label="Cardholder's Name"
                    id="form2"
                    type="text"
                    placeholder="Cardholder's Name"
                  />
                </MDBCol>

                <MDBCol size="6">
                  <MDBInput
                    label="Expiration"
                    id="form2"
                    type="text"
                    placeholder="MM/YYYY"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBInput
                    label="CVV"
                    id="form2"
                    type="text"
                    placeholder="&#9679;&#9679;&#9679;"
                  />
                </MDBCol>
                <MDBCol size="3">
                  <MDBBtn color="info" rounded size="lg" onClick={handlePay}>
                    Pay
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogBody>
            Payment Successfull You will be redirected to home
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClose}>
              OK
            </Button>
            {/* Additional buttons or actions can be added here */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BillingPage;
