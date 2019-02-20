const findUnfinishedInspection = audio => audio.statuses.some(status => status === '');

export function internalBack(audioList, cursor) {
  const previousAudio = audioList.slice(0, cursor).reverse().find(findUnfinishedInspection);

  if (previousAudio == null || previousAudio.cursor == null) {
    return audioList.slice().reverse().find(findUnfinishedInspection).cursor;
  }
  return previousAudio.cursor;
}

export function internalNext(audioList, cursor) {
  const nextAudio = audioList.slice(cursor + 1, audioList.lenght).find(findUnfinishedInspection);

  if (nextAudio == null || nextAudio.cursor == null) {
    return audioList.find(findUnfinishedInspection).cursor;
  }
  return nextAudio.cursor;
}
