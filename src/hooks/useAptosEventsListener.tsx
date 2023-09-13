import { useEffect, useState } from "react";
import { useAptosTx } from "./useAptosTx";

export enum RouletteEventEnum {
  result = "ResultEvent",
  payout = "PayoutEvent",
}

const CHECK_DELAY = 1000;

export const useAptosEventListener = (eventType: RouletteEventEnum, cb: (params: any) => void) => {
  const [lastEventSeq, setLastEventSeq] = useState<number>();
  const { getRouletteEvents, requestEvents } = useAptosTx();

  useEffect(() => {
    const checkEvent = async () => {
      try {
        if (!lastEventSeq) {
          const res = await getRouletteEvents(eventType);
          if (!res || res.length === 0) return;
          setLastEventSeq(res[0].sequence_number);
          return;
        }

        const res = await requestEvents(eventType, lastEventSeq, 10);
        if (!res || !res.length) return;

        console.log(res);
        const last = res.at(-1);
        if (Number(last!.sequence_number) > lastEventSeq) {
          setLastEventSeq(Number(last!.sequence_number));
          cb(last!.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const interval = setInterval(async () => {
      checkEvent();
    }, CHECK_DELAY);

    return () => clearInterval(interval);
  }, [cb, eventType, getRouletteEvents, lastEventSeq, requestEvents]);
};
