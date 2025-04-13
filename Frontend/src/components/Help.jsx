import React from 'react';
import './CSS/help.css'

const Help = () => {
    const toggleAnswer = (element) => {
        const answer = element.nextElementSibling;
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    };

    return (
        <div className="container">
            <h1>Need Help? We're Here!</h1>
            <p>
                Welcome to the help page for Food Nutrition Tracker. We've put together this guide to help you understand how to use our barcode scanning feature and get the most out of the nutritional information and insights we provide.
            </p>

            <section className="section">
                <h2>Getting Started</h2>
                <div className="step">
                    <h3>Step 1: Access the Image Upload Section</h3>
                    <p>
                        Navigate to the section of our website where you can upload an image. This is typically labeled as "Scan Barcode," "Upload Image," or something similar. You should see an area where you can either drag and drop an image or select one from your device's files.
                    </p>
                </div>

                <div className="step">
                    <h3>Step 2: Upload an Image of the Barcode</h3>
                    <p>Ensure that the image you upload clearly shows the barcode of the food item. For best results:</p>
                    <ul>
                        <li>Make sure the barcode is in focus and not blurry.</li>
                        <li>Ensure good lighting to avoid shadows on the barcode.</li>
                        <li>Try to capture the entire barcode within the frame.</li>
                        <li>Supported image formats are typically JPG, JPEG, PNG, and GIF.</li>
                    </ul>
                </div>

                <div className="step">
                    <h3>Step 3: Processing and Results</h3>
                    <p>
                        Once you've uploaded the image, our system will automatically process it to identify the barcode. This process may take a few moments. After successful identification, you will be presented with detailed information about the food item, including:
                    </p>
                    <ul>
                        <li><strong>Nutritional Information:</strong> Calories, macronutrients (fat, carbohydrates, protein), micronutrients (vitamins, minerals), and more.</li>
                        <li><strong>Potential Side Effects:</strong> Information about ingredients that may cause allergic reactions or sensitivities.</li>
                        <li><strong>Healthier Options:</strong> Suggestions for similar products with improved nutritional profiles.</li>
                        <li><strong>What to Avoid:</strong> Highlights of ingredients or aspects of the product you might want to limit.</li>
                        <li><strong>Good Features:</strong> Positive aspects of the food, such as being a good source of fiber or protein.</li>
                    </ul>
                </div>
            </section>

            <section className="section">
                <h2>Troubleshooting Common Issues</h2>
                <div className="step">
                    <h3>Barcode Not Recognized</h3>
                    <p>If the barcode is not recognized, please try the following:</p>
                    <ul>
                        <li>Ensure the image is clear and the barcode is fully visible.</li>
                        <li>Try taking the picture in better lighting conditions.</li>
                        <li>Make sure your camera lens is clean.</li>
                        <li>If possible, try taking the picture from a slightly different angle.</li>
                        <li>Some very unique or less common products might not be in our database yet.</li>
                    </ul>
                </div>

                <div className="step">
                    <h3>Inaccurate Information</h3>
                    <p>
                        While we strive for accuracy, food product information can sometimes change. If you notice any discrepancies, please <a href="/contact">contact us</a> with the details, including the product name and the specific inaccuracy. Your feedback helps us improve!
                    </p>
                </div>

                <div className="step">
                    <h3>Image Upload Failed</h3>
                    <p>If you are having trouble uploading an image:</p>
                    <ul>
                        <li>Check your internet connection.</li>
                        <li>Ensure the image file size is within the allowed limit (if specified).</li>
                        <li>Try uploading a different image format.</li>
                        <li>Clear your browser's cache and cookies and try again.</li>
                        <li>If the issue persists, please <a href="/contact">contact our support team</a>.</li>
                    </ul>
                </div>
            </section>

            <section className="section">
                <h2>Frequently Asked Questions (FAQ)</h2>
                <ul className="faq-list">
                    <li className="faq-item">
                        <h4 onClick={(e) => toggleAnswer(e.currentTarget)}>What types of barcodes do you support?</h4>
                        <p style={{ display: 'none' }}>We primarily support common 1D barcodes such as EAN-13, UPC-A, and Code 128, which are widely used on food packaging.</p>
                    </li>
                    <li className="faq-item">
                        <h4 onClick={(e) => toggleAnswer(e.currentTarget)}>How often is your food database updated?</h4>
                        <p style={{ display: 'none' }}>Our database is regularly updated to include new products and changes in nutritional information. We strive to keep the information as current as possible.</p>
                    </li>
                    <li className="faq-item">
                        <h4 onClick={(e) => toggleAnswer(e.currentTarget)}>Can I use this on my mobile device?</h4>
                        <p style={{ display: 'none' }}>Yes, our website is designed to be responsive and should work seamlessly on most modern mobile devices. Simply access the website through your mobile browser.</p>
                    </li>
                    <li className="faq-item">
                        <h4 onClick={(e) => toggleAnswer(e.currentTarget)}>Is my uploaded image stored or shared?</h4>
                        <p style={{ display: 'none' }}>We take your privacy seriously. Uploaded images are typically processed in real-time and are not permanently stored on our servers unless explicitly stated for specific features (e.g., account history, if implemented). Please refer to our <a href="/privacy">Privacy Policy</a> for more details.</p>
                    </li>
                </ul>
            </section>

            <section className="section tip">
                <strong>Tip:</strong> For the best experience, ensure you have a stable internet connection and use a device with a good quality camera.
            </section>
        </div>
    );
};

export default Help;