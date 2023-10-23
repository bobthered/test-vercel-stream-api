import JSZip from 'jszip';
import PDFKit from 'pdfkit';

/** @type {ReadableStreamDefaultController} */
let controller;
const delay = 0;
const encoder = new TextEncoder();
/**
 *
 * @param {number} completed number of completed barcodes
 * @param {number} total number of total barcodes
 * @returns
 */
const sendMessage = (completed = 0, total = 0) => {
	// update current time
	time.current = new Date();

	// calculate elapsed time
	const elapsed = time.current - time.start;

	// check if elapsed is larger than threshold
	if (elapsed >= time.threshold) {
		controller.enqueue(encoder.encode(JSON.stringify({ completed, total })));
		time.start = time.current;
	}
};
const time = { current: new Date(), start: new Date(), threshold: 100 };
const totalBarcodes = 2500;

export const GET = async () => {
	const encoder = new TextEncoder();
	const doc = new PDFKit();

	const readable = new ReadableStream({
		async start(c) {
			// update start time
			time.start = new Date();

			// initiate JSZip
			const jszip = new JSZip();

			// update global controller
			controller = c;

			// send message with initial values
			sendMessage(0, totalBarcodes);
			await new Promise((res) => setTimeout(res, delay));
			for (let i = 0; i < totalBarcodes; i++) {
				// initiate pdf doc
				const doc = new PDFKit();
				doc.end();

				// add file
				jszip.file(`${i}.pdf`, doc);

				// send message with updated values
				sendMessage(i + 1, totalBarcodes);
				await new Promise((res) => setTimeout(res, delay));
			}
			// create zip file
			const zip = await jszip.generateAsync({ type: 'uint8array' });
			controller.enqueue(zip);
			controller.close();
		}
	});

	return new Response(readable, {
		headers: {
			'content-type': 'text/event-stream'
		}
	});
};
