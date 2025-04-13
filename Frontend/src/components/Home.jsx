import React from "react";
import "./CSS/home.css";
import { useState } from "react";
import MessageFeedback from "./MessageFeedback";
import bg1 from "./assets/1.jpg"
import bg2 from "./assets/2.jpg"
import bg3 from "./assets/3.jpg"
import bg4 from "./assets/4.jpg"
// import "./script/script.js"

const Home = () => {
  const [image, setImage] = useState(null);
  const [detailsData, setData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    } else {
      alert("No file selected");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("✅ Response from backend:", data);

      if (!data || !data.product) {
        alert("No product data returned. Try another image.");
        return;
      }

      setData(data); // save the whole response
    } catch (err) {
      console.error("❌ Error during fetch:", err);
      alert("Upload failed. Check console.");
    }
  };

  return (
    <>
      <section className="lander">
      <div class="carousel-container">
        <div class="carousel">
            <div class="slide">
                <img src={bg1} alt="Nature" />
                <div class="slide-content">
                    <h2 className="header2">Nutrition</h2>
                    <p>Nutrients are substances that provide energy and physical components to the organism, allowing it to survive, grow, and reproduce.</p>
                </div>
            </div>
            <div class="slide">
                <img src={bg2} alt="City" />
                <div class="slide-content">
                    <h2 className="header2">Healthy Hearts</h2>
                    <p>Experience the vibrant energy of modern city life.</p>
                </div>
            </div>
            <div class="slide">
                <img src={bg3} alt="Technology" />
                <div class="slide-content">
                    <h2 className="header2">Importance of food</h2>
                    <p>Supplying the nutrients needed for body functions and maintenance.</p>
                </div>
            </div>
            <div class="slide">
                <img src={bg4} alt="Travel" />
                <div class="slide-content">
                    <h2 className="header2">Focus on food</h2>
                    <p>Develop a healthier relationship with food.</p>
                </div>
            </div>
        </div>
        <div class="indicators">
            <div class="indicator active"></div>
            <div class="indicator"></div>
            <div class="indicator"></div>
            <div class="indicator"></div>
        </div>
    </div>

      </section>

      <section className="image-uploader">
        <h2>Upload Barcode Here</h2>
        <form id="barcode-upload-form" onSubmit={handleSubmit}>
          <label className="upload-area" id="uploadfile">
            <p>Please select or drag barcode here</p>
            <input
              type="file"
              id="barcode"
              name="barcode"
              accept="image/*"
              required
              onChange={handleFileChange}
            />
          </label>
          {image && <div className="message">Selected File : {image.name}</div>}
          <button type="submit" className="generate-btn">
            Generate Result
          </button>
        </form>
      </section>

      {detailsData?.product && (
        <section className="dataFood">
          <div className="divFood">
            <h1>{detailsData.product.name}</h1>
            <table>
              <thead>
                <tr>
                  <th>Nutritional Information</th>
                  <th>Per 100ml/gm</th>
                </tr>
              </thead>
              <tbody>
                {detailsData.product.nutrition_value &&
                  Object.entries(detailsData.product.nutrition_value).map(([key, value]) =>
                    key !== "serving_size" ? (
                      <tr key={key}>
                        <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                        <td>{value}</td>
                      </tr>
                    ) : null
                  )}
              </tbody>
            </table>

            <MessageFeedback
              header="Harmful Substances"
              details={detailsData.product.harmful_substances}
            />
            <MessageFeedback
              header="Health Benefits"
              details={detailsData.product.health_benefits_uses}
            />
            <MessageFeedback
              header="Warnings & Side Effects"
              details={detailsData.product.warnings_side_effects}
            />
            <MessageFeedback
              header="Alternative Suggestions"
              details={detailsData.product.products?.alternative_suggestions}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default Home;