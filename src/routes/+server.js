export const GET = async () => {
	const encoder = new TextEncoder();
	const readable = new ReadableStream({
		async start(controller) {
			for (let i = 0; i < 20; i++) {
				controller.enqueue(encoder.encode(i.toString()));
				await new Promise((res) => setTimeout(res, 100));
			}
		}
	});

	return new Response(readable, {
		headers: {
			'content-type': 'text-event-stream'
		}
	});
};
