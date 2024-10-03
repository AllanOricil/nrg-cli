import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// @ts-expect-error package doesn't have proper types
import machineUuid from "machine-uuid";

const userId = await machineUuid();
Sentry.init({
  dsn: "https://aa7944d0fe4c4b439140a0f6b7141d25@o4508053113470976.ingest.us.sentry.io/4508053115830272",
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  enabled: !process.env.NRG_DISABLE_TELEMETRY,
  release: process.env.RELEASE_VERSION,
});

Sentry.setUser({
  id: userId,
});
