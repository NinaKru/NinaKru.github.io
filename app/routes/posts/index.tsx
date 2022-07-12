import { useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node"
import { getPosts } from "~/models/post.server"
import { Text, Container, Box } from '@mantine/core';

type loaderData = {
    posts: Awaited<ReturnType<typeof getPosts>>
}

export const loader: LoaderFunction = async () => {
    const posts = await getPosts()
    return json<loaderData>({ posts })
}

function BlockElement({ element }: { element: any }) {
    const { color, rich_text } = element
    const properties = [...rich_text].pop();
    const { type, text, annotations, href } = properties;
    return (
        <Box color={color === "default" ? "black" : color}>
            <p>{type}</p>
            <a href={href}>
                <Text weight={annotations.bold ? 500 : 100}>{text.content}</Text></a>
        </Box >
    )
}


export default function PostRoute() {
    const { posts } = useLoaderData() as loaderData
    const listing = posts.map((post) => Object.entries(post).map(([key, value]) => {
        console.log(key, value)
        return <BlockElement key={key} element={value} />
    }
    )
    )
    return (
        <Container>
            {listing}
        </Container>
    )
}