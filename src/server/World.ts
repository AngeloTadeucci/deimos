import { Player } from "../types/player/Player";

export class World {

    private static instance: World = new World();

    private idStorage: Map<BigInt, Player>;
    private nameStorage: Map<string, Player>;

    private constructor() {
        this.idStorage = new Map<BigInt, Player>();
        this.nameStorage = new Map<string, Player>();
    }

    public static getInstance(): World {
        return World.instance;
    }

    public addPlayer(player: Player): void {
        this.idStorage.set(player.characterId, player);
        this.nameStorage.set(player.name.toLowerCase(), player);
    }

    public removePlayer(player: Player): void {
        this.idStorage.delete(player.characterId);
        this.nameStorage.delete(player.name.toLowerCase());
    }

    public getPlayerByName(name: string): Player | undefined {
        return this.nameStorage.get(name.toLowerCase());
    }

    public getPlayerById(id: BigInt): Player | undefined {
        return this.idStorage.get(id);
    }
}