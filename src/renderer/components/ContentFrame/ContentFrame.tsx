import React, { useState, useEffect } from 'react';
import './ContentFrame.css';

const ContentFrame: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [encodedText, setEncodedText] = useState('');
    const [libPath, setLibPath] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const initLibrary = async () => {
            try {
                const path = await window.electron.ipcRenderer.invoke('get-library-path');
                setLibPath(path);
                
                // Use the exposed ffi from preload
                const lib = (window as any).ffi.Library(path, {
                    'encode_base64': ['string', ['string']]
                });
                
                (window as any).libb64 = lib;
            } catch (err: any) {
                setError(`Failed to load library: ${err.message}`);
            }
        };

        initLibrary();
    }, []);

    const handleEncode = () => {
        try {
            if (!inputText) {
                setError('Please enter some text to encode');
                return;
            }

            const lib = (window as any).libb64;
            if (!lib) {
                setError('Library not loaded yet');
                return;
            }

            const encoded = lib.encode_base64(inputText);
            setEncodedText(encoded);
            setError('');
        } catch (err: any) {
            setError(`Encoding failed: ${err.message}`);
        }
    };

    return (
        <div className="content-frame">
            <div className="encoding-container">
                <div className="input-group">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to encode"
                    />
                    <button onClick={handleEncode}>Encode</button>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                {encodedText && (
                    <div className="result">
                        <h3>Encoded Result:</h3>
                        <pre>{encodedText}</pre>
                    </div>
                )}
                
                <div className="library-info">
                    <small>Library path: {libPath}</small>
                </div>
            </div>
        </div>
    );
};

export default ContentFrame;