import { LoginPacketRouter } from "@/network/routers/LoginPacketRouter";
import { Server } from "@/network/servers/Server";
import { LoginSession } from "@/network/sessions/LoginSession";
import { Logger } from "@/tools/Logger";
import { Socket } from "net";
import picocolors from "picocolors";

const { green } = picocolors;

export class LoginServer extends Server {
    public constructor(host: string, port: number) {
        super(host, port, new LoginPacketRouter());
        super.start();
    }

    protected onConnection(socket: Socket): void {
        const session = new LoginSession(this.sessionCounter++, socket, this.packetRouter);

        Logger.log(`Login Server: Session ${session.id} @ ${session.socket.remoteAddress} opened`);

        this.setupSocketEvents(session);
    }

    private setupSocketEvents(session: LoginSession): void {
        session.socket.setNoDelay(true);
        session.socket.on("data", data => this.onData(session, data));
        session.socket.on("close", hadError => this.onClose(session, hadError));
        session.socket.on("error", error => this.onError(session, error));
    }

    protected onData(session: LoginSession, data: Buffer): void {
        session.onData(data);
    }

    protected onClose(session: LoginSession, hadError: boolean): void {
        Logger.log(`Login Server: Session ${session.id} @ ${session.socket.remoteAddress} closed`);
    }

    protected onError(session: LoginSession, error: Error): void {
        Logger.error(error.message);
    }

    protected onStart(): void {
        Logger.log(`Login Server at ${this.host}:${this.port} is online`, green);
    }

    protected onShutdown(): void {
        Logger.log(`Login Server at ${this.host}:${this.port} shutdown`);
    }
}
