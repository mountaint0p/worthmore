import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { FaCircle } from "react-icons/all";
import { useEffect } from "react";

type ImageSliderProps = {
	slides: string[];
};
function preloadImage(src: string) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = function () {
			resolve(img);
		};
		img.onerror = img.onabort = function () {
			reject(src);
		};
		img.src = src;
	});
}

function ImageSlider({ slides }: ImageSliderProps) {
	//iterate through slides, forcing to fetch all images
	useEffect(() => {
		const loadImage = (image: string) => {
			return new Promise((resolve, reject) => {
				const loadImg = new Image();
				loadImg.src = image;
				// wait 2 seconds to simulate loading time
				loadImg.onload = () =>
					setTimeout(() => {
						resolve(image);
					}, 2000);

				loadImg.onerror = (err) => reject(err);
			});
		};

		Promise.all(slides.map((image) => loadImage(image))).catch((err) =>
			console.log("Failed to load images", err)
		);
	}, []);

	const [currentIndex, setCurrentIndex] = useState(0);

	const prevSlide = () => {
		const isFirstSlide = currentIndex === 0;
		const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
		setCurrentIndex(newIndex);
	};

	const nextSlide = () => {
		const isLastSlide = currentIndex === slides.length - 1;
		const newIndex = isLastSlide ? 0 : currentIndex + 1;
		setCurrentIndex(newIndex);
	};

	const goToSlide = (slideIndex: number) => {
		setCurrentIndex(slideIndex);
	};

	return (
		<div className="group relative h-full w-full ">
			<img
				src={slides[currentIndex]}
				className="absolute inset-0 h-full w-full object-cover"
			/>
			{/* Left Arrow */}
			<div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full border-2 border-white bg-black p-2 text-2xl text-white group-hover:block">
				<BsChevronCompactLeft onClick={prevSlide} size={30} />
			</div>
			{/* Right Arrow */}
			<div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full border-2 border-white bg-black p-2 text-2xl text-white group-hover:block">
				<BsChevronCompactRight onClick={nextSlide} size={30} />
			</div>
			{/*Might add option to choose place later*/}
			{/* <div className="top-4 flex justify-center py-2">
				{slides.map((slide, slideIndex) => (
					<div
						key={slideIndex}
						onClick={() => goToSlide(slideIndex)}
						className="mx-1 cursor-pointer"
					>
						<FaCircle size={16} />
					</div>
				))}
			</div> */}
		</div>
	);
}

export default ImageSlider;
