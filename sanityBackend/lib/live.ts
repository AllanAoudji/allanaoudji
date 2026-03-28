import { serverToken } from "../env.server";
import { defineLive } from "next-sanity/live";
import "server-only";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({ client, serverToken });
