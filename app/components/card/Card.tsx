import { CardSkeleton } from "@/app/components/card/CardSkeleton";

export type CardBaseProps = {
  id: number;
  url?: string;
  title?: string;
  by: string;
  pointsCount?: number;
  commentsCount?: number;
};

export type CardProps<T extends CardBaseProps> =
  | { loading: true }
  | { loading: false; item: T };

export const Card = <T extends CardBaseProps>(props: CardProps<T>) => {
  if (props.loading) {
    return <CardSkeleton />;
  }

  const { id, url, title, by, pointsCount, commentsCount } = props.item;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="flex-[3] p-5">
        <h2 className="text-sm font-semibold leading-snug">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 hover:text-hn-orange transition-colors duration-150"
          >
            {title}
          </a>
        </h2>
      </div>

      <div className="flex-[2] px-5 pb-4 space-y-2">
        <p className="text-xs text-slate-500">by {by}</p>
        <div className="flex justify-between">
          <span className="text-xs text-slate-600">▲ {pointsCount} points</span>
          <span className="text-xs text-slate-500">{commentsCount} comments</span>
        </div>
      </div>

      <div className="flex-1 px-5 pb-5">
        <span className="inline-block text-xs bg-orange-50 text-hn-orange border border-orange-200 px-2 py-0.5 rounded-full font-mono">
          #{id}
        </span>
      </div>
    </div>
  );
};
