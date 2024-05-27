import React from "react";
import Lottie from "react-lottie-player";

import lottieJson from "../../assets/LottieFiles/loading.json";

export default class LottieLoading extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<Lottie
					loop
					animationData={lottieJson}
					play
					style={{ width: 200, height: 200, margin: "auto" }}
				/>
			</div>
		);
	}
}
