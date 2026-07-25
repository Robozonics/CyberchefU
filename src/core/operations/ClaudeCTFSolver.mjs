import Operation from "../Operation.mjs";
import OperationError from "../errors/OperationError.mjs";

class ClaudeCTFSolver extends Operation {
    constructor() {
        super();
        this.name = "Claude CTF Solver";
        this.module = "Default";
        this.description = "Sends pipeline data to a local Antigravity/Claude proxy to analyze ciphers and extract CTF flags.";
        this.infoURL = "";
        this.inputType = "string";
        this.outputType = "string";
        this.args = [
            {
                name: "Antigravity Endpoint",
                type: "shortString",
                value: "http://localhost:8080/v1/messages"
            },
            {
                name: "API Key (if required)",
                type: "shortString",
                value: ""
            },
            {
                name: "Expected Flag Format",
                type: "shortString",
                value: "CTF{.*}"
            }
        ];
    }

    async run(input, args) {
        const [endpoint, apiKey, flagFormat] = args;
        if (!input || !input.trim()) return "No input data received from previous operation.";

        const payload = {
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            messages: [{
                role: "user",
                content: `You are an expert CTF solver. Analyze this payload. Look for hidden flags matching regex: ${flagFormat}. Explain any secondary ciphers and extract the flag:\n\n${input}`
            }]
        };

        const headers = { "Content-Type": "application/json" };
        if (apiKey) headers["x-api-key"] = apiKey;

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            return data.content?.[0]?.text || data.result || JSON.stringify(data, null, 2);
        } catch (err) {
            throw new OperationError(`Claude Solver Error: ${err.message}`);
        }
    }
}

export default ClaudeCTFSolver;