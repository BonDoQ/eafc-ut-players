import { FC, ReactElement } from "react";

interface Props {
  icon: ReactElement;
  title: string;
  description: string;
}

const CardWhatYouGet: FC<Props> = ({ icon, title, description }) => {
  return (
    <div className="col-6 d-flex">
      <div className='border border-primary px-3 py-2 d-flex flex-column mt-3'>
        <div className="text-primary display-1 m-0">{icon}</div>
        <div className="display-3 m-0">
          {title}
        </div>
        <p className="mt-3 lead">
          {description}
        </p>
      </div>
    </div>
  )
}

export default CardWhatYouGet;