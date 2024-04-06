import { FC, ReactElement } from 'react';

interface Props {
  icon: ReactElement;
  metric: string;
  type: string;
}

const CardStats: FC<Props> = ({ icon, metric, type }) => {
  return (
    <div className="col-6 col-lg">
      <div
        className="border border-primary px-1 d-flex flex-column mt-3 card-stats"
        style={{ '--bs-border-opacity': 0.2 } as React.CSSProperties}
      >
        <h2 className="display-3 m-0">{metric}</h2>
        <h3 className="display-6 m-0">{type}</h3>
        <div className="display-0 text-primary">{icon}</div>
      </div>
    </div>
  );
};

export default CardStats;
