function ContactForm() {
  return (
    <div className="contact-form">

      <h2>Send Us a Message</h2>

      <form>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Name*"
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email*"
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Phone Number*"
        />

        <textarea
          rows="6"
          className="form-control mb-3"
          placeholder="Message"
        ></textarea>

        <button className="btn btn-danger">
          Submit
        </button>

      </form>

    </div>
  );
}

export default ContactForm;