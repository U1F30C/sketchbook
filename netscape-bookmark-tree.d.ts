declare module "netscape-bookmark-tree" {
  export interface DomNode {
    name: string;
    index: number;
    id: string;
    children: (DomNode)[];
    pid?: string;
    unfiled_bookmarks_folder?: string;
    add_date?: string;
    last_modified?: string;
  }

  export interface LinkNode extends DomNode {
    href: string;
    icon_uri: string;
    icon: string;
  }

  export function parse(body: string): DomNode[];
}
