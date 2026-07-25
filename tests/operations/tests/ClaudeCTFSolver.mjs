/**
* ClaudeCTFSolver tests
*
* @author  []
* @copyright Crown Copyright 2026
* @license Apache-2.0
*/

import TestRegister from "../../lib/TestRegister.mjs";

TestRegister.addTests([
    {
        name: "ClaudeCTFSolver: test",
        input: "Example input",
        expectedOutput: "Expected output",
        recipeConfig: [
            {
                op: "ClaudeCTFSolver",
                args: [],
            },
        ],
    },
]);
