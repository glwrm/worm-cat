import type { APIRoute } from "astro";

const WEBHOOK_SECRET = import.meta.env.BSAPI_KEY;

type CurrentlyPlaying = {
    track: string;
    artist: string;
    album: string | null;
    duration: number;
    currentTime: number;
    isPlaying: boolean;
    trackArt: string | null;
    originUrl: string | null;
};

let currentlyPlaying: CurrentlyPlaying | null = null;

export const prerender = false;

function isAuthorized(request: Request): boolean {
    const secret = request.headers.get("X-Scrobbler-Secret");

    return Boolean(
        WEBHOOK_SECRET &&
        secret &&
        secret === WEBHOOK_SECRET
    );
}

export const POST: APIRoute = async ({ request }) => {
    if (!isAuthorized(request)) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }

    let body;

    try {
        body = await request.json();
    } catch {
        return new Response("Invalid JSON", {
            status: 400,
        });
    }

    const song = body?.data?.song?.parsed;

    if (!song) {
        return new Response("Invalid payload", {
            status: 400,
        });
    }

    currentlyPlaying = {
        track: song.track,
        artist: song.artist,
        album: song.album ?? null,
        duration: song.duration,
        currentTime: song.currentTime,
        isPlaying: song.isPlaying,
        trackArt: song.trackArt ?? null,
        originUrl: song.originUrl ?? null,
    };

    console.log(
        `Server received: "${currentlyPlaying.track}" by ${currentlyPlaying.artist}`
    );

    return new Response("Received!", {
        status: 200,
    });
};

export const GET: APIRoute = ({ request }) => {
    if (!isAuthorized(request)) {
        return new Response("Unauthorized", {
            status: 401,
        });
    }

    return Response.json(currentlyPlaying);
};