import { serve } from "https://deno.land/std@0.137.0/http/server.ts";
import { mediaType } from "https://cdn.skypack.dev/@hapi/accept@5.0.2?dts&min";

function buildCommand(version: string): string {
	const commands = [
		`curl -o deno.zip https://dl.deno.land/release/${version}/deno-x86_64-pc-windows-msvc.zip`,
		`tar xf deno.zip`,
		`del deno.zip`
	];
	const instrumented = [];
	for (let c of commands) {
		instrumented.push(`echo ${c}`, c);
	}
	const inlined = instrumented.join("& ");
	return inlined;
}

function determineMediaType(req: Request): "text/plain" | "text/html" {
	const accept = req.headers.get("accept");
	if (accept === null) {
		return "text/plain";
	}
	return mediaType(accept, ["text/plain", "text/html"]) as "text/plain" | "text/html";
}

function determineVersion(req: Request): string {
	const pathname = new URL(req.url).pathname;
	const match = pathname.match(/^\/(v\d+\.\d+\.\d+)\/?$/);
	const version = match === null ? "latest" : match[1];
	return version;
}

function handler(req: Request): Response {
	switch (determineMediaType(req)) {
		case "text/html":
			return Response.redirect("https://github.com/MarkTiedemann/deno-batch-installer");
		case "text/plain":
		default:
			return new Response(buildCommand(determineVersion(req)));
	}
}

serve(handler);
