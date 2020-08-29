import React, { useState, useRef } from "react";

import one from "../../assets/SlideShow/1.png";
import two from "../../assets/SlideShow/2.png";
import three from "../../assets/SlideShow/3.png";
//import four from "../../assets/SlideShow/4.png";
import { useEffect } from "react";

const Slideshow = () => {
	const [slideIndex, setSlideIndex] = useState(0);
	const domSlide = useRef([]);

	// Next/previous controls
	function handleNext() {
		slideIndex + 1 > 2 ? setSlideIndex(0) : setSlideIndex(slideIndex + 1);

		//console.log(slideIndex);
		//console.log(domSlide.current);
	}
	function handleBack() {
		slideIndex - 1 < 0 ? setSlideIndex(2) : setSlideIndex(slideIndex - 1);
	}

	useEffect(() => {
		let leftOutArray = [0, 1, 2].filter((item) => item !== slideIndex);
		domSlide.current[slideIndex].style.display = "inline";
		domSlide.current[leftOutArray[0]].style.display = "none";
		domSlide.current[leftOutArray[1]].style.display = "none";
	}, [slideIndex]);

	// Thumbnail image controls

	return (
		<div className="slideshow-container">
			<div ref={(el) => (domSlide.current[0] = el)} className="slide">
				<div className="numbertext">1 / 3</div>
				<img alt="aa" src={one} style={{ width: "100%" }} />
				<div className="caption_text">En az üç harfli kelimeler bulmalsınız.</div>
			</div>

			<div ref={(el) => (domSlide.current[1] = el)} className="slide">
				<div className="numbertext">2 / 3</div>
				<img alt="aa" src={two} style={{ width: "100%" }} />
				<div className="caption_text">Harfleri her yönde birleştirebilirsiniz.</div>
			</div>

			<div ref={(el) => (domSlide.current[2] = el)} className="slide">
				<div className="numbertext">3 / 3</div>
				<img alt="aa" src={three} style={{ width: "100%" }} />
				<div className="caption_text">Uzun kelimeler daha fazla puan getirir.</div>
			</div>

			{/*  <!-- Next and previous buttons --> */}
			<div className="prev" onClick={handleBack}>
				&#10094;
			</div>
			<div className="next" onClick={handleNext}>
				&#10095;
			</div>
		</div>
	);
};

export default Slideshow;
