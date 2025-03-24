import { readFile, writeFile } from "fs-safe";
import { DomNode, LinkNode, parse } from "netscape-bookmark-tree";

const bookmarksDir = "data/bookmarks.html";
const outputDir = "data/bookmarks.json";

interface Link<Metadata = any> {
  name: string;
  url: string;
  folder?: string;
  metadata?: Metadata;
}

function printTree(entries: DomNode[], depth = 0) {
  for (const entry of entries) {
    if (entry.children) {
      console.log(" ".repeat(depth * 2), "-", entry.name.slice(0, 50));
      printTree(entry.children, depth + 1);
    }
  }
}

function getAllLinks(
  dom: (DomNode | LinkNode)[],
  links: Link<unknown>[] = [],
  folder: string
) {
  for (const entry of dom) {
    if ("href" in entry) {
      links.push({
        name: entry.name,
        url: entry.href,
        folder: folder,
        metadata: {},
      });
    } else {
      getAllLinks(entry.children, links, entry.name);
    }
  }
}

async function main() {
  const file = await readFile(bookmarksDir);

  const dom: DomNode[] = parse(file);

  printTree(dom);

  const allLinks: Link<unknown>[] = [];
  getAllLinks(dom, allLinks, "");

  const result = {
    links: allLinks,
  };

  await writeFile(outputDir, JSON.stringify(result, null, 2));
}

main();
