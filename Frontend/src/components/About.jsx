import React from 'react'
import './CSS/about.css'

const About = () => {
  return (
    <>
    <div class="container">
        <h1>About Our Food Insights Platform</h1>

        <section class="section">
            <h2>Our Mission</h2>
            <p>At Food Nutrition Tracker , our mission is to empower you to make informed food choices effortlessly. We believe that understanding the nutritional content, potential side effects, and healthier alternatives of the food you consume is crucial for your well-being. By simply scanning a barcode, we aim to provide you with comprehensive and easy-to-understand information, helping you lead a healthier and more conscious lifestyle.</p>
        </section>

        <section class="section">
            <h2>How It Works</h2>
            <p>Our platform utilizes advanced image recognition technology to quickly and accurately identify food product barcodes. Once scanned, our system accesses a vast and constantly updated database of food information to provide you with:</p>
            <ul class="feature-list">
                <li><strong>Detailed Nutritional Information:</strong> Get a breakdown of macronutrients (calories, carbohydrates, fats, protein), micronutrients (vitamins, minerals), and other relevant nutritional details.</li>
                <li><strong>Potential Side Effects:</strong> Learn about ingredients that may cause allergies, intolerances, or other adverse reactions for some individuals.</li>
                <li><strong>Healthier Options:</strong> Discover similar food products with better nutritional profiles, lower sugar content, fewer additives, or other health-focused attributes.</li>
                <li><strong>Key Features & Benefits:</strong> Understand the positive aspects of the food, such as being a good source of fiber, high in protein, or containing essential vitamins.</li>
                <li><strong>"What to Avoid":</strong> Identify ingredients or aspects of the product that you might want to limit based on your dietary goals or health concerns.</li>
            </ul>
            <p>We strive to provide accurate and reliable information, sourced from reputable databases and constantly reviewed for accuracy.</p>
        </section>

        <section class="section">
            <h2>Key Features You'll Love</h2>
            <ul class="feature-list">
                <li><strong>Easy Barcode Scanning:</strong> Simply point your device's camera at the barcode for instant results.</li>
                <li><strong>Comprehensive Food Database:</strong> Access information on a wide range of food products available in the market.</li>
                <li><strong>User-Friendly Interface:</strong> Navigate effortlessly through clear and concise nutritional breakdowns.</li>
                <li><strong>Personalized Insights:</strong> (Future Feature - Mention if you plan this) We plan to offer personalized recommendations based on your dietary preferences and health goals in the future.</li>
                <li><strong>Save & Track History:</strong> (Future Feature - Mention if you plan this) Keep track of the foods you've scanned to monitor your dietary habits.</li>
            </ul>
        </section>

        
    </div>
    </>
  )
}

export default About