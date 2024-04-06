import { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const ContentGrid: FC<Props> = ({ children }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-10 col-lg-8 mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default ContentGrid;
