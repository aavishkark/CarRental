import React from 'react'

const WhyChoose = () => {
  return (
    <div className="container py-4">
  <div className="row">
    <div className="col-md-4 p-4">
      <h2 className="h2">Why Choose Our Website?</h2>
      <p className="lead">
        We offer a variety of compelling reasons why you should choose our car rental service.
      </p>
    </div>

    <div className="col-md-8 p-4">
      <ul className="list-unstyled d-flex">
        <li className="mb-4 text-center">
          <img src="https://doav52ie4cv60.cloudfront.net/images/repair.svg" alt="Icon 1" className="img-fluid mb-2" style={{ width: '40px' }} />
          <strong>Accessible</strong>
          <p>Competitive rates for all types of vehicles.</p>
        </li>
        <li className="mb-4 text-center">
          <img src="https://doav52ie4cv60.cloudfront.net/images/earning.svg" alt="Icon 2" className="img-fluid mb-2" style={{ width: '40px' }} />
          <strong>Secure</strong>
          <p>Pay 0 security deposit, get unlimited KMs</p>
        </li>
        <li className="text-center">
          <img src="https://doav52ie4cv60.cloudfront.net/images/flexibility.svg" alt="Icon 3" className="img-fluid mb-2" style={{ width: '40px' }} />
          <strong>Convenient</strong>
          <p>From Hatchbacks to SUVs, choose from 25,000+ cars</p>
        </li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default WhyChoose