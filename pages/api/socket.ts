import { ChangeStreamDocument } from 'mongodb';
import { Server, Socket } from 'socket.io';
import { withMiddlewares } from '../../middlewares';
import { EventName } from '../../types';

const SocketHandler = withMiddlewares(async (req, res: any) => {
    const server = res?.socket?.server;
    if (!server) {
        res.status(500).end();
        return;
    }
    if (server.io) {
        res.end();
        return;
    }
    const { appContext: { db } } = req;
    const io = new Server(server);
    server.io = io;
    server.io.on('connection', async (socket: Socket) => {
        const collection = db.collection('update_log');
        const changeStream = collection.watch();
        const changeStreamHandler = (change: ChangeStreamDocument<Document>) => {
            socket.emit(EventName.newUpdateAvailable);
        };
        changeStream.on('change', changeStreamHandler);
        socket.on('disconnect', () => {
            changeStream.off('change', changeStreamHandler);
        });
    });
    res.end();
});

export default SocketHandler;
