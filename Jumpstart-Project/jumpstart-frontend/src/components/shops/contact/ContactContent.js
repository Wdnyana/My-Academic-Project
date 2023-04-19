import React, { Fragment } from "react";

const ContactContent = () => {
  return (
    <Fragment>
      <div className="container mt-3rem mb-20">
        <h1 className="title__contact text-light text-center py-3">
          Contact Page
        </h1>
        <div className="mt-5 row d-flex justify-content-center">
          <div className="col-12 col-md-6 p-3">
            <div className="col-12 bg-secondary rounded-4 px-5 py-4 mb-md-3">
              +62 1234 5678 9101
            </div>
            <div className="col-12 bg-secondary rounded-4 px-5 py-4 mb-md-3">
              +62 1234 5678 9101
            </div>
            <div className="col-12 bg-secondary rounded-4 px-5 py-4">
              +62 1234 5678 9101
            </div>
          </div>

          <div className="col-12 col-md-6 p-3">
            <div className="form__contact p-5 bg-secondary rounded-4">
              <h5 className="title__form__send text-light text-center pb-3">
                Send Message
              </h5>
              <div className="form__content">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control bg-transparent rounded-4 shadow-none ps-4 text-light"
                    id="floatingText"
                    placeholder="Text"
                  />
                  <label for="floatingText" className="ps-4 text-light">
                    Subject
                  </label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control bg-transparent rounded-4 shadow-none ps-4 text-light"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput " className="ps-4 text-light">
                    Email
                  </label>
                </div>

                <div className="form-floating">
                  <textarea
                    className="form-control bg-transparent rounded-4 shadow-none ps-4 text-light"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                  ></textarea>
                  <label for="floatingTextarea" className="ps-4 text-light">
                    Message..
                  </label>
                </div>

                <div className="btn__content mt-4 px-md-3">
                  <input
                    className="btn bg-primary px-5 py-2 d-block mx-auto w-100 text-light rounded-4 fw-bold"
                    type="submit"
                    value="Send"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 row d-flex align-items-center">
          <div className="col-12">
            <h1 className="title__contact text-light text-center py-3">
              View on Maps
            </h1>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                title="Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15783.028359724256!2d115.15334239999999!3d-8.522948549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid!4v1679534858375!5m2!1sen!2sid"
                height="450"
                frameBorder={0}
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="embed-responsive-item rounded-4"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContactContent;
