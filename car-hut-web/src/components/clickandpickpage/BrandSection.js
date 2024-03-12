import "../../css/clickandpickpage/BrandSection.css"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BrandSection() {

    const [imageFilenames, setImageFilenames] = useState([]);

  useEffect(() => {
    // Fetch image filenames when the component mounts
    const fetchImageFilenames = async () => {
      try {
        const context = require.context('../../images/clickandpick/');
        const filenames = context.keys();
        setImageFilenames(filenames);
      } catch (error) {
        console.error('Error fetching image filenames:', error);
      }
    };

    fetchImageFilenames();
  }, []);

    const generateImages = (character) => { 

        const myImages = imageFilenames.map(fileName => fileName.slice(2));

        // Filter filenames starting with 'a' or 'A'
        const filteredImages = myImages.filter(filename => filename.toLowerCase().startsWith(character));
    
        // Generate <img> elements
        const imageElements = filteredImages.map((filename, index) => (
          <Link
            key={index}
            to={`/clickAndPickPage/model`}
            state={filename}
          >
            <img
              key={index}
              src={require(`../../images/clickandpick/${filename}`)}
              className="brand-entity"
            />
          </Link>
        ));
    
        return imageElements;
      };

      const generateAlphabetSections = () => {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return alphabet.split('').map((character, index) => (
          <div key={index} className="brand-section">
            <div className="brand-alphabet-label">{character}</div>
            <div className="brand-content">
              {generateImages(character.toLowerCase())}
            </div>
          </div>
        ));
      };

    return (
        <div className='section-body-brand-section'>
            <div className='section-header-brand-section'>Pick a brand</div>
            <div className="line-container"/>
            <div className="brand-wrapper">
                {generateAlphabetSections()}
            </div>
            <div className="click-and-pick-progress-bar">
                <div className="progress-bar-content">
                    <div className="progress-bar-sphere-current"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                </div>
            </div>
            <div className="progress-bar-label">{"Brand  >  Model"}</div>
        </div>
    );

}

export default BrandSection;