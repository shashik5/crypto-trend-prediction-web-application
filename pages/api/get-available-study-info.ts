import { sortBy } from '@cybercat-io/utilities';
import { withMiddlewares } from '../../middlewares';
import { IStudyInfo } from '../../types';

interface IResponseData {
  result: any;
}

const INTERVAL_ORDER: string[] = ['m', 'h', 'd', 'w'];
function customIntervalSort(list: string[]) {
  return INTERVAL_ORDER.reduce((sortedList: string[], sortGroup) => {
    const filteredItems = list.filter((i) => i.replace(/\d+/ig, '') === sortGroup);
    return sortedList.concat(sortBy(filteredItems, i => i));
  }, []);
}

export default withMiddlewares<IResponseData>(async (req, res) => {
  try {
    const { appContext: { db } } = req;
    const collection = db.collection('prediction');
    const studyNames = await collection.distinct('study');

    const result = await Promise.all(sortBy(studyNames, i => i).map(async (study) => {
      const studyInfo = { study } as IStudyInfo;
      const [intervals, symbols] = await Promise.all([
        collection.distinct('interval', {
          study
        }),
        collection.distinct('symbol', {
          study
        })
      ]);
      studyInfo.intervals = customIntervalSort(intervals);
      studyInfo.symbols = sortBy(symbols, i => i);
      return studyInfo;
    }));

    res.status(200).json({ result });
  } catch {
    res.status(500);
  }
});
