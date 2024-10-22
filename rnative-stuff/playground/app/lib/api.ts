import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import { env } from "~/env";
import type { paths } from "~/types/api";

export const client = createFetchClient<paths>({
	baseUrl: env.API_URL,
});

export const $api = createClient(client);
