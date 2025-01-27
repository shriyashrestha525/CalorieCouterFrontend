import React, { useState } from "react";
import '../style/ImageRecognization.css';

const ImageRecognization = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedModel, setSelectedModel] = useState("CNN"); // Default model

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const previewUrl = URL.createObjectURL(selectedFile);
            setImagePreview(previewUrl);
            setImage(selectedFile);
        }
    };

    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error("No refresh token available");
        }

        // Request the new access token
        const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        const newAccessToken = data.access;
        localStorage.setItem("authToken", newAccessToken);
        return newAccessToken;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            alert("Please upload an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("model", selectedModel);

        try {
            setLoading(true);
            setResult(null);

            let authToken = localStorage.getItem('authToken');  // Retrieve the token from localStorage

            // Try to make the request with the current authToken
            const makeRequest = async () => {
                const headers = {
                    'Authorization': `Bearer ${authToken}`,
                };

                const response = await fetch("http://127.0.0.1:8000/api/predict_food/", {
                    method: "POST",
                    body: formData,
                    headers: headers,
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        // If 401 (Unauthorized), attempt to refresh the token
                        authToken = await refreshAccessToken();
                        return makeRequest(); // Retry the request with the new token
                    } else {
                        throw new Error("Failed to upload image");
                    }
                }

                const data = await response.json();
                setResult(data);
            };

            await makeRequest(); // Call the request function

        } catch (error) {
            console.error("Error uploading image:", error);
            setResult({ error: "Failed to recognize the image." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="outerbox">
            <div className="container">
                <h1>Upload Your Food Image</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Select Model:
                        <select value={selectedModel} onChange={handleModelChange} className="model-select">
                            <option value="CNN">CNN</option>
                            <option value="MobileNet">MobileNet</option>
                            <option value="InceptionV3">InceptionV3</option>
                        </select>
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                    />
                    <button type="submit" className="submit-button">Submit</button>
                </form>

                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Uploaded food" />
                    </div>
                )}
                {loading && <p>Processing your image...</p>}
                {result && (
                    <div className="result">
                        {result.error ? (
                            <p className="error">{result.error}</p>
                        ) : (
                            <div>
                                <h2>Recognized Data:</h2>
                                <div className="result-item">
                                    <strong>Food:</strong> <span>{result.result}</span>
                                </div>
                                <div className="result-item">
                                    <strong>Portion:</strong> <span>{result.portion}</span>
                                </div>
                                <h3>Nutrition Information:</h3>
                                <ul className="nutrition-list">
                                    {result.Nutrition.map((item, index) => (
                                        <li key={index} className="nutrition-item">
                                            <strong>{item.name}:</strong> {item.value}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageRecognization;
