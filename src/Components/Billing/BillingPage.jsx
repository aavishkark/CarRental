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
import axios from 'axios';
const BillingPage = () => {
   // const car=useSelector((store)=>{return store.carsReducer.singleCar})
   const { isOpen, onOpen, onClose } = useDisclosure();
   const cancelRef = React.useRef();
   const navigate=useNavigate()
    const car=JSON.parse(localStorage.getItem('rentaridesinglecar'))
    const dates=JSON.parse(localStorage.getItem('startenddates'))
    const date1 = dates.start
    const date2 = dates.end
    const parts1 = date1.split('/');
    const parts2 = date2.split('/');
  
    const dateObject1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
    const dateObject2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);
    const timeDiff = dateObject2 - dateObject1;

    // Convert milliseconds to days
    const daysDiff = timeDiff / (1000 * 3600 * 24);
  
    // Return the difference in days
    console.log(Math.abs(Math.round(daysDiff)))
    const handlePay=()=>{
        onOpen()
        axios.patch(`https://erin-tasty-barnacle.cyclic.app/cars/updatecar/${car._id}`,
        {dates:[dates]})
        .then((res)=>{
           console.log(res)
        })
        .catch((err)=>{
          console.log(err)
        })
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
       {`start date:${date1}
        End date:${date2}
        total days:${Math.abs(Math.round(daysDiff))+1}
        total:${Math.abs(Math.round(daysDiff))+1}*${car.pricePerDay}
        To pay:${(Math.abs(Math.round(daysDiff))+1)*(car.pricePerDay)}
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
