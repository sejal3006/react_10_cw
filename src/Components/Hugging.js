
import React, { useState } from 'react';
import axios from 'axios';
import './Hugging.css'

const Hugging = () => {
  const [input, setInput] = useState('');
  const [bringImage, setBringImage] = useState([]);

  const API_TOKEN = "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";

  const handleFun = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/prompthero/openjourney-v4',
        {
          inputs: input,
        },
        {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'image/jpeg"',
          },
          responseType: 'blob',
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      setBringImage(imageUrl);
      console.log(response.json())
    } catch (error) {
      console.log('error is coming while getting data..');
    }
  };

  return (
    <div className='main'>
    <div className='container'>
    <h1>Image Generation App</h1>
        <form onSubmit={handleFun}>
            <div className='index-container'>
                <input
                id="input-box"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Please enter here..."
                />
                <button type="submit" id="btn">Image</button>
            </div>
        </form>
       {bringImage && (
        <div className='img-container'>
          <img src={bringImage}  />
        </div>
      )}
    </div>
    </div>
  );
};

export default Hugging;