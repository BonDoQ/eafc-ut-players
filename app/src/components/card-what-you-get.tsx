import { FC, ReactElement } from "react";

interface Props {
  icon: ReactElement;
  title: string;
  description: string;
}

const CardWhatYouGet: FC<Props> = ({ icon, title, description }) => {
  return (
    <div className="col-6">
      <div className='border border-primary p-3 gap-2 d-flex flex-column mt-3'>
        {icon}
        <div className="display-3 m-0">
          {title}
        </div>
        <p>
          {description}
        </p>
      </div>
    </div>
  )
}

export default CardWhatYouGet;