
import notion from "~/notion.server"

export function assertNever(value: never): never {
    throw new Error(`Unexpected value should never occur: ${value}`)
}

type AllKeys<T> = T extends unknown ? keyof T : never

export function pick<O extends unknown, K extends AllKeys<O>>(
    base: O,
    keys: readonly K[]
): Pick<O, K> {
    const entries = keys.map(key => [key, base?.[key]])
    return Object.fromEntries(entries)
}

export async function getBlock(block_id: string) {

    const { results } = await notion.blocks.children.list({
        block_id,
        auth: process.env.NOTION_SECRET,
    })

    const pickData = results.map(result => {
        let content = pick(result, [
            "heading_1",
            "heading_2",
            "heading_3",
            "paragraph"])

        return content
    }
    )


    const posts = [
        {
            id: "1",
            title: "Hello",
            pickData,
            block: results
        }
    ]

    return posts;
}