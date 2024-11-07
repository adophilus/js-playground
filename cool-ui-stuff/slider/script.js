const control = document.querySelector(".slider");
const track = control.querySelector(".slider__track");
const label = control.querySelector(".slider__tooltip");
const input = document.querySelector(".slider input");

const updateSlider = () => {
	control.style.setProperty("--value", input.value);
	track.style.setProperty(
		"--shift",
		input.value > 38 && input.value < 67 ? 1 : 0,
	);
	label.style.setProperty(
		"--shift",
		input.value > 38 && input.value < 67 ? 1 : 0,
	);
};

input.addEventListener("input", updateSlider);
input.addEventListener("pointerdown", updateSlider);
updateSlider();
