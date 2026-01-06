export default async function handler(req, res) {
    const GIST_ID = "8cccfb461986b3e5c3f40c15103e6fbf";
    const TOKEN = process.env.GITHUB_TOKEN;

    if (!TOKEN) {
        return res.status(500).json({ error: "Token não configurado" });
    }

    // LER mensagens
    if (req.method === "GET") {
        const response = await fetch(`https://api.github.com/gists/${GIST_ID}`);
        const data = await response.json();

        const content = data.files["chat.json"].content;
        return res.status(200).json(JSON.parse(content));
    }

    // ESCREVER mensagens
    if (req.method === "POST") {
        const body = req.body;

        await fetch(`https://api.github.com/gists/${GIST_ID}`, {
            method: "PATCH",
            headers: {
                "Authorization": `token ${TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                files: {
                    "chat.json": {
                        content: JSON.stringify(body, null, 2)
                    }
                }
            })
        });

        return res.status(200).json({ ok: true });
    }

    res.status(405).end();
}
