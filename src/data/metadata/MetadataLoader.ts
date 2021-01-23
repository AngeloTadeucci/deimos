import fs from "fs";
import protobuf from "protobufjs";
import { ItemMetadata, ItemMetadataInterface } from "./ItemMetadata";

export class MetadataLoader {

    public static loadMetadata(): void {
        const items = this.decode<ItemMetadataInterface>("item", "Item");
        ItemMetadata.load(items);
    }

    private static decode<T>(slug: string, name: string): Array<T> {
        const root = protobuf.loadSync(process.cwd() + "/resources/proto/" + slug + ".proto");
        const buffer = fs.readFileSync(process.cwd() + "/resources/metadata/ms2-" + slug + "-metadata");

        const type = root.lookupType("List" + name + "Metadata");

        return type.decode(buffer).toJSON().items;
    }
}
