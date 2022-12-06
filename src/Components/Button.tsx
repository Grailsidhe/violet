//import './Styles.css';
import React from 'react';
import {useRef} from 'react';

function Button() {

    // https://bobbyhadz.com/blog/react-open-file-input-on-button-click
    const inputRef = useRef(null);
    // 👇️ open file input box on click of other element
    const handleClick = (): void => {
        inputRef.current.click();
    };

    const handleFileChange = (event: any): void => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
          return;
        }
    
        console.log('fileObj is', fileObj);
    
        // 👇️ reset file input
        event.target.value = null;
    
        // 👇️ is now empty
        console.log(event.target.files);
    
        // 👇️ can still access file object here
        console.log(fileObj);
        console.log(fileObj.name);
      };

  return (
    <div className="button">
        <input
            style={{display: 'none'}}
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
        />

        <button onClick={handleClick}>Open file</button>
    </div>
  );
}

export default Button;