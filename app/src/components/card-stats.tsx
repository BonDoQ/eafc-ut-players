import { FC, ReactElement } from "react";

interface Props {
  icon: ReactElement;
  metric: string;
  type: string;
}

const CardStats: FC<Props> = ({ icon, metric, type }) => {
  return (
    <div className="col-6 col-lg">
      <div className='border border-primary-subtle p-1 d-flex flex-column mt-3'>
        {icon}
        <h2 className="display-3 m-0">
          {metric}
        </h2>
        <h3 className="display-6 m-0">
          {type}
        </h3>
      </div>
    </div>
  )
}

export default CardStats;