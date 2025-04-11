import { Separator } from '@/components/ui/separator';
import { SOCIAL_LINKS } from '@/constant';

const Footer = () => {
  return (
    <footer className='p-4 pb-0'>
      <div className='container flex flex-col gap-3 items-center md:flex-row md:justify-between bg-background border border-b-0 rounded-t-xl min-h-16 p-4'>
        <p className='text-sm text-center'>&copy; 2025 Nhm Develop Solution</p>
        <ul className='flex flex-wrap'>
          {SOCIAL_LINKS.map(({ href, label }, index) => (
            <li
              key={index}
              className='flex items-center'
            >
              <a href={href}>{label}</a>
              {index !== SOCIAL_LINKS.length - 1 && (
                <Separator
                  orientation='vertical'
                  className='h-3 mx-3'
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
