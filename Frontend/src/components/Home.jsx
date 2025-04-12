import React from "react";
import "./CSS/home.css";
import { useState } from "react";
import detailsData from "./info";
import MessageFeedback from "./MessageFeedback";

const Home = () => {
  const [image, setImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Log the file name for debugging
    } else {
      alert("No file selected");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    // You may want to handle the uploaded file here
  };

  return (
    <>
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
          {image && <div className="message">Selected File: {image.name}</div>}
          <button type="submit" className="generate-btn">
            Generate Result
          </button>
        </form>
      </section>
      <section className="dataFood">
        <div className="divFood">
          <h1>{detailsData.name}</h1>
          <table>
            <thead>
              <tr>
                <th>Nutritional Information</th>
                <th>
                  {(detailsData.nutrition_value.serving_size !== "N/A" && detailsData.nutrition_value.serving_size)
                    ? detailsData.nutrition_value.serving_size
                    : "Serves as 100ml"}
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(detailsData.nutrition_value).map(
                ([key, value]) =>
                  // Conditional rendering to skip serving_size
                  key !== "serving_size" && (
                    <tr key={key}>
                      <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td>{value}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>

          <MessageFeedback
            header="Harmful Substances"
            details={detailsData.harmful_substances}
          />
          <MessageFeedback
            header="Health Benefits"
            details={detailsData.health_benefits_uses}
          />
          <MessageFeedback
            header="Warnings Side Effects"
            details={detailsData.warnings_side_effects}
          />
          <MessageFeedback
            header="Alternative Suggestions"
            details={detailsData.alternative_suggestions}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
