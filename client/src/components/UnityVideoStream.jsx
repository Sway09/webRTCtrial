import React, { useEffect, useState } from 'react';

const UnityVideoStream = () => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        // Connect to the WebSocket server running at localhost:3000
        const ws = new WebSocket('ws://localhost:3000');

        // Listen for incoming data (video frames) from the WebSocket server
        ws.onmessage = (event) => {
            const arrayBuffer = event.data;

            // Create a Blob from the received binary data
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

            // Create an object URL from the blob to display the image
            const imageUrl = URL.createObjectURL(blob);

            // Set the image source to the object URL
            setImageSrc(imageUrl);
        };

        // Cleanup the WebSocket connection when the component unmounts
        return () => {
            ws.close();
        };
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Unity Video Stream</h1>
            {/* If the imageSrc state is populated, display the image */}
            {imageSrc ? (
                <img 
                    src={imageSrc} 
                    alt="Unity Stream" 
                    style={{ width: '80%', border: '2px solid black' }} 
                />
            ) : (
                <p>Waiting for video stream...</p>
            )}
        </div>
    );
};

export default UnityVideoStream;
