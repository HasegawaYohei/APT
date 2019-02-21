import { remote } from 'electron';

const findUnfinishedInspection = element => element.statuses.some(status => status === '');

function getAudioFile(filepath) {
  const fs = remote.require('fs');
  const filenameList = fs.readdirSync(filepath);

  return filenameList.filter(filename => filename.slice(-4) === '.wav').map(filename => ({
    filename,
    data: fs.readFileSync(`${filepath}${filename}`),
  }));
}

export function internalBack(resultList, cursor) {
  const previousAudio = resultList.slice(0, cursor).reverse().find(findUnfinishedInspection);

  if (previousAudio == null || previousAudio.cursor == null) {
    return resultList.slice().reverse().find(findUnfinishedInspection).cursor;
  }
  return previousAudio.cursor;
}

export function internalNext(resultList, cursor) {
  const nextAudio = resultList.slice(cursor + 1, resultList.lenght).find(findUnfinishedInspection);

  if (nextAudio == null || nextAudio.cursor == null) {
    return resultList.find(findUnfinishedInspection).cursor;
  }
  return nextAudio.cursor;
}

export function generateAnswerButtonList(columnNumber) {
  const answerButtonList = Array.from({ length: columnNumber * 2 }).map((_, i) => {
    if (i % 2) {
      return {
        statusIndex: Math.floor(i / 2),
        label: '正答',
        color: 'success',
        answer: true,
      };
    }

    return {
      statusIndex: Math.floor(i / 2),
      label: '誤答',
      color: 'error',
      answer: false,
    };
  });

  if (columnNumber === 1) return answerButtonList;
  if (columnNumber === 2) {
    return answerButtonList.map(answerButton => ({
      ...answerButton,
      label: `${answerButton.label}${(answerButton.statusIndex % 2) ? 'R' : 'L'}`,
    }));
  }
  if (columnNumber === 3) {
    return answerButtonList.map(answerButton => ({
      ...answerButton,
      label: `${answerButton.label}${answerButton.statusIndex + 1}`,
    }));
  }

  return answerButtonList;
}

export function generateResultListHeader(columnNumber) {
  if (columnNumber === 1) return ['状態'];
  if (columnNumber === 2) {
    return [
      '状態L',
      '状態R',
    ];
  }
  if (columnNumber === 3) {
    return [
      '状態1',
      '状態2',
      '状態3',
    ];
  }

  return [];
}

export function generateAudioList(audioDirPath) {
  return getAudioFile(audioDirPath).map((audioFIle, i) => ({
    filename: audioFIle.filename,
    data: audioFIle.data,
    cursor: i,
  }));
}

export function generateResultList(audioList, columnNumber) {
  return audioList.map((audio, i) => ({
    filename: audio.filename,
    statuses: Array.from({ length: columnNumber }).map(() => ''),
    cursor: i,
  }));
}
