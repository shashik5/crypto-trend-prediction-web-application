import { withMiddlewares } from '../../middlewares';

interface IResponseData {
  result: any;
}

export default withMiddlewares<IResponseData>(async (req, res) => {
  try {
    const { appContext: { db }, body: { study, symbol, interval } } = req;
    const collection = db.collection('prediction');
    const result = await collection.findOne({
      study,
      symbol,
      interval
    }, {
      sort: {
        closeTime: 'desc'
      },
      projection: {
        _id: 0,
        result: 0
      }
    });
    res.status(200).json({ result });
  } catch {
    res.status(500);
  }
});