import { withMiddlewares } from '../../middlewares';

interface IResponseData {
  result: any;
}

export default withMiddlewares<IResponseData>(async (req, res) => {
  try {
    const { appContext: { db }, body: { study, symbol, interval, limit = 5 } } = req;
    const collection = db.collection('prediction');
    const result = await collection.find({
      study,
      symbol,
      interval,
      result: {
        $ne: null
      }
    }, {
      limit,
      sort: {
        closeTime: 'desc'
      },
      projection: {
        _id: 0
      }
    }).toArray();

    res.status(200).json({ result });
  } catch {
    res.status(500);
  }
});