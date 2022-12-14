import { withMiddlewares } from '../../middlewares';

interface IResponseData {
  result: any;
}

export default withMiddlewares<IResponseData>(async (req, res) => {
  try {
    const { appContext: { db } } = req;
    const collection = db.collection('update_log');
    const result = await collection.findOne({}, {
      sort: {
        lastUpdateAt: 'desc'
      },
      projection: {
        _id: 0
      }
    });
    res.status(200).json({ result });
  } catch {
    res.status(500);
  }
});