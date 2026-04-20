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
  | { loading: false; item: T; onCommentsClick?: () => void };

export const Card = <T extends CardBaseProps>(props: CardProps<T>) => {
  if (props.loading) {
    return <CardSkeleton />;
  }

  const { item, onCommentsClick } = props;
  const { id, url, title, by, pointsCount, commentsCount } = item;

  return (
    <div className="bg-white rounded-xl border border-lilac-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
      <div className="flex-[3] p-5">
        <h2 className="text-sm font-semibold leading-snug">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lilac-950 hover:text-lilac-600 transition-colors duration-150"
          >
            {title}
          </a>
        </h2>
      </div>

      <div className="flex-[2] px-5 pb-4 space-y-2">
        <p className="text-xs text-slate-600">by {by}</p>
        <div className="flex justify-between">
          <span className="text-xs text-slate-600">▲ {pointsCount} points</span>
          <button
              onClick={onCommentsClick}
              className="text-xs text-slate-600 hover:text-lilac-600 transition-colors disabled:cursor-default"
              disabled={!onCommentsClick}
              aria-label={`View ${commentsCount} comments`}
            >
              {commentsCount} comments
            </button>
        </div>
      </div>

      <div className="flex-1 px-5 pb-5">
        <span className="inline-block text-xs bg-lilac-100 text-lilac-700 border border-lilac-200 px-2 py-0.5 rounded-full font-mono">
          #{id}
        </span>
      </div>
    </div>
  );
};
