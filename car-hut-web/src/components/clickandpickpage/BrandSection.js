import "../../css/clickandpickpage/BrandSection.css"
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BrandSection() {

    const [imageFilenames, setImageFilenames] = useState([]);
    const [clickedBrands, setClickedBrands] = useState([]);

    const handleBrandClick = (brand) => {
      // Check if the brand is already in the clickedBrands array
      const croppedBrand = brand.split(".")[0];
      const isBrandClicked = clickedBrands.includes(croppedBrand);
      
      // Toggle the clicked state
      if (isBrandClicked) {
        setClickedBrands(clickedBrands.filter((clickedBrand) => clickedBrand !== croppedBrand));
      } else {
        setClickedBrands([...clickedBrands, croppedBrand]);
      }
    };

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

        const imageElements = filteredImages.map((filename, index) => (
          <div
            key={index}
            onClick={() => handleBrandClick(filename)}
          >
            <img
              key={index}
              src={require(`../../images/clickandpick/${filename}`)}
              className={`brand-entity ${clickedBrands.includes(filename.split(".")[0]) ? 'clicked' : ''}`}
            />
          </div>
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
            <div className="picked-brands-label">Picked brands: {clickedBrands.map((brand, index) => (<span key={index}>{brand} </span>))}</div>
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
            <Link
                to={`/clickAndPickPage/model`}
                state={{
                    brand: clickedBrands
                }}
                className="next-button"
            >
                <button className="styled-button">Next</button>
            </Link>
        </div>
    );

}

export default BrandSection;