function GoogleMap() {
  return (
    <section className="google-map">
      <iframe
        title="Akshaya Residency Location"
        src="https://maps.google.com/maps?q=68/1%20Sengottai%20Road%20Courtallam%20Tenkasi%20Tamil%20Nadu&t=&z=15&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </section>
  );
}

export default GoogleMap;