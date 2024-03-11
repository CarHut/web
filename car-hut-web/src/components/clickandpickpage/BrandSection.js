import "../../css/clickandpickpage/BrandSection.css"
import React, { useState, useEffect } from "react";

function BrandSection() {

    const [imageFilenames, setImageFilenames] = useState([]);
    const [currentStage, setCurrentStage] = useState('Brand');

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

        console.log(myImages);

        // Filter filenames starting with 'a' or 'A'
        const filteredImages = myImages.filter(filename => filename.toLowerCase().startsWith(character));
    
        // Generate <img> elements
        const imageElements = filteredImages.map((filename, index) => (
          <img
            key={index}
            src={require(`../../images/clickandpick/${filename}`)}
            className="brand-entity"
          />
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

      const handleStageChange = (newStage) => {
        setCurrentStage(newStage);
      };
    
      const generateProgressBar = () => {
        const stages = ['Brand', 'Model', 'Price'];
        const sphereSize = { Brand: '2em', Model: '2.5em', Price: '2.2em' };
        
        return stages.map((stage, index) => (
          <React.Fragment key={index}>
            <div
              className="progress-bar-sphere"
              style={{ width: sphereSize[stage], height: sphereSize[stage], backgroundColor: currentStage === stage ? '#00ff00' : '#313131' }}
              onClick={() => handleStageChange(stage)}
            />
            {index < stages.length - 1 && <div className="progress-bar-line" style={{ backgroundColor: currentStage === stage ? '#00ff00' : '#898989' }} />}
          </React.Fragment>
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
                    <div className="progress-bar-line"/>
                    <div className="progress-bar-sphere"/>
                </div>
            </div>
            <div className="progress-bar-label">{currentStage === 'Brand' ? 'Brand -> Model' : 'Brand <- Model -> Price'}</div>
        </div>
    );

}

export default BrandSection;