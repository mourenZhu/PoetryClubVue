import { FfoGameSentenceJudgeType, FfoVoteType } from '@/types/ffo-types';
import { FfoGameUserVoteResVo } from '@/api/flying-flower-order';
import {
  FfoGameSentenceDTO,
  FfoGameVoteDTO,
} from '@/store/modules/ffo-game/types';

export function getSentenceJudgeType(
  judgeType: FfoGameSentenceJudgeType
): string {
  if (judgeType === 'SUCCESS') {
    return '通过';
  }
  if (judgeType === 'NULL_CONTENT') {
    return '内容为空';
  }
  if (judgeType === 'LENGTH_NOT_MATCH') {
    return '长度不匹配';
  }
  if (judgeType === 'NO_KEYWORD') {
    return '句子没有令';
  }
  if (judgeType === 'KEYWORD_NOT_IN_CORRECT_POSITION') {
    return '令不在指定位置';
  }
  if (judgeType === 'DUPLICATE_CONTENT') {
    return '内容重复';
  }
  if (judgeType === 'ONLY_ANCIENTS_POEM_BUT_NOT_FIND') {
    return '不是古诗';
  }
  if (judgeType === 'ONLY_SELF_CREAT_BUT_FIND') {
    return '抄袭古诗';
  }
  if (judgeType === 'VOTE_FAILED') {
    return '投票不通过';
  }
  return '';
}

// 获取投票几比几的表示
export function getVtoV(
  userVotes: FfoGameUserVoteResVo[] | FfoGameVoteDTO[]
): string {
  let favorNum = 0;
  let opposeNum = 0;
  let abstainNum = 0;
  userVotes.forEach((vote) => {
    if (vote.ffoVoteType === 'FAVOR') {
      favorNum += 1;
    }
    if (vote.ffoVoteType === 'OPPOSE') {
      opposeNum += 1;
    }
    if (vote.ffoVoteType === 'ABSTAIN') {
      abstainNum += 1;
    }
  });
  return `${favorNum} : ${opposeNum} : ${abstainNum}`;
}

export function getVoteType(ffoVoteType: FfoVoteType): string {
  if (ffoVoteType === 'FAVOR') {
    return '通过';
  }
  if (ffoVoteType === 'OPPOSE') {
    return '不通过';
  }
  return '弃权';
}
