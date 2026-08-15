export const prerender = false;

export async function GET() {
    const apiKey = import.meta.env.MONKEYTYPE_API_KEY;

    const response = await fetch(
        "https://api.monkeytype.com/users/personalBests?mode=time&mode2=15",
        {
            headers: {
                Authorization: `ApeKey ${apiKey}`,
            },
        }
    );

    if (!response.ok) {
        const text = await response.text();

        return new Response(
            JSON.stringify({
                error: "Monkeytype API returned an error",
                status: response.status,
                response: text,
            }),
            {
                status: response.status,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }

    const result = await response.json();

    const personalBest = result.data[2];

    return new Response(
        JSON.stringify({
            wpm: personalBest.wpm,
            accuracy: personalBest.acc,
            timestamp: personalBest.timestamp,
        }),
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
}