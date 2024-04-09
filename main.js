let video, canvas, context;
let width, height;

window.addEventListener('load', init);

function init()
{
	video = document.getElementById('video');
	width = video.videoWidth;
	height = video.videoHeight;

	canvas = document.getElementById('canvas');
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext('2d');

	update();
}

function update()
{
	requestAnimationFrame(update);

	context.drawImage(video, 0, 0, width, height);	
	let data = context.getImageData(0, 0, width, height);
	data = edge_detection(data);
	context.putImageData(data, 0, 0);
}

function edge_detection(image_data)
{
    let result_image = new ImageData(width, height);
	let gray_image = rgb2gray(image_data);

	let sobelKernel_x = [ -1, 0, 1, -2, 0, 2, -1, 0, 1 ];
	let sobelKernel_y = [ 1, 2, 1, 0, 0, 0, -1, -2, -1 ];

	for (let j = 1; j < height - 1; j++)
	{
		for (let i = 4; i < width * 4 - 1; i += 4)
		{
			let current = i + j * width * 4;
			let dx = 0;
			let dy = 0;

			for (let x = -4; x <= 4; x += 4)
			{
				for (let y = -1; y <= 1; y++)
				{
					let shift = x + y * width * 4;
					let kernel_current = 4 + y * 3 + x / 4;
					dx = dx + sobelKernel_x[kernel_current] * gray_image.data[current + shift];
					dy = dy + sobelKernel_y[kernel_current] * gray_image.data[current + shift];
				}
			}

			let sobel_value = Math.abs(dx) + Math.abs(dy);

			// Clamp sobel pixel result between 0 and 255
			if (sobel_value > 255)
			{
				sobel_value = 255;
			}

			result_image.data[current] = sobel_value;
			result_image.data[current + 1] = sobel_value;
			result_image.data[current + 2] = sobel_value;
			result_image.data[current + 3] = 255;
		}
	}

	return result_image;
}

function rgb2gray(image_data)
{
	let gray_image = new ImageData(width, height);
	let image = image_data.data;

	for (let j = 0; j < height; j++)
	{
		for (let i = 0; i < width * 4; i += 4)
		{
			let current = i + j * width * 4;
			let red = image[current];
			let green = image[current + 1];
			let blue = image[current + 2];

			// Apply gray scale coversion (weighted average) on gray_image
			let gray_value = 0.299 * red + 0.587 * green + 0.114 * blue;

			gray_image.data[current] = gray_value;
			gray_image.data[current + 1] = gray_value;
			gray_image.data[current + 2] = gray_value;
			gray_image.data[current + 3] = 255;
		}
	}

	return gray_image;
}
