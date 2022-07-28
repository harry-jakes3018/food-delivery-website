import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: "qsnjojc7",
    dataset: "production",
    apiVersion: "2022-07-28",
    useCdn: true,
    token: "skFQRQocYUHMHX2KQIZnqHUy5NPxDRScJHCYHVZaHTrTAnxepk66khAZfGs6ZyMJq5RJTBKhdCXFhNNJHZVHKTS3zepVHJQpAVPkHBPV8njkqvAqM5jrui5nKXi1ZIcaA8VvQJCrY2mLnw6tN9YTV0KRyd92uGocfEFYtz1TwX8u6cqYpGjF",
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
