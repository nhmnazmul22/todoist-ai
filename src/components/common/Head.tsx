import { Helmet, HelmetProvider } from 'react-helmet-async';

type HeadProps = {
  title: string;
};

const Head: React.FC<HeadProps> = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;
