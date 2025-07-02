#!/usr/bin/env node

import { BmadMcpServer } from "./server.js";

const server = new BmadMcpServer();
server.start().catch(console.error);
