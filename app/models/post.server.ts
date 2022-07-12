
import type { BlockValueType } from "~/notion";
import notion from "~/notion.server"

/**
 * Utility for enforcing exhaustiveness checks in the type system.
 *
 * @see https://basarat.gitbook.io/typescript/type-system/discriminated-unions#throw-in-exhaustive-checks
 *
 * @param value The variable with no remaining values
 */
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

export async function getPosts() {

    const { results } = await notion.blocks.children.list({
        block_id: "af10860d25fd4385b5ca0f3158fe14d5",
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

    return pickData;
}