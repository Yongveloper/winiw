import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';

const useTimeDiff = (date: Date | string) => {
  const now = new Date();
  const postDate = new Date(date);
  const result = formatDistance(postDate, now, {
    addSuffix: true,
    locale: ko,
  });

  return result;
};

export default useTimeDiff;
